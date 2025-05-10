module.exports = {
    server:{
        proxy:{
          '/api':{ //获取路径中包含了api的请求
            target:'https://localhost:8080/',//后台服务所在的源
            changeOrigin:true,//修改源
            pathRewrite: {
              '^/api': ''
          }

          }
        },
  }

}
