﻿const InjectableClass = require('./OneInjectable');

class Vars {
  constructor() {
    console.log('s) Constructing Vars');

    this.FinalFolderShort = 'final';

    this.PopUpHtml = new InjectableClass('PopUpUi', '/**/*.html', 'html', this.FinalFolderShort);

    this.PopUpStyles = new InjectableClass('PopUpUi', '/**/popup.scss', 'css', this.FinalFolderShort);

    this.ContentStylesTop = new InjectableClass('Content-Top', '/**/content.scss', 'css', this.FinalFolderShort);

    this.PopUpUiJs = new InjectableClass('PopUpUi', '/**/*.js', 'js', this.FinalFolderShort);
    this.PopUpUiJs.Ts.TranspiledEntryPointFile = 'HindSiteUiLayer.js';

    this.PopUpControllerJs = new InjectableClass('PopUpController', '/**/*.js', 'js', this.FinalFolderShort);
    this.PopUpControllerJs.Ts.TranspiledEntryPointFile = 'PopUpControllerLayer.js';

    this.ContentTopJs = new InjectableClass('Content-Top', '/**/*.js', 'js', this.FinalFolderShort);
    this.ContentTopJs.Ts.TranspiledEntryPointFile = 'zContentTopEntryPoint.js';

    this.ContentAllJs = new InjectableClass('Content-All', '/**/*.js', 'js', this.FinalFolderShort);
    this.ContentAllJs.Ts.TranspiledEntryPointFile = 'zContentAllEntryPoint.js';

    this.HindSiteApiJs = new InjectableClass('HindSiteScUiProxy', '/**/*.js', 'js', this.FinalFolderShort);
    this.HindSiteApiJs.Ts.TranspiledEntryPointFile = 'HindSiteScUiProxy.js';

    this.BrowserPolyFillJs = new InjectableClass('browser-polyfill', '/**/*.js', 'js', this.FinalFolderShort);
    this.BrowserPolyFillJs.MinSuffix = '';

    this.SharedJs = new InjectableClass('Shared', '/**/*.js', 'js');

    this.BrowserExtensionFireFox = {
      Root: './Dist/HindSite',
      AutoBuildDest: '/HindSite/AutoBuild'
    };

    console.log('e) Constructing Vars');
  }
}

module.exports = Vars;