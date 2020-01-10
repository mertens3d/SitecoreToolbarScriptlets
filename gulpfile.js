/// <binding />
const gulp = require('gulp');
const minify = require('gulp-minify');
const path = require('path');
const vars = require('./gulp.support/vars');

var cleanTasks = require('./gulp.support/tasks/cleanTasks');
var gulpif = require('gulp-if');

var htmlTasks = require('./gulp.support/tasks/htmlTasks');
var InjectableClass = require('./gulp.support/OneInjectable.js');
var jstasks = require('./gulp.support/tasks/jstasks');
var lazypipe = require('lazypipe');
var openerTasks = require('./gulp.support/tasks/OpenerTasks');
var otherTasks = require('./gulp.support/tasks/otherTasks');
var putTasks = require('./gulp.support/tasks/putTasks');
var styleTasks = require('./gulp.support/tasks/styleTasks');
var tsTasks = require('./gulp.support/tasks/tsTasks');

//vars.jsToInject.SourceDirFilter = './WorkingCode/jsToInject/**/**/*.js';

var varsObj = new vars();

gulp.task('BookmarkText', (cb) => otherTasks.BookmarkText(cb, varsObj));
gulp.task('buildHtmlToInject', (cb) => htmlTasks.BuildHtml(cb, varsObj));
gulp.task('buildJsToInject', (cb) => jstasks.buildJsToInject(cb, varsObj));
gulp.task('buildStylesToInject', (cb) => styleTasks.BuildStylesToInject(cb, varsObj));
gulp.task('BuildTypescript', (cb) => tsTasks.BuildTypeScript(cb, varsObj));
gulp.task('buildWindowOpenerForBookMark', (cb) => openerTasks.buildWindowOpenerForBookMark(cb, varsObj));
gulp.task('cleanAddons', (cb) => cleanTasks.cleanAddons(cb, varsObj));
gulp.task('cleanDist', (cb) => cleanTasks.cleanDist(cb, varsObj));
gulp.task('combineJs', (cb) => jstasks.combineJs(cb, varsObj));
gulp.task('putToAddon', (cb) => putTasks.PutToAddon(cb, varsObj));
gulp.task('putWindowOpenerToLocal', (cb) => putTasks.putWindowOpenerToLocal(cb, varsObj));
gulp.task('webpack', (cb) => otherTasks.webpack(cb, varsObj));

//'combineJs', 'buildJsToInject',

gulp.task('default', gulp.series(['cleanDist', 'cleanAddons', 'buildStylesToInject', 'BuildTypescript', 'webpack', 'buildHtmlToInject', 'buildWindowOpenerForBookMark', 'BookmarkText', 'putWindowOpenerToLocal', 'putToAddon']), function (resolve) {
  resolve();
});