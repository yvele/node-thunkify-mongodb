'use strict';

var WrapperBuilder = require('thunkify-object').WrapperBuilder;
var UnorderedBulkOperation = require('./UnorderedBulkOperation').UnorderedBulkOperation;


var wb = new WrapperBuilder();
var UnorderedBulkOperation = exports.UnorderedBulkOperation = wb.getWrapper();

function wrapUnorderedBulkOperation(p) {
  return p ? new UnorderedBulkOperation(p) : p;
}

wb.add('execute')
  .addPassThrough('find')
  .addPassThrough('insert', { transformation: wrapUnorderedBulkOperation });
