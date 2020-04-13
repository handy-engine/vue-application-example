const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const WebpackConfig = require('webpack-chain');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devConfig = new WebpackConfig();

devConfig.mode('development');

devConfig
  .entry('entry')
  .add(path.resolve(__dirname, '..', 'src', 'main.js'))
  .end()
  .devtool('#cheap-module-source-map')
  .plugin('dev')
  .use(webpack.HotModuleReplacementPlugin)
  .use(HtmlWebpackPlugin, [{
    filename: 'index.html',
    template: path.resolve(__dirname, '..', 'public', 'index.html'),
    inject: true
  }])
  .end()
  .optimization
  .removeAvailableModules(false)
  .removeEmptyChunks(false)
  .splitChunks(false)

module.exports = webpackMerge(devConfig.toConfig(), baseConfig);