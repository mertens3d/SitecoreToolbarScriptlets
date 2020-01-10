const gulp = require('gulp');
const path = require('path');

module.exports = {
  putWindowOpenerToLocal: function (cb, vars) {
    console.log('s) putWindowOpenerToLocal ');
    console.log('localWebRoot: ' + vars.local.Dest);
    console.log('dest: ' + vars.local.Dest);
    //C:/Users/GXM073/Documents/SitecoreToolbarScriptlets/dist/CodeToInject.js')}())

    var source = vars.WindowOpener.dist + '/' + vars.WindowOpener.NameConcatMinWithVar;
    console.log('source: ' + source);

    for (var idx = 0; idx < vars.local.Dest.length; idx++) {
      var oneLocalDest = vars.local.Dest[idx];
      console.log('localDest: ' + oneLocalDest);

      gulp.src(source)
        .pipe(gulp.dest(oneLocalDest));

      var sourceHtml = path.join(vars.htmlToInject.dist, vars. htmlToInject.MinFileName);

      gulp.src(sourceHtml, { base: 'dist' })
        .pipe(gulp.dest(oneLocalDest));

      var sourceJs = path.join(vars.jsToInject.dist, vars.jsToInject.MinFileName);

      gulp.src(sourceJs, { base: 'dist' })
        .pipe(gulp.dest(oneLocalDest));

      var sourceJs = path.join(vars.stylesToInject.dist, vars.stylesToInject.MinFileName);
      gulp.src(sourceJs, { base: 'dist' })
        .pipe(gulp.dest(oneLocalDest));

      var sourceOpener = path.join(vars.WindowOpener.dist, vars.WindowOpener.NameConcat);
      gulp.src(sourceOpener, { base: 'dist' })
        .pipe(gulp.dest(oneLocalDest));
    }
    cb();
  },
  PutToAddon: function (cb, vars) {
    console.log('s) putToAddon ');

    var source = vars.WindowOpener.dist + '/' + vars.WindowOpener.NameConcatMinWithVar;
    console.log('source: ' + source);

    var addonDest = vars.BrowserAddonData.AutoBuildDest;
    console.log('addonDest: ' + addonDest);

    //gulp.src(source)
    //  .pipe(gulp.dest(addonDest));

    var sourceHtml = path.join(vars.htmlToInject.dist, vars.htmlToInject.MinFileName);

    gulp.src(sourceHtml, { base: 'dist' })
      .pipe(gulp.dest(addonDest));

    var sourceJs = path.join(vars.jsToInject.dist, vars.jsToInject.MinFileName);

    gulp.src(sourceJs, { base: 'dist' })
      .pipe(gulp.dest(addonDest));

    var sourceJs = path.join(vars.stylesToInject.dist, vars.stylesToInject.MinFileName);
    gulp.src(sourceJs, { base: 'dist' })
      .pipe(gulp.dest(addonDest));

    var sourceOpener = path.join(vars.WindowOpener.dist, vars.WindowOpener.NameConcat);
    gulp.src(sourceOpener, { base: 'dist' })
      .pipe(gulp.dest(addonDest));

    cb();
  }
}