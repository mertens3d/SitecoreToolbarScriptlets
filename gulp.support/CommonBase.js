class CommonBase {
  constructor() {
    this.WorkingCodeRootDir = './WorkingCode';
    this.dist = './dist/';
    this.distFinal = this.dist + 'final/';
  }
  debugInfo() {
    console.log('WorkingCodeRootDir: ' + this.WorkingCodeRootDir);
    console.log('dist: ' + this.dist);
    console.log('distFinal: ' + this.distFinal);
  }
}

module.exports = CommonBase;