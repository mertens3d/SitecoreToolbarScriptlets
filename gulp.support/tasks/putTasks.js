const gulp = require('gulp');
const path = require('path');

module.exports = {
  putWindowOpenerToLocal: function (cb, vars) {
  //  console.log('s) putWindowOpenerToLocal ');
  //  console.log('localWebRoot: ' + vars.local.Dest);
  //  console.log('dest: ' + vars.local.Dest);
  //  //C:/Users/GXM073/Documents/SitecoreToolbarScriptlets/dist/CodeToInject.js')}())

  //  for (var idx = 0; idx < vars.local.Dest.length; idx++) {
  //    var oneLocalDest = vars.local.Dest[idx];
  //    console.log('localDest: ' + oneLocalDest);

  //    //var source = vars.WindowOpener.AutoBuildRoot + '/' + vars.WindowOpener.NameConcatMinWithVar;
  //    //console.log('source: ' + source);
  //    //gulp.src(source)
  //    //  .pipe(gulp.dest(oneLocalDest));

  //    //var sourceHtml = path.join(vars.PopUpHtml.AutoBuildRoot, vars.PopUpHtml.MinFileName());

  //    gulp.src(vars.PopUpHtml.SourceFinalAuto(), { base: vars.AutoBuildRoot })
  //      .pipe(gulp.dest(oneLocalDest));

  //    //var sourceJs = path.join(vars.ContentJs.AutoBuildRoot, vars.ContentJs.MinFileName());

  //    gulp.src(vars.ContentJs.SourceFinalAuto(), { base: vars.AutoBuildRoot })
  //      .pipe(gulp.dest(oneLocalDest));

  //    //var sourceJs = path.join(vars.PopUpStyles.AutoBuildRoot, vars.PopUpStyles.MinFileName());
  //    gulp.src(vars.PopUpStyles.SourceFinalAuto(), { base: vars.AutoBuildRoot })
  //      .pipe(gulp.dest(oneLocalDest));

  //    //var sourceOpener = path.join(vars.WindowOpener.AutoBuildRoot, vars.WindowOpener.NameConcat());
  //    gulp.src(vars.WindowOpener.SourceFinalAuto(), { base: vars.AutoBuildRoot })
  //      .pipe(gulp.dest(oneLocalDest));
  //  }
  //  console.log('e) putWindowOpenerToLocal ');
    cb();
  },

  FromTo: function (fromSrc, destFolder) {
    console.log('s) FromTo ');
    console.log('\tfromSrc: ' + fromSrc);
    console.log('\ttoDest: ' + destFolder);

    gulp.src(fromSrc, { base: destFolder.AutoBuildRoot })
      .pipe(gulp.dest(destFolder));

    console.log('e) FromTo ');
  },


  PutToFinal: function (cb, vars) {

    //var sourceHtml = path.join(vars.PopUpHtml.HtmlFileFull, vars.PopUpHtml.MinFileName());
    this.FromTo(vars.PopUpHtml.HtmlFileFull(), vars.PopUpHtml.FinalFolderNameFull());

    //var sourceJs = path.join(vars.ContentJs.AutoBuildRoot, vars.ContentJs.WebpackFileFull());
    this.FromTo(vars.ContentJs.WebpackFileFull(), vars.ContentJs.FinalFolderNameFull());

    //var sourceOpener = path.join(vars.WindowOpener.AutoBuildRoot, vars.WindowOpener.WebpackFileFull());
    this.FromTo(vars.WindowOpener.WebpackFileFull(), vars.WindowOpener.FinalFolderNameFull());
    cb();
  },

  CopyFromFinalToAddon: function (cb, vars) {
    console.log('s) CopyFromFinalToAddon ');

    var addonDest = vars.BrowserExtensionFireFox.AutoBuildDest;
    console.log('\taddonDest: ' + addonDest);

    var sourceHtml = path.join(vars.PopUpHtml.AutoBuildRoot, vars.PopUpHtml.MinFileName());
    this.FromTo(sourceHtml, addonDest);

    var sourceJs = path.join(vars.ContentJs.AutoBuildRoot, vars.ContentJs.MinFileName());
    this.FromTo(sourceJs, addonDest);

    var sourceOpener = path.join(vars.WindowOpener.AutoBuildRoot, vars.WindowOpener.NameConcat());
    this.FromTo(sourceOpener, addonDest);

    cb();
  }
}