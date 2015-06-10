"use strict";

var WrapperBuilder = require("thunkify-object").WrapperBuilder;
var Collection = require("./Collection").Collection;
var Admin = require("./Admin").Admin;
var CommandCursor = require("./CommandCursor").CommandCursor;

var wb = new WrapperBuilder();
var Db = wb.getWrapper();

function wrapCollection (collection) {
  return collection ? new Collection(collection) : collection;
}

function wrapCollectionArray (collections) {
  return collections ? collections.map(wrapCollection) : collections;
}

function wrapDb (db) {
  return new Db(db);
}

function wrapAdmin (admin) {
  return admin ? new Admin(admin) : admin;
}

function wrapCommandCursor (commandCursor) {
  return commandCursor ? new CommandCursor(commandCursor) : commandCursor;
}

wb.add("addUser")
  .addPassThrough("admin", {transformation: wrapAdmin})
  .add("authenticate")
  .add("close")
  .add("collection", {
    transformations: {1: wrapCollection},
    sync: {transformation: wrapCollection}
  })
  .add("collections", {transformations: {1: wrapCollectionArray} })
  .add("command")
  .add("createCollection", {transformations: {1: wrapCollection} })
  .add("createIndex")
  .addPassThrough("db", {transformation: wrapDb})
  .add("dropCollection")
  .add("dropDatabase")
  .add("ensureIndex") // Deprecated
  .add("eval")
  .add("executeDbAdminCommand")
  .add("indexInformation")
  .addPassThrough("listCollections", {transformation: wrapCommandCursor})
  .add("logout")
  .add("open")
  .add("removeUser")
  .add("renameCollection", {transformations: {1: wrapCollection} })
  .add("stats");

// EventEmitter methods
wb.addEvent(
    ["on", "once"], {
      events: {
        fullsetup: {transformations: {0: wrapDb} }
      }
    }
  )
  .addPassThrough("addListener")
  .addPassThrough("removeListener")
  .addPassThrough("removeAllListeners")
  .addPassThrough("setMaxListeners")
  .addPassThrough("listeners")
  .addPassThrough("emit");

exports.Db = Db;
