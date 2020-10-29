const path = require('path');

module.exports = {
  entry: './src/index.js',
  context: '/Users/harelh/Documents/Code/todo-onboarding/todo/4-Express/src/',
  devtool: 'source-map',
  watch: true,
  output: {
    filename: 'bundle.js',
    path: path.resolve("/Users/harelh/Documents/Code/todo-onboarding/todo/Server", 'public'),
  },
};