const InjectableClass = require('./OneInjectable');

class Vars {
  constructor() {
    console.log('s) Constructing Vars');

    this.FinalFolderShort = 'final';

    this.PopUpHtml = new InjectableClass('PopUp', '/**/*.html', 'html', this.FinalFolderShort);

    this.PopUpStyles = new InjectableClass('PopUp', '/**/popup.scss', 'css', this.FinalFolderShort);

    this.ContentStyles = new InjectableClass('Content', '/**/content.scss', 'css', this.FinalFolderShort);

    this.PopUpJs = new InjectableClass('PopUp', '/**/*.js', 'js', this.FinalFolderShort);
    this.PopUpJs.Ts.TranspiledEntryPointFile = 'zPopUpEntryPoint.js';

    this.ContentJs = new InjectableClass('Content', '/**/*.js', 'js', this.FinalFolderShort);
    this.BrowserPolyFillJs = new InjectableClass('browser-polyfill', '/**/*.js', 'js', this.FinalFolderShort);
    this.BrowserPolyFillJs.MinSuffix = '';

    this.ContentJs.Ts.TranspiledEntryPointFile = 'zContentEntryPoint.js';

    this.SharedJs = new InjectableClass('Shared', '/**/*.js', 'js');

    this.BrowserExtensionFireFox = {
      Root: './Dist/HindSite',
      AutoBuildDest: '/HindSite/AutoBuild'
    };

    console.log('e) Constructing Vars');
  }
}

module.exports = Vars;