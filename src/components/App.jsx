var React = require('react');

(function(React, module, undefined) {

  var Header = require('./Header.jsx'),
      Photos = require('./Photos.jsx');

  module.exports = React.createClass({

    render: function() {
      return (
        <div className="container">
          <Header text="Flickr Photo Stream" />
        </div>
      );
    }

  });

}(React, module));
