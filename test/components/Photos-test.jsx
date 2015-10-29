require('../helper.js')

describe('Photos', function() {

  var Photos,
      photos,
      feed,
      renderedDOM;

  beforeEach(function() {
    Feed = require('../../src/services/Feed.js');
    feed = new Feed();
    Photos = require('../../src/components/Photos.jsx');
    photosC = <Photos feed={feed} />;
  });

  describe('#render()', function () {

    var render = function() {
      photos = TestUtils.renderIntoDocument(photosC);
      renderedDOM = ReactDOM.findDOMNode(photos)
    }

    it('subscribes to feed updates', function () {
      mock = sinon.mock(feed)
        .expects("subscribe")
        .once()
        .withArgs('update');
      render();
      mock.verify();
    });

    context("when the feed returns no photos", function() {
      it('renders empty message', function () {
        render();
        expect(renderedDOM.querySelector(".photos .empty p").textContent).to.equal("There are no photos to see here!");
      });
    });

    context("when the feed returns photos", function() {
      it('renders each photo', function () {
        feed.photos = [{id:'1', title:'Title 1'},{id:'2', title:'Title 2'},{id:'3', title:'Title 3'}];
        render();
        ['1','2','3'].forEach(function(i) {
          expect(renderedDOM.querySelector(".photos .photo[data-id=\""+i+"\"]").textContent).to.equal("Title "+i);
        });
      });
    });

    context("when the feed updates it rerenders", function() {
      it('renders empty message', function () {
        render();
        feed.photos = [{id:'4', title:'Title 4'},{id:'5', title:'Title 5'},{id:'6', title:'Title 6'}];
        feed.trigger('update');
        ['4','5','6'].forEach(function(i) {
          expect(renderedDOM.querySelector(".photos .photo[data-id=\""+i+"\"]").textContent).to.equal("Title "+i);
        });
      });
    });

  });

});
