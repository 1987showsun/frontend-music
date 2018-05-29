const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack           = require('webpack');
const path              = require('path');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/app/index.html`,
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  context: path.join(__dirname, "app"),
  entry: [
    './index.js',
  ],
  output: {
    path: `${__dirname}/dist/`,
    filename: `./index.js`,
    //filename: '/index.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },{
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
    //contentBase: './dist',
    contentBase: './app',
    inline: true,
    port: 8080,
  },
  plugins: [HTMLWebpackPluginConfig],
};
