require('../helper.js')
var PhotoTitle = require('../../src/components/PhotoTitle.jsx');

describe('PhotoTitle', function() {

  var photo,
      photoData;

  beforeEach(function() {
    photoData = {
      id: 'myphotoid',
      title: "My Photo",
      farm: 1,
      isfamily: 0,
      isfriend: 0,
      ispublic: 1,
      owner: "12345678@N08",
      secret: "flickrsecret",
      server: "server1"
    };
  });

  describe('#render()', function () {

    var render = function() {
      photo = TestUtils.renderIntoDocument(<PhotoTitle photo={photoData} />);
      renderedDOM = ReactDOM.findDOMNode(photo)
    }

    it('renders a link to the image on Flickr', function () {
      render();
      titleLink = renderedDOM.querySelector("a")
      expect(titleLink.getAttribute('href')).to.equal('https://www.flickr.com/photos/12345678@N08/myphotoid');
      expect(titleLink.textContent).to.equal('My Photo');
    });

  });

});
