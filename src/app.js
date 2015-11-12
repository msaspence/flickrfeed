var ReactDOM = require('react-dom'),
    routes   = require('./routes'),
    Router   = require('react-router');

(function(ReactDOM, Router, routes, undefined) {

  ReactDOM.render(
    routes,
    document.getElementById('app')
  );

}(ReactDOM, Router, routes));
