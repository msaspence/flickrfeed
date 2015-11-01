var React = require('react'),
    Header = require('./Header.jsx'),
    Photos = require('./Photos.jsx'),
    Feed     = require('../services/Feed.js');



(function(React, module, undefined) {

  module.exports = React.createClass({

    getInitialState: function() {
      return { previousSearchQuery: null };
    },

    getDefaultProps: function() {
      return {
        feed: new Feed()
      };
    },

    componentWillReceiveProps: function (nextProps) {
      this.setState({ previousSearchQuery: this.props.params.searchQuery });
    },

    render: function() {
      if (this.state.previousSearchQuery !== this.props.params.searchQuery) {
        this.props.feed.update(this.props.params.searchQuery);
      }

      return (
        <div className="container">
          <Header text="Flickr Photo Stream" />
          <Photos feed={this.props.feed} />
        </div>
      );
    }

  });

}(React, module));
