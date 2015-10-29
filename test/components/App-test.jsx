require('../helper.js')
var App = require('../../src/components/App.jsx'),
    Header = require('../../src/components/Header.jsx'),
    Photos = require('../../src/components/Photos.jsx'),
    app,
    shallowRenderer;

describe('App', function() {

  describe('#render()', function () {

    beforeEach(function() {
      shallowRenderer = TestUtils.createRenderer();
      app = shallowRenderer.render(
        <App />
      );
      renderedDOM = shallowRenderer.getRenderOutput();
    });

    it('renders application Header', function () {
      expect(TestUtils.isElementOfType(renderedDOM.props.children[0], Header)).to.be.true;
    });

    it('renders the Photo component', function () {
      expect(TestUtils.isElementOfType(renderedDOM.props.children[1], Photos)).to.be.true;
    });

  });

});
