var React = require('react');

(function(React, module, undefined) {
  module.exports = React.createClass({


    // Lifecycle

    render: function() {
      return (
        <h4 className='title'>
          <a href={this.href()} target="_blank">{this.props.title}</a>
        </h4>
      );
    },

    // Derivers

    href: function() {
      return 'https://www.flickr.com/photos/'+this.props.owner+'/'+this.props.photo_id;
    }

  });
}(React, module));
