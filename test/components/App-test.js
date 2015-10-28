require('../helper.js')

describe('App', function() {
  describe('#render()', function () {
    it('renders "Hello World"', function () {
      var App = require('../../src/components/App.jsx');
      var app = TestUtils.renderIntoDocument(
        React.createElement(App)
      );
      var renderedDOM = React.findDOMNode(app)
      expect(renderedDOM.querySelector(".container .page-header h1").textContent).to.equal("Hello World");
    });


    it.only('renders "Hello World"', function () {
      var h1 = document.createElement("h1");
      h1.innerHTML = "aaa"
      document.body.appendChild(h1);
      expect(document.getElementsByTagName("h1").length).to.equal(1);
      expect(document.querySelector("h1").textContent).to.equal("aaa");
    });

  });
});
