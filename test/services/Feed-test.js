require('../helper.js')

var Feed,
    feed,
    server;
describe('Feed', function() {

  beforeEach(function() {
    Feed = require('../../src/services/Feed.js');
    feed = new Feed();
  });

  describe('#update()', function () {

    beforeEach(function() {
      server = sinon.fakeServer.create();
    });

    it('updates photos and triggers update', function () {
      var photos = [];
      var mockFlickr = sinon.mock(feed.flickr.photos)
        .expects("getRecent")
        .once();
      var mock = sinon.mock(feed)
         .expects("trigger")
         .once()
         .withArgs('update', photos);

      feed.update();
      mockFlickr.yield(null, {"photos":{"page":1,"pages":1,"perpage":100,"total":1,"photo": photos},"stat":"ok"});

      mockFlickr.verify();
      mock.verify();
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

});
