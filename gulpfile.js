// Основной модуль
const gulp = require('gulp');

// Импорт путей и общих плагинов
const { path } = require('./gulp/config/path');

// Импор задач
const { server } = require('./gulp/tasks/server');
const { clean } = require('./gulp/tasks/clean');
const { webpackTask } = require('./gulp/tasks/webpackTask');
const { markup } = require('./gulp/tasks/markup');
const { styles } = require('./gulp/tasks/styles');
const { images } = require('./gulp/tasks/images');
const { sprite } = require('./gulp/tasks/sprite');
const { resources } = require('./gulp/tasks/resources');
const {
  otfToTtf,
  ttfToWoff,
  fontDrag,
  fontStyle,
} = require('./gulp/tasks/fonts.js');

// Наблюдатель за изменениями в файлах
const watcher = () => {
  gulp.watch(path.watch.markup, markup);
  gulp.watch(path.watch.styles, styles);
  gulp.watch(path.watch.scripts, webpackTask);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.sprite, sprite);
  gulp.watch(path.watch.resources, resources);
};

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontDrag, fontStyle);

// Основные задачи
const mainTasks = gulp.series(fonts, styles, webpackTask, markup, images, sprite, resources);

// Построение сценариев для выполнения задач
const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(clean, mainTasks);
const serve = gulp.series(server);

// Экспорт сценариев
module.exports = { dev, build, serve };

// Выполнение сценария по умолчанию
gulp.task('default', dev);
