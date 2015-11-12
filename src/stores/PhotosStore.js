var dispatcher       = require('../dispatcher'),
    EventEmitter     = require('event-emitter'),
    _                = require('lodash'),
    Photo            = require('../models/Photo.js'),
    SearchQueryStore = require('../stores/SearchQueryStore.js');

require("flickrapi/browser/flickrapi.js");

(function(Flickr, EventEmitter, SearchQueryStore, Photo, _, module, undefined) {

  var PhotosStore = EventEmitter({

    photos: [],
    subscriptions: {},
    loading: true,
    loadingFirst: true,
    searchId: 0,
    flickr: new Flickr({
      api_key: "6fd39196ea7e93c54cd69b4b607b06d5",
      progress: false
    }),

    update: function(searchQuery, page) {
      if (page === undefined) page = 1;
      this.page = page;
      this.loading = true;

      if (searchQuery !== true && searchQuery != this.searchQuery) {
        this.searchId = this.searchId + 1;
        this.loadingFirst = true;
        this.searchQuery = searchQuery;
        this.photos = [];
      }

      if (this.searchQuery && this.searchQuery !== "") {
        this.search(this.searchQuery);
      } else {
        this.getRecent();
      }
    },

    loadMore: function() {
      if (!this.loading && this.photos.length > 0) {
        this.update(true, this.page+1);
      }
    },

    search: function(searchQuery) {
      var self = this;
      // We use a searchId that increments with each search.
      // This insures that if we change the search query
      // before a Flickr request responds, we know not to use it.
      var searchId = this.searchId;
      this.flickr.photos.search(this.optionizeSearchQuery(searchQuery), function(err, result) {
        if (searchId == self.searchId) {
          self.photosUpdated(err, result);
        }
      });
    },

    getDefaultOptions: function() {
      return {
        page: this.page || 1,
        per_page: 18,
        extras: 'tags,description,owner_name' };
    },

    optionizeSearchQuery: function(searchQuery) {
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
    },

    getRecent: function() {
      var self = this;
      var searchId = this.searchId;
      this.flickr.photos.getRecent(this.getDefaultOptions(), function(err, result) {
        if (searchId == self.searchId) {
          self.photosUpdated(err, result);
        }
      });
    },

    updated: function() {
      this.emit('updated', this.photos);
    },

    clear: function() {
      this.photos = [];
      this.updated();
    },

    photosUpdated: function(err, result) {
      if(err) { throw new Error(err); }
      var photos = PhotosStore.initiatePhotos(result.photos.photo);
      if (result.photos.page == 1) {
        PhotosStore.photos = photos;
      } else {
        PhotosStore.photos = PhotosStore.photos.concat(photos);
      }
      PhotosStore.loading = false;
      PhotosStore.loadingFirst = false;
      PhotosStore.updated();
    },

    onQueryChange: function(query, previousQuery) {
      PhotosStore.update(query);
    },

    initiatePhotos: function(photos) {
      var self = this;
      return photos.map(function(photo) {
        var photoModel = new Photo(photo);
        return photoModel;
      });
    }

  });

  SearchQueryStore.on('changed', PhotosStore.onQueryChange);
  module.exports = PhotosStore;

})(window.Flickr, EventEmitter, SearchQueryStore, Photo, _, module);
