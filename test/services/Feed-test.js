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
      feed.loadingFirst=false;
      feed.update();
      expect(feed.loading).to.be.true;
      expect(feed.loadingFirst).to.be.false;
      expect(feed.page).to.equal(1);
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

    context("when search query is true", function() {
      it("calls search", sinon.test(function() {
        feed.searchQuery = "old search query";
        feed.update(true);
        expect(feed.searchQuery).to.equal("old search query");
      }));
    });

    context("when page is provide", function() {
      it("sets page", function() {
        feed.update("my search query",2);
        expect(feed.page).to.equal(2);
      });
    });

  });

  describe('#search', function() {
    it("calls the Flickr API search", sinon.test(function() {
      var mockFlickr = this.mock(feed.flickr.photos)
        .expects('search')
        .withArgs({ text: 'my search query', extras: 'tags,description,owner_name' })
        .once();
      var mock = this.mock(feed)
        .expects('optionizeSearchQuery')
        .withArgs('my search query')
        .once()
        .returns({ text: 'my search query', extras: 'tags,description,owner_name' });
      feed.search('my search query');
      mock.verify();
      mockFlickr.verify();
    }));
  });

  describe('#optionizeSearchQuery', function() {
    it("moves the string into an object", sinon.test(function() {
      expect(feed.optionizeSearchQuery("my search query")).to.deep.equal({
        text: "my search query",
        extras: 'tags,description,owner_name',
        page: 1,
        per_page: 18
      });
    }));

    it("extracts tags", sinon.test(function() {
      expect(feed.optionizeSearchQuery("my tag:mytag:_withsymbols search tag:hello query")).to.deep.equal({
        text: "my search query",
        tags: "mytag:_withsymbols,hello",
        tag_mode: 'all',
        extras: 'tags,description,owner_name',
        page: 1,
        per_page: 18
      });
    }));

    it("extracts owner", sinon.test(function() {
      expect(feed.optionizeSearchQuery("my owner:ownerid search owner:notownerid query")).to.deep.equal({
        text: "my search query",
        user_id: "ownerid",
        extras: 'tags,description,owner_name',
        page: 1,
        per_page: 18
      });
    }));
  });

  describe('#getRecent', function() {
    it("calls the Flickr API getRecent", sinon.test(function() {
      callback = sinon.spy();
      var mockFlickr = this.mock(feed.flickr.photos)
        .expects('getRecent')
        .withArgs({ extras: 'tags,description,owner_name', page: 1, per_page: 18 })
        .once();
      feed.getRecent();
      mockFlickr.verify();
    }));
  });

  describe('#photosUpdated', function() {

    var photos = { photos: { photo: [{a: 'b'}], page: 1 } };

    it ("initiates photos", sinon.test(function() {
      initiatedPhotos = [{ a: 'c' }]
      var mock = this.mock(feed)
        .expects('initiatePhotos')
        .withArgs([{a: 'b'}])
        .once()
        .returns([{ a: 'c' }]);
      feed.photosUpdated(null, photos);
      mock.verify();
      expect(feed.photos).to.deep.equal(initiatedPhotos);
    }));

    it("loading is set to false", function() {
      feed.loadingFirst=true;
      feed.photosUpdated(null, photos);
      expect(feed.loading).to.be.false;
      expect(feed.loadingFirst).to.be.false;
    });

    it("triggers update", function() {
      spy = sinon.spy();
      feed.subscribe('update', spy);
      feed.photosUpdated(null, photos);
      expect(spy).to.have.been.called;
    });

    context("when it is not the first page", function() {

      var photos = { photos: { photo: [{a: 'b'}], page: 2 } };

      it("concats the results on to the existing", sinon.test(function() {
        initiatedPhotos = [{ a: 'c' }]
        feed.photos = [{ b: 'd' }]
        var mock = this.mock(feed)
          .expects('initiatePhotos')
          .withArgs([{a: 'b'}])
          .once()
          .returns({ a: 'c' });
        feed.photosUpdated(null, photos);
        mock.verify();
        expect(feed.photos).to.deep.equal([{b: 'd'}, {a: 'c'}]);
      }));

    });

  });

  describe('#subscribe', function () {

    it('adds a callback for the event once', function () {
      var my_callback = function() {};
      feed.subscribe('update', my_callback);
      expect(feed.subscriptions).to.deep.equal({update: [my_callback]});
      feed.subscribe('update', my_callback);
      expect(feed.subscriptions).to.deep.equal({update: [my_callback]});
    });

  });

  describe('#trigger', function () {

    it('calls each of the subscribed callbacks', function () {
      var my_callback = sinon.spy();
      feed.subscribe('update', my_callback);
      feed.trigger('update');
      expect(my_callback).to.have.been.called;
    });

  });

  describe('#getDefaultOptions', function() {

    it("provides the default options", function() {
      feed.page = null;
      expect(feed.getDefaultOptions()).to.deep.equal({
        extras: 'tags,description,owner_name',
        page: 1,
        per_page: 18
      });
    });

    context("when page is set", function() {
      it("provides the set value", function() {
        feed.page = 3;
        expect(feed.getDefaultOptions().page).to.equal(3);
      });
    });

  });

  describe('#initiatePhotos', function () {

    it('replaces each photo with a Photo and calls update on them', function () {
      result = feed.initiatePhotos([{id:0},{id:1},{id:2}])
      expect(result.length).to.equal(3);
      [0,1,2].forEach(function(i) {
        expect(result[i]).to.be.an.instanceof(Photo);
        expect(result[i].id).to.equal(i);
      });
    });

  });

  describe('#loadMore', function() {

    it("calls update with the search query and the next page", sinon.test(function() {
      feed.update = this.spy();
      feed.loading = false;
      feed.page = 2;
      feed.photos = [{}];
      feed.loadMore();
      expect(feed.update).to.have.been.calledWith(true, 3);
    }));

    context("when feed is already loading", function() {
      it("calls update with the search query and the next page", sinon.test(function() {
        feed.update = this.spy();
        feed.loading = true;
        feed.loadMore();
        expect(feed.update).to.have.not.been.called;
      }));
    });

    context("when feed has no results to load", function() {
      it("calls update with the search query and the next page", sinon.test(function() {
        feed.update = this.spy();
        feed.loading = true;
        feed.photos = [];
        feed.loadMore();
        expect(feed.update).to.have.not.been.called;
      }));
    });

  });



});
