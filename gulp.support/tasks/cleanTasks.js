const gulp = require('gulp');
const del = require('del');


module.exports = {
  cleanDist: function (cb, vars) {
    return del([
      vars.jsContent.dist + '/**/*'
    ], cb);

  },
  cleanAddons: function (cb, vars) {
    return del([
     vars.BrowserAddonData.AutoBuildDest + '/**/*'
    ], cb);
  }
}