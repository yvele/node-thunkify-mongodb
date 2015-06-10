"use strict";

var WrapperBuilder = require("thunkify-object").WrapperBuilder;

var wb = new WrapperBuilder();
var Cursor = exports.Cursor = wb.getWrapper();

function wrapCursor (cursor) {
  return cursor ? new Cursor(cursor) : cursor;
}

wb.addPassThrough("addCursorFlag", {transformation: wrapCursor})
  .addPassThrough("addQueryModifier", {transformation: wrapCursor})
  .addPassThrough("batchSize", {transformation: wrapCursor})
  .addPassThrough("clone", {transformation: wrapCursor})
  .add("close")
  .addPassThrough("comment", {transformation: wrapCursor})
  .add("count")
  .addPassThrough("cursorLimit")
  .addPassThrough("cursorSkip")
  .add("each") // Deprecated
  .add("explain")
  .addPassThrough("filter", {transformation: wrapCursor})
  .add("forEach")
  .addPassThrough("isClosed")
  .addPassThrough("limit", {transformation: wrapCursor})
  .addPassThrough("map")
  .addPassThrough("maxTimeMS", {transformation: wrapCursor})
  .add("next") // Inherited
  .add("nextObject") // Deprecated
  .addPassThrough("pause") // Inherited
  .addPassThrough("pipe") // Inherited
  .addPassThrough("project", {transformation: wrapCursor})
  .addPassThrough("read") // Inherited
  .addPassThrough("resume") // Inherited
  .addPassThrough("rewind") // Inherited
  .addPassThrough("setBatchSize")
  .addPassThrough("setCursorLimit")
  .addPassThrough("setCursorOption", {transformation: wrapCursor})
  .addPassThrough("setCursorSkip")
  .addPassThrough("setEncoding") // Inherited
  .addPassThrough("setReadPreference", {transformation: wrapCursor})
  .addPassThrough("skip", {transformation: wrapCursor})
  .addPassThrough("sort", {transformation: wrapCursor})
  .addPassThrough("stream", {transformation: wrapCursor})
  .add("toArray")
  .addPassThrough("unpipe") // Inherited
  .addPassThrough("unshift") // Inherited
  .addPassThrough("wrap"); // Inherited

  // EventEmitter methods
wb.addEvent(["on", "once"])
  .addPassThrough("addListener")
  .addPassThrough("removeListener")
  .addPassThrough("removeAllListeners")
  .addPassThrough("setMaxListeners")
  .addPassThrough("listeners")
  .addPassThrough("emit");
