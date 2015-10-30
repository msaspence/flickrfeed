require('../helper.js')
var PhotoTag = require('../../src/components/PhotoTag.jsx');

describe('PhotoTag', function() {

  var photoTag,
      tag = "mytag",
      raw = "My Tag";


  describe('#render()', function () {

    var render = function() {
      photoTag = TestUtils.renderIntoDocument(<PhotoTag tag={tag} raw={raw} />);
      renderedDOM = ReactDOM.findDOMNode(photoTag)
    }

    it('renders a tag', function () {
      render();
      expect(renderedDOM.getAttribute('class')).to.equal('tag label label-default');
      expect(renderedDOM.getAttribute('target')).to.equal('_blank');
      expect(renderedDOM.getAttribute('href')).to.equal('https://www.flickr.com/search/?tags=mytag');
      expect(renderedDOM.textContent).to.equal('My Tag');
    });

  });

});
