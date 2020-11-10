var path = require('path');

module.exports = {
  mode: 'development',
  devtool: "source-map",
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../Server/public/'),
    filename: 'client.bundle.js'
  }
};