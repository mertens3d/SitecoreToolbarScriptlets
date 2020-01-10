const gulp = require('gulp');
var ts = require('gulp-typescript');
var sort = require('gulp-sort');
const vars = require('./../vars');

//gulp.task('buildTypeScript', function () {
module.exports = {
  BuildTypeScript: function (cb, vars) {
    return gulp.src(['./**/jsToInject/**/*.ts'])//, '!./**/jsToInject/**/tests/**/*.ts'])
      .pipe(sort())
      .pipe(ts({
        'removeComments': true,
        'sourceMap': false,
        'alwaysStrict': false,
        'noImplicitUseStrict': true,
        'allowSyntheticDefaultImports': true,
        'target': 'es6',
        'module': 'es6',
        'moduleResolution': 'node'
      }))
      .pipe(gulp.dest('./dist.TsTranspiled'));
  }
};