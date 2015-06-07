var assert = require('assert');
var EventEmitter = require('events').EventEmitter;
var Db = require('../lib').Db;
var Collection = require('../lib').Collection;
var Admin = require('../lib').Admin;
var CommandCursor = require('../lib').CommandCursor;


describe('Db', function() {

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


  it('on should work', function* () {

    var db = new Db(new EventEmitter());

    setTimeout(function() {
      db.emit('test');
    }, 5);

    yield db.on('test');
  });

  it('on should work with a callback', function(done) {

    var db = new Db(new EventEmitter());

    setTimeout(function() {
      db.emit('test');
    }, 5);

    db.on('test', done);
  });

  it('once with fullsetup event should work', function* () {

    var db = new Db(new EventEmitter());

    setTimeout(function() {
      db.emit('fullsetup', {});
    }, 5);

    var db = yield db.on('fullsetup');
    assert(db);
    assert(db instanceof Db);
  });

  it('once with fullsetup event should work with a callback', function(done) {

    var db = new Db(new EventEmitter());

    setTimeout(function() {
      db.emit('fullsetup', {});
    }, 5);

    db.on('fullsetup', function(db) {
      assert(db);
      assert(db instanceof Db);
      done();
    });
  });

  it('admin should return an Admin instance', function() {
    var admin = new Db({
      admin: function () { return {} }
    }).admin();

    assert(admin);
    assert(admin instanceof Admin);
  });

  it('admin should return null', function() {
    var admin = new Db({
      admin: function () { return null }
    }).admin();

    assert.equal(admin, null);
  });

  it('listCollections should return a CommandCursor', function() {
    var cursor = new Db({
      listCollections: function() { return {} }
    }).listCollections();

    assert(cursor);
    assert(cursor instanceof CommandCursor);
  });

  it('listCollections should return null', function() {
    var cursor = new Db({
      listCollections: function() { return null }
    }).listCollections();

    assert.strictEqual(cursor, null);
  });

});
