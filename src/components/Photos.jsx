var React    = require('react'),
    ReactDOM = require('react-dom'),
    Blazy    = require('blazy'),
    _        = require('lodash'),
    Loading  = require('./Loading.jsx'),
    Photo    = require('./Photo.jsx');

window.photos = [];

(function(React, ReactDOM, _, Blazy, Loading, Photo, module, undefined) {
  module.exports = React.createClass({

    // Configuration

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

    // Lifecycle

    render: function() {
      var self = this;

      return (
        <section className={this.className()}>
          <div className="index">
            {this.photosHTML()}
          </div>
          <Loading spinner={this.spinnerOptions()} />
        </section>
      );
    },

    componentDidMount: function() {
      this.blazy = new Blazy({
        selector: '.blazy',
        offset: 1000,
        success: function(ele) {
          p = ele.parentElement;
          p.setAttribute('class', p.getAttribute('class').replace(/loading/, ""));
        }
      });
    },

    componentDidUpdate: function() {
      this.blazy.revalidate();
    },

    // Derivers

    photosHTML: function() {
      var self = this;
      if (this.hasPhotos()) {
        return (
          <div className="row">
            {this.props.photos.map(function (photo, j) {
              return (
                <div className="col-sm-3 col-md-2" key={j}>
                  <Photo photo={photo} key={photo.id} searchQuery={self.props.searchQuery} />
                </div>
              );
            })}
          </div>
        );
      } else if (!this.props.loading) {
        return (<div className="empty">
          <p>
            We couldn&apos;t find any photos to match your search!
          </p>
        </div>);
      }
    },

    className: function() {
      var r = "photos";
      if (this.props.loading) {
        r += " loading";
      } else if (!this.hasPhotos()) {
        r += " no-results";
      }
      return r;
    },

    hasPhotos: function() {
      return this.props.photos && this.props.photos.length > 0;
    },

    // Parents call

    bottom: function() {
      return ReactDOM.findDOMNode(this).getBoundingClientRect().bottom;
    }

  });
}(React, ReactDOM, _, Blazy, Loading, Photo, module));
