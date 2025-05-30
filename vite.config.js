import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/


export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  configureWebpack:{
    devServer:{
      client:{overlay:false}
    }
  },
  server:{
    proxy:{
      '/api':{ //获取路径中包含了api的请求
        target:'https://localhost:8080/',//后台服务所在的源
        changeOrigin:true,//修改源
        pathRewrite: {
          '^/api': ''
      }

      }
    }
  }
})
