var React    = require('react'),
    ReactDOM = require('react-dom'),
    Blazy    = require('blazy'),
    _        = require('lodash'),
    Loading  = require('./Loading.jsx'),
    Photo    = require('./Photo.jsx');

window.photos = [];

(function(React, ReactDOM, _, Blazy, module, undefined) {
  module.exports = React.createClass({

    getInitialState: function() {
      return {
        photos: (this.props.feed && this.props.feed.photos) || []
      };
    },

    componentWillMount: function() {
      if (this.props.feed) {
        this.props.feed.subscribe('update', _.bind(this.photosUpdated, this));
      }
    },

    componentDidMount: function() {
      this.blazy = new Blazy({
        selector: '.blazy',
        success: function(ele) {
          p = ele.parentElement;
          p.setAttribute('class', p.getAttribute('class').replace(/loading/, ""));
        }
      });
    },

    componentDidUpdate: function() {
      this.blazy.revalidate();
    },

    photosUpdated: function() {
      this.setState({
        photos: this.props.feed.photos
      });
    },

    render: function() {
      var photos;

      classString = this.props.feed.loadingFirst ? "photos loading" : "photos";
      var self = this;
      if(this.state.photos.length > 0) {
        photos = _.chunk(this.state.photos, 6).map(function(row, i) {
          return (
            <div className="row" key={i}>
              {row.map(function (photo, j) {
                return (
                  <div className="col-sm-3 col-md-2" key={j}>
                    <Photo photo={photo} key={photo.id} searchQuery={self.props.searchQuery} setSearchQuery={self.props.setSearchQuery} />
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
        length: 10,
        speed: 1.5,
        scale: 0.5,
        radius: 15,
        color: '#888',
        position: 'absolute'
      };
    },

    bottom: function() {
      return ReactDOM.findDOMNode(this).getBoundingClientRect().bottom;
    }

  });
}(React, ReactDOM, _, Blazy, module));
