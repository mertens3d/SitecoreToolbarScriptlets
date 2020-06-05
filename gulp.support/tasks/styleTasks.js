const gulp = require('gulp');
const path = require('path');
const vars = require('./../vars');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

module.exports = {

  BuildCompactCEStyles: function (cb, vars) {


    console.log('source: ' + vars.ContentStyles.SourceDirFilter());
    console.log('rename to: ' + vars.ContentStyles.MinFileName());
    console.log('dest: ' + vars.ContentStyles.AutoBuildRoot);

    return gulp.src(vars.ContentStyles.SourceDirFilter())
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(rename(vars.ContentStyles.MinFileName()))
      .pipe(gulp.dest(vars.ContentStyles.AutoBuildRoot));

  },


  BuildPopUpStyles: function (cb, vars) {
    vars.PopUpStyles.debugInfo();

    console.log('source: ' + vars.PopUpStyles.SourceDirFilter());
    console.log('rename to: ' + vars.PopUpStyles.MinFileName());
    console.log('dest: ' + vars.PopUpStyles.AutoBuildRoot);

    return gulp.src(vars.PopUpStyles.SourceDirFilter())
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(rename(vars.PopUpStyles.MinFileName()))
      .pipe(gulp.dest(vars.PopUpStyles.AutoBuildRoot));
  }
}