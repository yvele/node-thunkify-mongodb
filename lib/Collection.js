"use strict";

var WrapperBuilder = require("thunkify-object").WrapperBuilder;
var Cursor = require("./Cursor").Cursor;
var CommandCursor = require("./CommandCursor").CommandCursor;
var OrderedBulkOperation = require("./OrderedBulkOperation").OrderedBulkOperation;
var UnorderedBulkOperation = require("./UnorderedBulkOperation").UnorderedBulkOperation;

function wrapCursor (p) {
  return p ? new Cursor(p) : p;
}

function wrapCursorArray (p) {
  return p ? p.map(wrapCursor) : p;
}

function wrapCommandCursor (p) {
  return p ? new CommandCursor(p) : p;
}

function wrapOrderedBulkOperation (p) {
  return p ? new OrderedBulkOperation(p) : p;
}

function wrapUnorderedBulkOperation (p) {
  return p ? new UnorderedBulkOperation(p) : p;
}

exports.Collection = new WrapperBuilder()
  .add("aggregate") // TODO: Add sync version of it
  .add("bulkWrite")
  .add("count")
  .add("createIndex")
  .add("createIndexes")
  .add("deleteMany")
  .add("deleteOne")
  .add("distinct")
  .add("drop")
  .add("dropAllIndexes") // Deprecated
  .add("dropIndex")
  .add("dropIndexes")
  .add("ensureIndex")
  .addPassThrough("find", {transformation: wrapCursor})
  .add("findAndModify")
  .add("findAndRemove") // Deprecated
  .add("findOne")
  .add("findOneAndDelete")
  .add("findOneAndReplace")
  .add("findOneAndUpdate")
  .add("geoHaystackSearch")
  .add("geoNear")
  .add("group")
  .add("indexes")
  .add("indexExists")
  .add("indexInformation")
  .addPassThrough("initializeOrderedBulkOp",
    {transformation: wrapOrderedBulkOperation})
  .addPassThrough("initializeUnorderedBulkOp",
    {transformation: wrapUnorderedBulkOperation})
  .add("insert") // Deprecated
  .add("insertMany")
  .add("insertOne")
  .add("isCapped")
  .addPassThrough("listIndexes", {transformation: wrapCommandCursor})
  .add("mapReduce")
  .add("options")
  .add("parallelCollectionScan", {transformations: {1: wrapCursorArray} })
  .add("reIndex")
  .add("remove") // Deprecated
  .add("rename")
  .add("replaceOne")
  .add("save")
  .add("stats")
  .add("update") // Deprecated
  .add("updateMany")
  .add("updateOne")
  .getWrapper();
