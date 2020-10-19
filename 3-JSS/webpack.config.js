var path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/app.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};