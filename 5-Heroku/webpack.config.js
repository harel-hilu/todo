var path = require('path');

module.exports = {
  mode: 'development',
  devtool: "source-map",
  watch: true,
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../Server/public'),
    filename: 'main.bundle.js'
  }
};