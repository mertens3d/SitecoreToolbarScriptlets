const InjectableClass = require('./OneInjectable');
const WindowOpenerClass = require('./HIndSiteWindowOpener');
const secrets = require('./../gulp.support/Secrets');

module.exports = class Vars {
  constructor() {
    console.log('s) Constructing Vars');
    this.htmlToInject = new InjectableClass('HtmlToInject', 'html', 'html');
    this.stylesToInject = new InjectableClass('StylesToInject', 'scss', 'css');
    this.jsToInject = this.buildJsToInject();
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

  buildJsToInject() {
    var toReturn = new InjectableClass('jsToInject', 'js', 'js');
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