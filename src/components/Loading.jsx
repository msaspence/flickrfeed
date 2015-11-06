var React      = require('react'),
    ReactDOM   = require('react-dom'),
    Spinner    = require('spin');

(function(React, ReactDOM, Spinner, module, undefined) {
  module.exports = React.createClass({

    // Configuration

    getDefaultProps: function() {
      return {
        spinner: {
          position: 'relative'
        }
      };
    },

    // Lifecycle

    render: function() {
      return (
        <div className="loading-indicator">
          <div className="text">Loading...</div>
        </div>
      );
    },

    componentDidMount: function() {
      // Add a Spin.js spinner
      this.spinner = new Spinner(this.props.spinner);
      var target = ReactDOM.findDOMNode(this);
      this.spinner.spin();
      target.insertBefore(this.spinner.el, target.firstChild);
    }

  });

}(React, ReactDOM, Spinner, module));
