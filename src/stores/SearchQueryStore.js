var dispatcher   = require('../dispatcher'),
    EventEmitter = require('event-emitter'),
    _            = require('lodash');

(function(EventEmitter, _, module, undefined) {

  var SearchQueryStore = EventEmitter({

    get: function() {
      return this.value;
    },

    set: function(value) {
      value = value || "";
      previousValue = this.value;
      this.value = value;
      this.emit('changed', this.get(), previousValue);
      return this.get();
    },

    onDispatch: function(value) {
      if (value.type == 'SET_QUERY') {
        this.set(value.query);
      }
    }

  });

  dispatcher.register(_.bind(SearchQueryStore.onDispatch, SearchQueryStore));

  module.exports = SearchQueryStore;

})(EventEmitter, _, module);
