require('../helper.js')
var PhotoTag = require('../../src/components/PhotoTag.jsx');

describe('PhotoTag', function() {

  var photoTag,
      tag = "mytag",
      raw = "My Tag";

  var render = function(spy, query) {
    photoTag = TestUtils.renderIntoDocument(<PhotoTag tag={tag} raw={raw} setSearchQuery={spy} searchQuery={query} />);
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

    context("when the searchQuery is the same as the tag", function() {
      it("uses the label-primary class", function() {
        render(null, 'tag:mytag');
        expect(renderedDOM.getAttribute('class')).to.equal('tag label label-primary');
      });
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
