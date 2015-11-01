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
      tags: [
        { tag: "mytag", raw: "My Tag" },
        { tag: "mytag2", raw: "My Second Tag" }
      ],
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

    it('is initially in a loading state until loaded', function () {
      render();
      expect(renderedDOM.getAttribute('class')).to.contain('loading');
      photoModel.trigger();
      expect(renderedDOM.getAttribute('class')).to.not.contain('loading');
    });

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

    it('renders the tags', function () {
      render();
      photoModel.trigger();
      description = renderedDOM.querySelector(".tag")
      expect(description.textContent).to.equal('My Tag');
    });

    it('renders a loading spinner', function () {
      render();
      photoModel.trigger();
      loading = renderedDOM.querySelector(".loading-indicator")
      expect(loading.textContent).to.equal('Loading...');
    });

  });

});
