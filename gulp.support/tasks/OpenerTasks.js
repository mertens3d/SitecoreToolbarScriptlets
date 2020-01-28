//const WebpackContent = require('WebpackContent');
//const Webpack_stream = require('WebpackContent-stream');
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
    console.log('NameConcatMinWithVar: ' + vars.WindowOpener.NameConcatMinWithVar);

    var injectData = new Helper().GetInjectData(vars);

    return gulp.src(vars.WindowOpener.SourceDirFilter())
      .pipe(concat(vars.WindowOpener.NameConcat()))
      .pipe(gulp.dest(vars.WindowOpener.AutoBuildRoot))
      .pipe(uglify())
      .pipe(rename(vars.WindowOpener.NameConcatMin()))
      .pipe(header(injectData.cssToInjectWithVar + '\n')) // + codeToInjectResourceText + ))
      .pipe(header(injectData.ContentJsWithVar + '\n'))
      .pipe(header(injectData.PopUpHtmlWithVar + '\n'))
      .pipe(header('(function(){'))
      .pipe(footer('}());'))
      .pipe(rename(vars.WindowOpener.NameConcatMinWithVar))
      .pipe(gulp.dest(vars.WindowOpener.AutoBuildRoot))
      ;
  }
}

//function commonWrapper(cb, vars) {
//  console.log('s) commonWrapper');
//  console.log('Dest: ' + vars.WindowOpener.AutoBuildRoot);

//  var injectData = new Helper().GetInjectData(vars);

//  console.log('compiling');

//  vars.WindowOpener.debugInfo();

//  gulp.src(vars.WindowOpener.SourceDirFilter())
//    .pipe(concat(vars.WindowOpener.NameConcat()))
//    .pipe(gulp.dest(vars.WindowOpener.AutoBuildRoot))
//    .pipe(uglify())
//    .pipe(rename(vars.WindowOpener.NameConcatMin))
//    .pipe(header(injectData.cssToInjectWithVar + '\n')) // + codeToInjectResourceText + ))
//    .pipe(header(injectData.ContentJsWithVar + '\n'))
//    .pipe(header(injectData.PopUpHtmlWithVar + '\n'))
//    .pipe(header('(function(){'))
//    .pipe(footer('}());'))
//    .pipe(rename(vars.WindowOpener.NameConcatMinWithVar))
//    .pipe(gulp.dest(vars.WindowOpener.AutoBuildRoot))
//    ;

//  cb();
//};