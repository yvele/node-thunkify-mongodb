var assert = require('assert');
var EventEmitter = require('events').EventEmitter;
var OrderedBulkOperation = require('../lib').OrderedBulkOperation;
var FindOperatorsOrdered = require('../lib').FindOperatorsOrdered;


describe('OrderedBulkOperation', function() {

  it('insert should return a OrderedBulkOperation', function() {
    var res = new OrderedBulkOperation({
      insert: function() { return {} }
    }).insert();

    assert(res);
    assert(res instanceof OrderedBulkOperation);
  });

  it('insert should return null', function() {
    var res = new OrderedBulkOperation({
      insert: function() { return null }
    }).insert();

    assert.strictEqual(res, null);
  });

});
