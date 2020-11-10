var path = require('path');

module.exports = {
  mode: 'development',
  devtool: "source-map",
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../../2herokuServer/Server/public/'),
    filename: 'client.bundle.js'
  }
};