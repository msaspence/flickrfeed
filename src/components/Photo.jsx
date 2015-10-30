var React            = require('react'),
    _                = require('lodash'),
    PhotoAuthor      = require('./PhotoAuthor.jsx'),
    PhotoDescription = require('./PhotoDescription.jsx'),
    PhotoImage       = require('./PhotoImage.jsx'),
    PhotoTags        = require('./PhotoTags.jsx');
    PhotoTitle       = require('./PhotoTitle.jsx');

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
            ([
              <PhotoAuthor key="author" owner_id={this.props.photo.owner} owner={this.props.photo.owner_display} />,
              <PhotoDescription key="description" description={this.props.photo.description} />,
              <PhotoTags key="tags" tags={this.props.photo.tags} />
            ])
          }
        </div>
      );
    }

  });
}(React, _, module));
