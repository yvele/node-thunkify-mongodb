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

  it('initializeOrderedBulkOp should work', function* () {

    //http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#initializeOrderedBulkOp

    var batch = this.col.initializeOrderedBulkOp();
    batch.insert({a:1});
    batch.find({a:1}).updateOne({$set: {b:1}});
    batch.find({a:2}).upsert().updateOne({$set: {b:2}});
    batch.insert({a:3});
    batch.find({a:3}).delete({a:3});

    // Execute the operations
    var result = yield batch.execute();

    // Check state of result
    assert.equal(2, result.nInserted);
    assert.equal(1, result.nUpserted);
    assert.equal(1, result.nMatched);
    assert(1 == result.nModified || result.nModified == null);
    assert.equal(1, result.nRemoved);

    var upserts = result.getUpsertedIds();
    assert.equal(1, upserts.length);
    assert.equal(2, upserts[0].index);
    assert(upserts[0]._id != null);

    var upsert = result.getUpsertedIdAt(0);
    assert.equal(2, upsert.index);
    assert.ok(upsert._id != null);
  });

  it('initializeUnorderedBulkOp should work', function* () {

    // http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#initializeUnorderedBulkOp

    var batch = this.col.initializeUnorderedBulkOp({useLegacyOps: true});
    batch.insert({a:1});
    batch.find({a:1}).updateOne({$set: {b:1}});
    batch.find({a:2}).upsert().updateOne({$set: {b:2}});
    batch.insert({a:3});
    batch.find({a:3}).remove({a:3});

    // Execute the operations
    var result = yield batch.execute();

    // Check state of result
    assert.equal(2, result.nInserted);
    assert.equal(1, result.nUpserted);
    assert.equal(1, result.nMatched);
    assert.ok(1 == result.nModified || result.nModified == null);
    assert.equal(1, result.nRemoved);

    var upserts = result.getUpsertedIds();
    assert.equal(1, upserts.length);
    assert.equal(2, upserts[0].index);
    assert.ok(upserts[0]._id != null);

    var upsert = result.getUpsertedIdAt(0);
    assert.equal(2, upsert.index);
    assert.ok(upsert._id != null);
  });

});
