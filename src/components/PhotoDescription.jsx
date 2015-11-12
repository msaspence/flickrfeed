var React        = require('react'),
    sanitizeHtml = require('sanitize-html');

(function(React, sanitizeHtml, module, undefined) {
  module.exports = React.createClass({

    render: function() {
      return (
        <div className='description' dangerouslySetInnerHTML={{__html: this.cleanDescription()}} />
      );
    },

    // Derivers

    cleanDescription: function() {
      r = sanitizeHtml(this.props.description, {
        allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'p' ],
        allowedAttributes: { 'a': [ 'href' ] }
      });
      r = r.replace(/<a/g, '<a target="_blank"');
      return r;
    }

  });
}(React, sanitizeHtml, module));
