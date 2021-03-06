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
      description: { _content: "My photo's description" },
      tags: "mytag mytag2",
      owner: "owner_id",
      ownername : "Owner String",
      secret: "flickrsecret",
      server: "server1"
    });
  });

  var render = function() {
    photo = TestUtils.renderIntoDocument(<Photo photo={photoModel} />);
    renderedDOM = ReactDOM.findDOMNode(photo)
  }

  describe('#render', function () {

    it('renders a image', function () {
      render();
      expect(renderedDOM.querySelector("img").getAttribute('data-src')).to.equal('https://farm1.staticflickr.com/server1/my_photo_id_flickrsecret_n.jpg');
    });

    it('renders the title', function () {
      render();
      titleLink = renderedDOM.querySelector(".title a")
      expect(titleLink.textContent).to.equal('My Photo');
      expect(titleLink.getAttribute('href')).to.equal('https://www.flickr.com/photos/owner_id/my_photo_id');
    });

    it('renders the author', function () {
      render();
      authorLink = renderedDOM.querySelector(".author a");
      expect(authorLink.textContent).to.equal('Owner String');
    });

    it('renders the description', function () {
      render();
      description = renderedDOM.querySelector(".description")
      expect(description.textContent).to.equal('My photo\'s description');
    });

    it('renders the tags', function () {
      render();
      description = renderedDOM.querySelector(".tag")
      expect(description.textContent).to.equal('mytag');
    });

  });

  describe('#componentDidMount', function () {
    it("removes the faded-out class", function() {
      render();
      setTimeout(function() {
        expect(photo.refs.photo.getAttribute('class')).to.not.contain('faded-out');
      },20);
    });
  });

});
