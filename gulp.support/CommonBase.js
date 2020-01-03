class CommonBase {
  constructor() {
    this.WorkingCodeRootDir = './src';
    this.dist = './dist/';
    this.distFinal = this.dist + 'final/';
  }
  debugInfo() {
    console.log('src: ' + this.src);
    console.log('dist: ' + this.dist);
    console.log('distFinal: ' + this.distFinal);
  }
}

module.exports = CommonBase;