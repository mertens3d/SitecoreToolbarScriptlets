const path = require('path');

module.exports = {
  entry: './dist.TsTranspiled/src/jstoInject/zLast.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'jsToInject.min.js'
  }
};