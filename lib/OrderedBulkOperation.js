"use strict";

var WrapperBuilder = require("thunkify-object").WrapperBuilder;

var wb = new WrapperBuilder();
var OrderedBulkOperation = wb.getWrapper();

function wrapOrderedBulkOperation (p) {
  return p ? new OrderedBulkOperation(p) : p;
}

// TODO: length getter (return OrderedBulkOperation)
wb.add("execute")
  .addPassThrough("find")
  .addPassThrough("insert", {transformation: wrapOrderedBulkOperation});

exports.OrderedBulkOperation = OrderedBulkOperation;
