var React = require('react'),
    _          = require('lodash'),
    Photo = require('./Photo.jsx');

window.photos = [];

(function(React, _, module, undefined) {
  module.exports = React.createClass({

    getInitialState: function() {
      return {
        photos: (this.props.feed && this.props.feed.photos) || [],
        loading: true
      };
    },

    componentDidMount: function() {
      if (this.props.feed) {
        this.props.feed.subscribe('update', _.bind(this.photosUpdated, this));
      }
    },

    photosUpdated: function() {
      this.setState({
        loading: false,
        photos: this.props.feed.photos
      });
    },

    render: function() {
      var photos;

      if (this.state.loading) {
        photos = <div className="loading"><p className='text'>Loading...</p></div>;
      } else if(this.state.photos.length > 0) {
        photos = this.state.photos.map(function (photo) {
          return <Photo photo={photo} key={photo.id}/>;
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
}(React, _, module));
