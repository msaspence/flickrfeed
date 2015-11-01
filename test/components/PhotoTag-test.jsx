require('../helper.js')
var PhotoTag = require('../../src/components/PhotoTag.jsx');

describe('PhotoTag', function() {

  var photoTag,
      tag = "mytag",
      raw = "My Tag";

  var render = function(spy) {
    photoTag = TestUtils.renderIntoDocument(<PhotoTag tag={tag} raw={raw} setSearchQuery={spy} />);
    renderedDOM = ReactDOM.findDOMNode(photoTag)
  };

  describe('#render()', function () {

    it('renders a tag', function () {
      render();
      expect(renderedDOM.getAttribute('class')).to.equal('tag label label-default');
      expect(renderedDOM.getAttribute('target')).to.equal('_blank');
      expect(renderedDOM.getAttribute('href')).to.equal('https://www.flickr.com/search/?tags=mytag');
      expect(renderedDOM.textContent).to.equal('My Tag');
    });

  });

  describe('#onClick', function() {
    it('sets search query based on tag', sinon.test(function() {
      spy = sinon.spy();
      render(spy);
      TestUtils.Simulate.click(photoTag.refs.tag);
      expect(spy).to.have.been.calledWith('tag:mytag');
    }));
  });

});
