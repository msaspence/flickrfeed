var _ = require('lodash');

(function(_, module) {

  var Photo = function(data, flickr) {

    _.extend(this, data);
    this.subscriptions = [];
    this.flickr = flickr;
    if (this.tags) this.tags = this.tags.split(' ');
    if (this.description) this.description = this.description._content;

  };

  module.exports = Photo;

}(_, module));
