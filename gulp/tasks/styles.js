const { src, dest } = require('gulp');
const { path } = require('../config/path');
const { plugins } = require('../config/plugins');
const { isDev, isProd } = require('../config/mode');

const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const postcss = require('gulp-postcss');
const groupCssMediaQueries = require('gulp-group-css-media-queries');
const cleanCss = require('gulp-clean-css');

const sass = gulpSass(dartSass)
const postcssConfig = require('../../postcss.config');

exports.styles = function styles() {
  return src(path.src.styles, {
      sourcemaps: isDev
    })
    .pipe(sass({
      includePaths: ['node_modules'],
      outputStyle: 'expanded'
    }))
    .pipe(plugins.replace(/@\//g, '../../'))
    .pipe(plugins.if(isProd, groupCssMediaQueries()))
    .pipe(plugins.if(isProd, cleanCss({
      level: 2
    })))
    .pipe(plugins.if(isProd, postcss(postcssConfig)))
    .pipe(dest(path.build.styles, {
      sourcemaps: isDev
    }))
    .pipe(plugins.browsersync.stream())
}
