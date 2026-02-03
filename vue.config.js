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
    },
  },
});
