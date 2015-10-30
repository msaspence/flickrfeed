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
      mockFlickr.yield(null, {"photo":{"id":"22573466386","secret":"a649121aed","server":"5681","farm":6,"dateuploaded":"1446198080","isfavorite":0,"license":"0","safety_level":"0","rotation":0,"owner":{"nsid":"121686135@N07","username":"Reinfox","realname":"","location":"Tokyo, Japan","iconserver":"627","iconfarm":1,"path_alias":"reinfox"},"title":{"_content":"Japanese squirrel"},"description":{"_content":"The photo's description"},"visibility":{"ispublic":1,"isfriend":0,"isfamily":0},"dates":{"posted":"1446198080","taken":"2015-10-20 15:01:19","takengranularity":"0","takenunknown":"0","lastupdate":"1446198083"},"views":"0","editability":{"cancomment":0,"canaddmeta":0},"publiceditability":{"cancomment":1,"canaddmeta":0},"usage":{"candownload":0,"canblog":0,"canprint":0,"canshare":1},"comments":{"_content":"0"},"notes":{"note":[]},"people":{"haspeople":0},"tags":{"tag":[{"id":"121664805-22573466386-952","author":"121686135@N07","authorname":"Reinfox","raw":"Animal","_content":"animal","machine_tag":false},{"id":"121664805-22573466386-167","author":"121686135@N07","authorname":"Reinfox","raw":"Autumn","_content":"autumn","machine_tag":false},{"id":"121664805-22573466386-5969","author":"121686135@N07","authorname":"Reinfox","raw":"SONY","_content":"sony","machine_tag":false},{"id":"121664805-22573466386-1232110","author":"121686135@N07","authorname":"Reinfox","raw":"\u03b17","_content":"\u03b17","machine_tag":false},{"id":"121664805-22573466386-13730","author":"121686135@N07","authorname":"Reinfox","raw":"II","_content":"ii","machine_tag":false},{"id":"121664805-22573466386-12057","author":"121686135@N07","authorname":"Reinfox","raw":"CONTAX","_content":"contax","machine_tag":false},{"id":"121664805-22573466386-15049","author":"121686135@N07","authorname":"Reinfox","raw":"Carl","_content":"carl","machine_tag":false},{"id":"121664805-22573466386-1290","author":"121686135@N07","authorname":"Reinfox","raw":"Zeiss","_content":"zeiss","machine_tag":false},{"id":"121664805-22573466386-310039","author":"121686135@N07","authorname":"Reinfox","raw":"Sonnar","_content":"sonnar","machine_tag":false},{"id":"121664805-22573466386-1672","author":"121686135@N07","authorname":"Reinfox","raw":"T*","_content":"t","machine_tag":false},{"id":"121664805-22573466386-493871","author":"121686135@N07","authorname":"Reinfox","raw":"180mm","_content":"180mm","machine_tag":false},{"id":"121664805-22573466386-53382","author":"121686135@N07","authorname":"Reinfox","raw":"F2.8","_content":"f28","machine_tag":false},{"id":"121664805-22573466386-257579","author":"121686135@N07","authorname":"Reinfox","raw":"MMJ","_content":"mmj","machine_tag":false},{"id":"121664805-22573466386-125380","author":"121686135@N07","authorname":"Reinfox","raw":"Inokashira","_content":"inokashira","machine_tag":false},{"id":"121664805-22573466386-73","author":"121686135@N07","authorname":"Reinfox","raw":"Park","_content":"park","machine_tag":false},{"id":"121664805-22573466386-1997","author":"121686135@N07","authorname":"Reinfox","raw":"Zoo","_content":"zoo","machine_tag":false},{"id":"121664805-22573466386-1823","author":"121686135@N07","authorname":"Reinfox","raw":"Mammal","_content":"mammal","machine_tag":false},{"id":"121664805-22573466386-3013","author":"121686135@N07","authorname":"Reinfox","raw":"Squirrel","_content":"squirrel","machine_tag":false},{"id":"121664805-22573466386-1970","author":"121686135@N07","authorname":"Reinfox","raw":"Japanese","_content":"japanese","machine_tag":false},{"id":"121664805-22573466386-266857602","author":"121686135@N07","authorname":"Reinfox","raw":"CONTAX Carl Zeiss Sonnar T* 180mm F2.8","_content":"contaxcarlzeisssonnart180mmf28","machine_tag":false},{"id":"121664805-22573466386-266857612","author":"121686135@N07","authorname":"Reinfox","raw":"CONTAX Carl Zeiss Sonnar T* 180mm F2.8 MMJ","_content":"contaxcarlzeisssonnart180mmf28mmj","machine_tag":false},{"id":"121664805-22573466386-237041461","author":"121686135@N07","authorname":"Reinfox","raw":"ILCE-7M2","_content":"ilce7m2","machine_tag":false},{"id":"121664805-22573466386-13604812","author":"121686135@N07","authorname":"Reinfox","raw":"Inokashira Park Zoo","_content":"inokashiraparkzoo","machine_tag":false},{"id":"121664805-22573466386-2266752","author":"121686135@N07","authorname":"Reinfox","raw":"Japanese squirrel","_content":"japanesesquirrel","machine_tag":false},{"id":"121664805-22573466386-244679171","author":"121686135@N07","authorname":"Reinfox","raw":"SONY \u03b17 II","_content":"sony\u03b17ii","machine_tag":false},{"id":"121664805-22573466386-587988","author":"121686135@N07","authorname":"Reinfox","raw":"Sciuridae","_content":"sciuridae","machine_tag":false},{"id":"121664805-22573466386-35607963","author":"121686135@N07","authorname":"Reinfox","raw":"Sciurus lis","_content":"sciuruslis","machine_tag":false},{"id":"121664805-22573466386-266857622","author":"121686135@N07","authorname":"Reinfox","raw":"Sonnar T* 180mm F2.8","_content":"sonnart180mmf28","machine_tag":false},{"id":"121664805-22573466386-64273187","author":"121686135@N07","authorname":"Reinfox","raw":"Sonnar T* 2.8\/180","_content":"sonnart28180","machine_tag":false},{"id":"121664805-22573466386-230684894","author":"121686135@N07","authorname":"Reinfox","raw":"\u03b17 II","_content":"\u03b17ii","machine_tag":false},{"id":"121664805-22573466386-17607424","author":"121686135@N07","authorname":"Reinfox","raw":"\u30cb\u30db\u30f3\u30ea\u30b9","_content":"\u30cb\u30db\u30f3\u30ea\u30b9","machine_tag":false},{"id":"121664805-22573466386-685383","author":"121686135@N07","authorname":"Reinfox","raw":"\u30ea\u30b9","_content":"\u30ea\u30b9","machine_tag":false},{"id":"121664805-22573466386-6144861","author":"121686135@N07","authorname":"Reinfox","raw":"\u4e95\u306e\u982d\u81ea\u7136\u6587\u5316\u5712","_content":"\u4e95\u306e\u982d\u81ea\u7136\u6587\u5316\u5712","machine_tag":false},{"id":"121664805-22573466386-76753","author":"121686135@N07","authorname":"Reinfox","raw":"\u52d5\u7269","_content":"\u52d5\u7269","machine_tag":false},{"id":"121664805-22573466386-6991893","author":"121686135@N07","authorname":"Reinfox","raw":"\u54fa\u4e73\u985e","_content":"\u54fa\u4e73\u985e","machine_tag":false},{"id":"121664805-22573466386-10407289","author":"121686135@N07","authorname":"Reinfox","raw":"\u65e5\u672c\u6817\u9f20","_content":"\u65e5\u672c\u6817\u9f20","machine_tag":false},{"id":"121664805-22573466386-2087369","author":"121686135@N07","authorname":"Reinfox","raw":"\u6817\u9f20","_content":"\u6817\u9f20","machine_tag":false},{"id":"121664805-22573466386-29396","author":"121686135@N07","authorname":"Reinfox","raw":"\u79cb","_content":"\u79cb","machine_tag":false}]},"urls":{"url":[{"type":"photopage","_content":"https:\/\/www.flickr.com\/photos\/reinfox\/22573466386\/"}]},"media":"photo"},"stat":"ok"});

      expect(photo.description).to.equal("The photo's description")
      expect(photo.owner_display).to.equal("Reinfox")
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
