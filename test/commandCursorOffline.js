var assert = require('assert');
var EventEmitter = require('events').EventEmitter;
var CommandCursor = require('../lib').CommandCursor;


describe('CommandCursor', function() {

  var thunkMethods = [
    'close',
    'each',
    'next',
    'toArray'
  ];

  thunkMethods.forEach(function(method) {
    it(method + ' should return a thunk', function() {

      var mock = {};
      mock[method] = function(callback) { callback() };

      var thunk = new CommandCursor(mock)[method]();
      assert(thunk);
      assert(thunk instanceof Function);
    });
  });

  var cursorReturningMethods = [
    'clone',
    'maxTimeMS',
    'rewind'
  ];

  cursorReturningMethods.forEach(function(method) {
    it(method + ' should return a CommandCursor', function() {

      var mock = {};
      mock[method] = function() { return {} };

      var cursor = new CommandCursor(mock)[method]();

      assert(cursor);
      assert(cursor instanceof CommandCursor);
    });

    it(method + ' should return null', function() {

      var mock = {};
      mock[method] = function() { return null };

      var cursor = new CommandCursor(mock)[method]();
      assert.strictEqual(cursor, null);
    });
  });

  it('on should work', function* () {

    var cursor = new CommandCursor(new EventEmitter());

    setTimeout(function() {
      cursor.emit('test');
    }, 5);

    yield cursor.on('test');
  });

  it('on should work with a callback', function(done) {

    var cursor = new CommandCursor(new EventEmitter());

    setTimeout(function() {
      cursor.emit('test');
    }, 5);

    cursor.on('test', done);
  });

  it('once should work', function* () {

    var cursor = new CommandCursor(new EventEmitter());

    setTimeout(function() {
      cursor.emit('test');
    }, 5);

    yield cursor.once('test');
  });

  it('once should work with a callback', function(done) {

    var cursor = new CommandCursor(new EventEmitter());

    setTimeout(function() {
      cursor.emit('test');
    }, 5);

    cursor.once('test', done);
  });

});
