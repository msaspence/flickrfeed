require('../helper.js')
var PhotoTag = require('../../src/components/PhotoTag.jsx');

describe('PhotoTag', function() {

  var photoTag,
      tag = "mytag";

  var render = function(query) {
    photoTag = TestUtils.renderIntoDocument(<PhotoTag tag={tag} searchQuery={query} />);
    renderedDOM = ReactDOM.findDOMNode(photoTag)
  };

  describe('#render()', function () {

    it('renders a tag', function () {
      render();
      expect(renderedDOM.getAttribute('class')).to.equal('tag label label-default');
      expect(photoTag.refs.tag.props.to).to.equal('/search/tag:mytag');
      expect(renderedDOM.textContent).to.equal('mytag');
    });

    context("when the searchQuery is the same as the tag", function() {
      it("uses the label-primary class", function() {
        render('search query with tag:mytag in it');
        expect(renderedDOM.getAttribute('class')).to.equal('tag label label-primary');
      });
    });

  });

});
