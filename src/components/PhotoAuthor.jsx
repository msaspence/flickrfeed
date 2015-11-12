var React = require('react'),
    Link  = require('react-router/lib/Link');

(function(React, Link, module, undefined) {
  module.exports = React.createClass({

    // Lifecycle

    render: function() {
      return (
        <h5 className='author'>
          by <Link to={this.to()} ref="author">{this.props.owner_name}</Link>
        </h5>
      );
    },

    // Derivers

    to: function() {
      return '/search/owner:'+this.props.owner;
    }

  });
}(React, Link, module));
