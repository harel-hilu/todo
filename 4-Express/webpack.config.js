const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  watch: true,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};