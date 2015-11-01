require('../helper.js')

var E404 = require('../../src/components/E404.jsx');

describe('404', function() {

  describe('#render()', function () {

    beforeEach(function() {
      e404 = TestUtils.renderIntoDocument(
        <E404 />
      );
      renderedDOM = ReactDOM.findDOMNode(e404);
    });

    it('renders error Header', function () {
      expect(renderedDOM.querySelector(".page-header").textContent).to.contain("Error 404");
      expect(renderedDOM.querySelector(".page-header").textContent).to.contain("Page Not Found");
    });

  });

});
