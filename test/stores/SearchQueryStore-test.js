require('../helper.js')

var SearchQueryStore = require('../../src/stores/SearchQueryStore.js'),
    dispatcher       = require('../../src/dispatcher');

describe('SearchQueryStore', function() {

  describe('#get', function () {

    it("returns value", function() {
      SearchQueryStore.value = "search query";
      expect(SearchQueryStore.get()).to.equal("search query");
    });

  });

  describe('#set', function () {

    it("set the value", function() {
      SearchQueryStore.value = "search query";
      SearchQueryStore.set("new search query");
      expect(SearchQueryStore.value).to.equal("new search query");
    });

  });

  describe('#onDispatch', function () {

    context("when value type is SET_QUERY", function() {
      it("sets the value", sinon.test(function() {
        spy = this.spy(SearchQueryStore, 'set');
        SearchQueryStore.onDispatch({ type: 'SET_QUERY', query: 'new search query'})
        expect(spy).to.have.been.calledWith('new search query');
      }));
    });

    context("when value type is not SET_QUERY", function() {
      it("does nothing", sinon.test(function() {
        spy = this.spy(SearchQueryStore, 'set');
        SearchQueryStore.onDispatch({ type: 'NOT_SET_QUERY', query: 'new search query'})
        expect(spy).to.not.have.been.calledWith('new search query');
      }));
    });

  });

});
