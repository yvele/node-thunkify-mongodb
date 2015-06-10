"use strict";

var WrapperBuilder = require("thunkify-object").WrapperBuilder;

var wb = new WrapperBuilder();
var CommandCursor = wb.getWrapper();

function wrapCommandCursor (commandCursor) {
  return commandCursor ? new CommandCursor(commandCursor) : commandCursor;
}

// TODO: batchSize getter and setter
wb.addPassThrough("clone", {transformation: wrapCommandCursor})
  .add("close")
  .add("each")
  .addPassThrough("isClosed")
  .addPassThrough("maxTimeMS", {transformation: wrapCommandCursor})
  .add("next")
  .addPassThrough("pause") // Inherited
  .addPassThrough("pipe") // Inherited
  .addPassThrough("read") // Inherited
  .addPassThrough("resume") // Inherited
  .addPassThrough("rewind", {transformation: wrapCommandCursor})
  .addPassThrough("setBatchSize")
  .addPassThrough("setEncoding") // Inherited
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

exports.CommandCursor = CommandCursor;
