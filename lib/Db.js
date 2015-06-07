'use strict';

var WrapperBuilder = require('thunkify-object').WrapperBuilder;
var Collection = require('./Collection').Collection;


var wb = new WrapperBuilder();
var Db = exports.Db = wb.getWrapper();

function wrapCollection(collection) {
  return collection ? new Collection(collection) : collection;
}

function wrapCollectionArray(collections) {
  return collections ? collections.map(wrapCollection) : collections;
}

function wrapDb(db) {
  return new Db(db);
}

wb.add('addUser')
  // TODO: .add('admin')
  .add('authenticate')
  .add('close')
  .add('collection', {
    transformations: { 1: wrapCollection },
    sync: { transformation: wrapCollection }
  })
  .add('collections', { transformations: { 1: wrapCollectionArray } })
  .add('command')
  .add('createCollection', { transformations: { 1: wrapCollection } })
  .add('createIndex')
  .addPassThrough('db', { transformation: wrapDb })
  .add('dropCollection')
  .add('dropDatabase')
  .add('ensureIndex') // Deprecated
  .add('eval')
  .add('executeDbAdminCommand')
  .add('indexInformation')
  // TODO: .add('listCollections') -> CommandCursor
  .add('logout')
  .add('open')
  .add('removeUser')
  .add('renameCollection', { transformations: { 1: wrapCollection } })
  .add('stats');

// EventEmitter methods
wb.addEvent(
    ['on', 'once'], {
      events: {
        'fullsetup': { transformations: { 0: wrapDb } }
      }
    }
  )
  .addPassThrough('addListener')
  .addPassThrough('removeListener')
  .addPassThrough('removeAllListeners')
  .addPassThrough('setMaxListeners')
  .addPassThrough('listeners')
  .addPassThrough('emit');
