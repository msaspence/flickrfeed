var React = require('react');

(function(React, module, undefined) {
  module.exports = React.createClass({

    render: function() {
      var href = 'https://www.flickr.com/photos/'+this.props.owner+'/'+this.props.photo_id;
      return (
        <h4 className='title'>
          <a href={href} target="_blank">{this.props.title}</a>
        </h4>
      );
    }

  });
}(React, module));
