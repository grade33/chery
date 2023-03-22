const { dest, src } = require("gulp");
const { path } = require("../config/path");
const { plugins } = require("../config/plugins");

exports.resources = function resources() {
  return src(path.src.resources)
    .pipe(dest(path.build.resources))
    .pipe(plugins.browsersync.stream());
};
