const { path } = require('../config/path');
const {src, dest} = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('../../webpack.config');
const { plugins } = require('../config/plugins');

exports.webpackTask = function webpackTask() {
  return src(path.src.scripts)
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(dest(path.buildFolder))
    .pipe(plugins.browsersync.stream());
};
