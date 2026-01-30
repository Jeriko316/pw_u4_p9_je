const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/api': {  // ¡IMPORTANTE! Proxy para /api
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug', // Añade esto para ver logs del proxy
        pathRewrite: {
          '^/api': '/api' // Mantiene /api en la URL
        }
      }
    },
    
    // Para debugging adicional
    client: {
      overlay: {
        warnings: true,
        errors: true
      },
      logging: 'verbose'
    }
  }
})