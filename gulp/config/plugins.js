const replace = require('gulp-replace'); // Поиск и замена
const browsersync = require('browser-sync'); // Локальный сервер
const newer = require('gulp-newer'); // Проверка обновления
const ifPlugin = require('gulp-if'); // Условное ветвление

// Экспортируем объект
exports.plugins = {
  replace,
  browsersync,
  newer,
  if: ifPlugin,
};
