require('../helper.js')
var PhotoTitle = require('../../src/components/PhotoTitle.jsx');

describe('PhotoTitle', function() {

  var photoTitle,
      photo_id = "my_photo_id",
      title = "My Photo",
      owner = "owner_id";


  describe('#render()', function () {

    var render = function() {
      photoTitle = TestUtils.renderIntoDocument(<PhotoTitle photo_id={photo_id} title={title} owner={owner} />);
      renderedDOM = ReactDOM.findDOMNode(photoTitle)
    }

    it('renders a link to the image on Flickr', function () {
      render();
      titleLink = renderedDOM.querySelector("a")
      expect(titleLink.getAttribute('href')).to.equal('https://www.flickr.com/photos/owner_id/my_photo_id');
      expect(titleLink.getAttribute('target')).to.equal('_blank');
      expect(titleLink.textContent).to.equal('My Photo');
    });

  });

});
