var React            = require('react'),
    ReactDOM         = require('react-dom'),
    _                = require('lodash'),
    PhotoAuthor      = require('./PhotoAuthor.jsx'),
    PhotoDescription = require('./PhotoDescription.jsx'),
    PhotoImage       = require('./PhotoImage.jsx'),
    PhotoTags        = require('./PhotoTags.jsx');
    PhotoTitle       = require('./PhotoTitle.jsx');

(function(React, _, module, undefined) {
  module.exports = React.createClass({

    render: function() {
      var classString = "photo thumbnail faded-out";
      return (
        <div className={classString} ref='photo' data-id={this.props.photo.id}>
          <PhotoImage farm={this.props.photo.farm} server={this.props.photo.server} photo_id={this.props.photo.id} photo_secret={this.props.photo.secret} owner={this.props.photo.owner} size='n' />
          <div className="caption">
            <PhotoTitle photo_id={this.props.photo.id} title={this.props.photo.title} owner={this.props.photo.owner} />
            <PhotoAuthor key="author" owner={this.props.photo.owner} owner_name={this.props.photo.ownername} setSearchQuery={this.props.setSearchQuery} />
            <PhotoDescription key="description" description={this.props.photo.description} />
            <PhotoTags key="tags" tags={this.props.photo.tags} searchQuery={this.props.searchQuery} setSearchQuery={this.props.setSearchQuery} />
          </div>
        </div>
      );
    },

    componentDidMount: function() {
      var node = this.refs.photo;
      setTimeout(function() {
        node.setAttribute('class', node.getAttribute('class').replace('faded-out', ''));
      },10);
    }

  });
}(React, _, module));
