var React         = require('react'),
    ReactDOM      = require('react-dom'),
    Router        = require('react-router/lib/Router'),
    Route         = require('react-router/lib/Route'),
    history       = require('history').createHistory(),
    ReactDOM      = require('react-dom'),
    _             = require('lodash'),
    App           = require('./components/App.jsx');
    E404          = require('./components/E404.jsx');

(function(React, ReactDOM, _) {

  var render = function() {
    ReactDOM.render(<Router history={history}>
      <Route path="/" component={App}>
        <Route path="/search/:searchQuery" component={App}/>
      </Route>
      <Route path="/*" component={E404}/>
    </Router>, document.getElementById('app'));
  };
  render();

}(React, ReactDOM, _));
