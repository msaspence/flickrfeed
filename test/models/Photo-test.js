require('../helper.js');
require("flickrapi/browser/flickrapi.js");
Flickr = window.Flickr;

var Photo,
    photo,
    server;

describe('Photo', function() {

  beforeEach(function() {
    Photo = require('../../src/models/Photo.js');
    photo = new Photo({ tags: "tag1 tag2", description: { _content: "my description"}}, new Flickr({
      api_key: "814f557fdd0320fb1fa4711047a5e355",
      progress: false
    }));
  });

  describe('#constructor()', function () {

    it("splits up tags into an array", function () {
      expect(photo.tags).to.deep.equal(["tag1","tag2"]);
    });

    it("retrieves the description", function () {
      expect(photo.description).to.equal("my description");
    });

  });

});
