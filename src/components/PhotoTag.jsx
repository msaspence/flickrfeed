var React              = require('react'),
    Link               = require('react-router/lib/Link');

(function(React, Link, module, undefined) {
  module.exports = React.createClass({

    // Lifecycle

    render: function() {
      return (
        <Link to={this.to()} ref='tag' className={this.className()}>{this.props.tag}</Link>
      );
    },

    // Derivers

    className: function() {
      r = "tag label";
      if (this.props.searchQuery && this.props.searchQuery.match(new RegExp("( |^)tag:" + this.props.tag+"( |$)"))) {
        r += ' label-primary';
      } else {
        r += ' label-default';
      }
      return r;
    },

    to: function() {
      return '/search/tag:'+this.props.tag;
    }

  });
}(React, Link, module));
