const InjectableClass = require('./OneInjectable');
const WindowOpenerClass = require('./HIndSiteWindowOpener');
const secrets = require('./../gulp.support/Secrets');

module.exports = class Vars {
  constructor() {
    console.log('s) Constructing Vars');
    this.PopUp = new InjectableClass('PopUp', 'html', 'html');
    this.stylesToInject = new InjectableClass('StylesToInject', 'scss', 'css');
    this.jsContent = this.buildjsContent();
    this.BrowserAddonData = { AutoBuildDest: './Browser Addons/Firefox/HindSite/AutoBuild' };
    this.WindowOpener = new WindowOpenerClass();

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

  buildjsContent() {
    var toReturn = new InjectableClass('jsContent', 'js', 'js');
    toReturn.WorkingCodeRootDir = toReturn.dist + '/src';
    return toReturn;
  }

  buildLocal() {
    var toReturn = this.mySecret.localWebRootAr;
    console.log('buildLocal:');
    console.log(toReturn);
    return toReturn;
  }
}

//module.exports = class VarsClass {
//}