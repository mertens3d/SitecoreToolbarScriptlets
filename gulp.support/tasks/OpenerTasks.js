//const webpack = require('webpack');
//const webpack_stream = require('webpack-stream');
const concat = require('gulp-concat');
const footer = require('gulp-footer');
const gulp = require('gulp');
const header = require('gulp-header');
const Helper = require('./../Helper');
const rename = require('gulp-rename');
const uglify = require('gulp-terser'); //require('gulp-uglify-es');
const vars = require('./../vars');

module.exports = {

  buildWindowOpenerForBookMark: function (cb, vars) {
    console.log('s) buildWindowOpenerForBookMark');

    var injectData = new Helper().GetInjectData(vars);

    return gulp.src(vars.WindowOpener.SourceDirFilter())
      .pipe(concat(vars.WindowOpener.NameConcat))
      .pipe(gulp.dest(vars.WindowOpener.dist))
      .pipe(uglify())
      .pipe(rename(vars.WindowOpener.NameConcatMin))
      .pipe(header(injectData.cssToInjectWithVar + '\n')) // + codeToInjectResourceText + ))
      .pipe(header(injectData.jsContentWithVar + '\n'))
      .pipe(header(injectData.PopUpWithVar + '\n'))
      .pipe(header('(function(){'))
      .pipe(footer('}());'))
      .pipe(rename(vars.WindowOpener.NameConcatMinWithVar))
      .pipe(gulp.dest(vars.WindowOpener.dist))
      ;
  }
}

function commonWrapper(cb, vars) {
  console.log('s) commonWrapper');
  console.log('Dest: ' + vars.WindowOpener.dist);

  var injectData = new Helper().GetInjectData(vars);

  console.log('compiling');

  vars.WindowOpener.debugInfo();

  gulp.src(vars.WindowOpener.SourceDirFilter())
    .pipe(concat(vars.WindowOpener.NameConcat))
    .pipe(gulp.dest(vars.WindowOpener.dist))
    .pipe(uglify())
    .pipe(rename(vars.WindowOpener.NameConcatMin))
    .pipe(header(injectData.cssToInjectWithVar + '\n')) // + codeToInjectResourceText + ))
    .pipe(header(injectData.jsContentWithVar + '\n'))
    .pipe(header(injectData.PopUpWithVar + '\n'))
    .pipe(header('(function(){'))
    .pipe(footer('}());'))
    .pipe(rename(vars.WindowOpener.NameConcatMinWithVar))
    .pipe(gulp.dest(vars.WindowOpener.dist))
    ;

  cb();
};