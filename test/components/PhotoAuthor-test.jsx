require('../helper.js')
var PhotoAuthor = require('../../src/components/PhotoAuthor.jsx');

describe('PhotoAuthor', function() {

  var photoAuthor,
      owner_id = 'owner_id',
      owner = "Owner String";

  describe('#render()', function () {

    var render = function() {
      photoAuthor = TestUtils.renderIntoDocument(<PhotoAuthor owner={owner} owner_id={owner_id} />);
      renderedDOM = ReactDOM.findDOMNode(photoAuthor)
    }

    it('renders a link to the image on Flickr', function () {
      render();
      authorLink = renderedDOM.querySelector("a")
      expect(renderedDOM.textContent).to.contain('by Owner String')
      expect(authorLink.getAttribute('href')).to.equal('https://www.flickr.com/people/owner_id');
      expect(authorLink.getAttribute('target')).to.equal('_blank');
      expect(authorLink.textContent).to.equal('Owner String');
    });

  });

});
