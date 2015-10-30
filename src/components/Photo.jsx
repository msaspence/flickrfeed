var React            = require('react'),
    _                = require('lodash'),
    Loading      = require('./Loading.jsx'),
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
      var classString = "photo thumbnail";
      if (this.state.loading) classString = classString+" loading";
      return (
        <div className={classString} data-id={this.props.photo.id}>
          <PhotoImage farm={this.props.photo.farm} server={this.props.photo.server} photo_id={this.props.photo.id} photo_secret={this.props.photo.secret} owner_id={this.props.photo.owner} size='n' />
          <div className="caption">
            <PhotoTitle photo_id={this.props.photo.id} title={this.props.photo.title} owner={this.props.photo.owner} />
            <PhotoAuthor key="author" owner_id={this.props.photo.owner} owner={this.props.photo.owner_display} />
            <PhotoDescription key="description" description={this.props.photo.description} />
            <PhotoTags key="tags" tags={this.props.photo.tags} />
          </div>
          <Loading spinner={this.spinnerOptions()} />
        </div>
      );
    },

    spinnerOptions: function() {
      return {
        lines: 11,
        length: 4,
        width: 2,
        radius: 5,
        color: '#888',
        position: 'absolute'
      };
    }

  });
}(React, _, module));
