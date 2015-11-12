require('../helper.js')

describe('Search', function() {

  var Search= require('../../src/components/Search.jsx'),
      search,
      node;

  render = function() {
    search = TestUtils.renderIntoDocument(
      <Search searchQuery="my search query" />
    );
    search.history = {};
    search.history.pushState = sinon.spy();
    node = ReactDOM.findDOMNode(search)
  };

  describe('#render()', function () {

    it('renders the input and button', function () {
      render();
      expect(node.querySelector("input[type=search]").value).to.equal("my search query");
      expect(node.querySelector("button").textContent).to.equal("Search");
    });

  });

  describe('#onButtonClick()', function () {
    it("sets the search query", function() {
      render();
      TestUtils.Simulate.click(search.refs.button);
      expect(search.history.pushState).to.have.been.calledWith(null, '/search/my%20search%20query');
    });
  });

  describe('#onInputChange()', function () {
    it("sets the search query", function() {
      render();
      TestUtils.Simulate.change(search.refs.input, { target: { value: 'new search query' } });
      TestUtils.Simulate.click(search.refs.button);
      expect(search.history.pushState).to.have.been.calledWith(null, '/search/new%20search%20query');
    });
  });

  describe('#onKeyPress()', function () {
    it("updates the state", function() {
      render();
      TestUtils.Simulate.change(search.refs.input, { target: { value: 'new search query' } });
      expect(search.refs.input.value).to.equal('new search query');
    });
  });

  describe('#onClear()', function () {
    it("updates the state", function() {
      render();
      TestUtils.Simulate.click(search.refs.clear);
      expect(search.refs.input.value).to.equal('');
      expect(search.history.pushState).to.have.been.calledWith(null, '/');
    });
  });

});
