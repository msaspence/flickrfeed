require('../helper.js')
var PhotosStore = require('../../src/stores/PhotosStore.js'),
    Photos      = require('../../src/components/Photos.jsx');

describe('Photos', function() {

  var photos,
      renderedDOM;

  describe('#render()', function () {

    var render = function(photos, loading) {
      photos = TestUtils.renderIntoDocument(<Photos photos={photos} loading={loading} />);
      renderedDOM = ReactDOM.findDOMNode(photos)
    }

    it('renders a loading spinner', function () {
      render();
      loading = renderedDOM.querySelector(".loading-indicator")
      expect(loading.textContent).to.equal('Loading...');
    });

    context("if is loading", function() {
      it('has a loading class', function () {
        render([], true);
        expect(renderedDOM.getAttribute('class')).to.contain('loading');
      });
    });

    context("if is not loading", function() {
      it('is initially in a loading state until loaded', function () {
        render([], false);
        expect(renderedDOM.getAttribute('class')).to.not.contain('loading');
      });
    });


    context("when the photos store returns photos", function() {
      it('renders each photo', function () {
        photos = PhotosStore.initiatePhotos([{id:'1', title:'Title 1'},{id:'2', title:'Title 2'},{id:'3', title:'Title 3'}]);
        render(photos);
        ['1','2','3'].forEach(function(i) {
          expect(renderedDOM.querySelector(".photos .photo[data-id=\""+i+"\"]").textContent).to.contain("Title "+i);
        });
      });
    });

    context("when the photos store returns no photos", function() {
      it('renders empty message', function () {
        photos = [];
        render(photos, false);
        expect(renderedDOM.getAttribute("class")).to.contain("no-results");
        expect(renderedDOM.querySelector(".empty p").textContent).to.equal("We couldn't find any photos to match your search!");
      });
    });

    context("when the photos store updates it rerenders", function() {
      it('renders empty message', function () {
        photos = PhotosStore.initiatePhotos([{id:'4', title:'Title 4'},{id:'5', title:'Title 5'},{id:'6', title:'Title 6'}]);
        render(photos);
        ['4','5','6'].forEach(function(i) {
          expect(renderedDOM.querySelector(".photo[data-id=\""+i+"\"]").textContent).to.contain("Title "+i);
        });
      });
    });

  });

});
