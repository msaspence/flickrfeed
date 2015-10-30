var React = require('react'),
    sanitizeHtml = require('sanitize-html');

(function(React, module, undefined) {
  module.exports = React.createClass({

    render: function() {
      cleanDescription = sanitizeHtml(this.props.description, {
        allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'p' ],
        allowedAttributes: { 'a': [ 'href' ] }
      });
      cleanDescription = cleanDescription.replace(/<a/g, '<a target="_blank"');
      return (
        <div className='description' dangerouslySetInnerHTML={{__html: cleanDescription}} />
      );
    }

  });
}(React, module));
