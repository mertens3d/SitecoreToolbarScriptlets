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
    console.log('source filter: ' + vars.jsToInject.SourceDirFilter());
    return gulp.src(vars.jsToInject.SourceDirFilter())
      .pipe(sort())
      .pipe(concat(vars.jsToInject.NameConcat))
      .pipe(gulp.dest(vars.jsToInject.WorkingDest))
      .pipe(replace('"', '\''))
      .pipe(gulp.dest(vars.jsToInject.WorkingDest));
  },
  buildJsToInject : function(cb, vars) {
    console.log('s) buildJsToInject');
    var thisDist = vars.jsToInject.dist + '/' + vars.jsToInject.NameConcat;
    console.log('source filter: ' + thisDist);
    console.log('dest: ' + vars.jsToInject.dist);
    console.log('rename: ' + vars.jsToInject.MinFileName);
    console.log('e) buildJsToInject');

    return gulp.src(thisDist)
      .pipe(uglify({
        mangle: false,
        output: {
          quote_style: 1
        }
      }))
      .pipe(rename(vars.jsToInject.MinFileName))
      .pipe(gulp.dest(vars.jsToInject.WorkingDest));
  }
}