require('../helper.js')

var PhotosStore  = require('../../src/stores/PhotosStore.js'),
    Photo = require('../../src/models/Photo.js'),
    server;

describe('PhotosStore', function() {

  beforeEach(function() {
    PhotosStore.page = 1;
    PhotosStore.photos = [];
    PhotosStore.loading = true;
    PhotosStore.loadingFirst = true;
    PhotosStore.searchId = 0;
  });

  describe('#update', function () {

    it("set loading to true", function() {
      PhotosStore.loadingFirst=false;
      PhotosStore.update();
      expect(PhotosStore.loading).to.be.true;
      expect(PhotosStore.loadingFirst).to.be.false;
      expect(PhotosStore.page).to.equal(1);
    });

    context("when search query is null", function() {
      it("gets recent", sinon.test(function() {
        var mock = this.mock(PhotosStore)
          .expects('getRecent')
          .once();
        PhotosStore.update(null);
        mock.verify();
      }));
    });

    context("when search query is empty", function() {
      it("gets recent", sinon.test(function() {
        var mock = this.mock(PhotosStore)
          .expects('getRecent')
          .once();
        PhotosStore.update("");
        mock.verify();
      }));
    });

    context("when search query is provided", function() {
      it("calls search", sinon.test(function() {
        var mock = this.mock(PhotosStore)
          .expects('search')
          .once();
        PhotosStore.update("my search query");
        mock.verify();
      }));
    });

    context("when search query is true", function() {
      it("calls search", sinon.test(function() {
        PhotosStore.searchQuery = "old search query";
        PhotosStore.update(true);
        expect(PhotosStore.searchQuery).to.equal("old search query");
      }));
    });

    context("when page is provide", function() {
      it("sets page", function() {
        PhotosStore.update("my search query",2);
        expect(PhotosStore.page).to.equal(2);
      });
    });

  });

  describe('#search', function() {
    it("calls the Flickr API search", sinon.test(function() {
      var mockFlickr = this.mock(PhotosStore.flickr.photos)
        .expects('search')
        .withArgs({ text: 'my search query', extras: 'tags,description,owner_name' })
        .once();
      var mock = this.mock(PhotosStore)
        .expects('optionizeSearchQuery')
        .withArgs('my search query')
        .once()
        .returns({ text: 'my search query', extras: 'tags,description,owner_name' });
      PhotosStore.search('my search query');
      mock.verify();
      mockFlickr.verify();
    }));
  });

  describe('#optionizeSearchQuery', function() {
    it("moves the string into an object", sinon.test(function() {
      expect(PhotosStore.optionizeSearchQuery("my search query")).to.deep.equal({
        text: "my search query",
        extras: 'tags,description,owner_name',
        page: 1,
        per_page: 18
      });
    }));

    it("extracts tags", sinon.test(function() {
      expect(PhotosStore.optionizeSearchQuery("my tag:mytag:_withsymbols search tag:hello query")).to.deep.equal({
        text: "my search query",
        tags: "mytag:_withsymbols,hello",
        tag_mode: 'all',
        extras: 'tags,description,owner_name',
        page: 1,
        per_page: 18
      });
    }));

    it("extracts owner", sinon.test(function() {
      expect(PhotosStore.optionizeSearchQuery("my owner:ownerid search owner:notownerid query")).to.deep.equal({
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
      var mockFlickr = this.mock(PhotosStore.flickr.photos)
        .expects('getRecent')
        .withArgs({ extras: 'tags,description,owner_name', page: 1, per_page: 18 })
        .once();
      PhotosStore.getRecent();
      mockFlickr.verify();
    }));
  });

  describe('#photosUpdated', function() {

    var photos = { photos: { photo: [{a: 'b'}], page: 1 } };

    it ("initiates photos", sinon.test(function() {
      initiatedPhotos = [{ a: 'c' }]
      var mock = this.mock(PhotosStore)
        .expects('initiatePhotos')
        .withArgs([{a: 'b'}])
        .once()
        .returns([{ a: 'c' }]);
      PhotosStore.photosUpdated(null, photos);
      mock.verify();
      expect(PhotosStore.photos).to.deep.equal(initiatedPhotos);
    }));

    it("loading is set to false", function() {
      PhotosStore.loadingFirst=true;
      PhotosStore.photosUpdated(null, photos);
      expect(PhotosStore.loading).to.be.false;
      expect(PhotosStore.loadingFirst).to.be.false;
    });

    it("triggers update", function() {
      spy = sinon.spy();
      PhotosStore.on('updated', spy);
      PhotosStore.photosUpdated(null, photos);
      expect(spy).to.have.been.called;
    });

    context("when it is not the first page", function() {

      var photos = { photos: { photo: [{a: 'b'}], page: 2 } };

      it("concats the results on to the existing", sinon.test(function() {
        initiatedPhotos = [{ a: 'c' }]
        PhotosStore.photos = [{ b: 'd' }]
        var mock = this.mock(PhotosStore)
          .expects('initiatePhotos')
          .withArgs([{a: 'b'}])
          .once()
          .returns({ a: 'c' });
        PhotosStore.photosUpdated(null, photos);
        mock.verify();
        expect(PhotosStore.photos).to.deep.equal([{b: 'd'}, {a: 'c'}]);
      }));

    });

  });

  describe('#getDefaultOptions', function() {

    it("provides the default options", function() {
      PhotosStore.page = null;
      expect(PhotosStore.getDefaultOptions()).to.deep.equal({
        extras: 'tags,description,owner_name',
        page: 1,
        per_page: 18
      });
    });

    context("when page is set", function() {
      it("provides the set value", function() {
        PhotosStore.page = 3;
        expect(PhotosStore.getDefaultOptions().page).to.equal(3);
      });
    });

  });

  describe('#initiatePhotos', function () {

    it('replaces each photo with a Photo and calls update on them', function () {
      result = PhotosStore.initiatePhotos([{id:0},{id:1},{id:2}])
      expect(result.length).to.equal(3);
      [0,1,2].forEach(function(i) {
        expect(result[i]).to.be.an.instanceof(Photo);
        expect(result[i].id).to.equal(i);
      });
    });

  });

  describe('#loadMore', function() {

    it("calls update with the search query and the next page", sinon.test(function() {
      PhotosStore.update = this.spy();
      PhotosStore.loading = false;
      PhotosStore.page = 2;
      PhotosStore.photos = [{}];
      PhotosStore.loadMore();
      expect(PhotosStore.update).to.have.been.calledWith(true, 3);
    }));

    context("when photos store is already loading", function() {
      it("calls update with the search query and the next page", sinon.test(function() {
        PhotosStore.update = this.spy();
        PhotosStore.loading = true;
        PhotosStore.loadMore();
        expect(PhotosStore.update).to.have.not.been.called;
      }));
    });

    context("when photos store has no results to load", function() {
      it("calls update with the search query and the next page", sinon.test(function() {
        PhotosStore.update = this.spy();
        PhotosStore.loading = true;
        PhotosStore.photos = [];
        PhotosStore.loadMore();
        expect(PhotosStore.update).to.have.not.been.called;
      }));
    });

  });



});
