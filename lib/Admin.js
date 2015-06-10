"use strict";

var WrapperBuilder = require("thunkify-object").WrapperBuilder;

exports.Admin = new WrapperBuilder()
  .add("addUser")
  .add("authenticate")
  .add("buildInfo")
  .add("command")
  .add("listDatabases")
  .add("logout")
  .add("ping")
  .add("profilingInfo")
  .add("profilingLevel")
  .add("removeUser")
  .add("replSetGetStatus")
  .add("serverInfo")
  .add("serverStatus")
  .add("setProfilingLevel")
  .add("validateCollection")
  .getWrapper();
