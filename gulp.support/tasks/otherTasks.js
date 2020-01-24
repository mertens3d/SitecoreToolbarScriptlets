const gulp = require('gulp');
const ts = require('gulp-typescript');
const sort = require('gulp-sort');
const header = require('gulp-header');
const webpack_stream = require('webpack-stream');
const webpack_config = require('./../../webpack.config');
const rename = require('gulp-rename');

module.exports = {
  BookmarkText: function (cb,vars) {
    console.log('s) BookmarkText');
    console.log('vars: ' + (vars && vars !== null));
    console.log(vars);

    var source = vars.WindowOpener.dist + vars.WindowOpener.NameConcatMinWithVar;
    console.log('source: ' + source);
    console.log('bookmarkFinal: ' + vars.bookmarkFinal);
    console.log('vars.WindowOpener.distFinal: ' + vars.WindowOpener.distFinal);
    return gulp.src(source)
      .pipe(header('javascript:'))
      .pipe(rename(vars.bookmarkFinal))
      .pipe(gulp.dest(vars.WindowOpener.distFinal));
  },
  webpack: function (cb, vars) {
    return webpack_stream(webpack_config)
      .pipe(gulp.dest('dist'));
  }
}