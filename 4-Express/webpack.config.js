const path = require('path');

module.exports = {
  entry: '/src/index.js',
  devtool: 'source-map',
  watch: true,
  output: {
    filename: 'bundle.js',
    path: path.resolve("/Users/harelh/Documents/todo/Server", 'public'),
  },
};