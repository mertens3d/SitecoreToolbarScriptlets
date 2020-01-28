const gulp = require('gulp');
const path = require('path');
const vars = require('./../vars');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

module.exports = {
  BuildPopUpStyles: function (cb, vars) {
    vars.PopUpStyles.debugInfo();

    return gulp.src(vars.PopUpStyles.SourceDirFilter())
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(rename(vars.PopUpStyles.MinFileName()))
      .pipe(gulp.dest(vars.PopUpStyles.AutoBuildRoot));
  }
}