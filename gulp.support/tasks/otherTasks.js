const gulp = require('gulp');
const ts = require('gulp-typescript');
const sort = require('gulp-sort');
const header = require('gulp-header');
const Webpack_stream = require('Webpack-stream');
//const WebpackContent_config = require('./../../Webpack.config');
const rename = require('gulp-rename');
const vars = require('../vars');

module.exports = {
  BookmarkText: function (cb, vars) {
    console.log('s) BookmarkText');
    console.log('vars: ' + (vars && vars !== null));
    console.log(vars);

    var source = vars.WindowOpener.AutoBuildRoot + vars.WindowOpener.NameConcatMinWithVar;
    console.log('source: ' + source);
    console.log('bookmarkFinal: ' + vars.bookmarkFinal);
    console.log('vars.WindowOpener.AutoBuildRootFinal: ' + vars.WindowOpener.AutoBuildRootFinal);
    return gulp.src(source)
      .pipe(header('javascript:'))
      .pipe(rename(vars.bookmarkFinal))
      .pipe(gulp.dest(vars.WindowOpener.AutoBuildRootFinal));
  },

    //BuildTypeScriptShared: function (cb, vars) {
  //  return gulp.src([vars.SharedJs.Ts.SourceFilter() ])
  //    .pipe(sort())
  //    .pipe(ts(this.CommonSettings))
  //    .pipe(gulp.dest(vars.SharedJs. Ts.TranspiledDist));
  //},

  //WebpackAll: function (cb, vars) {
  //  console.log('s) WebpackAll');
  //  this.WebPackOne(vars.ContentJs);
  //  this.WebPackOne(vars.PopUpJs);
  //  this.WebPackOne(vars.WindowOpener);
  //  console.log('e) WebpackAll');
  //  cb();
  //},

  WebPackOne: function (cb, targetVar) {
    console.log('s) WebPackOne');
    console.log(typeof targetVar);
    targetVar.debugInfo();
    console.log('e) WebPackOne');

    return gulp.src(targetVar.Ts.TranspiledFolder)
      .pipe(Webpack_stream(
      {
        entry: targetVar.Ts.TranspiledEntryPointFull(),
          mode: 'production',//'development', //,
        output: {
          path: targetVar.WebpackContentOutputFilePathAbs(),
          filename: targetVar.MinFileName() // 'jsContent.min.js'
        }
      }))
      .pipe(gulp.dest(targetVar.WebpackContentOutputFilePathAbs()));
    //cb();

  },

  //WebpackContent: function (cb, vars) {
  //  //return Webpack_stream(WebpackContent_config)

  //  vars.ContentJs.debugInfo();


  //  return Webpack_stream(
  //    {
  //      entry: vars.ContentJs.Ts.TranspiledEntryPointFull(),
  //      mode: 'production',
  //      output: {
  //        path: vars.ContentJs.WebpackContentOutputFilePathAbs(),
  //        filename: vars.ContentJs.MinFileName() // 'jsContent.min.js'
  //      }
  //    })
  //    .pipe(gulp.dest(vars.ContentJs.AutoBuildRoot));
  //}
}