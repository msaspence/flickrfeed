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
          <PhotoImage farm={this.props.photo.farm} server={this.props.photo.server} photo_id={this.props.photo.id} photo_secret={this.props.photo.secret} size='n' />
          <PhotoTitle photo_id={this.props.photo.id} title={this.props.photo.title} owner={this.props.photo.owner} />
          {
            (this.state.loading && "Loading...") ||
            (this.props.photo.description)
          }
        </div>
      );
    }

  });
}(React, _, module));
