require('../helper.js')

describe('Header', function() {

  describe('#render()', function () {

    it('renders heading', function () {
      var Header = require('../../src/components/Header.jsx');
      var header = TestUtils.renderIntoDocument(
        <Header text="My Heading" />
      );
      var renderedDOM = ReactDOM.findDOMNode(header)
      expect(renderedDOM.querySelector(".page-header h1").textContent).to.equal("My Heading");
    });

  });

});
