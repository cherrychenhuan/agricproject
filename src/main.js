import { createApp } from 'vue'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from '@/router'
import qs from 'qs'
import cors from 'cors'
import piniaPluginPersistedstate  from 'pinia-plugin-persistedstate'
import Map from '@arcgis/core/Map.js';
import SceneView from "@arcgis/core/views/SceneView.js";
import weather from 'vue3-mini-weather'
//导入中文语言包  分页器用到了
import locale from 'element-plus/dist/locale/zh-cn.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //导入所有图标
import * as echarts from "echarts";
window.echarts = echarts;
//导入高德地图插件
import AMapLoader from "@amap/amap-jsapi-loader";
const app = createApp(App)
const pinia =createPinia()
// pinia.use(piniaPluginPersistedstate);//pinia数据持久化
// const persistedstate =createPersistedState()
pinia.use(piniaPluginPersistedstate )
app.use(HighchartsVue)
app.use(Highcharts)
app.use(router) //app.use(router) 需放在app.mount(’#app’)前面 不然加载时router-view、router-link等未被渲染
app.use(ElementPlus,{locale})
app.mount('#app')
app.use(pinia)
app.use(weather)
app.use(qs)
app.use(cors);
// app.config.devtools = true;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*'); // 替换为你的域名或 '*'
  //   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  //   next();
  // });
