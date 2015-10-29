var React    = require('react'),
    ReactDOM = require('react-dom'),
    _        = require('lodash');

(function(React, ReactDOM, _) {
  var App = require('./components/App.jsx');

  var render = function() {
    ReactDOM.render(React.createElement(App), document.getElementById('app'));
  };
  render();
}(React, ReactDOM, _));
