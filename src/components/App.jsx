var React = require('react'),
    Header = require('./Header.jsx'),
    Photos = require('./Photos.jsx'),
    Feed     = require('../services/Feed.js');



(function(React, module, undefined) {

  module.exports = React.createClass({

    getDefaultProps: function() {
      return {
        feed: new Feed()
      };
    },

    componentWillMount: function() {
      this.props.feed.update();
    },

    render: function() {
      return (
        <div className="container">
          <Header text="Flickr Photo Stream" />
          <Photos feed={this.props.feed} />
        </div>
      );
    }

  });

}(React, module));
