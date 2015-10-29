var React = require('react'),
    Header = require('./Header.jsx'),
    Photos = require('./Photos.jsx');

(function(React, module, undefined) {

  module.exports = React.createClass({

    render: function() {
      return (
        <div className="container">
          <Header text="Flickr Photo Stream" />
          <Photos feed={this.props.feed} />
        </div>
      );
    }

  });

}(React, module));
