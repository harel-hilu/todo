const path = require('path');

const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './app.js',
  target: 'node',
  devtool: 'source-map',
  externals: [nodeExternals()],
  output: {
    filename: 'bundle.main.js',
    path: __dirname,
  },
};