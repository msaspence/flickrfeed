require('../helper.js')
var Photo = require('../../src/components/Photo.jsx');

describe('Photo', function() {

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
      photo = TestUtils.renderIntoDocument(<Photo photo={photoData} />);
      renderedDOM = ReactDOM.findDOMNode(photo)
    }

    it('renders a image', function () {
      render();
      expect(renderedDOM.querySelector("img").getAttribute('src')).to.equal('https://farm1.staticflickr.com/server1/myphotoid_flickrsecret_n.jpg');
    });

  });

});
