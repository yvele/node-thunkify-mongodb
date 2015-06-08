'use strict';

var WrapperBuilder = require('thunkify-object').WrapperBuilder;
var OrderedBulkOperation = require('./OrderedBulkOperation').OrderedBulkOperation;


var wb = new WrapperBuilder();
var OrderedBulkOperation = exports.OrderedBulkOperation = wb.getWrapper();

function wrapOrderedBulkOperation(p) {
  return p ? new OrderedBulkOperation(p) : p;
}

// TODO: length getter (return OrderedBulkOperation)
wb.add('execute')
  .addPassThrough('find')
  .addPassThrough('insert', { transformation: wrapOrderedBulkOperation });
