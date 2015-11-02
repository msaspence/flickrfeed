var React = require('react'),
    PhotoTag = require('./PhotoTag.jsx');


(function(React, module, undefined) {
  module.exports = React.createClass({

    render: function() {
      var self = this;
      tags = (this.props.tags || []).map(function(tag) {
        return [<PhotoTag key={tag} tag={tag} searchQuery={self.props.searchQuery} setSearchQuery={self.props.setSearchQuery} />, " "];
      });

      return (
        <div className='tags'>
          {tags}
        </div>
      );
    }

  });
}(React, module));
