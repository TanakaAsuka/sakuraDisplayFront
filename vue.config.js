module.exports = {
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {
      //配置跨域
      "/upload": {
        target: "http://127.0.0.1:80/upload", //这里应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          "^/upload": "", 
        },
      },
    },
  },
};
