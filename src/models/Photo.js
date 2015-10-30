var _ = require('lodash');

(function(_, module) {

  var Photo = function(data, flickr) {

    _.extend(this, data);
    this.subscriptions = [];
    this.flickr = flickr;

    this.update = function() {
      if (this.flickr) {
        this.flickr = flickr;

        var me = this;

        flickr.photos.getInfo({ photo_id: data.id }, function(a, data) {
          me.description = data.photo.description._content;
          me.trigger();
        });
      }
    };

    this.subscribe = function(func) {
      if (this.subscriptions.indexOf(func) == -1) {
        this.subscriptions.push(func);
      }
    };

    this.trigger = function() {
      this.subscriptions.forEach(function(subscription) { subscription.apply(); });
    };

  };

  module.exports = Photo;

}(_, module));
