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
var otherTasks = require('./gulp.support/tasks/otherTasks');
var putTasks = require('./gulp.support/tasks/putTasks');
var styleTasks = require('./gulp.support/tasks/styleTasks');
var tsTasks = require('./gulp.support/tasks/tsTasks');
var ArchiveJsMap = require('./gulp.support/tasks/ArchiveJsMap');

var varsObj = new vars();

gulp.task('ArchiveJsAndMap', (cb) => ArchiveJsMap.ArchiveJsAndMaps(cb));
gulp.task('DeleteJsAndMap', (cb) => ArchiveJsMap.DeleteJsAndMap(cb));
gulp.task('ArchiveAndDelete', gulp.series(['ArchiveJsAndMap', 'DeleteJsAndMap']));

gulp.task('BookmarkText', (cb) => otherTasks.BookmarkText(cb, varsObj));
gulp.task('BuildPopUpHtml', (cb) => htmlTasks.BuildHtml(cb, varsObj));
gulp.task('BuildPopUpStyles', (cb) => styleTasks.BuildPopUpStyles(cb, varsObj));
gulp.task('BuildContentStyles', (cb) => styleTasks.BuildCompactCEStyles(cb, varsObj));
gulp.task('BuildTypescriptAll', (cb) => tsTasks.BuildTypeScriptAll(cb, varsObj));
gulp.task('cleanAddons', (cb) => cleanTasks.cleanAddons(cb, varsObj));
gulp.task('cleanAutoBuildFolder', (cb) => cleanTasks.cleanAutoBuildFolder(cb, varsObj));
gulp.task('combineJs', (cb) => jstasks.combineJs(cb, varsObj));
gulp.task('PutToFinal', (cb) => putTasks.PutToFinal(cb, varsObj));
gulp.task('CopyFromFinalToAddon', (cb) => putTasks.CopyFromFinalToAddon(cb, varsObj));

gulp.task('WebpackContent', (cb) => otherTasks.WebPackOne(cb, varsObj.ContentJs));
gulp.task('WebpackHindSiteApi', (cb) => otherTasks.WebPackOne(cb, varsObj.HindSiteApiJs));
gulp.task('WebpackPopUpUi', (cb) => otherTasks.WebPackOne(cb, varsObj.PopUpUiJs));
gulp.task('WebpackPopUpController', (cb) => otherTasks.WebPackOne(cb, varsObj.PopUpControllerJs));

gulp.task('CleanBuildStamp', (cb) => tsTasks.CleanBuildStamp(cb, varsObj));
gulp.task('PopulateBuildTimeStamp', (cb) => tsTasks.BuildBuildNumber(cb, varsObj));

gulp.task('WebpackAll', gulp.series(['WebpackContent', 'WebpackHindSiteApi', 'WebpackPopUpUi', 'WebpackPopUpController']));
gulp.task('TimeStampAll', gulp.series(['CleanBuildStamp', 'PopulateBuildTimeStamp']));

gulp.task('builders', gulp.series(['BuildPopUpStyles', 'BuildContentStyles', 'TimeStampAll', 'BuildTypescriptAll', 'WebpackAll', 'BuildPopUpHtml', 'PutToFinal']), function (resolve) {
  resolve();
});

gulp.task('putters', gulp.series(['CopyFromFinalToAddon']), function (resolve) {
  resolve();
});

gulp.task('default', gulp.series(['builders', 'putters', 'ArchiveAndDelete']));