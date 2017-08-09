const path = require('path');


module.exports = {
  entry: "./App.js",
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'build',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot-loader", "babel-loader"]
      }
    ]
  },
  devServer: {
    proxy: {
      '/index': {
        target: 'http://127.0.0.1:8000/',
        secure: false
      }
    },
    historyApiFallback: true
  }
}
