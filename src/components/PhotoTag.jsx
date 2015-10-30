var React = require('react');

(function(React, module, undefined) {
  module.exports = React.createClass({

    render: function() {
      var href = 'https://www.flickr.com/search/?tags='+this.props.tag;
      return (
        <a href={href} target='_blank' className='tag label label-default'>{this.props.raw}</a>
      );
    }

  });
}(React, module));
