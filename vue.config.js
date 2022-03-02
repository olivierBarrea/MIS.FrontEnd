module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          //target: 'http://localhost:5000',
          target:'http://10.1.100.222:3000/api/v1',
          changeOrigin: true,
          logLevel: 'debug',
          pathRewrite: { '^/api': '/' },
        },
      },
    },
  }