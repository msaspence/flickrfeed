require('../helper.js')

var Feed  = require('../../src/services/Feed.js'),
    Photo = require('../../src/models/Photo.js'),
    feed,
    server;

describe('Feed', function() {

  beforeEach(function() {
    feed = new Feed();
  });

  describe('#update', function () {

    it("set loading to true", function() {
      feed.update();
      expect(feed.loading).to.be.true;
    });

    context("when search query is null", function() {
      it("gets recent", sinon.test(function() {
        var mock = this.mock(feed)
          .expects('getRecent')
          .once();
        feed.update(null);
        mock.verify();
      }));
    });

    context("when search query is empty", function() {
      it("gets recent", sinon.test(function() {
        var mock = this.mock(feed)
          .expects('getRecent')
          .once();
        feed.update("");
        mock.verify();
      }));
    });

    context("when search query is provided", function() {
      it("calls search", sinon.test(function() {
        var mock = this.mock(feed)
          .expects('search')
          .once();
        feed.update("my search query");
        mock.verify();
      }));
    });

  });

  describe('#search', function() {
    it("calls the Flickr API search", sinon.test(function() {
      callback = sinon.spy();
      var mockFlickr = this.mock(feed.flickr.photos)
        .expects('search')
        .withArgs({ text: 'my search query' }, feed.photosUpdated)
        .once();
      var mock = this.mock(feed)
        .expects('optionizeSearchQuery')
        .withArgs('my search query')
        .once()
        .returns({ text: 'my search query' });
      feed.search('my search query', callback);
      mock.verify();
      mockFlickr.verify();
    }));
  });

  describe('#optionizeSearchQuery', function() {
    it("moves the string into an object", sinon.test(function() {
      expect(feed.optionizeSearchQuery("my search query")).to.deep.equal({ text: "my search query" });
    }));

    it("extracts tags", sinon.test(function() {
      expect(feed.optionizeSearchQuery("my tag:mytag:_withsymbols search tag:hello query")).to.deep.equal({ text: "my search query", tags: "mytag:_withsymbols,hello", tag_mode: 'all' });
    }));

    it("extracts owner", sinon.test(function() {
      expect(feed.optionizeSearchQuery("my owner:ownerid search owner:notownerid query")).to.deep.equal({ text: "my search query", user_id: "ownerid" });
    }));
  });

  describe('#getRecent', function() {
    it("calls the Flickr API getRecent", sinon.test(function() {
      callback = sinon.spy();
      var mockFlickr = this.mock(feed.flickr.photos)
        .expects('getRecent')
        .withArgs({}, feed.photosUpdated)
        .once();
      feed.getRecent();
      mockFlickr.verify();
    }));
  });

  describe('#photosUpdated', function() {

    var photos = { photos: { photo: [{a: 'b'}] } };

    it ("initiates photos", sinon.test(function() {
      initiatedPhotos = { a: 'c' }
      var mock = this.mock(feed)
        .expects('initiatePhotos')
        .withArgs([{a: 'b'}])
        .once()
        .returns({ a: 'c' });
      feed.photosUpdated(null, photos);
      mock.verify();
      expect(feed.photos).to.deep.equal(initiatedPhotos);
    }));

    it("loading is set to false", function() {
      feed.photosUpdated(null, photos);
      expect(feed.loading).to.be.false;
    });

    it("triggers update", function() {
      spy = sinon.spy();
      feed.subscribe('update', spy);
      feed.photosUpdated(null, photos);
      expect(spy).to.have.been.called;
    });

  });

  describe('#subscribe()', function () {

    it('adds a callback for the event once', function () {
      var my_callback = function() {};
      feed.subscribe('update', my_callback);
      expect(feed.subscriptions).to.deep.equal({update: [my_callback]});
      feed.subscribe('update', my_callback);
      expect(feed.subscriptions).to.deep.equal({update: [my_callback]});
    });

  });

  describe('#trigger()', function () {

    it('calls each of the subscribed callbacks', function () {
      var my_callback = sinon.spy();
      feed.subscribe('update', my_callback);
      feed.trigger('update');
      expect(my_callback).to.have.been.called;
    });

  });

  describe('#initiatePhotos()', function () {

    it('replaces each photo with a Photo and calls update on them', function () {
      result = feed.initiatePhotos([{id:0},{id:1},{id:2}])
      expect(result.length).to.equal(3);
      [0,1,2].forEach(function(i) {
        expect(result[i]).to.be.an.instanceof(Photo);
        expect(result[i].id).to.equal(i);
        // Expect result[i] to have recieved update()
        // Not sure how to test for this but leaving
        // comments for the sake of specification
      });
    });

  });

});
