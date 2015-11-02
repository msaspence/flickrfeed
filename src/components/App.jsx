var React    = require('react'),
    ReactDOM = require('react-dom'),
    _        = require('lodash'),
    Header   = require('./Header.jsx'),
    Photos   = require('./Photos.jsx'),
    Feed     = require('../services/Feed.js'),
    OnScroll = require("react-window-mixins").OnScroll,
    History  = require('react-router/lib/History');


(function(React, ReactDOM, _, module, undefined) {

  module.exports = React.createClass({

    mixins: [ History, OnScroll],

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

    setSearchQuery: function(searchQuery) {
      this.history.pushState(null, searchQuery === "" ? '/' : '/search/'+encodeURIComponent(searchQuery));
    },

    componentWillMount: function() {
      if (this.props.feed) {
        // If we've just loaded some photos in we
        // don't want to wait for the next scroll
        // event if another batch is required
        this.props.feed.subscribe('update', _.bind(this.onScroll, this));
      }
    },

    render: function() {
      if (this.state.previousSearchQuery !== this.props.params.searchQuery) {
        this.props.feed.update(this.props.params.searchQuery);
      }
      return (
        <div className="container">
          <Header text="Flickr Photo Stream"
                  searchQuery={this.props.params.searchQuery}
                  setSearchQuery={this.setSearchQuery} />
          <Photos feed={this.props.feed}
                  searchQuery={this.props.params.searchQuery}
                  setSearchQuery={this.setSearchQuery}
                  ref='photos' />
        </div>
      );
    },

    onScroll: function(event) {
      if (this.refs.photos) {
        bottom = this.refs.photos.bottom();
        if (bottom-5000 < window.innerHeight) {
          this.props.feed.loadMore();
        }
      }
    }

  });

}(React, ReactDOM, _, module));
