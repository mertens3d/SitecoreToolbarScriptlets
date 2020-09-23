const InjectableClass = require('./OneInjectable');

class Vars {
  constructor() {
    console.log('s) Constructing Vars');

    this.FinalFolderShort = 'final';

    this.PopUpHtml = new InjectableClass('PopUpUi', '/**/*.html', 'html', this.FinalFolderShort);

    this.PopUpStyles = new InjectableClass('PopUpUi', '/**/popup.scss', 'css', this.FinalFolderShort);

    this.ContentStyles = new InjectableClass('Content', '/**/content.scss', 'css', this.FinalFolderShort);

    this.PopUpUiJs = new InjectableClass('PopUpUi', '/**/*.js', 'js', this.FinalFolderShort);
    this.PopUpUiJs.Ts.TranspiledEntryPointFile = 'HindSiteUiLayer.js';

    this.PopUpControllerJs = new InjectableClass('PopUpController', '/**/*.js', 'js', this.FinalFolderShort);
    this.PopUpControllerJs.Ts.TranspiledEntryPointFile = 'zPopUpControllerEntryPoint.js';

    this.ContentJs = new InjectableClass('Content', '/**/*.js', 'js', this.FinalFolderShort);
    this.ContentJs.Ts.TranspiledEntryPointFile = 'zContentEntryPoint.js';

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