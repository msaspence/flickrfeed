var React    = require('react');

(function(React, module, undefined) {
  module.exports = React.createClass({

    // Lifecycle

    render: function() {
      return (
        <a target="_blank" href={this.href()} className="image loading">
          <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
               data-src={this.src()}
               className="blazy" />
        </a>
      );
    },

    // Derivers

    src: function() {
      r = "https://farm"+this.props.farm+".staticflickr.com/"+this.props.server+"/"+this.props.photo_id+"_"+this.props.photo_secret;
      if(this.props.size) r += "_" + this.props.size;
      r += ".jpg";
      return r;
    },

    href: function() {
      return "https://www.flickr.com/photos/"+this.props.owner+"/"+this.props.photo_id;
    }

  });
}(React, module));
