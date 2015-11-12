var React = require('react'),
    PhotoTag = require('./PhotoTag.jsx');


(function(React, PhotoTag, module, undefined) {
  module.exports = React.createClass({

    // Lifecycle

    render: function() {
      var self = this;
      return (
        <div className='tags'>
          {(this.props.tags || []).map(function(tag) {
            return [
              <PhotoTag key={tag} tag={tag} searchQuery={self.props.searchQuery} />,
              " "
            ];
          })}
        </div>
      );
    }

  });
}(React, PhotoTag, module));
