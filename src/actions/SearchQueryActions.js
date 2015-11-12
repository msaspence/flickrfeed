var dispatcher = require('../dispatcher');

module.exports = {

  set: function(query) {
    dispatcher.dispatch({
      type: 'SET_QUERY',
      query: query
    });
  }

};
