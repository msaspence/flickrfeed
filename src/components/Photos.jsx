var React = require('react'),
    Photo = require('./Photo.jsx');

(function(React, module, undefined) {
  module.exports = React.createClass({

    getInitialState: function() {
      return {
        photos: (this.props.feed && this.props.feed.photos) || []
      };
    },

    componentWillMount: function() {
      if (this.props.feed) {
        this.props.feed.subscribe('update', this.photosUpdated);
      }
    },

    photosUpdated: function() {
      this.setState({
        photos: this.props.feed.photos
      });
    },

    render: function() {
      var photos;

      if (this.state.photos.length > 0) {
        photos = this.state.photos.map(function (photo) {
          return <Photo photo={photo} />;
        });
      } else {
        photos = <div className="empty"><p>There are no photos to see here!</p></div>;
      }

      return (
        <section className="photos">
          {photos}
        </section>
      );
    }

  });
}(React, module));
