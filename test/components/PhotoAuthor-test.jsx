require('../helper.js')
var PhotoAuthor = require('../../src/components/PhotoAuthor.jsx');

describe('PhotoAuthor', function() {

  var photoAuthor,
      owner_id = 'owner_id',
      owner = "Owner String";

  var render = function(spy) {
    photoAuthor = TestUtils.renderIntoDocument(<PhotoAuthor owner={owner} owner_id={owner_id} setSearchQuery={spy} />);
    renderedDOM = ReactDOM.findDOMNode(photoAuthor)
  }

  describe('#render()', function () {

    it('renders a link to the image on Flickr', function () {
      render();
      authorLink = renderedDOM.querySelector("a")
      expect(renderedDOM.textContent).to.contain('by Owner String')
      expect(authorLink.getAttribute('href')).to.equal('https://www.flickr.com/people/owner_id');
      expect(authorLink.getAttribute('target')).to.equal('_blank');
      expect(authorLink.textContent).to.equal('Owner String');
    });

  });

  describe('#onClick', function() {
    it('sets search query based on tag', sinon.test(function() {
      spy = sinon.spy();
      render(spy);
      TestUtils.Simulate.click(photoAuthor.refs.author);
      expect(spy).to.have.been.calledWith('owner:owner_id');
    }));
  });

});
