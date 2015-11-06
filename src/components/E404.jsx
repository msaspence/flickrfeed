var React = require('react');

(function(React, module, undefined) {
  module.exports = React.createClass({

    // Lifecycle

    render: function() {
      return (
        <div className="container">
          <div className="page-header">
            <h4>Error 404</h4>
            <h1>Page Not Found</h1>
          </div>
        </div>
      );
    }

  });
}(React, module));
