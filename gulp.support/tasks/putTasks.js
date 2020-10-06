const gulp = require('gulp');
const path = require('path');

module.exports = {

  FromTo: function (fromSrc, destFolder) {
    console.log('s) FromTo ');
    console.log('\tfromSrc: ' + path.resolve(fromSrc));
    console.log('\ttoDest: ' + path.resolve(destFolder));

    gulp.src(fromSrc, { base: destFolder.AutoBuildRoot })
      .pipe(gulp.dest(destFolder));

    console.log('e) FromTo ');
  },

  PutToFinal: function (cb, vars) {
    return gulp.src([
      vars.PopUpHtml.AutoBuildMinFileNameFull(),
      vars.ContentJs.WebpackFileFull(),
      //vars.HindSiteApiJs.WebpackFileFull(),
      //vars.PopUpUiJs.WebpackFileFull(),
      vars.PopUpControllerJs.WebpackFileFull(),
      vars.PopUpStyles.AutoBuildMinFileNameFull(),
      vars.ContentStyles.AutoBuildMinFileNameFull(),
      vars.BrowserPolyFillJs.WebpackFileFull(),
    ])
      .pipe(gulp.dest(vars.PopUpHtml.FinalFolderNameFull()));
  },

  CopyFromFinalToAddon: function (cb, vars) {
    console.log('s) CopyFromFinalToAddon ');

    return gulp.src([
      path.join(vars.PopUpHtml.FinalFolderNameFull(), vars.PopUpHtml.MinFileName()),
      path.join(vars.ContentJs.FinalFolderNameFull(), vars.ContentJs.MinFileName()),
      //path.join(vars.HindSiteApiJs.FinalFolderNameFull(), vars.HindSiteApiJs.MinFileName()),
      //path.join(vars.PopUpUiJs.FinalFolderNameFull(), vars.PopUpUiJs.MinFileName()),
      path.join(vars.PopUpControllerJs.FinalFolderNameFull(), vars.PopUpControllerJs.MinFileName()),
      path.join(vars.PopUpStyles.FinalFolderNameFull(), vars.PopUpStyles.MinFileName()),
      path.join(vars.ContentStyles.FinalFolderNameFull(), vars.ContentStyles.MinFileName()),
      path.join(vars.BrowserPolyFillJs.FinalFolderNameFull(), vars.BrowserPolyFillJs.MinFileName()),
    ])
      .pipe(gulp.dest(vars.BrowserExtensionFireFox.Root));
  }
}