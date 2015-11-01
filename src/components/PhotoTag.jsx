var React = require('react');

(function(React, module, undefined) {
  module.exports = React.createClass({

    render: function() {
      var href = 'https://www.flickr.com/search/?tags='+this.props.tag;
      var labelColor;
      if (this.props.searchQuery && this.props.searchQuery.match(new RegExp("( |^)tag:"+this.props.tag+"( |$)"))) {
        labelColor = 'label-primary';
      } else {
        labelColor = 'label-default';
      }
      return (
        <a href={href} ref='tag' onClick={this.onClick} target='_blank' className={'tag label '+labelColor}>{this.props.raw}</a>
      );
    },

    onClick: function(event) {
      event.preventDefault();
      this.props.setSearchQuery('tag:'+this.props.tag);
    }

  });
}(React, module));
