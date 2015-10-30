var React = require('react'),
    PhotoImage = require('./PhotoImage.jsx'),
    _          = require('lodash'),
    PhotoTitle = require('./PhotoTitle.jsx');

(function(React, _, module, undefined) {
  module.exports = React.createClass({

    getInitialState: function() {
      return {
        loading: true
      };
    },

    componentDidMount: function() {
      this.props.photo.subscribe(this.photoUpdated);
    },

    photoUpdated: function(photo) {
      this.setState({
        loading: false
      });
    },

    render: function() {
      return (
        <div className="photo" data-id={this.props.photo.id}>
          <PhotoImage photo={this.props.photo} size='n' />
          <PhotoTitle photo={this.props.photo} />
          {
            (this.state.loading && "Loading...") ||
            (this.props.photo.description)
          }
        </div>
      );
    }

  });
}(React, _, module));
