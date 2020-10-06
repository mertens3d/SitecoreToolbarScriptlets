/// <binding />
const gulp = require('gulp');
const minify = require('gulp-minify');
const path = require('path');
const vars = require('./gulp.support/vars');

var cleanTasks = require('./gulp.support/tasks/cleanTasks');
var gulpif = require('gulp-if');

var htmlTasks = require('./gulp.support/tasks/htmlTasks');
var InjectableClass = require('./gulp.support/OneInjectable.js');
var jstasks = require('./gulp.support/tasks/jsTasks');
var lazypipe = require('lazypipe');
var WebPackTasks = require('./gulp.support/tasks/webPackTasks');
var putTasks = require('./gulp.support/tasks/putTasks');
var styleTasks = require('./gulp.support/tasks/styleTasks');
var tsTasks = require('./gulp.support/tasks/tsTasks');
var ArchiveJsMap = require('./gulp.support/tasks/ArchiveJsMap');

var varsObj = new vars();

gulp.task('ArchiveJsAndMap', (cb) => ArchiveJsMap.ArchiveJsAndMaps(cb));
gulp.task('DeleteJsAndMap', (cb) => ArchiveJsMap.DeleteJsAndMap(cb));
gulp.task('ArchiveAndDeleteJsAndMap', gulp.series(['ArchiveJsAndMap', 'DeleteJsAndMap']));

gulp.task('BookmarkText', (cb) => WebPackTasks.BookmarkText(cb, varsObj));
gulp.task('BuildPopUpHtml', (cb) => htmlTasks.BuildHtml(cb, varsObj));
gulp.task('BuildPopUpStyles', (cb) => styleTasks.BuildPopUpStyles(cb, varsObj));
gulp.task('BuildContentStyles', (cb) => styleTasks.BuildCompactCEStyles(cb, varsObj));
gulp.task('BuildTypescriptAll', (cb) => tsTasks.BuildTypeScriptAll(cb, varsObj));
gulp.task('cleanAddons', (cb) => cleanTasks.cleanAddons(cb, varsObj));
gulp.task('CleanAutoBuildFolder', (cb) => cleanTasks.cleanAutoBuildFolder(cb, varsObj));
gulp.task('ArchiveAutoBuildFolder', (cb) => cleanTasks.ArchiveAutoBuildFolder(cb, varsObj));
gulp.task('CombineJs', (cb) => jstasks.combineJs(cb, varsObj));
gulp.task('PutToFinal', (cb) => putTasks.PutToFinal(cb, varsObj));
gulp.task('CopyFromFinalToAddon', (cb) => putTasks.CopyFromFinalToAddon(cb, varsObj));

gulp.task('WebpackContent', (cb) => WebPackTasks.WebPackOne(cb, varsObj.ContentJs, '/' + varsObj.HindSiteApiJs.Name + '|' + varsObj.PopUpUiJs.Name + '|' + varsObj.PopUpControllerJs.Name + '/'));

//var controllerNoParseRegex =  varsObj.ContentJs.SourceDirFilter() + '|' + varsObj.PopUpUiJs.SourceDirFilter() + '|' + varsObj.HindSiteApiJs.SourceDirFilter() ;
var controllerNoParseRegex = './src/' + varsObj.PopUpUiJs.Name;
//controllerNoParseRegex = controllerNoParseRegex.replace(/\//g, '\/\/');
//controllerNoParseRegex = '/' + controllerNoParseRegex + '/';

gulp.task('WebpackPopUpController', (cb) => WebPackTasks.WebPackOne(cb, varsObj.PopUpControllerJs, controllerNoParseRegex  ));

gulp.task('CleanBuildStamp', (cb) => tsTasks.CleanBuildStamp(cb, varsObj));
gulp.task('PopulateBuildTimeStamp', (cb) => tsTasks.BuildBuildNumber(cb, varsObj));

gulp.task('PreClean', gulp.series(['ArchiveAutoBuildFolder', 'CleanAutoBuildFolder']));
gulp.task('WebpackAll', gulp.parallel(['WebpackContent', 'WebpackPopUpController']));
gulp.task('TimeStampAll', gulp.parallel(['CleanBuildStamp', 'PopulateBuildTimeStamp']));

gulp.task('builders', gulp.series([gulp.parallel('BuildPopUpStyles', 'BuildContentStyles', 'TimeStampAll', 'BuildPopUpHtml'), 'BuildTypescriptAll', 'WebpackAll',  'PutToFinal']), function (resolve) {
  resolve();
});

gulp.task('putters', gulp.series(['CopyFromFinalToAddon']), function (resolve) {
  resolve();
});

gulp.task('default', gulp.series(['PreClean', 'builders', 'putters', 'ArchiveAndDeleteJsAndMap']));