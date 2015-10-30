require('../helper.js')
var Loading = require('../../src/components/Loading.jsx');

describe('Loading', function() {

  var loading,
      spinnerOptions = { lines: 23 };


  describe('#render()', function () {

    var render = function() {
      loading = TestUtils.renderIntoDocument(<Loading spinner={spinnerOptions} />);
      renderedDOM = ReactDOM.findDOMNode(loading)
    }

    it('renders a spinner with loading text', function () {
      render();
      expect(renderedDOM.querySelector('.text').textContent).to.equal('Loading...');
      expect(renderedDOM.querySelector('.spinner')).to.not.be.null;
      expect(loading.spinner.opts.lines).to.deep.equal(23);
    });

  });

});
