const InjectableTs = require("./InjectableTs");
const path = require('path');

class Injectable {
  constructor(name, sourceFilter, finalExt, finalFolder) {
    this.WorkingCodeRootDir = './src';
    this.AutoBuildRoot = './AutoBuild';
    this.FinalFolderNameShort = finalFolder

    this.Name = name;
    this.SourceFilter = sourceFilter;
    this.FinalExt = finalExt;
    this.VarName = this.Name;

    this.Ts = new InjectableTs(this.Name, this.AutoBuildRoot);

    this.debugInfo();
  }

  FinalFolderNameFull() {
    return this.AutoBuildRoot + '/' + this.FinalFolderNameShort ;
  }

  SourceFinalAuto() {
    return path.join(this.AutoBuildRoot, this.NameConcat());
  }

  FileNameWithExt() {
    return this.Name + '.' + this.FinalExt;
  }

  MinFileName() {
    return this.Name + '.min.' + this.FinalExt;
  }

  NameConcatMin() {
    return this.Name + '.concat.min.' + this.FinalExt;
  }

  FolderConcat() {
    return this.AutoBuildRoot + '/concat/';
  }

  NameConcat() {
    return this.Name + '.concat.' + this.FinalExt;
  }

  SourceDirFilter() {
    return this.WorkingCodeRootDir + '/' + this.Name + this.SourceFilter;
  }

  AutoBuildMinFileNameFull() {
    return this.AutoBuildRoot + '/' + this.MinFileName();

  }

  WebpackFileFull() {
    return this.AutoBuildRoot + '/webpack/' + this.MinFileName();
  }

  WebpackContentOutputFilePathAbs() {
    //return this.AutoBuildRoot;
    return path.resolve( this.AutoBuildRoot + '/webpack');
  }

  debugInfo() {
    console.log('----------');
    console.log('\AutoBuildRoot: ' + this.AutoBuildRoot);
    console.log('\tFinalFull: ' + this.FinalFolderNameFull());

    console.log('\tName: ' + this.Name);
    console.log('\SourceFilter: ' + this.SourceFilter);
    console.log('\tSourceDirFilter: ' + this.SourceDirFilter());
    console.log('\tMinFileName: ' + this.MinFileName());
    console.log('\tNameConcatMin: ' + this.NameConcatMin());

    console.log('\t');
    console.log('\tWebpackContentOutputFilePathAbs: ' + this.WebpackContentOutputFilePathAbs());
    console.log('\tTranspiledEntryPointFull: ' + this.Ts.TranspiledEntryPointFull());


    console.log('----------');
  }
}

module.exports = Injectable;