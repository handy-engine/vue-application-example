const path = require('path');
const WebpackConfig = require('webpack-chain');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const baseConfig = new WebpackConfig();

//输出
baseConfig
  .output
  .path(path.resolve(__dirname, '..', 'portal'))
  .filename('[name].js')
  .chunkFilename('js/[name].js')
  .publicPath('/')

// 解析
baseConfig.resolve
  // 解析扩展名
  .extensions
  .add('.js')
  .add('.vue')
  .add('.json')
  .add('.svg')
  .end()
  // 路径简写
  .alias
  .set(
    'vue$', 'vue/dist/vue.esm.js'
  )
  .set(
    '@', path.resolve(__dirname, '..', 'src')
  )
  .end()
  // 依赖地址
  .modules
  .add(
    'node_modules', path.resolve(__dirname, '..', 'node_modules')
  )

// loader解析地址
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
  .rule('sass-style')
  .test(/\.scss$/)
  .use('sass')
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
    //prependData: `@import "~@/scss/theme-default/var.scss";`
  })

baseConfig.module
  .rule('css-style')
  .test(/\.css$/)
  .use('css')
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

baseConfig.module
  .rule('image')
  .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  .use('image')
  .loader('file-loader')
  .options({
    name: 'images/[name].[hash:5].[ext]'
  })

baseConfig.module
  .rule('meidia')
  .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
  .use('media')
  .loader('file-loader')
  .options({
    name: 'media/[name].[hash:5].[ext]'
  })


baseConfig.module
  .rule('fonts')
  .test(/\.(woff2?|eot|tff|otf)(\?.*)?$/)
  .use('fonts')
  .loader('file-loader')
  .options({
    name: 'fonts/[name].[hash:5].[ext]'
  })

baseConfig.module
  .rule('file')
  .test(/\.(exe|pdf)(\?.*)?$/)
  .use('file')
  .loader('file-loader')
  .options({
    name: 'files/[name].[ext]'
  })

baseConfig
  .plugin('vue')
  .use(VueLoaderPlugin)

module.exports = baseConfig.toConfig();