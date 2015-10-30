var React = require('react');

(function(React, module, undefined) {
  module.exports = React.createClass({

    render: function() {
      var href = 'https://www.flickr.com/photos/'+this.props.photo.owner+'/'+this.props.photo.id;
      return (
        <h4 className='title'>
          <a href={href}>{this.props.photo.title}</a>
        </h4>
      );
    }

  });
}(React, module));
