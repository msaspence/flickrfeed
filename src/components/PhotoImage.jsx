var React = require('react');

(function(React, module, undefined) {
  module.exports = React.createClass({

    render: function() {
      var src = "https://farm"+this.props.farm+".staticflickr.com/"+this.props.server+"/"+this.props.photo_id+"_"+this.props.photo_secret;
      if(this.props.size) src = src + "_" + this.props.size;
      src = src+".jpg";
      var href = "https://www.flickr.com/photos/"+this.props.owner_id+"/"+this.props.photo_id;

      return (
        <a target="_blank" href={href}>
          <img src={src} className="image" />
        </a>
      );
    }

  });
}(React, module));
