const InjectableClass = require('./OneInjectable');

class Vars {
  constructor() {
    console.log('s) Constructing Vars');

    this.FinalFolderShort = 'final';

    this.PopUpHtml = new InjectableClass('PopUpUi', '/**/*.html', 'html', this.FinalFolderShort);

    this.PopUpStyles = new InjectableClass('PopUpUi', '/**/popup.scss', 'css', this.FinalFolderShort);

    this.ContentStylesTop = new InjectableClass('ContentTop', '/**/content.scss', 'css', this.FinalFolderShort);

    this.PopUpUiJs = new InjectableClass('PopUpUi', '/**/*.js', 'js', this.FinalFolderShort);
    this.PopUpUiJs.Ts.TranspiledEntryPointFile = 'HindSiteUiLayer.js';

    this.PopUpControllerJs = new InjectableClass('PopUpController', '/**/*.js', 'js', this.FinalFolderShort);
    this.PopUpControllerJs.Ts.TranspiledEntryPointFile = 'PopUpControllerLayer.js';

    this.ContentTopJs = new InjectableClass('ContentTop', '/**/*.js', 'js', this.FinalFolderShort);
    this.ContentTopJs.Ts.TranspiledEntryPointFile = 'zContentTopEntryPoint.js';

    this.ContentAllJs = new InjectableClass('ContentAllFrames', '/**/*.js', 'js', this.FinalFolderShort);
    this.ContentAllJs.Ts.TranspiledEntryPointFile = 'zContentAllEntryPoint.js';

    this.DomJacketJs = new InjectableClass('DOMJacket', '/**/*.js', 'js', this.FinalFolderShort);
    this.DomJacketJs.Ts.TranspiledEntryPointFile = 'DOMJacketEntry.js';
    

    this.SharedJs = new InjectableClass('Shared', '/**/*.js', 'js', this.FinalFolderShort);
    this.SharedJs.Ts.TranspiledEntryPointFile = 'SharedEntry.js';

    this.HindSiteScUiProxyJs = new InjectableClass('HindSiteScUiProxy', '/**/*.js', 'js', this.FinalFolderShort);
    this.HindSiteScUiProxyJs.Ts.TranspiledEntryPointFile = 'HindSiteScUiProxy.js';

    this.BrowserPolyFillJs = new InjectableClass('browser-polyfill', '/**/*.js', 'js', this.FinalFolderShort);
    this.BrowserPolyFillJs.MinSuffix = '';


    this.BrowserExtensionFireFox = {
      Root: './Dist/HindSite',
      AutoBuildDest: '/HindSite/AutoBuild'
    };

    console.log('e) Constructing Vars');
  }
}

module.exports = Vars;