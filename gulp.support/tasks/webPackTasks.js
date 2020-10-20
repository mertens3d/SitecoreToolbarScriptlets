const gulp = require('gulp');
const webpack = require('webpack');
const Webpack_stream = require('Webpack-stream');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  WebPackOne: function (cb, targetVar, regexIgnore) {
    console.log('s) WebPackOne ' + targetVar.Ts.MinFileName);
    console.log(typeof targetVar);

    console.log('source: ' + targetVar.Ts.TranspiledFolder);
    console.log('Entry Point: ' + targetVar.Ts.TranspiledEntryPointFull());
    console.log('regexIgnore: ' + regexIgnore);

    console.log('e) WebPackOne ' + targetVar.Ts.MinFileName);

    return gulp.src('./AutoBuild/TsTranspiled/')//targetVar.Ts.TranspiledFolder)//targetVar.Ts.TranspiledFolder)
      .pipe(Webpack_stream(
        {
          cache: false,
          entry: {
            //main: targetVar.Ts.TranspiledEntryPointFull(),
            Shared: {
              import: './AutoBuild/TsTranspiled/Shared/scripts/SharedEntry.js',
            },

            DOMJacket: {
              import: './AutoBuild/TsTranspiled/DOMJacket/scripts/DOMJacketEntry.js',
              dependOn: 'Shared',
            },
            contentTop: {
              import: './AutoBuild/TsTranspiled/ContentTop/scripts/zContentTopEntryPoint.js',
              dependOn: ['HindSiteScUiProxy','DOMJacket'],
            },
            ContentAllFrames: {
              import: './AutoBuild/TsTranspiled/ContentAllFrames/scripts/zContentAllEntryPoint.js'
            },
            HindSiteScUiProxy: {
              import: './AutoBuild/TsTranspiled/HindSiteScUiProxy/scripts/HindSiteScUiProxy.js',
              dependOn: 'DOMJacket'
            },
            PopUpController: {
              import: './AutoBuild/TsTranspiled/PopUpController/scripts/PopUpControllerLayer.js'
            }
          },
          mode: 'development',//'production', //,
          //externals: [
          //  ///.*DOMJacket\/.+$/,
          //  ///.*HindSiteScUiProxy\/.+$/,
          //  ///.*Shared\/.+$/,

          //],
          output: {
            filename: '[name].min.js', //targetVar.MinFileName() // 'jsContent.min.js'
            path: targetVar.WebpackContentOutputFilePathAbs(),
          },
          optimization: {
            minimize: false,
          },

          plugins: [
            new CopyWebpackPlugin({
              patterns: [
                {
                  from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js'
                }
              ]
            })
          ],
          stats: 'detailed'
        }, webpack))
      .pipe(gulp.dest(targetVar.WebpackContentOutputFilePathAbs()));
    //cb();
  },
}