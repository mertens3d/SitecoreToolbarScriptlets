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

var varsObj = new vars();

gulp.task('BookmarkText', (cb) => otherTasks.BookmarkText(cb, varsObj));
gulp.task('BuildPopUpHtml', (cb) => htmlTasks.BuildHtml(cb, varsObj));
//gulp.task('buildjsContent', (cb) => jstasks.buildjsContent(cb, varsObj));
gulp.task('BuildPopUpStyles', (cb) => styleTasks.BuildPopUpStyles(cb, varsObj));
gulp.task('BuildTypescriptAll', (cb) => tsTasks.BuildTypeScriptAll(cb, varsObj));
//gulp.task('BuildTypescriptShared', (cb) => tsTasks.BuildTypeScriptShared(cb, varsObj));
//gulp.task('BuildTypescriptContent', (cb) => tsTasks.BuildTypeScriptContent(cb, varsObj));
//gulp.task('BuildTypescriptPopUp', (cb) => tsTasks.BuildTypeScriptPopUp(cb, varsObj));
gulp.task('buildWindowOpenerForBookMark', (cb) => openerTasks.buildWindowOpenerForBookMark(cb, varsObj));
gulp.task('cleanAddons', (cb) => cleanTasks.cleanAddons(cb, varsObj));
gulp.task('cleanAutoBuildFolder', (cb) => cleanTasks.cleanAutoBuildFolder(cb, varsObj));
gulp.task('combineJs', (cb) => jstasks.combineJs(cb, varsObj));
gulp.task('PutToFinal', (cb) => putTasks.PutToFinal(cb, varsObj));
gulp.task('CopyFromFinalToAddon', (cb) => putTasks.CopyFromFinalToAddon(cb, varsObj));
gulp.task('putWindowOpenerToLocal', (cb) => putTasks.putWindowOpenerToLocal(cb, varsObj));

gulp.task('WebpackContent', (cb) => otherTasks.WebPackOne(cb, varsObj.ContentJs));
gulp.task('WebpackPopUp', (cb) => otherTasks.WebPackOne(cb, varsObj.PopUpJs));
gulp.task('WebpackOpener', (cb) => otherTasks.WebPackOne(cb, varsObj.WindowOpener));

gulp.task('CleanBuildStamp', (cb) => tsTasks.CleanBuildStamp(cb, varsObj));
gulp.task('PopulateBuildTimeStamp', (cb) => tsTasks.BuildBuildNumber(cb, varsObj));



gulp.task('WebpackAll', gulp.series(['WebpackContent', 'WebpackPopUp', 'WebpackOpener']));
gulp.task('TimeStampAll', gulp.series(['CleanBuildStamp', 'PopulateBuildTimeStamp']));

//'combineJs', 'buildjsContent',

//todo - put back if needed 'buildWindowOpenerForBookMark', 'BookmarkText',
//todo - put back if needed 'cleanAutoBuildFolder', 'cleanAddons',

gulp.task('builders', gulp.series(['BuildPopUpStyles', 'TimeStampAll', 'BuildTypescriptAll', 'WebpackAll', 'BuildPopUpHtml', 'PutToFinal']), function (resolve) {
  resolve();
});

gulp.task('putters', gulp.series(['putWindowOpenerToLocal', 'CopyFromFinalToAddon']), function (resolve) {
  resolve();
});

gulp.task('default', gulp.series(['builders', 'putters']));