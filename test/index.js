var assert = require('assert');
var mongodb = require('mongodb');


/** @const */
var CONFIG = {
  url: 'mongodb://localhost:27017/thunkify-mongodb-test',
  collectionName: 'Documents'
};


function cleanup(url, done) {
  mongodb.MongoClient.connect(url, function(err, db) {
    assert.ifError(err);

    db.dropCollection('Documents', function(err, res) {
      db.close(true, function(err) {
        assert.ifError(err);
        done();
      });
    });
  });
}

describe('Online Tests', function() {

  before(function() {
    // Shared
    this.mongodb = mongodb;
    this.MongoClient = mongodb.MongoClient;
    this.url = CONFIG.url;
    this.collectionName = CONFIG.collectionName;
  })

  beforeEach(function(done) {
    cleanup(this.url, done);
  });

  afterEach(function(done) {
    cleanup(this.url, done);
  });

  require('./mongoClient');
  require('./db');
  require('./collection');
});

describe('Offline Tests', function() {
  require('./dbOffline');
  require('./collectionOffline');
  require('./cursorOffline');
  require('./commandCursorOffline');
  require('./orderedBulkOperationOffline');
  require('./unorderedBulkOperationOffline');
  require('./gridStoreOffline');
});
