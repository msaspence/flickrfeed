require('../helper.js')
var PhotoImage = require('../../src/components/PhotoImage.jsx');

describe('PhotoImage', function() {

  var photo,
      farm = 1,
      server = 'server1',
      photo_id = 'my_photo_id',
      photo_secret = 'my_photo_secret',
      size = 'm';


  describe('#render()', function () {

    var render = function() {
      photo = TestUtils.renderIntoDocument(<PhotoImage farm={farm} server={server} photo_id={photo_id} photo_secret={photo_secret} size={size} />);
      renderedDOM = ReactDOM.findDOMNode(photo)
    }

    it('renders a image', function () {
      render();
      expect(renderedDOM.getAttribute('src')).to.equal('https://farm1.staticflickr.com/server1/my_photo_id_my_photo_secret_m.jpg');
    });

  });

});
