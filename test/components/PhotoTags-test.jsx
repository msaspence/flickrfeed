require('../helper.js')
var PhotoTags = require('../../src/components/PhotoTags.jsx');

describe('PhotoTags', function() {

  var photoTag,
      tags = ["mytag","mytag2"];


  describe('#render()', function () {

    var render = function() {
      photoTag = TestUtils.renderIntoDocument(<PhotoTags tags={tags} />);
      renderedDOM = ReactDOM.findDOMNode(photoTag)
    }

    it('renders the tags', function () {
      render();
      tags = renderedDOM.querySelectorAll('.tag');
      expect(tags[0].getAttribute('href')).to.equal('https://www.flickr.com/search/?tags=mytag');
      expect(tags[0].textContent).to.equal('mytag');
      expect(tags[1].getAttribute('href')).to.equal('https://www.flickr.com/search/?tags=mytag2');
      expect(tags[1].textContent).to.equal('mytag2');
    });

  });

});
