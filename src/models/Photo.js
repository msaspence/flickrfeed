var _ = require('lodash');

(function(_, module, undefined) {

  var Photo = function(data) {

    _.extend(this, data);
    if (this.tags) this.tags = this.tags.split(' ');
    if (this.description) this.description = this.description._content;

  };

  module.exports = Photo;

}(_, module));
