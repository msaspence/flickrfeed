var React = require('react');

(function(React, module, undefined) {
  module.exports = React.createClass({

    render: function() {
      return (
        <div className="photo" data-id={this.props.photo.id} key={this.props.photo.id}>
          {this.props.photo.title}
        </div>
      );
    }

  });
}(React, module));
