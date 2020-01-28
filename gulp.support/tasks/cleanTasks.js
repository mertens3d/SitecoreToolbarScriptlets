const gulp = require('gulp');
const del = require('del');


module.exports = {
  cleanAutoBuildFolder: function (cb, vars) {
    return del([
      vars.ContentJs.AutoBuildRoot + '/**/*'
    ], cb);

  },
  cleanAddons: function (cb, vars) {
    return del([
     vars.BrowserExtensionFireFox.AutoBuildDest + '/**/*'
    ], cb);
  }
}