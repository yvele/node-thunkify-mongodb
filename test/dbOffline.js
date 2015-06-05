var assert = require('assert');
var Db = require('../lib').Db;
var Collection = require('../lib').Collection;


describe('Collection', function() {

  it('collectionSync should return null', function() {
    var col = new Db({
      collection: function() { return null }
    }).collectionSync();

    assert.strictEqual(col, null);
  });

  it('collection should return null', function* () {
    var col = yield new Db({
      collection: function(callback) { callback(null, null) }
    }).collection();

    assert.strictEqual(col, null);
  });

  it('collections should return an array of Collection', function* () {
    var cols = yield new Db({
      collections: function(callback) { callback(null, [{}]) }
    }).collections();

    assert.equal(cols.length, 1);
    assert(cols[0]);
    assert(cols[0] instanceof Collection);
  });

  it('collections should return null', function* () {
    var cols = yield new Db({
      collections: function(callback) { callback(null, null) }
    }).collections();

    assert.strictEqual(cols, null);
  });

  it('db should return a Db', function () {
    var db = new Db({
      db: function() { return {} }
    }).db();

    assert(db);
    assert(db instanceof Db);
  });

});
