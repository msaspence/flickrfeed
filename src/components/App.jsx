var React            = require('react'),
    ReactDOM         = require('react-dom'),
    _                = require('lodash'),
    Header           = require('./Header.jsx'),
    Photos           = require('./Photos.jsx'),
    SearchQueryStore = require('../stores/SearchQueryStore.js'),
    PhotosStore      = require('../stores/PhotosStore.js'),
    OnScroll         = require("react-window-mixins").OnScroll;


(function(React, ReactDOM, _, Header, Photos, PhotosStore, OnScroll, module, undefined) {

  module.exports = React.createClass({

    mixins: [ OnScroll ],

    // Lifecycle

    componentWillReceiveProps: function (nextProps) {
      SearchQueryStore.set(nextProps.params.searchQuery);
    },

    render: function() {
      return (
        <div className="container">
          <Header text="Flickr Photo Stream"
                  searchQuery={SearchQueryStore.get()} />
          <Photos searchQuery={SearchQueryStore.get()}
                  photos={PhotosStore.photos}
                  loading={PhotosStore.loadingFirst}
                  ref='photos' />
        </div>
      );
    },

    componentDidMount: function() {
      PhotosStore.on('updated', this.storeUpdated);
      SearchQueryStore.on('changed', this.storeUpdated);
      SearchQueryStore.set(this.props.params.searchQuery);
    },

    componentWillUnmount: function() {
      SearchQueryStore.off('changed', this.storeUpdated);
      PhotosStore.off('updated', this.storeUpdated);
    },

    // Callbacks

    storeUpdated: function() {
      this.forceUpdate();
      this.onScroll();
    },

    // Events

    onScroll: function(event) {
      if (this.refs.photos) {
        bottom = this.refs.photos.bottom();
        if (bottom-5000 < window.innerHeight) {
          var self = this;
          PhotosStore.loadMore();
        }
      }
    }

  });

}(React, ReactDOM, _, Header, Photos, PhotosStore, OnScroll, module));
