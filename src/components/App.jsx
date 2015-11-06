var React    = require('react'),
    ReactDOM = require('react-dom'),
    _        = require('lodash'),
    Header   = require('./Header.jsx'),
    Photos   = require('./Photos.jsx'),
    Feed     = require('../services/Feed.js'),
    OnScroll = require("react-window-mixins").OnScroll,
    History  = require('react-router/lib/History');


(function(React, ReactDOM, _, Header, Photos, Feed, OnScroll, History, module, undefined) {

  module.exports = React.createClass({

    mixins: [ History, OnScroll ],

    // Application State

    getInitialState: function() {
      return {
        previousSearchQuery: null,
        searchQuery: null
      };
    },

    getDefaultProps: function() {
      return {
        feed: new Feed()
      };
    },

    // Lifecycle

    componentWillReceiveProps: function (nextProps) {
      this.setState({
        previousSearchQuery: this.props.params.searchQuery
      });
      if (nextProps.params.searchQuery != this.props.params.searchQuery) {
        this.props.feed.update(nextProps.params.searchQuery);
      }
    },

    componentWillMount: function() {
      if (this.props.feed) {
        this.props.feed.subscribe('update', _.bind(this.photosUpdated, this));
        this.props.feed.update(this.props.params.searchQuery);
      }
    },

    render: function() {
      if (this.state.previousSearchQuery != this.props.params.searchQuery) {
        searchQuery = this.props.params.searchQuery;
      } else {
        searchQuery = undefined;
      }
      return (
        <div className="container">
          <Header text="Flickr Photo Stream"
                  searchQuery={searchQuery}
                  setSearchQuery={this.setSearchQuery} />
          <Photos searchQuery={this.props.params.searchQuery}
                  setSearchQuery={this.setSearchQuery}
                  photos={this.props.feed.photos}
                  loading={this.props.feed.loadingFirst}
                  ref='photos' />
        </div>
      );
    },

    // Callbacks

    photosUpdated: function() {
      this.forceUpdate();
      this.onScroll();
    },

    // Events

    setSearchQuery: function(searchQuery) {
      this.history.pushState(null, searchQuery === "" ? '/' : '/search/'+encodeURIComponent(searchQuery));
    },

    onScroll: function(event) {
      if (this.refs.photos) {
        bottom = this.refs.photos.bottom();
        if (bottom-5000 < window.innerHeight) {
          var self = this;
          self.props.feed.loadMore();
        }
      }
    }

  });

}(React, ReactDOM, _, Header, Photos, Feed, OnScroll, History, module));
