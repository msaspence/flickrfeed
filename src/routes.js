// routes.js
var React    = require('react'),
    history  = require('history').createHistory(),
    Router   = require('react-router/lib/Router'),
    Route    = require('react-router/lib/Route'),
    App      = require('./components/App.jsx');
    E404     = require('./components/E404.jsx');

(function(React, Router, Route, App, E404, module, undefined) {

  var routes = (
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/search/:searchQuery" component={App}/>
      </Route>
      <Route path="/*" component={E404}/>
    </Router>
  );

  module.exports = routes;

})(React, Router, Route, App, E404, module);
