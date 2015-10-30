require('../helper.js')

var Feed  = require('../../src/services/Feed.js'),
    Photo = require('../../src/models/Photo.js'),
    feed,
    server;

describe('Feed', function() {

  beforeEach(function() {
    feed = new Feed();
  });

  describe('#update()', function () {

    it('updates photos and triggers update', sinon.test(function () {
      var photos = [];
      var mockFlickr = this.mock(feed.flickr.photos)
        .expects("getRecent")
        .once();
      var mock = this.mock(feed)
         .expects("trigger")
         .once()
         .withArgs('update', photos);

      feed.update();
      mockFlickr.yield(null, {"photos":{"page":1,"pages":1,"perpage":100,"total":1,"photo": photos},"stat":"ok"});

      mockFlickr.verify();
      mock.verify();
    }));

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
