require('../helper.js')
var Photo = require('../../src/components/Photo.jsx'),
    PhotoModel = require('../../src/models/Photo.js');

describe('Photo', function() {

  var photo,
      photoModel;

  beforeEach(function() {
    photoModel = new PhotoModel({
      id: 'my_photo_id',
      title: "My Photo",
      farm: 1,
      isfamily: 0,
      isfriend: 0,
      ispublic: 1,
      description: "My photo's description",
      owner: "owner_id",
      owner_display: "Owner String",
      secret: "flickrsecret",
      server: "server1"
    });
  });

  describe('#render()', function () {

    var render = function() {
      photo = TestUtils.renderIntoDocument(<Photo photo={photoModel} />);
      renderedDOM = ReactDOM.findDOMNode(photo)
    }

    it('renders a image', function () {
      render();
      expect(renderedDOM.querySelector("img").getAttribute('src')).to.equal('https://farm1.staticflickr.com/server1/my_photo_id_flickrsecret_n.jpg');
    });

    it('renders the title', function () {
      render();
      titleLink = renderedDOM.querySelector(".title a")
      expect(titleLink.textContent).to.equal('My Photo');
      expect(titleLink.getAttribute('href')).to.equal('https://www.flickr.com/photos/owner_id/my_photo_id');
    });

    it('renders the author', function () {
      render();
      photoModel.trigger();
      authorLink = renderedDOM.querySelector(".author a")
      expect(authorLink.textContent).to.equal('Owner String');
      expect(authorLink.getAttribute('href')).to.equal('https://www.flickr.com/people/owner_id');
    });

    it('renders the description', function () {
      render();
      photoModel.trigger();
      description = renderedDOM.querySelector(".description")
      expect(description.textContent).to.equal('My photo\'s description');
    });

  });

});
