"use strict";

var WrapperBuilder = require("thunkify-object").WrapperBuilder;
var Db = require("./Db").Db;

function wrapDb (db) {
  return new Db(db);
}

exports.MongoClient = new WrapperBuilder()
  .add("connect", {transformations: {1: wrapDb} })
  .getWrapper();
