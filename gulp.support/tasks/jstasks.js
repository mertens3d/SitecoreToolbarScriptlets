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
    console.log('source filter: ' + vars.ContentJs.SourceDirFilter());
    return gulp.src(vars.ContentJs.SourceDirFilter())
      .pipe(sort())
      .pipe(concat(vars.ContentJs.NameConcat()))
      .pipe(gulp.dest(vars.ContentJs.WorkingDest))
      .pipe(replace('"', '\''))
      .pipe(gulp.dest(vars.ContentJs.WorkingDest));
  },
  //buildjsContent : function(cb, vars) {
  //  console.log('s) buildjsContent');
  //  var sourceFolder = vars.ContentJs.AutoBuildRoot + '/' + vars.ContentJs.NameConcat;
  //  console.log('source filter: ' + sourceFolder);
  //  console.log('dest: ' + vars.ContentJs.AutoBuildRoot);
  //  console.log('rename: ' + vars.ContentJs.MinFileName());
  //  console.log('e) buildjsContent');

  //  return gulp.src(sourceFolder)
  //    .pipe(uglify({
  //      mangle: false,
  //      output: {
  //        quote_style: 1
  //      }
  //    }))
  //    .pipe(rename(vars.ContentJs.MinFileName()))
  //    .pipe(gulp.dest(vars.ContentJs.WorkingDest));
  //}
}