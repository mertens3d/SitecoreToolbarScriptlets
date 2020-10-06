const gulp = require('gulp');
const ts = require('gulp-typescript');
const sort = require('gulp-sort');
const header = require('gulp-header');
const Webpack_stream = require('Webpack-stream');
//const WebpackContent_config = require('./../../Webpack.config');
const rename = require('gulp-rename');
const vars = require('../vars');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  WebPackOne: function (cb, targetVar, regexIgnore) {
    console.log('s) WebPackOne');
    console.log(typeof targetVar);

    console.log('source: ' + targetVar.Ts.TranspiledFolder);
    console.log('regexIgnore: ' + regexIgnore);

    console.log('e) WebPackOne');

    return gulp.src(targetVar.Ts.TranspiledFolder)
      .pipe(Webpack_stream(
        {
          entry: targetVar.Ts.TranspiledEntryPointFull(),
          mode: 'production',//'development', //,
          output: {
            path: targetVar.WebpackContentOutputFilePathAbs(),
            filename: targetVar.MinFileName() // 'jsContent.min.js'
          },
          optimization: {
            minimize: false
          },
          plugins: [
            new CopyWebpackPlugin({
              patterns: [
                {
                  from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js'
                }
              ]
            })
          ]
        }))
      .pipe(gulp.dest(targetVar.WebpackContentOutputFilePathAbs()));
    //cb();
  },
}