require('../helper.js')

describe('Header', function() {

  var Header,
      header,
      renderedDOM;

  beforeEach(function() {
    Header = require('../../src/components/Header.jsx');
    header = TestUtils.renderIntoDocument(
      <Header text="My Heading" />
    );
    renderedDOM = ReactDOM.findDOMNode(header)
  });

  describe('#render()', function () {

    it('renders the heading', function () {
      expect(renderedDOM.querySelector(".page-header h1").textContent).to.equal("My Heading");
    });

    it('renders the search component', function () {
      expect(renderedDOM.querySelector(".page-header .search input")).to.not.be.null;
    });

  });

});
