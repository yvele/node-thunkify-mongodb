var assert = require('assert');
var MongoClient = require('../lib').MongoClient;
var Db = require('../lib').Db;
var Collection = require('../lib').Collection;

describe('Db', function() {

  beforeEach(function *() {
    var mongoClient = new MongoClient(new this.MongoClient());
    this.db = yield mongoClient.connect(this.url);
  });

  afterEach(function *() {
    yield this.db.close();
  });
  

  it('close should work', function* () {
    yield this.db.close();
  });

  it('collection should work', function* () {
    var col = yield this.db.collection(this.collectionName);
    assert(col);
    assert(col instanceof Collection);
  });

  it('collectionSync should work', function () {
    var col = this.db.collectionSync(this.collectionName);
    assert(col);
    assert(col instanceof Collection);
  });

});
