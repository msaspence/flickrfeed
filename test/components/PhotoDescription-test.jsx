require('../helper.js')
var PhotoDescription = require('../../src/components/PhotoDescription.jsx');

describe('PhotoDescription', function() {

  var photoDescription,
      description = 'My photo\'s description';

  describe('#render()', function () {

    beforeEach(function() {
      description = 'My photo\'s description';
    });

    var render = function() {
      photoDescription = TestUtils.renderIntoDocument(<PhotoDescription description={description} />);
      renderedDOM = ReactDOM.findDOMNode(photoDescription)
    }

    it('renders a link to the image on Flickr', function () {
      render();
      expect(renderedDOM.textContent).to.equal('My photo\'s description');
    });

    context("when the description contains html", function() {

      beforeEach(function() {
        description = 'My photo\'s description, with <a href="#" target="something">a link</a> <a href="#" target="something">second link</a> <div class="dangerous">safe text</div><script>dangerous XSS</script>';
      });

      it("renders it as html", function() {
        render();
        expect(renderedDOM.textContent).to.contain('safe text');
        expect(renderedDOM.textContent).to.not.contain('dangerous XSS');
        expect(renderedDOM.querySelector('.dangerous')).to.be.null;
        link = renderedDOM.querySelector('a');
        expect(link.textContent).to.equal('a link')
        expect(link.getAttribute('href')).to.equal('#')
        expect(link.getAttribute('target')).to.equal('_blank')
        expect(renderedDOM.querySelectorAll('a')[1].getAttribute('target')).to.equal('_blank')
      })
    })

  });

});
