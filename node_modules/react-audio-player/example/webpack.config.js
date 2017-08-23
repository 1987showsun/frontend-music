const webpack = require('webpack');
const path = require('path');

const PORT = 4000;

module.exports = {
  entry: {
    app: [
      `webpack-dev-server/client?http://0.0.0.0:${PORT}`,
      'webpack/hot/only-dev-server',
      './example/js/main.jsx',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  devServer: {
    port: PORT,
    hot: true,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      }, {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
