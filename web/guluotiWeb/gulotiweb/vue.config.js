const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  devServer: {
    // 项目启动端口之后会变成8200
    port: 8200,
    disableHostCheck: true,
    proxy: {
      '/api': {
        pathRewrite: {
          '^/api': ''
        },
        target: "http://139.155.247.54:3201",
        ws: true, // 是否开启 websokets
        secure: false, // 是否安全，https 为 true，http 为 false
        changeOrigin: true,
      },
      '/loc': {
        pathRewrite: {
          '^/loc': ''
        },
        target: "http://localhost:3201",
        ws: true, // 是否开启 websokets
        secure: false, // 是否安全，https 为 true，http 为 false
        changeOrigin: true,
      },
    },
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  productionSourceMap: false,

  //打包时开启这段代码
  // configureWebpack: {
  //   plugins: [
  //     new CompressionPlugin({
  //       test: /\.(js|css)?$/i, // 哪些文件要压缩
  //       filename: '[path].gz[query]',　// 压缩后的文件名
  //       algorithm: 'gzip',　// 使用gzip压缩
  //       minRatio: 1,　// 压缩率小于1才会压缩
  //       deleteOriginalAssets: false // 删除未压缩的文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false
  //     })
  //   ]
  // }
}