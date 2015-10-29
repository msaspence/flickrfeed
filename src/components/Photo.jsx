var React = require('react');
    PhotoImage = require('./PhotoImage.jsx');

(function(React, module, undefined) {
  module.exports = React.createClass({

    render: function() {
      return (
        <div className="photo" data-id={this.props.photo.id}>
          <PhotoImage photo={this.props.photo} size='n' />
          {this.props.photo.title}
        </div>
      );
    }

  });
}(React, module));
