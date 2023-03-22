const del = require('del');

const { path } = require('../config/path');

exports.clean = function clean() {
  return del(path.clean);
};
