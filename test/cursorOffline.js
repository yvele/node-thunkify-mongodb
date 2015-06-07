var assert = require('assert');
var EventEmitter = require('events').EventEmitter;
var Cursor = require('../lib').Cursor;


describe('Cursor', function() {

  var thunkMethods = [
    'close',
    'count',
    'each', // Deprecated
    'explain',
    'forEach',
    'next', // Inherited
    'nextObject', // Deprecated
    'toArray'
  ];

  thunkMethods.forEach(function(method) {
    it(method + ' should return a thunk', function() {

      var mock = {};
      mock[method] = function(callback) { callback() };

      var thunk = new Cursor(mock)[method]();
      assert(thunk);
      assert(thunk instanceof Function);
    });
  });

  var cursorReturningMethods = [
    'addQueryModifier',
    'batchSize',
    'clone',
    'comment',
    'filter',
    'limit',
    'maxTimeMS',
    'project',
    'setCursorOption',
    'setReadPreference',
    'skip',
    'sort',
    'stream'
  ];

  cursorReturningMethods.forEach(function(method) {
    it(method + ' should return a Cursor', function() {

      var mock = {};
      mock[method] = function() { return {} };

      var cursor = new Cursor(mock)[method]();

      assert(cursor);
      assert(cursor instanceof Cursor);
    });

    it(method + ' should return null', function() {

      var mock = {};
      mock[method] = function() { return null };

      var cursor = new Cursor(mock)[method]();
      assert.strictEqual(cursor, null);
    });
  });

  it('on should work', function* () {

    var cursor = new Cursor(new EventEmitter());

    setTimeout(function() {
      cursor.emit('test');
    }, 5);

    yield cursor.on('test');
  });

  it('on should work with a callback', function(done) {

    var cursor = new Cursor(new EventEmitter());

    setTimeout(function() {
      cursor.emit('test');
    }, 5);

    cursor.on('test', done);
  });

  it('once should work', function* () {

    var cursor = new Cursor(new EventEmitter());

    setTimeout(function() {
      cursor.emit('test');
    }, 5);

    yield cursor.once('test');
  });

  it('once should work with a callback', function(done) {

    var cursor = new Cursor(new EventEmitter());

    setTimeout(function() {
      cursor.emit('test');
    }, 5);

    cursor.once('test', done);
  });

});
