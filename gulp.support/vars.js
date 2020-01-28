﻿const InjectableClass = require('./OneInjectable');
//const WindowOpenerClass = require('./HindSiteWindowOpener');
const secrets = require('./../gulp.support/Secrets');

class Vars {
  constructor() {
    console.log('s) Constructing Vars');

    this.FinalFolderShort = 'final';

    this.PopUpHtml = new InjectableClass('PopUp', 'html', 'html', this.FinalFolderShort);

    this.PopUpStyles = new InjectableClass('PopUp', 'scss', 'css', this.FinalFolderShort);

    this.PopUpJs = new InjectableClass('PopUp', 'js', 'js', this.FinalFolderShort);
    this.PopUpJs.Ts.TranspiledEntryPointFile = 'EntryPoint.js';

    this.ContentJs = new InjectableClass('Content', 'js', 'js', this.FinalFolderShort);
    //this.ContentJs.WorkingCodeRootDir = this.ContentJs.AutoBuildRoot + '/src';
    this.ContentJs.Ts.TranspiledEntryPointFile = 'zLast.js',

      this.SharedJs = new InjectableClass('Shared', 'js', 'js');

    this.WindowOpener = new InjectableClass('hindsiteWindowOpener', 'js', 'js', this.FinalFolderShort);
    this.WindowOpener.Ts.TranspiledEntryPointFile = 'EntryPoint.js',

      this.BrowserExtensionFireFox = { AutoBuildDest: './Browser Addons/Firefox/HindSite/AutoBuild' };

    //this.WindowOpener = new WindowOpenerClass();

    this.mySecret = this.buildSecrets();

    this.bookmarkFinal = 'Bookmark.js';

    this.local = {};
    this.local.Dest = this.buildLocal();
    console.log('e) Constructing Vars');
  }

  buildSecrets() {
    var toReturn = new secrets();
    console.log('secrets: ');
    console.log(toReturn);
    return toReturn;
  }

  buildLocal() {
    var toReturn = this.mySecret.localWebRootAr;
    console.log('buildLocal:');
    console.log(toReturn);
    return toReturn;
  }
}

module.exports = Vars;