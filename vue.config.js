const webpack = require('webpack')
module.exports = {
    devServer: {
      // 设置代理
      proxy: {
          '/api': {
                    target: 'http://127.0.0.1:3000/',
                    changeOrigin: true,
                    pathRewrite: { "^/api": "" }
            }
      },
    },
    chainWebpack: (config) => {
      config.plugin('provide').use(webpack.ProvidePlugin, [{
        'window.Quill': 'quill'
      }])
  }
  };
  