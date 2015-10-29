require('../helper.js')

describe('App', function() {
  describe('#render()', function () {

    it('renders application Header', function () {
      var App = require('../../src/components/App.jsx');
      var app = TestUtils.renderIntoDocument(
        <App />
      );
      var renderedDOM = ReactDOM.findDOMNode(app)
      expect(renderedDOM.querySelector(".container .page-header h1").textContent).to.equal("Flickr Photo Stream");
    });

  });
});
