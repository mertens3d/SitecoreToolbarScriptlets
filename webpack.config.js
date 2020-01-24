const path = require('path');

module.exports = {
  entry: './dist.TsTranspiled/src/jsContent/zLast.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'jsContent.min.js'
  }
};