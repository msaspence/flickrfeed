var React    = require('react'),
    ReactDOM = require('react-dom'),
    _        = require('lodash'),
    App      = require('./components/App.jsx'),
    Feed     = require('./services/Feed.js');

(function(React, ReactDOM, _) {

  feed = new Feed();
  feed.update();

  var render = function() {
    ReactDOM.render(<App feed={feed}/>, document.getElementById('app'));
  };
  render();

}(React, ReactDOM, _));
