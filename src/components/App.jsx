var React   = require('react'),
    Header  = require('./Header.jsx'),
    Photos  = require('./Photos.jsx'),
    Feed    = require('../services/Feed.js'),
    History = require('react-router/lib/History');


(function(React, module, undefined) {

  module.exports = React.createClass({

    mixins: [ History ],

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

    render: function() {
      if (this.state.previousSearchQuery !== this.props.params.searchQuery) {
        this.props.feed.update(this.props.params.searchQuery);
      }
      return (
        <div className="container">
          <Header text="Flickr Photo Stream" searchQuery={this.props.params.searchQuery} setSearchQuery={this.setSearchQuery} />
          <Photos feed={this.props.feed} searchQuery={this.props.params.searchQuery} setSearchQuery={this.setSearchQuery} />
        </div>
      );
    }

  });

}(React, module));
