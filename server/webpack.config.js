const path = require('path');

const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './app.ts',
  target: 'node',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  externals: [nodeExternals()],
  output: {
    filename: 'server.bundle.js',
    path: __dirname,
  },
};