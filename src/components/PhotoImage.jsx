var React = require('react');

(function(React, module, undefined) {
  module.exports = React.createClass({

    render: function() {
      var src = "https://farm"+this.props.photo.farm+".staticflickr.com/"+this.props.photo.server+"/"+this.props.photo.id+"_"+this.props.photo.secret;
      if(this.props.size) src = src + "_" + this.props.size;
      src = src+".jpg";
      return (
        <img src={src} className="image" />
      );
    }

  });
}(React, module));
