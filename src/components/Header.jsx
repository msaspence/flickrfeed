var React = require('react');

(function(React, module, undefined) {
  module.exports = React.createClass({

    render: function() {
      return (
        <div className="page-header">
          <h1>{this.props.text}</h1>
        </div>
      );
    }

  });
}(React, module));
