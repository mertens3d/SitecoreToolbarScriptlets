const CommonBase = require('./CommonBase.js');

class Injectable extends CommonBase
{
  constructor(shortName, sourceExt, finalExt)
  {
    super();
    this.ShortName = shortName;
    this.SourceExt = sourceExt;
    this.FinalExt = finalExt;
    this.SourceDirFilter = this.WorkingCodeRootDir + '/' + this.ShortName + '/**/*.' + this.SourceExt;
    this.VarName = shortName;
    this.FileNameWithExt = this.ShortName + '.' + this.FinalExt;
    this.MinFileName = this.ShortName + '.min.' + this.FinalExt;
    this.WorkingDest = this.dist;
    this.FinalDest = this.distFinal;
    this.NameConcat = this.ShortName + '.concat.' + this.FinalExt;
    this.NameConcatMin = this.ShortName + '.concat.min.' + this.FinalExt;

    this.debugInfo();
  }
  debugInfo()
  {
    super.debugInfo();
    console.log('----------');
    console.log('ShortName: ' + this.ShortName);
    console.log('SourceExt: ' + this.SourceExt);
    console.log('SourceDirFilter: ' + this.SourceDirFilter);
    console.log('MinFileName: ' + this.MinFileName);
    console.log('NameConcatMin: ' + this.NameConcatMin);
  }
}

module.exports = Injectable;