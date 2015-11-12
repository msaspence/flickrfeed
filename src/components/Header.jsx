var React  = require('react'),
    Search = require('./Search.jsx');

(function(React, Search, module, undefined) {
  module.exports = React.createClass({

    // Lifecycle

    render: function() {
      return (
        <div className="page-header">
          <Search searchQuery={this.props.searchQuery} />
          <h1>{this.props.text}</h1>
        </div>
      );
    }

  });
}(React, Search, module));
