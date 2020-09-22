class InjectableTs {
  constructor(name, autoBuildRootFolder) {
    this.Name = name;
    this.TranspiledFolder = autoBuildRootFolder + '/TsTranspiled';
    this.TranspiledEntryPointFile = '';
  }

  SourceFilter() {
    return './src/**/*.ts';
  }

  TranspiledEntryPointFull() {
    return this.TranspiledFolder + '/' + this.Name + '/scripts/' + this.TranspiledEntryPointFile;
  }
}

module.exports = InjectableTs;