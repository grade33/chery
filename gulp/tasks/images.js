const {src, dest} = require('gulp');
const imagemin = require('gulp-imagemin');
const { path } = require('../config/path');
const { plugins } = require('../config/plugins');
const { isProd } = require('../config/mode');

exports.images = function images() {
  return src(path.src.images)
    .pipe(plugins.newer(path.build.images))
    .pipe(plugins.if(isProd, plugins.newer(path.build.images)))
    .pipe(plugins.if(isProd, imagemin()))
    .pipe(dest(path.build.images))
    .pipe(plugins.browsersync.stream());
};
