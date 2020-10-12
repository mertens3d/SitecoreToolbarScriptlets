const gulp = require('gulp');
const path = require('path');
const vars = require('./../vars');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

module.exports = {

  BuildCompactCEStyles: function (cb, vars) {


    console.log('source: ' + vars.ContentStylesTop.SourceDirFilter());
    console.log('rename to: ' + vars.ContentStylesTop.MinFileName());
    console.log('dest: ' + vars.ContentStylesTop.AutoBuildRoot);

    return gulp.src(vars.ContentStylesTop.SourceDirFilter())
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(rename(vars.ContentStylesTop.MinFileName()))
      .pipe(gulp.dest(vars.ContentStylesTop.AutoBuildRoot));

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