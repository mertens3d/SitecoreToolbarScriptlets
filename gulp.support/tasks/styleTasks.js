const gulp = require('gulp');
const path = require('path');
const vars = require('./../vars');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

module.exports = {
  BuildStylesToInject: function (cb, vars) {
    vars.stylesToInject.debugInfo();

    return gulp.src(vars.stylesToInject.SourceDirFilter())
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(rename(vars.stylesToInject.MinFileName))
      .pipe(gulp.dest(vars.stylesToInject.dist));
  }
}