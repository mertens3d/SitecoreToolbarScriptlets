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

  BuildTypeScriptShared: function (cb, vars) {
    return gulp.src(['./**/jsShared/**/*.ts'])//, '!./**/jsContent/**/tests/**/*.ts'])
      .pipe(sort())
      .pipe(ts(this.CommonSettings))
      .pipe(gulp.dest('./dist.TsTranspiled'));
  },
  BuildTypeScriptContent: function (cb, vars) {
    return gulp.src(['./**/jsContent/**/*.ts'])//, '!./**/jsContent/**/tests/**/*.ts'])
      .pipe(sort())
      .pipe(ts(this.CommonSettings))
      .pipe(gulp.dest('./dist.TsTranspiled'));
  },
   BuildTypeScriptPopUp: function (cb, vars) {
    return gulp.src(['./**/PopUp/**/*.ts'])//, '!./**/jsContent/**/tests/**/*.ts'])
      .pipe(sort())
      .pipe(ts(this.CommonSettings))
      .pipe(gulp.dest('./dist.TsTranspiled'));
  }
};