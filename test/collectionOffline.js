var assert = require('assert');
var Collection = require('../lib').Collection;
var Cursor = require('../lib').Cursor;
var CommandCursor = require('../lib').CommandCursor;
var OrderedBulkOperation = require('../lib').OrderedBulkOperation;
var UnorderedBulkOperation = require('../lib').UnorderedBulkOperation;


describe('Collection', function() {

  var thunkMethods = [
    'bulkWrite',
    'count',
    'createIndex',
    'createIndexes',
    'deleteMany',
    'deleteOne',
    'distinct',
    'drop',
    'dropAllIndexes', // Deprecated
    'dropIndex',
    'dropIndexes',
    'ensureIndex',
    'findAndModify',
    'findAndRemove', // Deprecated
    'findOne',
    'findOneAndDelete',
    'findOneAndReplace',
    'findOneAndUpdate',
    'geoHaystackSearch',
    'geoNear',
    'group',
    'indexes',
    'indexExists',
    'indexInformation',
    'insert', // Deprecated
    'insertMany',
    'insertOne',
    'isCapped',
    'mapReduce',
    'options',
    'parallelCollectionScan',
    'reIndex',
    'remove', // Deprecated
    'rename',
    'replaceOne',
    'save',
    'stats',
    'update', // Deprecated
    'updateMany',
    'updateOne'
  ];

  thunkMethods.forEach(function(method) {
    it(method + ' should return a thunk', function() {

      var mock = {};
      mock[method] = function(callback) { callback() };

      var thunk = new Collection(mock)[method]();
      assert(thunk);
      assert(thunk instanceof Function);
    });
  });

  it('find should return a Cursor', function() {
    var cursor = new Collection({
      find: function() { return {} }
    }).find();

    assert(cursor);
    assert(cursor instanceof Cursor);
  });

  it('find should return null', function() {
    var cursor = new Collection({
      find: function() { return null }
    }).find();

    assert.strictEqual(cursor, null);
  });

  it('parallelCollectionScan should return an array of Cursor', function* () {
    var cursors = yield new Collection({
      parallelCollectionScan: function(callback) { callback(null, [{}]) }
    }).parallelCollectionScan();

    assert.equal(cursors.length, 1);
    assert(cursors[0]);
    assert(cursors[0] instanceof Cursor);
  });

  it('parallelCollectionScan should return null', function* () {
    var cursors = yield new Collection({
      parallelCollectionScan: function(callback) { callback(null, null) }
    }).parallelCollectionScan();

    assert.strictEqual(cursors, null);
  });

  it('listIndexes should return a CommandCursor', function() {
    var cursor = new Collection({
      listIndexes: function() { return {} }
    }).listIndexes();

    assert(cursor);
    assert(cursor instanceof CommandCursor);
  });

  it('listIndexes should return null', function() {
    var cursor = new Collection({
      listIndexes: function() { return null }
    }).listIndexes();

    assert.strictEqual(cursor, null);
  });

  it('initializeOrderedBulkOp should return an OrderedBulkOperation', function () {
    var res = new Collection({
      initializeOrderedBulkOp: function() { return {} }
    }).initializeOrderedBulkOp();

    assert(res);
    assert(res instanceof OrderedBulkOperation);
  });

  it('initializeOrderedBulkOp should return null', function () {
    var res = new Collection({
      initializeOrderedBulkOp: function() { return null }
    }).initializeOrderedBulkOp();

    assert.strictEqual(res, null);
  });

  it('initializeUnorderedBulkOp should return an OrderedBulkOperation', function* () {
    var res = new Collection({
      initializeUnorderedBulkOp: function() { return {} }
    }).initializeUnorderedBulkOp();

    assert(res);
    assert(res instanceof UnorderedBulkOperation);
  });

  it('initializeUnorderedBulkOp should return null', function* () {
    var res = new Collection({
      initializeUnorderedBulkOp: function() { return null }
    }).initializeUnorderedBulkOp();

    assert.strictEqual(res, null);
  });

});
