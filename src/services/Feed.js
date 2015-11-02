require("flickrapi/browser/flickrapi.js");

var _ = require('lodash');

var Photo = require('../models/Photo.js');

(function(Flickr, _, module) {

  var Feed = function() {

    this.photos = [];
    this.subscriptions = {};
    this.loading = true;
    this.loadingFirst = true;

    this.flickr = new Flickr({
      api_key: "6fd39196ea7e93c54cd69b4b607b06d5",
      progress: false
    });

    this.update = function(searchQuery, page) {
      if (page === undefined) page = 1;
      this.page = page;
      this.loading = true;
      if (searchQuery !== true) this.searchQuery = searchQuery;

      if (this.searchQuery && this.searchQuery !== "") {
        this.search(this.searchQuery);
      } else {
        this.getRecent();
      }
    };

    this.loadMore = function() {
      if (!this.loading) {
        this.update(true, this.page+1);
      }
    };

    this.search = function(searchQuery) {
      this.flickr.photos.search(this.optionizeSearchQuery(searchQuery), this.photosUpdated);
    };

    this.getDefaultOptions= function() {
      return {
        page: this.page || 1,
        per_page: 18,
        extras: 'tags,description,owner_name' };
    };

    this.optionizeSearchQuery = function(searchQuery) {
      r = this.getDefaultOptions();
      tags = searchQuery.match(/tag:([^ ]+)/g);
      if (tags) {
        searchQuery = searchQuery.replace(/tag:([^ ]+)/g, "");
        r.tag_mode = 'all';
        r.tags = tags.map(function(x) { return x.replace(/^tag:/,""); }).join(',');
      }
      owner = searchQuery.match(/owner:([^ ]+)/);
      if (owner && owner[0]) {
        searchQuery = searchQuery.replace(/owner:([^ ]+)/g, "");
        r.user_id = owner[0].replace(/owner:/, "");
      }
      r.text = searchQuery.replace(/  +/g, " ");

      return r;
    };

    this.getRecent = function() {
      this.flickr.photos.getRecent(this.getDefaultOptions(), this.photosUpdated);
    };

    this.photosUpdated = _.bind(function(err, result) {
      if(err) { throw new Error(err); }
      if (result.photos.page == 1) {
        this.photos = this.initiatePhotos(result.photos.photo);
      } else {
        this.photos = this.photos.concat(this.initiatePhotos(result.photos.photo));
      }
      this.loading = false;
      this.loadingFirst = false;
      this.trigger('update', this.photos);
    }, this);


    this.initiatePhotos = function(photos) {
      var self = this;
      return photos.map(function(photo) {
        var photoModel = new Photo(photo, self.flickr);
        return photoModel;
      });
    };

    this.subscribe = function(event, func) {
      if (!this.subscriptions[event]) this.subscriptions[event] = [];
      if (this.subscriptions[event].indexOf(func) == -1) {
        this.subscriptions[event].push(func);
      }
    };

    this.trigger = function() {
      args  = Array.prototype.slice.call(arguments);
      event = args.shift();
      if (this.subscriptions[event]) {
        this.subscriptions[event].forEach(function(subscriber) {
          subscriber.apply(this, args);
        }, this);
      }
    };

  };
  module.exports = Feed;
}(window.Flickr, _, module));
