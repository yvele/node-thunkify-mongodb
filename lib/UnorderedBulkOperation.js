"use strict";

var WrapperBuilder = require("thunkify-object").WrapperBuilder;

var wb = new WrapperBuilder();
var UnorderedBulkOperation = wb.getWrapper();

function wrapUnorderedBulkOperation (p) {
  return p ? new UnorderedBulkOperation(p) : p;
}

wb.add("execute")
  .addPassThrough("find")
  .addPassThrough("insert", {transformation: wrapUnorderedBulkOperation});

exports.UnorderedBulkOperation = UnorderedBulkOperation;
