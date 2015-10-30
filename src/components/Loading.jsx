var React      = require('react'),
    ReactDOM   = require('react-dom'),
    Spinner    = require('spin');

(function(React, module, undefined) {
  module.exports = React.createClass({

    getDefaultProps: function() {
      return {
        spinner: {
          position: 'relative'
        }
      };
    },

    render: function() {
      return (
        <div className="loading">
          <div className="text">Loading...</div>
        </div>
      );
    },

    componentDidMount: function() {
      this.spinner = new Spinner(this.props.spinner);
      var target = ReactDOM.findDOMNode(this);

      // clear out any other spinners from previous renders
      this.spinner.spin();
      target.insertBefore(this.spinner.el, target.firstChild);
    }

  });
}(React, module));
