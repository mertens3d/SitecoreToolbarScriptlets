const CommonBase = require('./CommonBase.js');

class WindowOpenerClass extends CommonBase{
  constructor() {
    super();
    this.ShortName = 'windowOpener';
    this.SourceDirFilter = this.WorkingCodeRootDir + '/' + this.ShortName + '/**/*.js';
    this.NameConcat = this.ShortName + '.concat.js';
    this.NameConcatMin = this.ShortName + '.concat.min.js';
    this.NameConcatMinWithVar = this.ShortName + '.concat.min.var.js';
    this.debugInfo();
  }
  debugInfo() {
    console.log('----------');
    console.log('ShortName: ' + this.ShortName);
    console.log('SourceDirFilter: ' + this.SourceDirFilter);
    console.log('NameConcat: ' + this.NameConcat);
    console.log('NameConcatMin: ' + this.NameConcatMin);
  }
}


module.exports = WindowOpenerClass;