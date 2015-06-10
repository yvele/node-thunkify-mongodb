[![NPM version][npm-version-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

# thunkify-mongodb

[Installation](#installation) | [Examples](#examples) | [Supported MongoDB versions](#supported-mongodb-versions) | [Roadmap](#roadmap) | [Under the hood](#under-the-hood) | [Running tests](#running-tests) | [License](#license)

Give [MongoDB native driver](http://mongodb.github.io/node-mongodb-native/) 2.0 a sweet generator aftertaste :lollipop:

Wrapper on [MongoDB native driver](http://mongodb.github.io/node-mongodb-native/) to provide thunk methods, useful for generator-based flow control such as [co](https://github.com/visionmedia/co), [Koa](http://koajs.com/), etc.

## Installation

```
$ npm install thunkify-mongodb --save
```

## Examples

[Basic](#basic) | [Events](#events) | [Bulk Operations](#bulk-operations)

### Basic

```js
var MongoClient = require('thunkify-mongodb').MongoClient;
var mongodb = require('mongodb');

function* insertSomething(url) {
  var mongoClient = new MongoClient(new mongodb.MongoClient());

  var db = yield mongoClient.connect(url);

  var collection = yield db.collection('Documents');
  yield collection.insertOne({ some: 'thing' });

  yield db.close();
}
```

### Events

All [EventEmitter methods](https://iojs.org/api/events.html#events_class_events_eventemitter) are wrapped.

You can use `on` and `once` methods as generators:

```js
yield db.on('close');
```

You can also use them with a callback:

```js
db.on('close', function() {

});
```

### Bulk Operations

```js
var MongoClient = require('thunkify-mongodb').MongoClient;
var mongodb = require('mongodb');

function* doBulk(url) {
  var mongoClient = new MongoClient(new mongodb.MongoClient());

  var db = yield mongoClient.connect(url);

  var collection = yield db.collection('Documents');

  var batch = collection.initializeOrderedBulkOp();
  batch.insert({a:1});
  batch.find({a:1}).updateOne({$set: {b:1}});
  batch.find({a:2}).upsert().updateOne({$set: {b:2}});
  batch.insert({a:3});
  batch.find({a:3}).delete({a:3});

  // Execute the operations
  var result = yield batch.execute();

  yield db.close();

  return result;
}
```


## Supported MongoDB versions

* All 2.X.X versions of MongoDB Native Driver are supported.


## Roadmap

AggregationCursor, GridStore, Mongos, etc. coming soon. Feel free to PR.


## Under the hood

[thunkify-object](https://github.com/yvele/node-thunkify-object) is used as a thunk wrapper engine.


## Running tests

You need a running MongoDB instance on `mongodb://localhost:27017/thunkify-mongodb-test` to run all the tests.

```
$ make test
```

With code coverage.

```
$ make test-cov
```

## License

Thunkify-mongodb is freely distributable under the terms of the [MIT license](LICENSE).

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/thunkify-mongodb
[npm-version-image]: http://img.shields.io/npm/v/thunkify-mongodb.svg?style=flat

[travis-url]: http://travis-ci.org/yvele/node-thunkify-mongodb
[travis-image]: http://img.shields.io/travis/yvele/node-thunkify-mongodb.svg?style=flat

[coveralls-url]: https://coveralls.io/r/yvele/node-thunkify-mongodb
[coveralls-image]: https://img.shields.io/coveralls/yvele/node-thunkify-mongodb.svg?style=flat
