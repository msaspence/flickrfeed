require('../helper.js')

describe('Search', function() {

  var Search= require('../../src/components/Search.jsx'),
      node;

  render = function(spy) {
    search = TestUtils.renderIntoDocument(
      <Search searchQuery="my search query" setSearchQuery={spy} />
    );
    node = ReactDOM.findDOMNode(search)
  };

  describe('#render()', function () {

    it('renders the input and button', function () {
      spy = sinon.spy();
      render(spy);
      expect(node.querySelector("input[type=search]").value).to.equal("my search query");
      expect(node.querySelector("button").textContent).to.equal("Search");
    });

  });

  describe('#onButtonClick()', function () {
    it ("sets the search query", function() {
      spy = sinon.spy();
      render(spy);
      TestUtils.Simulate.click(search.refs.button);
      expect(spy).to.have.been.calledWith('my search query');
    });
  });

  describe('#onInputChange()', function () {
    it("sets the search query", function() {
      spy = sinon.spy();
      render(spy);
      TestUtils.Simulate.change(search.refs.input, { target: { value: 'new search query' } });
      TestUtils.Simulate.click(search.refs.button);
      expect(spy).to.have.been.calledWith('new search query');
    });
  });

  describe('#onKeyPress()', function () {
    it("updates the state", function() {
      spy = sinon.spy();
      render(spy);
      TestUtils.Simulate.change(search.refs.input, { target: { value: 'new search query' } });
      expect(search.refs.input.value).to.equal('new search query');
    });
  });

  describe('#onClear()', function () {
    it("updates the state", function() {
      spy = sinon.spy();
      render(spy);
      TestUtils.Simulate.click(search.refs.clear);
      expect(search.refs.input.value).to.equal('');
      expect(spy).to.have.been.calledWith('');
    });
  });

});
