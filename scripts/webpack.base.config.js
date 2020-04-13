const path = require('path');
const Webpack = require('webpack-chain');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const baseConfig = new Webpack();

//输出
baseConfig
  .output
  .path(path.resolve(__dirname, '..', 'portal'))
  .filename('[name].js')
  .chunkFilename('js/[name].js')
  .publicPath('/')

// 解析
baseConfig.resolve
  .extensions
  .add('.js')
  .add('.vue')
  .add('.json')
  .add('.svg')
  .end()
  .alias
  .set(
    'vue$', 'vue/dist/vue.esm.js'
  )
  .set(
    '@', path.resolve(__dirname, '..', 'src')
  )
  .end()
  .modules
  .add(
    'node_modules', path.resolve(__dirname, '..', 'node_modules')
  )

// loader 解析设置
baseConfig.resolveLoader
  .modules
  .add(
    'node_modules', path.resolve(__dirname, '..', 'node_modules')
  );

// loader 设置
baseConfig.module
  .rule('lint')
  .enforce('pre')
  .test(/\.(js|vue)$/)
  .use('lint')
  .loader('eslint-loader')
  .options({
    emitWarning: true,
    failOnWarning: false
  })

baseConfig.module
  .rule('vue')
  .test(/\.vue$/)
  .use('vue')
  .loader('vue-loader')
  .options({

  })

baseConfig.module
  .rule('babel')
  .test(/\.jsx?$/)
  .exclude
  .add(file => (/node_modules/.test(file) && !/\.vue\.js/.test(file)))
  .end()
  .use('babel-loader')
  .loader('babel-loader')
  .options({
    cacheDirectory: true
  })

baseConfig.module
  .rule('style')
  .test(/\.scss$/)
  .use('style')
  .when(process.env.NODE_ENV === 'production', rule => {
    rule
      .loader(MiniCssExtractPlugin.loader)
      .options({
        publicPath: '../'
      })
  })
  .when(process.env.NODE_ENV !== 'production', rule => {
    rule
      .loader('vue-style-loader')
  })
  .loader('css-loader')
  .loader('postcss-loader')
  .loader('sass-loader')
  .options({
    prependData: `@import "~@/scss/theme-default/var.scss";`
  })

