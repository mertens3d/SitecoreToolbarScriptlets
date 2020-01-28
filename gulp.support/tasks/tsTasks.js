const gulp = require('gulp');
var ts = require('gulp-typescript');
var sort = require('gulp-sort');
const vars = require('./../vars');

module.exports = {

  CommonSettings: {
    'removeComments': true,
    'sourceMap': false,
    'alwaysStrict': false,
    'noImplicitUseStrict': true,
    'allowSyntheticDefaultImports': true,
    'target': 'es6',
    'module': 'es6',
    'moduleResolution': 'node',
    "typeRoots": ["node_modules/@types", "node_modules/web-ext-types"]
  },
  BuildTypeScriptAll: function (cb, vars) {
    return gulp.src([vars.SharedJs.Ts.SourceFilter()])
      .pipe(sort())
      .pipe(ts(this.CommonSettings))
      .pipe(gulp.dest(vars.SharedJs.Ts.TranspiledFolder));
  },
  //BuildTypeScriptShared: function (cb, vars) {
  //  return gulp.src([vars.SharedJs.Ts.SourceFilter() ])
  //    .pipe(sort())
  //    .pipe(ts(this.CommonSettings))
  //    .pipe(gulp.dest(vars.SharedJs. Ts.TranspiledDist));
  //},
  //BuildTypeScriptContent: function (cb, vars) {
  //  return gulp.src([vars.ContentJs.Ts.SourceFilter()])
  //    .pipe(sort())
  //    .pipe(ts(this.CommonSettings))
  //    .pipe(gulp.dest(vars.ContentJs.Ts.TranspiledDist));
  //},
  //BuildTypeScriptPopUp: function (cb, vars) {
  //  return gulp.src([vars.PopUpJs.Ts.SourceFilter()])
  //    .pipe(sort())
  //    .pipe(ts(this.CommonSettings))
  //    .pipe(gulp.dest(vars.PopUpJs.Ts.TranspiledDist));
  //}
};