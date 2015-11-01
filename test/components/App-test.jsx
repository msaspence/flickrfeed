require('../helper.js')
var App = require('../../src/components/App.jsx'),
    Header = require('../../src/components/Header.jsx'),
    Photos = require('../../src/components/Photos.jsx'),
    Feed   = require('../../src/services/Feed.js'),
    app,
    shallowRenderer;

describe('App', function() {

  var params = {},
      app,
      feed = new Feed();


  var render = function() {
    shallowRenderer = TestUtils.createRenderer();

    shallowRenderer.render(
      <App params={params} feed={feed} />
    );
    renderedDOM = shallowRenderer.getRenderOutput();
  };

  describe('#render()', function () {

    it("renders application Header", function () {
      render();
      expect(TestUtils.isElementOfType(renderedDOM.props.children[0], Header)).to.be.true;
    });

    it("renders the Photo component", function () {
      render();
      expect(TestUtils.isElementOfType(renderedDOM.props.children[1], Photos)).to.be.true;
    });

    context("when searchQuery has changed", function() {

      params = { searchQuery: 'old search query'};

      it("updates the photo feed", sinon.test(function() {
        var mock = this.mock(feed)
          .expects('update')
          .twice();
        render();
        params.searchQuery = "new search query";
        shallowRenderer._instance._instance.forceUpdate();
        mock.verify();
      }));

    });

    context("when searchQuery has changed", function() {
      params = { searchQuery: 'same search query'};

      it("doesn't update the photo feed", sinon.test(function() {
        render();
        var mock = this.mock(feed)
          .expects('update')
          .never();
        params.searchQuery = "same search query";
        shallowRenderer._instance._instance.componentWillReceiveProps({});
        shallowRenderer._instance._instance.forceUpdate();
        mock.verify();
      }));
    });

  });

  describe('#setSearchQuery', function() {
    context("when the search query is empty", function() {
      it("navigations to /",  sinon.test(function() {
        render();
        app = shallowRenderer._instance._instance;
        app.history = {};
        app.history.pushState = this.spy();
        app.setSearchQuery("");
        expect(app.history.pushState).to.have.been.calledWith(null, "/");
      }));
    });

    context("when the search query is something", function() {
      it("navigations to /search/query", sinon.test(function() {
        render();
        app = shallowRenderer._instance._instance;
        app.history = {};
        app.history.pushState = this.spy();
        app.setSearchQuery("/query");
        expect(app.history.pushState).to.have.been.calledWith(null, "/search/%2Fquery");
      }));
    });
  });

});
