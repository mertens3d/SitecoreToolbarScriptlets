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

            contentTop: {
              import: './AutoBuild/TsTranspiled/ContentTop/scripts/zContentTopEntryPoint.js',
              dependOn: ['HindSiteScUiProxy','DOMJacket', 'Shared'],
            },
            ContentAllFrames: {
              import: './AutoBuild/TsTranspiled/ContentAllFrames/scripts/zContentAllEntryPoint.js',
              dependOn: ['Shared']
            },
            HindSiteScUiProxy: {
              import: './AutoBuild/TsTranspiled/HindSiteScUiProxy/scripts/HindSiteScUiProxy.js',
              dependOn: ['DOMJacket', 'Shared']
            },

            PopUpUi: {
              import: './AutoBuild/TsTranspiled/PopUpUi/scripts/PopUpUi.js',
              dependOn: [ 'Shared']
            },

            PopUpController: {
              import: './AutoBuild/TsTranspiled/PopUpController/scripts/PopUpControllerLayer.js',
              dependOn: ['Shared','PopUpUi']
            },
            DOMJacket: {
              import: './AutoBuild/TsTranspiled/DOMJacket/scripts/DOMJacketEntry.js',
              dependOn: 'Shared',
            },
            Shared: {
              import: './AutoBuild/TsTranspiled/Shared/scripts/SharedEntry.js',
            },
          },
          //mode: 'development',
          mode: 'production',
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
            concatenateModules: true
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