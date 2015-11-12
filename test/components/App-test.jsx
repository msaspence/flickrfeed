require('../helper.js')
var App              = require('../../src/components/App.jsx'),
    Header           = require('../../src/components/Header.jsx'),
    Photos           = require('../../src/components/Photos.jsx'),
    PhotosStore      = require('../../src/stores/PhotosStore.js'),
    SearchQueryStore = require('../../src/stores/SearchQueryStore.js'),
    app,
    shallowRenderer;

describe('App', function() {

  var params = {},
      app;

  var render = function(params) {
    if (!params) params = {};
    shallowRenderer = TestUtils.createRenderer();

    shallowRenderer.render(
      <App params={params} />
    );
    shallowRenderer._instance._instance.componentDidMount();
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

    var params = { searchQuery: 'old search query'};

    it("updates the search query store", sinon.test(function() {
      render(params);
      var mock = this.mock(SearchQueryStore)
        .expects('set')
        .once()
        .withArgs("new search query");
      shallowRenderer._instance._instance.componentWillReceiveProps({ params: { searchQuery: "new search query" } });
      mock.verify();
    }));

  });

  describe('#componentDidMount', function() {

    var params = { searchQuery: 'new search query'};

    it("subscribes to photo store and search query store updates", sinon.test(function() {
      PhotosStore.on = this.spy();
      SearchQueryStore.on = this.spy();
      SearchQueryStore.set = this.spy();
      render(params);
      expect(PhotosStore.on).to.have.been.calledWith('updated', shallowRenderer._instance._instance.storeUpdated);
      expect(SearchQueryStore.on).to.have.been.calledWith('changed', shallowRenderer._instance._instance.storeUpdated);
      expect(SearchQueryStore.set).to.have.been.calledWith('new search query');
    }));

  });

  describe('#componentWillUnmount', function() {

    it("unsubscribes to photo store and search query store updates", sinon.test(function() {
      render(params);
      PhotosStore.off = this.spy();
      SearchQueryStore.off = this.spy();
      shallowRenderer._instance._instance.componentWillUnmount();
      expect(PhotosStore.off).to.have.been.calledWith('updated', shallowRenderer._instance._instance.storeUpdated);
      expect(SearchQueryStore.off).to.have.been.calledWith('changed', shallowRenderer._instance._instance.storeUpdated);
    }));

  });

  describe('#storeUpdated', function() {

    it("unsubscribes to photo store and search query store updates", sinon.test(function() {
      render(params);
      shallowRenderer._instance._instance.forceUpdate = this.spy();
      shallowRenderer._instance._instance.onScroll = this.spy();
      shallowRenderer._instance._instance.storeUpdated();
      expect(shallowRenderer._instance._instance.forceUpdate).to.have.been.called;
      expect(shallowRenderer._instance._instance.onScroll).to.have.been.called;
    }));

  });

  describe('#onScroll', function() {

    beforeEach(function() {
      window.innerHeight = 1000;
    });

    context("we need some more photos", function() {
      it("loads some more photos",  sinon.test(function() {
        PhotosStore.loadMore = this.spy();
        this.stub(Photos.prototype, "bottom").returns(123);
        render();
        expect(PhotosStore.loadMore).to.not.have.been.called;
      }));
    });

    context("when don't need more photos", function() {
      it("doesn't load any", sinon.test(function() {
        this.stub(Photos.prototype, "bottom").returns(6123);
        PhotosStore.loadMore = this.spy();
        render();
        expect(PhotosStore.loadMore).to.not.have.been.called;
      }));
    });

  });


});
