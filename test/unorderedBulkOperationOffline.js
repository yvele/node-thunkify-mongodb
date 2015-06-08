var assert = require('assert');
var EventEmitter = require('events').EventEmitter;
var UnorderedBulkOperation = require('../lib').UnorderedBulkOperation;
var FindOperatorsUnordered = require('../lib').FindOperatorsUnordered;


describe('UnorderedBulkOperation', function() {

  it('insert should return a UnorderedBulkOperation', function() {
    var res = new UnorderedBulkOperation({
      insert: function() { return {} }
    }).insert();

    assert(res);
    assert(res instanceof UnorderedBulkOperation);
  });

  it('insert should return null', function() {
    var res = new UnorderedBulkOperation({
      insert: function() { return null }
    }).insert();

    assert.strictEqual(res, null);
  });

});
