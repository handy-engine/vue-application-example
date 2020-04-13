const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.dev.config');

const options = {
  contentBase: path.resolve(__dirname, '..', 'public'),
  hot: true,
  host: 'localhost',
  port: '9001',
  compress: false,
  open: false,
  noInfo: true,
  overlay: true,
  quiet: true,
  stats: 'errors-only'
};


webpackDevServer.addDevServerEntrypoints(webpackConfig, options);

const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler, options);

server.listen(options.port, options.host);
