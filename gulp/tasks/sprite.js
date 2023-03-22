const { dest, src } = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const svgo = require('gulp-svgo');
const { path } = require('../config/path');
const { plugins } = require('../config/plugins');

exports.sprite = function sprite() {
  return src(path.src.sprite)
    .pipe(
      svgo({
        configFile: './svgo.config.js',
      })
    )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: `../sprite.svg`,
          },
        },
      })
    )
    .pipe(dest(path.build.sprite))
    .pipe(plugins.browsersync.stream());
};
