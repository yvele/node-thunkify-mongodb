'use strict';

var WrapperBuilder = require('thunkify-object').WrapperBuilder;
var Cursor = require('./Cursor').Cursor;
var CommandCursor = require('./CommandCursor').CommandCursor;


function wrapCursor(cursor) {
  return cursor ? new Cursor(cursor) : cursor;
}

function wrapCursorArray(cursors) {
  return cursors ? cursors.map(wrapCursor) : cursors;
}

function wrapCommandCursor(commandCursor) {
  return commandCursor ? new CommandCursor(commandCursor) : commandCursor;
}


exports.Collection = new WrapperBuilder()
  .add('aggregate') // TODO: Add sync version of it
  .add('bulkWrite')
  .add('count')
  .add('createIndex')
  .add('createIndexes')
  .add('deleteMany')
  .add('deleteOne')
  .add('distinct')
  .add('drop')
  .add('dropAllIndexes') // Deprecated
  .add('dropIndex')
  .add('dropIndexes')
  .add('ensureIndexe')
  .addPassThrough('find', { transformation: wrapCursor })
  .add('findAndModify')
  .add('findAndRemove') // Deprecated
  .add('findOne')
  .add('findOneAndDelete')
  .add('findOneAndReplace')
  .add('findOneAndUpdate')
  .add('geoHaystackSearch')
  .add('geoNear')
  .add('group')
  .add('indexes')
  .add('indexExists')
  .add('indexInformation')
  // TODO: .add('initializeOrderedBulkOp')
  // TODO: .add('initializeUnorderedBulkOp')
  .add('insert') // Deprecated
  .add('insertMany')
  .add('insertOne')
  .add('isCapped')
  .addPassThrough('listIndexes', { transformation: wrapCommandCursor })
  .add('mapReduce')
  .add('options')
  .add('parallelCollectionScan', { transformations: { 1: wrapCursorArray }})
  .add('reIndex')
  .add('remove') // Deprecated
  .add('rename')
  .add('replaceOne')
  .add('save')
  .add('stats')
  .add('update') // Deprecated
  .add('updateMany')
  .add('updateOne')
  .getWrapper();
