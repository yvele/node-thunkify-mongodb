var assert = require('assert');
var helper = require('./helper');
var GridStore = require('../lib').GridStore;
var Collection = require('../lib').Collection;

describe('Db', function () {

  [
    'collection'
  ].forEach(function (method) {
    it(method + ' should return a Collection', function* () {

      var mock = {};
      mock[method] = helper.getEmptyObject;

      var cursor = yield new GridStore(mock)[method]();

      assert(cursor);
      assert(cursor instanceof Collection);
    });

    it(method + ' should return null', function* () {

      var mock = {};
      mock[method] = helper.getNull;

      var cursor = yield new GridStore(mock)[method]();
      assert.strictEqual(cursor, null);
    });
  });

  [
    'open',
    'seek'
  ].forEach(function (method) {
    it(method + ' should return a GridStore', function* () {

      var mock = {};
      mock[method] = helper.getEmptyObject;

      var cursor = yield new GridStore(mock)[method]();

      assert(cursor);
      assert(cursor instanceof GridStore);
    });

    it(method + ' should return null', function* () {

      var mock = {};
      mock[method] = helper.getNull;

      var cursor = yield new GridStore(mock)[method]();
      assert.strictEqual(cursor, null);
    });
  });

});
