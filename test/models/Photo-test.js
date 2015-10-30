require('../helper.js');
require("flickrapi/browser/flickrapi.js");
Flickr = window.Flickr;

var Photo,
    photo,
    server;

describe('Photo', function() {

  beforeEach(function() {
    Photo = require('../../src/models/Photo.js');
    photo = new Photo({}, new Flickr({
      api_key: "814f557fdd0320fb1fa4711047a5e355",
      progress: false
    }));
  });

  describe('#update()',  function() {

    it('updates photo details', sinon.test(function () {
      var mockFlickr = this.mock(photo.flickr.photos)
        .expects("getInfo")
        .once();
      var mock = this.mock(photo)
         .expects("trigger")
         .once();

      photo.update();
      mockFlickr.yield(null, {"photo":{"id":"22573466386","secret":"a649121aed","server":"5681","farm":6,"dateuploaded":"1446198080","isfavorite":0,"license":"0","safety_level":"0","rotation":0,"owner":{"nsid":"121686135@N07","username":"Reinfox","realname":"","location":"Tokyo, Japan","iconserver":"627","iconfarm":1,"path_alias":"reinfox"},"title":{"_content":"Japanese squirrel"},"description":{"_content":"The photo's description"},"visibility":{"ispublic":1,"isfriend":0,"isfamily":0},"dates":{"posted":"1446198080","taken":"2015-10-20 15:01:19","takengranularity":"0","takenunknown":"0","lastupdate":"1446198083"},"views":"0","editability":{"cancomment":0,"canaddmeta":0},"publiceditability":{"cancomment":1,"canaddmeta":0},"usage":{"candownload":0,"canblog":0,"canprint":0,"canshare":1},"comments":{"_content":"0"},"notes":{"note":[]},"people":{"haspeople":0},"tags":{"tag":[{"id":"121664805-22573466386-952","author":"121686135@N07","authorname":"Reinfox","raw":"Animal","_content":"animal","machine_tag":false},{"id":"121664805-22573466386-167","author":"121686135@N07","authorname":"Reinfox","raw":"Autumn","_content":"autumn","machine_tag":false}]},"urls":{"url":[{"type":"photopage","_content":"https:\/\/www.flickr.com\/photos\/reinfox\/22573466386\/"}]},"media":"photo"},"stat":"ok"});

      expect(photo.description).to.equal("The photo's description")
      expect(photo.owner_display).to.equal("Reinfox")
      expect(photo.tags).to.deep.equal([{tag: 'animal', raw: 'Animal'},{tag: 'autumn', raw: 'Autumn'}])
      mockFlickr.verify();
      mock.verify();
    }));

  });

  describe('#subscribe()', function () {

    it('adds a callback for the event once', function () {
      var my_callback = function() {};
      photo.subscribe(my_callback);
      expect(photo.subscriptions).to.deep.equal([my_callback]);
      photo.subscribe(my_callback);
      expect(photo.subscriptions).to.deep.equal([my_callback]);
    });

  });

  describe('#trigger()', function () {

    it('calls each of the subscribed callbacks', function () {
      var my_callback = sinon.spy();
      photo.subscribe(my_callback);
      photo.trigger();
      expect(my_callback).to.have.been.called;
    });

  });

});
