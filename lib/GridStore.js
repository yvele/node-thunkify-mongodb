"use strict";

var WrapperBuilder = require("thunkify-object").WrapperBuilder;
var Collection = require("./Collection").Collection;

var wb = new WrapperBuilder();
var GridStore = wb.getWrapper();

function wrapCollection (p) {
  return p ? new Collection(p) : p;
}

function wrapGridStore (p) {
  return p ? new GridStore(p) : p;
}

// TODO: Properties chunkSize, md5, chunkNumber
// TODO: Static members and methods...

wb.add("close")
  .add("collection", {transformations: {1: wrapCollection} })
  .addPassThrough("destroy")
  .addPassThrough("eof")
  .add("getc")
  .add("open", {transformations: {1: wrapGridStore} })
  .add("puts")
  .add("read")
  .add("readlines")
  .add("rewind")
  .add("seek", {transformations: {1: wrapGridStore} })
  // TODO: .add("stream") -> GridStoreStream
  .add("tell")
  .add("unlink")
  .add("write")
  .add("writeFile");

exports.GridStore = GridStore;
