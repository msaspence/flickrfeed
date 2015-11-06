var React = require('react');

(function(React, module, undefined) {
  module.exports = React.createClass({

    // Lifecycle

    render: function() {
      return (
        <h5 className='author'>
          by <a href={this.href()} target="_blank" ref="author" onClick={this.onClick}>{this.props.owner_name}</a>
        </h5>
      );
    },

    // Derivers

    href: function() {
      return 'https://www.flickr.com/people/'+this.props.owner;
    },

    // Events

    onClick: function(event) {
      event.preventDefault();
      this.props.setSearchQuery('owner:'+this.props.owner);
    }

  });
}(React, module));
