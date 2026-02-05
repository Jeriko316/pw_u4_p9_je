const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081,
    proxy: {
      "/matricula": {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/matricula": "/matricula",
        },
      },
      "/token": {
        target: "http://localhost:8082",
        changeOrigin: true,
        pathRewrite: {
          "^/token": "/token",
        },
      },
    },
  },
});
