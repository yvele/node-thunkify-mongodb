# thunkify-mongodb
[![NPM version][npm-version-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Wrapper on [MongoDB native driver](http://mongodb.github.io/node-mongodb-native/) to provide thunk methods, useful for generator-based flow control such as [co](https://github.com/visionmedia/co).

## Installation

```
$ npm install thunkify-mongodb --save
```

## Example

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

## Supported MongoDB native driver versions

* All 2.X.X versions of MongoDB driver are supported.

## Unsupported yet (todo)

Aggregation, Admin, CommandCursor, etc. coming soon. Feel free to PR.

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