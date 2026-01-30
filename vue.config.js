const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      // Todas las rutas que empiecen con /estudiantes se redirigen al backend
      '/estudiantes': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
})
