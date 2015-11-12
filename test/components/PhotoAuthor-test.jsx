require('../helper.js')
var PhotoAuthor = require('../../src/components/PhotoAuthor.jsx');

describe('PhotoAuthor', function() {

  var photoAuthor,
      owner = 'owner_id',
      owner_name = "Owner String";

  var render = function(spy) {
    photoAuthor = TestUtils.renderIntoDocument(<PhotoAuthor owner={owner} owner_name={owner_name} />);
    renderedDOM = ReactDOM.findDOMNode(photoAuthor)
  }

  describe('#render()', function () {

    it('renders a link to search by the owner', function () {
      render();
      authorLink = renderedDOM.querySelector("a")
      expect(renderedDOM.textContent).to.contain('by Owner String')
      expect(photoAuthor.refs.author.props.to).to.equal('/search/owner:owner_id');
      expect(authorLink.textContent).to.equal('Owner String');
    });

  });


});
