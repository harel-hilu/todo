const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  watch: true,
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
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, '../server/public'),
  },
};