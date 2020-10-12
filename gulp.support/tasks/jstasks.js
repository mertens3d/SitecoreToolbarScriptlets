const gulp = require('gulp');
const vars = require('../vars');
const uglify = require('gulp-terser'); //require('gulp-uglify-es');
const rename = require('gulp-rename');
var sort = require('gulp-sort');
const concat = require('gulp-concat');
const replace = require('gulp-replace');

module.exports = {
  combineJs: function (cb, vars) {
    console.log('s) combineJs');
    console.log('source filter: ' + vars.ContentTopJs.SourceDirFilter());
    return gulp.src(vars.ContentTopJs.SourceDirFilter())
      .pipe(sort())
      .pipe(concat(vars.ContentTopJs.NameConcat()))
      .pipe(gulp.dest(vars.ContentTopJs.WorkingDest))
      .pipe(replace('"', '\''))
      .pipe(gulp.dest(vars.ContentTopJs.WorkingDest));
  },
  //buildjsContent : function(cb, vars) {
  //  console.log('s) buildjsContent');
  //  var sourceFolder = vars.ContentTopJs.AutoBuildRoot + '/' + vars.ContentTopJs.NameConcat;
  //  console.log('source filter: ' + sourceFolder);
  //  console.log('dest: ' + vars.ContentTopJs.AutoBuildRoot);
  //  console.log('rename: ' + vars.ContentTopJs.MinFileName());
  //  console.log('e) buildjsContent');

  //  return gulp.src(sourceFolder)
  //    .pipe(uglify({
  //      mangle: false,
  //      output: {
  //        quote_style: 1
  //      }
  //    }))
  //    .pipe(rename(vars.ContentTopJs.MinFileName()))
  //    .pipe(gulp.dest(vars.ContentTopJs.WorkingDest));
  //}
}