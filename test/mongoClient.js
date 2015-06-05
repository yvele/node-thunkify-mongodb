var assert = require('assert');
var MongoClient = require('../lib').MongoClient;

describe('MongoClient', function() {

  beforeEach(function() {
    this.mongoClient = new MongoClient(new this.MongoClient());
  });
  

  it('connect should work', function* () {
    var db = yield this.mongoClient.connect(this.url);
    yield db.close();
  });

});
