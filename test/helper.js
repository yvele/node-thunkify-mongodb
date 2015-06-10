var getEmptyObject = function (callback) {
  return callback(null, {});
};

var getNull = function (callback) {
  return callback(null, null);
};

exports.getEmptyObject = getEmptyObject;
exports.getNull = getNull;
