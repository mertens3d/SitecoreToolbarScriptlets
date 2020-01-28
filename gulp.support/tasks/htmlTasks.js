const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');

module.exports = {
  BuildHtml: function (cb, vars) {
    console.log('buildHtml');

    var optionFlag = false;

    return gulp.src(vars.PopUpHtml.SourceDirFilter())
      .pipe(htmlmin({
        collapseWhitespace: optionFlag,
        quoteCharacter: '\'',
        removeComments: optionFlag,
      }))
      .pipe(rename(vars.PopUpHtml.MinFileName()))
      .pipe(gulp.dest(vars.PopUpHtml.AutoBuildRoot));

  }
}