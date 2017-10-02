const path = require('path');


module.exports = {
  devtool: 'inline-sourcemap',
  entry: "./index.js",
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
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader?limit=25000'
      }
    ]
  },
  devServer: {
    proxy: [
      {
        context: ['/api/**', '/media/**'],
        target: 'http://127.0.0.1:8000/',
        secure: false
      }
    ],
    historyApiFallback: true
  }
}
