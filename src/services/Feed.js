require("flickrapi/browser/flickrapi.js");
(function(Flickr, module) {

  var Feed = function() {

    this.photos = [];
    this.subscriptions = {};

    this.flickr = new Flickr({
      api_key: "814f557fdd0320fb1fa4711047a5e355",
      progress: false
    });

    this.update = function() {
      var me = this;
      this.flickr.photos.getRecent({
      }, function(err, result) {
        if(err) { throw new Error(err); }
        me.photos = result.photos.photo;
        me.trigger('update', me.photos);
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
}(window.Flickr, module));
