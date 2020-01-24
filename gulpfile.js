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

//vars.jsContent.SourceDirFilter = './WorkingCode/jsContent/**/**/*.js';

var varsObj = new vars();

gulp.task('BookmarkText', (cb) => otherTasks.BookmarkText(cb, varsObj));
gulp.task('buildPopUp', (cb) => htmlTasks.BuildHtml(cb, varsObj));
gulp.task('buildjsContent', (cb) => jstasks.buildjsContent(cb, varsObj));
gulp.task('buildStylesToInject', (cb) => styleTasks.BuildStylesToInject(cb, varsObj));
gulp.task('BuildTypescriptShared', (cb) => tsTasks.BuildTypeScriptShared(cb, varsObj));
gulp.task('BuildTypescriptContent', (cb) => tsTasks.BuildTypeScriptContent(cb, varsObj));
gulp.task('BuildTypescriptPopUp', (cb) => tsTasks.BuildTypeScriptPopUp(cb, varsObj));
gulp.task('buildWindowOpenerForBookMark', (cb) => openerTasks.buildWindowOpenerForBookMark(cb, varsObj));
gulp.task('cleanAddons', (cb) => cleanTasks.cleanAddons(cb, varsObj));
gulp.task('cleanDist', (cb) => cleanTasks.cleanDist(cb, varsObj));
gulp.task('combineJs', (cb) => jstasks.combineJs(cb, varsObj));
gulp.task('putToAddon', (cb) => putTasks.PutToAddon(cb, varsObj));
gulp.task('putWindowOpenerToLocal', (cb) => putTasks.putWindowOpenerToLocal(cb, varsObj));
gulp.task('webpack', (cb) => otherTasks.webpack(cb, varsObj));

//'combineJs', 'buildjsContent',

gulp.task('default', gulp.series(['cleanDist', 'cleanAddons', 'buildStylesToInject', 'BuildTypescriptShared', 'BuildTypescriptContent', 'BuildTypescriptPopUp', 'webpack', 'buildPopUp', 'buildWindowOpenerForBookMark', 'BookmarkText', 'putWindowOpenerToLocal', 'putToAddon']), function (resolve) {
  resolve();
});