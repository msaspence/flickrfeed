require("flickrapi/browser/flickrapi.js");

var _ = require('lodash');

var Photo = require('../models/Photo.js');

(function(Flickr, _, module) {

  var Feed = function() {

    this.photos = [];
    this.subscriptions = {};
    this.loading = true;

    this.flickr = new Flickr({
      api_key: "814f557fdd0320fb1fa4711047a5e355",
      progress: false
    });

    this.update = function(searchQuery) {
      var me = this;
      this.loading = true;

      if (searchQuery && searchQuery !== "") {
        this.search(searchQuery);
      } else {
        this.getRecent();
      }
    };

    this.search = function(searchQuery) {
      this.flickr.photos.search(this.optionizeSearchQuery(searchQuery), this.photosUpdated);
    };

    this.optionizeSearchQuery = function(searchQuery) {
      r = {};
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
      this.flickr.photos.getRecent({}, this.photosUpdated);
    };

    this.photosUpdated = _.bind(function(err, result) {
      if(err) { throw new Error(err); }
      this.photos = this.initiatePhotos(result.photos.photo);
      this.loading = false;
      this.trigger('update', this.photos);
    }, this);


    this.initiatePhotos = function(photos) {
      var me = this;
      return photos.map(function(photo) {
        var photoModel = new Photo(photo, me.flickr);
        photoModel.update();
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
