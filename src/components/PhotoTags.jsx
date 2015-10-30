var React = require('react'),
    PhotoTag = require('./PhotoTag.jsx');


(function(React, module, undefined) {
  module.exports = React.createClass({

    render: function() {
      tags = (this.props.tags || []).map(function(tag) {
        return [<PhotoTag key={tag.tag} tag={tag.tag} raw={tag.raw} />, " "];
      });

      return (
        <div className='tags'>
          {tags}
        </div>
      );
    }

  });
}(React, module));
