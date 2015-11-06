var React  = require('react'),
    Link   = require('react-router/lib/Link');
    Search = require('./Search.jsx');

(function(React, Link, Search, module, undefined) {
  module.exports = React.createClass({

    // Lifecycle

    render: function() {
      return (
        <div className="page-header">
          <Search searchQuery={this.props.searchQuery} setSearchQuery={this.props.setSearchQuery} />
          <h1>{this.props.text}</h1>
        </div>
      );
    }

  });
}(React, Link, Search, module));
