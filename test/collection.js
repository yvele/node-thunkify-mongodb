var assert = require('assert');
var MongoClient = require('../lib').MongoClient;
var Collection = require('../lib').Collection;
var Cursor = require('../lib').Cursor;


describe('Collection', function() {

  beforeEach(function *() {
    var mongoClient = new MongoClient(new this.MongoClient());
    this.db = yield mongoClient.connect(this.url);
    this.col = yield this.db.collection(this.collectionName);
  });

  afterEach(function *() {
    yield this.db.close();
  });


  var dummy = { name: 'yves' };

  it('insertOne should work', function* () {
    var res = yield this.col.insertOne(dummy);
    assert.equal(res.result.ok, 1);
  });

  it('count should work', function* () {
    yield this.col.insertOne(dummy);
    var count = yield this.col.count(dummy);
    assert.equal(count, 1);
  });

  it('findOne should work', function* () {
    yield this.col.insertOne(dummy);
    var doc = yield this.col.findOne(dummy);
    assert(doc.name, dummy.name);
  });

  it('find should work', function* () {
    yield this.col.insertOne(dummy);
    var cursor = this.col.find(dummy);
    assert(cursor);
    assert(cursor instanceof Cursor);
  });

});
