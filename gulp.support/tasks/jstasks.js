const gulp = require('gulp');
const vars = require('./../vars');
const uglify = require('gulp-terser'); //require('gulp-uglify-es');
const rename = require('gulp-rename');
var sort = require('gulp-sort');
const concat = require('gulp-concat');
const replace = require('gulp-replace');

module.exports = {
  combineJs: function (cb, vars) {
    console.log('s) combineJs');
    console.log('source filter: ' + vars.jsContent.SourceDirFilter());
    return gulp.src(vars.jsContent.SourceDirFilter())
      .pipe(sort())
      .pipe(concat(vars.jsContent.NameConcat))
      .pipe(gulp.dest(vars.jsContent.WorkingDest))
      .pipe(replace('"', '\''))
      .pipe(gulp.dest(vars.jsContent.WorkingDest));
  },
  buildjsContent : function(cb, vars) {
    console.log('s) buildjsContent');
    var thisDist = vars.jsContent.dist + '/' + vars.jsContent.NameConcat;
    console.log('source filter: ' + thisDist);
    console.log('dest: ' + vars.jsContent.dist);
    console.log('rename: ' + vars.jsContent.MinFileName);
    console.log('e) buildjsContent');

    return gulp.src(thisDist)
      .pipe(uglify({
        mangle: false,
        output: {
          quote_style: 1
        }
      }))
      .pipe(rename(vars.jsContent.MinFileName))
      .pipe(gulp.dest(vars.jsContent.WorkingDest));
  }
}