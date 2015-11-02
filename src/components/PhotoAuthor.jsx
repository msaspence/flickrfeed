var React = require('react');

(function(React, module, undefined) {
  module.exports = React.createClass({

    render: function() {
      var href = 'https://www.flickr.com/people/'+this.props.owner;
      return (
        <h5 className='author'>
          by <a href={href} target="_blank" ref="author" onClick={this.onClick}>{this.props.owner_name}</a>
        </h5>
      );
    },

    onClick: function(event) {
      event.preventDefault();
      this.props.setSearchQuery('owner:'+this.props.owner);
    }

  });
}(React, module));
