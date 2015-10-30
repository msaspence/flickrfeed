var React = require('react');

(function(React, module, undefined) {
  module.exports = React.createClass({

    render: function() {
      var href = 'https://www.flickr.com/people/'+this.props.owner_id;
      return (
        <h5 className='author'>
          by <a href={href}>{this.props.owner}</a>
        </h5>
      );
    }

  });
}(React, module));
