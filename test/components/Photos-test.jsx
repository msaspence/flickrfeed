require('../helper.js')
var Feed = require('../../src/services/Feed.js'),
    Photos = require('../../src/components/Photos.jsx');

describe('Photos', function() {

  var photos,
      feed,
      renderedDOM;

  beforeEach(function() {
    feed = new Feed();
  });

  describe('#render()', function () {

    var render = function() {
      photos = TestUtils.renderIntoDocument(<Photos feed={feed} />);
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
