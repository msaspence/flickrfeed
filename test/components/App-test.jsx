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


  var render = function(params) {
    shallowRenderer = TestUtils.createRenderer();

    shallowRenderer.render(
      <App params={params || {}} feed={feed} />
    );
    renderedDOM = shallowRenderer.getRenderOutput();
  };

  describe('#render', function () {

    it("renders application Header", function () {
      render();
      expect(TestUtils.isElementOfType(renderedDOM.props.children[0], Header)).to.be.true;
    });

    it("renders the Photo component", function () {
      render();
      expect(TestUtils.isElementOfType(renderedDOM.props.children[1], Photos)).to.be.true;
    });

  });

  describe('#componentWillReceiveProps', function () {

    context("when searchQuery has changed", function() {

      var params = { searchQuery: 'old search query'};

      it("updates the photo feed", sinon.test(function() {
        render(params);
        var mock = this.mock(feed)
          .expects('update')
          .once()
          .withArgs("new search query");
        shallowRenderer._instance._instance.componentWillReceiveProps({ params: { searchQuery: "new search query" } });
        mock.verify();
      }));

    });

    context("when searchQuery has changed", function() {
      var params = { searchQuery: 'same search query'};

      it("doesn't update the photo feed", sinon.test(function() {
        render(params);
        var mock = this.mock(feed)
          .expects('update')
          .never();
        params.searchQuery = "same search query";
        shallowRenderer._instance._instance.componentWillReceiveProps({ params: { searchQuery: "same search query" } });
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

  describe('#onScroll', function() {
    
    beforeEach(function() {
      window.innerHeight = 1000;
    });

    context("we need some more photos", function() {
      it("loads some more photos",  sinon.test(function() {
        feed.loadMore = this.spy();
        this.stub(Photos.prototype, "bottom").returns(123);
        render();
        expect(feed.loadMore).to.not.have.been.called;
      }));
    });

    context("when don't need more photos", function() {
      it("doesn't load any", sinon.test(function() {
        this.stub(Photos.prototype, "bottom").returns(6123);
        feed.loadMore = this.spy();
        render();
        expect(feed.loadMore).to.not.have.been.called;
      }));
    });
  });

  describe('#componentWillMount', function() {
    it("subscribes to feed updates", sinon.test(function() {
      feed.subscribe = this.spy();
      render();
      expect(feed.subscribe).to.have.been.calledWith('update')
    }));
  });


});
