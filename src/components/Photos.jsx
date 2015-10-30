var React    = require('react'),
    _        = require('lodash'),
    Loading  = require('./Loading.jsx'),
    Photo    = require('./Photo.jsx');

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

      classString = this.state.loading ? "photos loading" : "photos";

      if(this.state.photos.length > 0) {
        photos = _.chunk(this.state.photos, 6).map(function(row, i) {
          return (
            <div className="row" key={i}>
              {row.map(function (photo, j) {
                return (
                  <div className="col-sm-3 col-md-2" key={j}>
                    <Photo photo={photo} key={photo.id}/>
                  </div>
                );
              })}
            </div>
          );
        });
      } else {
        photos = <div className="empty"><p>There are no photos to see here!</p></div>;
      }

      return (
        <section className={classString}>
          <div className="index">
            {photos}
          </div>
          <Loading spinner={this.spinnerOptions()} />
        </section>
      );
    },

    spinnerOptions: function() {
      return {
        lines: 13,
        lenght: 28,
        scale: 0.5,
        radius: 15,
        color: '#888',
        position: 'absolute'
      };
    }

  });
}(React, _, module));
