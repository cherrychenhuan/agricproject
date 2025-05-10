<template>
  <div>
    <el-row>
      <el-col :span="5">
        <div class="WeatherTreePanel">
          <div
            style="color:black;margin-top:-5px;margin-left:-5px;border-bottom:2px solid #e6e6e6b2; font-size:13px;line-height:40px;height:40px;text-align: center;">
            <el-text><el-icon>
                <Location />
              </el-icon>选择地区</el-text>
          </div>
          <!-- 树tttt -->
          <el-tree lazy :load="loadNode" ref="treeRef" :expand-on-click-node="false" :accordion="true"
            :current-node-key="currentNodekeys" highlight-current="true" :props="props" :data="data"
            @node-click="treeNodeClick" node-key="code" :default-expanded-keys="treeExpandData">
            <template #default="{ node, data }">
              <span class="custom-tree-node"
                style="flex:1;padding-right:10px;display: flex; align-items: center;justify-content: space-between;">
                <span>
                  <el-text>
                    <el-icon v-if="node.expanded === false && node.isLeaf === false && node.level !== 3" size="small"
                      style="color:darkolivegreen">
                      <Folder />
                    </el-icon>
                    <el-icon v-if="node.expanded === true && node.level !== 3" style="color:rgb(58, 107, 47);">
                      <FolderOpened />
                    </el-icon>
                    <el-icon v-if="node.level === 3" style="color:rgb(0, 72, 255);">
                      <Coordinate />
                    </el-icon>
                    <span class="labelName" :id="'node' + node.data.id" v-if="node.level == 2"
                      style="margin-left:5px;margin-top:-5px; font-size: 13px;color:rgb(58, 107, 47);">
                      {{ node.data.name }}
                    </span>
                    <span class="labelName" :id="'node' + node.data.id" v-if="node.level == 3"
                      style="margin-left:5px;margin-top:-5px; font-size: 13px;">
                      {{ node.data.name }}
                    </span>
                    <span class="labelName" :id="'node' + node.data.id" v-if="node.level == 1"
                      style="margin-left:5px;margin-top:-5px; font-size: 13px;">
                      {{ node.data.name }}
                    </span>
                  </el-text>
                </span>

              </span>
            </template>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="weather-main">
          <div class="weather-banner">
            <div class="weather-banner-header">
              <p class="weather-banner-header-left"><span class="city">{{ nowWeather.position.city }}</span>
                <span>
                  今天：{{ nowWeather.weather.weather }}
                  <span>
                    {{ nowWeather.weather.temperature }}°C
                  </span> <span>
                    {{ nowWeather.feature.wind }}
                  </span></span>
              </p>
              <p class="weather-banner-header-right"><span>{{ nowWeather.base.dateShort }}</span> <span>{{
        nowWeather.base.weekday
      }}</span>
                <span>{{ nowWeather.base.lunar }}</span>
              </p>
            </div>
            <div class="weather-banner-content">
              <div class="weather-banner-content-left"><span class="weather-banner-content-temperature">{{
        nowWeather.weather.temperature }}°C</span></div>
              <div class="weather-banner-content-right">
                <div class="weather-banner-content-pm25" style="background: rgb(130, 201, 30);color:white"><span>{{
        nowWeather.ps_pm25.ps_pm25
      }}</span>
                  <span>{{ nowWeather.ps_pm25.level }}</span>
                </div>
                <div class="weather-banner-content-wind"><svg class="weather-banner-content-svg">
                    <use xlink:href="#grayqingtian"></use>
                  </svg> <span>{{ nowWeather.weather.weather }}</span> <span>
                    {{ nowWeather.weather.wind_direction }}
                  </span> <span>
                    {{ nowWeather.weather.wind_power }}
                  </span></div>
              </div>
            </div>
            <div class="weather-banner-footer"><span>湿度{{ nowWeather.weather.humidity }}%</span> <span>紫外线{{
        nowWeather.feature.ultraviolet
      }}</span> <span>日出{{ nowWeather.feature.sunriseTime }}</span>
              <span>日落{{
        nowWeather.feature.sunsetTime }}</span>
            </div>
          </div>
          <!-- 24小时 -->
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item name="1">
              <template #title>
                <el-icon>
                  <Clock />
                </el-icon>24小时预报
              </template>
              <div class="weather-hour">
                <div class="weather-hour-header">
                  <div class="weather-hour-title" style="padding:10px 0 0 30px;color:#009238;">
                    <el-text><el-icon>
                        <Clock />
                      </el-icon>{{ hourTitle }}</el-text>
                  </div>
                  <ul class="weather-hour-type-list">
                    <li class="weather-hour-type-item text-color">
                      <el-button @click="hourTabClick(1)" style="margin:0;" round>温度</el-button>
                    </li>
                    <li class="weather-hour-type-item">
                      <el-button @click="hourTabClick(2)" round>降水量</el-button>
                    </li>
                    <li class="weather-hour-type-item">
                      <el-button @click="hourTabClick(3)" round>风力风向</el-button>
                    </li>
                    <li class="weather-hour-type-item">
                      <el-button @click="hourTabClick(4)" round>空气质量</el-button>
                    </li>
                    <li class="weather-hour-type-item">
                      <el-button @click="hourTabClick(5)" round>紫外线</el-button>
                    </li>
                  </ul>
                </div>
                <div class="weather-hour-content">
                  <div v-if="hourVisible == 1" id="hourtemp" style="width: 100%;height: 300px;">
                  </div>
                  <div v-if="hourVisible == 2" id="hourrain" style="width: 100%;height: 300px;">
                  </div>
                  <div v-if="hourVisible == 3" id="hourwind" style="width: 100%;height: 300px;">
                  </div>
                  <div v-if="hourVisible == 4" id="hourair" style="width: 100%;height: 300px;">
                  </div>
                  <div v-if="hourVisible == 5" id="houruv" style="width: 100%;height: 300px;">
                  </div>
                </div>
              </div>
            </el-collapse-item>
            <!-- 15天 -->
            <el-collapse-item name="2">
              <template #title>
                <el-icon>
                  <DataLine />
                </el-icon>15天天气预报
              </template>
              <div class="weather-15day" style="width:100%;">
                <div class="weather-15day-main" style="width:100%;">
                  <div class="weather-15day-content-box" style="width:100%;">
                    <div class="slider" id="day15weather" style="position: relative;left: 0px; width:800px;">
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
            <!-- 40天 -->
            <el-collapse-item name="3">
              <template #title>
                <el-icon>
                  <PieChart />
                </el-icon>未来40天天气预报
              </template>
              <div class="weather-future">
                <div class="future-weather" id="weatherFuture">
                  <el-calendar class="day40weather" :range="[xdate, ydate]">
                    <template #header="{ date }">
                      <span style="color:#009238;">{{ xdate.toLocaleDateString() }}-{{ ydate.toLocaleDateString()
                        }}</span></template>
                    <template #date-cell="{ data }">
                      <div style="font-size:'微软雅黑';position:relative;left:-40px;top:-12px;">
                        <span v-if="data.date.toLocaleDateString() != new Date().toLocaleDateString()">{{
        data.day.split('-').slice(1).join('-')
      }}</span>
                        <span v-else>今天</span>
                      </div>
                      <p :class="data.isSelected ? 'is-selected' : ''">

                      <div style="margin-top:-20px;"><img v-if="day40Data[data.day.toString()]" width="30px"
                          :src="getImg(day40Data[data.day.toString()].wicon)" /></div>
                      <div style="margin-top:0px;line-height: 20px;font-size:13px;color:#333;">
                        <span style="font-size: 13px;font-weight:500;">{{ day40Data[data.day.toString()] ?
        day40Data[data.day.toString()].temperature : '' }}
                        </span>
                        <br />
                        <span style="font-size: 11px;font-weight:500;">{{ day40Data[data.day.toString()] ?
        day40Data[data.day.toString()].weather_day : ''
                          }}</span>
                        <br />
                        <span style="font-size: 11px;font-weight:500;">{{ day40Data[data.day.toString()] ?
                          day40Data[data.day.toString()].wind : '' }}
                          {{ data.isSelected ? '✔️' : '' }}</span>
                      </div>
                      </p>
                    </template>
                  </el-calendar>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row>
  </div>



</template>

<script setup>
import request from '@/utils/request.js'
import Highcharts from 'highcharts'
// import BMap from "@/api/bmap.js"; // 引入刚才创建的bmap.js文件
import axios from "axios";
import { getLocationService } from '@/api/area.js'
import { getClimatedataService } from '@/api/recommend.js'
import { getForecastdataService, deleteWeatherDataService, FilterWeartherDataService, getYearListService, getProvinceDataService, getAreaDataService, getWeatherDataService } from '@/api/weather.js'
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import { toRaw } from '@vue/reactivity'
import * as echarts from 'echarts';
import { Filter, Edit, Delete, Plus, Upload, Search } from '@element-plus/icons-vue'
import { ElMessage, genFileId, ElMessageBox } from 'element-plus'
import cloneDeep from 'lodash/cloneDeep'
import { locationStore } from '@/stores/location.js'
const hourVisible = ref(1)
const activeNames = ref('1')
const hourTitle = ref('气温变化趋势')
//获取某个
const forecastData = ref({})
//获取日期
const xdate = ref('')
const ydate = ref('')
const getRangeDate = () => {
  let nowdate = new Date()
  let weakday1 = nowdate.getDay()
  let beginDate1 = new Date(nowdate.setDate(nowdate.getDate() - weakday1))
  let beginDate = cloneDeep(beginDate1)
  let endDate1 = new Date(beginDate1.setDate(beginDate1.getDate() + 41))
  let weakday2 = endDate1.getDay()
  let endDate = new Date(endDate1.setDate(endDate1.getDate() + (6 - weakday2)))
  xdate.value = beginDate
  ydate.value = endDate
  console.log(xdate.value, ydate.value)
}
getRangeDate()

const nowWeather = ref({
  "logo": {
    "url": "https://www.baidu.com/"
  },
  "weather": {
    "bodytemp_info": "人体感觉天气较冷",
    "wind_direction": "西北风",
    "site": "mlogcn",
    "weather": "晴",
    "dew_temperature": "-1",
    "precipitation_type": "无降雨和降雪",
    "wind_direction_num": "7",
    "temperature": "6",
    "wind_power": "1级",
    "f1hInfo": [
      {
        "precipitation_probability": "0",
        "temperature": "5",
        "hour": "2024030902",
        "wind_direction": "东北风",
        "uv": "最弱",
        "uv_num": "0",
        "wind_power": "<3级",
        "weather": "晴",
        "wind_power_num": "2",
        "precipitation": "0.0"
      },
      {
        "precipitation_probability": "0",
        "temperature": "4",
        "hour": "2024030903",
        "wind_direction": "东北风",
        "uv": "最弱",
        "uv_num": "0",
        "wind_power": "<3级",
        "weather": "多云",
        "wind_power_num": "2",
        "precipitation": "0.0"
      },
      {
        "precipitation_probability": "0",
        "temperature": "4",
        "hour": "2024030904",
        "wind_direction": "东北风",
        "uv": "最弱",
        "uv_num": "0",
        "wind_power": "<3级",
        "weather": "晴",
        "wind_power_num": "2",
        "precipitation": "0.0"
      }
    ],
    "update_time": "2024-03-09 02:41",
    "publish_time": "2024-03-09 02:40",
    "visibility": "7900",
    "pressure": "1020.7",
    "prec_monitor_time": "2024-03-09 02:00:00",
    "precipitation": "0.0",
    "real_feel_temperature": "5",
    "uv_info": "尚未日出，无需防护",
    "uv": "最弱",
    "humidity": "59.0",
    "uv_num": "0",
    "wind_power_num": "1",
    "f1hInfo#num#baidu": 3,
    "weather_day": "多云",
    "weather_night": "多云",
    "wind_direction_day": "东风",
    "wind_power_day": "3-4级",
    "wind_direction_night": "东风",
    "wind_power_night": "3-4级"
  },
  "position": {
    "city": "杭州",
    "country": "中国"
  },
  "ps_pm25": {
    "level": "良",
    "ps_pm25": "75"
  },
  "feature": {
    "humidity": "59.0",
    "wind": "西北风1级",
    "sunriseTime": "06:16",
    "sunsetTime": "18:04",
    "ultraviolet": "强"
  },
  "base": {
    "dateShort": "03月09日",
    "date": "2024-03-09",
    "weekday": "周四",
    "lunar": "正月廿九"
  }
})
const nowArea = ref({
  code: '',
  province: '浙江省',
  city: '杭州市'
})
//地区树

const customNodeClass = (data, node) => {
  if (data.level === 1) {
    return 'levelFirst'
  } else if (data.level === 2) {
    return 'levelSecond'
  } else {
    return 'levelThird'
  }
}
const data = ref([])
const nowLoadData = ref([])

const getImg = (name) => {
  const path = `/src/assets/weather/${name}.png`

  let src = new URL(path, import.meta.url).href
  return src
}
const day40Data = ref([])
const treeRef = ref(null)
const treeExpandData = ref([]) //默认展开节点
const currentNodekeys = ref('')
const getAreaData = async () => {
  let result = await getProvinceDataService()

  data.value = result.data
}
const InitTree = async () => {
  await getAreaData()
  let xnode = {}
  getHourWeatherData(1)
  get15DayWeatherData()
  get40DayweatherData()


}
InitTree()
//获取数据
const loadNode = async (node, resolve) => {
  if (node.level === 0) {
    return resolve([data.value])
  }
  else if (node.level >= 1 && node.level <= 3) {
    try {
      let result1 = await getAreaDataService(node.data.code, node.level + 1)
      if (result1.code == 0) {
        let xdata = result1.data
        if (node.level == 2) {
          for (let i = 0; i < xdata.length; i++) {
            xdata[i].leaf = true
          }
        }
        nowLoadData.value = xdata
        await nextTick();
        // treeExpandData.value.push(node.data.code);
        // 选中节点
        await nextTick();
        // if (node.level == 3) {
        //   currentNodekeys.value = node.data.code;
        //   currentNodekeys.value = cloneDeep(currentNodekeys.value);
        //   treeRef.value.setCurrentKey()
        //   treeRef.value.setCurrentKey(node.data.code, true)
        //   treeNodeClick(null, node, null, null)
        // }


        resolve(xdata)
      }
      else resolve([])
    } catch {
      resolve([])
    }
  } else {
    resolve([])
  }
}
const hourTabClick = (val) => {
  hourVisible.value = val
  if (val == 1) hourTitle.value = '气温变化趋势'
  else if (val == 2) hourTitle.value = '降水量变化趋势'
  else if (val == 3) hourTitle.value = '风力风向变化趋势'
  else if (val == 4) hourTitle.value = '空气质量变化趋势'
  else hourTitle.value = '紫外线变化趋势'

  getHourWeatherData(val)
}


///天气数据
const data1 = {
  "logo": {
    "url": "https:\/\/www.baidu.com\/"
  },
  "weather": {
    "bodytemp_info": "\u4eba\u4f53\u611f\u89c9\u5929\u6c14\u5bd2\u51c9",
    "wind_direction": "\u5317\u98ce",
    "site": "mlogcn",
    "weather": "\u591a\u4e91",
    "dew_temperature": "-1",
    "precipitation_type": "\u65e0\u964d\u96e8\u548c\u964d\u96ea",
    "wind_direction_num": "8",
    "temperature": "14",
    "wind_power": "3\u7ea7",
    "f1hInfo": [{
      "precipitation_probability": "0",
      "temperature": "12",
      "hour": "2024030715",
      "wind_direction": "\u897f\u5317\u98ce",
      "uv": "\u4e2d\u7b49",
      "uv_num": "5",
      "wind_power": "<3\u7ea7",
      "weather": "\u591a\u4e91",
      "wind_power_num": "2",
      "precipitation": "0.0"
    }, {
      "precipitation_probability": "0",
      "temperature": "11",
      "hour": "2024030716",
      "wind_direction": "\u897f\u5357\u98ce",
      "uv": "\u5f31",
      "uv_num": "4",
      "wind_power": "<3\u7ea7",
      "weather": "\u591a\u4e91",
      "wind_power_num": "2",
      "precipitation": "0.0"
    }, {
      "precipitation_probability": "0",
      "temperature": "10",
      "hour": "2024030717",
      "wind_direction": "\u5357\u98ce",
      "uv": "\u6700\u5f31",
      "uv_num": "2",
      "wind_power": "<3\u7ea7",
      "weather": "\u591a\u4e91",
      "wind_power_num": "2",
      "precipitation": "0.0"
    }],
    "update_time": "2024-03-07 15:01",
    "publish_time": "2024-03-07 15:00",
    "visibility": "7900",
    "pressure": "1015.5",
    "prec_monitor_time": "2024-03-07 14:00:00",
    "precipitation": "0.0",
    "real_feel_temperature": "13",
    "uv_info": "\u672a\u6765\u6709\u52a0\u5f3a\u8d8b\u52bf",
    "uv": "\u6700\u5f31",
    "humidity": "38.0",
    "uv_num": "2",
    "wind_power_num": "3",
    "f1hInfo#num#baidu": 3,
    "weather_day": "\u591a\u4e91",
    "weather_night": "\u591a\u4e91",
    "wind_direction_day": "\u65e0\u6301\u7eed\u98ce\u5411",
    "wind_power_day": "<3\u7ea7",
    "wind_direction_night": "\u897f\u5317\u98ce",
    "wind_power_night": "3-4\u7ea7"
  },
  "position": {
    "city": "\u6c5f\u5e72",
    "country": "\u4e2d\u56fd"
  },
  "ps_pm25": {
    "level": "\u826f",
    "ps_pm25": "83"
  },
  "feature": {
    "humidity": "38.0",
    "wind": "\u5317\u98ce3\u7ea7",
    "sunriseTime": "06:19",
    "sunsetTime": "18:03",
    "ultraviolet": "\u5f3a"
  },
  "base": {
    "dateShort": "03\u670807\u65e5",
    "date": "2024-03-07",
    "weekday": "\u5468\u56db",
    "lunar": "\u6b63\u6708\u5eff\u4e03"
  },
  "long_day_forecast": {
    "info": [{
      "moonrise": "04:08",
      "wind_power_night": "3-4\u7ea7",
      "temperature_night": "4",
      "wind_direction_night": "\u897f\u5317\u98ce",
      "next_full_moon": "2024-03-25 14:59:17",
      "moon_phase_angle": "231.75",
      "next_new_moon": "2024-03-10 17:00:25",
      "pm25": {
        "listQuality": {
          "listKey": "2",
          "listValue": "\u826f",
          "listAqiVal": "92",
          "site": "mlogcn"
        },
        "listTitle": "2024-03-07"
      },
      "wind_direction_day": "\u65e0\u6301\u7eed\u98ce\u5411",
      "weather_night": "\u591a\u4e91",
      "moon_pic_num": "23",
      "wind_power_day": "<3\u7ea7",
      "sunsetTime": "18:03",
      "date": "2024-03-07",
      "precipitation_probability_night": "0",
      "weather_day": "\u591a\u4e91",
      "moon_phase": "\u6b8b\u6708",
      "temperature_day": "14",
      "moonset": "14:22",
      "sunriseTime": "06:19",
      "moon_exposure_proportion": "19.05",
      "weather_day_for_beijing": "",
      "weather_night_for_beijing": "",
      "precipitation_probability_day": "0",
      "humidity": {
        "tip": "\u6e7f\u5ea6",
        "text": "38.0"
      }
    }, {
      "moonrise": "04:55",
      "wind_power_night": "<3\u7ea7",
      "temperature_night": "3",
      "wind_direction_night": "\u65e0\u6301\u7eed\u98ce\u5411",
      "next_full_moon": "2024-03-25 14:59:17",
      "moon_phase_angle": "218.16",
      "next_new_moon": "2024-03-10 17:00:25",
      "pm25": {
        "listQuality": {
          "listKey": "2",
          "listValue": "\u826f",
          "listAqiVal": "69",
          "site": "mlogcn"
        },
        "listTitle": "2024-03-08"
      },
      "wind_direction_day": "\u4e1c\u5317\u98ce",
      "weather_night": "\u591a\u4e91",
      "moon_pic_num": "22",
      "wind_power_day": "4-5\u7ea7",
      "sunsetTime": "18:03",
      "date": "2024-03-08",
      "precipitation_probability_night": "0",
      "weather_day": "\u591a\u4e91",
      "moon_phase": "\u6b8b\u6708",
      "temperature_day": "12",
      "moonset": "15:35",
      "sunriseTime": "06:17",
      "moon_exposure_proportion": "10.69",
      "weather_day_for_beijing": "",
      "weather_night_for_beijing": "",
      "precipitation_probability_day": "0"
    }, {
      "moonrise": "05:36",
      "wind_power_night": "3-4\u7ea7",
      "temperature_night": "2",
      "wind_direction_night": "\u4e1c\u98ce",
      "next_full_moon": "2024-03-25 14:59:17",
      "moon_phase_angle": "204.22",
      "next_new_moon": "2024-03-10 17:00:25",
      "pm25": {
        "listQuality": {
          "listKey": "2",
          "listValue": "\u826f",
          "listAqiVal": "65",
          "site": "mlogcn"
        },
        "listTitle": "2024-03-09"
      },
      "wind_direction_day": "\u4e1c\u98ce",
      "weather_night": "\u591a\u4e91",
      "moon_pic_num": "20",
      "wind_power_day": "3-4\u7ea7",
      "sunsetTime": "18:04",
      "date": "2024-03-09",
      "precipitation_probability_night": "0",
      "weather_day": "\u591a\u4e91",
      "moon_phase": "\u6b8b\u6708",
      "temperature_day": "11",
      "moonset": "16:48",
      "sunriseTime": "06:16",
      "moon_exposure_proportion": "4.4",
      "weather_day_for_beijing": "",
      "weather_night_for_beijing": "",
      "precipitation_probability_day": "0"
    }, {
      "moonrise": "06:13",
      "wind_power_night": "<3\u7ea7",
      "temperature_night": "5",
      "wind_direction_night": "\u65e0\u6301\u7eed\u98ce\u5411",
      "next_full_moon": "2024-03-25 14:59:17",
      "moon_phase_angle": "190.05",
      "next_new_moon": "2024-04-09 02:21:01",
      "pm25": {
        "listQuality": {
          "listKey": "2",
          "listValue": "\u826f",
          "listAqiVal": "59",
          "site": "mlogcn"
        },
        "listTitle": "2024-03-10"
      },
      "wind_direction_day": "\u4e1c\u98ce",
      "weather_night": "\u5c0f\u96e8",
      "moon_pic_num": "19",
      "wind_power_day": "3-4\u7ea7",
      "sunsetTime": "18:05",
      "date": "2024-03-10",
      "precipitation_probability_night": "70",
      "weather_day": "\u591a\u4e91",
      "moon_phase": "\u65b0\u6708",
      "temperature_day": "15",
      "moonset": "17:59",
      "sunriseTime": "06:15",
      "moon_exposure_proportion": "0.77",
      "weather_day_for_beijing": "",
      "weather_night_for_beijing": "",
      "precipitation_probability_day": "0"
    }, {
      "moonrise": "06:47",
      "wind_power_night": "3-4\u7ea7",
      "temperature_night": "7",
      "wind_direction_night": "\u897f\u5357\u98ce",
      "next_full_moon": "2024-03-25 14:59:17",
      "moon_phase_angle": "175.79",
      "next_new_moon": "2024-04-09 02:21:01",
      "pm25": {
        "listQuality": {
          "listKey": "2",
          "listValue": "\u826f",
          "listAqiVal": "58",
          "site": "mlogcn"
        },
        "listTitle": "2024-03-11"
      },
      "wind_direction_day": "\u897f\u5357\u98ce",
      "weather_night": "\u6674",
      "moon_pic_num": "18",
      "wind_power_day": "3-4\u7ea7",
      "sunsetTime": "18:05",
      "date": "2024-03-11",
      "precipitation_probability_night": "0",
      "weather_day": "\u5c0f\u96e8",
      "moon_phase": "\u5a25\u7709\u6708",
      "temperature_day": "16",
      "moonset": "19:09",
      "sunriseTime": "06:14",
      "moon_exposure_proportion": "0.13",
      "weather_day_for_beijing": "",
      "weather_night_for_beijing": "",
      "precipitation_probability_day": "70"
    }, {
      "moonrise": "07:21",
      "wind_power_night": "3-4\u7ea7",
      "temperature_night": "5",
      "wind_direction_night": "\u4e1c\u5317\u98ce",
      "next_full_moon": "2024-03-25 14:59:17",
      "moon_phase_angle": "161.61",
      "next_new_moon": "2024-04-09 02:21:01",
      "pm25": {
        "listQuality": {
          "listKey": "2",
          "listValue": "\u826f",
          "listAqiVal": "65",
          "site": "mlogcn"
        },
        "listTitle": "2024-03-12"
      },
      "wind_direction_day": "\u897f\u5317\u98ce",
      "weather_night": "\u591a\u4e91",
      "moon_pic_num": "16",
      "wind_power_day": "3-4\u7ea7",
      "sunsetTime": "18:06",
      "date": "2024-03-12",
      "precipitation_probability_night": "0",
      "weather_day": "\u591a\u4e91",
      "moon_phase": "\u5a25\u7709\u6708",
      "temperature_day": "21",
      "moonset": "20:19",
      "sunriseTime": "06:13",
      "moon_exposure_proportion": "2.55",
      "weather_day_for_beijing": "",
      "weather_night_for_beijing": "",
      "precipitation_probability_day": "0"
    }, {
      "moonrise": "07:55",
      "wind_power_night": "<3\u7ea7",
      "temperature_night": "8",
      "wind_direction_night": "\u65e0\u6301\u7eed\u98ce\u5411",
      "next_full_moon": "2024-03-25 14:59:17",
      "moon_phase_angle": "147.64",
      "next_new_moon": "2024-04-09 02:21:01",
      "pm25": {
        "listQuality": {
          "listKey": "2",
          "listValue": "\u826f",
          "listAqiVal": "69",
          "site": "mlogcn"
        },
        "listTitle": "2024-03-13"
      },
      "wind_direction_day": "\u4e1c\u98ce",
      "weather_night": "\u9634",
      "moon_pic_num": "15",
      "wind_power_day": "3-4\u7ea7",
      "sunsetTime": "18:07",
      "date": "2024-03-13",
      "precipitation_probability_night": "0",
      "weather_day": "\u9634",
      "moon_phase": "\u5a25\u7709\u6708",
      "temperature_day": "17",
      "moonset": "21:28",
      "sunriseTime": "06:11",
      "moon_exposure_proportion": "7.77",
      "weather_day_for_beijing": "",
      "weather_night_for_beijing": "",
      "precipitation_probability_day": "0"
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u4e1c\u98ce",
      "temperature_day": "19",
      "wind_direction_day": "\u4e1c\u5317\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-14",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:07",
      "temperature_night": "7",
      "sunriseTime": "06:10",
      "precipitation_probability_day": "0",
      "pm25": {
        "listTitle": "",
        "listQuality": {
          "listKey": "",
          "listValue": ""
        }
      }
    }, {
      "weather_day": "\u9634",
      "wind_direction_night": "\u897f\u5357\u98ce",
      "temperature_day": "19",
      "wind_direction_day": "\u4e1c\u5357\u98ce",
      "weather_night": "\u9634",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-15",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:08",
      "temperature_night": "9",
      "sunriseTime": "06:09",
      "precipitation_probability_day": "0",
      "pm25": {
        "listTitle": "",
        "listQuality": {
          "listKey": "",
          "listValue": ""
        }
      }
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u897f\u5317\u98ce",
      "temperature_day": "19",
      "wind_direction_day": "\u897f\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-16",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:08",
      "temperature_night": "10",
      "sunriseTime": "06:08",
      "precipitation_probability_day": "0",
      "pm25": {
        "listTitle": "",
        "listQuality": {
          "listKey": "",
          "listValue": ""
        }
      }
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u5357\u98ce",
      "temperature_day": "16",
      "wind_direction_day": "\u4e1c\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-17",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:09",
      "temperature_night": "10",
      "sunriseTime": "06:07",
      "precipitation_probability_day": "0",
      "pm25": {
        "listTitle": "",
        "listQuality": {
          "listKey": "",
          "listValue": ""
        }
      }
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u5357\u98ce",
      "temperature_day": "17",
      "wind_direction_day": "\u897f\u5357\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-18",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:10",
      "temperature_night": "6",
      "sunriseTime": "06:05",
      "precipitation_probability_day": "0",
      "pm25": {
        "listTitle": "",
        "listQuality": {
          "listKey": "",
          "listValue": ""
        }
      }
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u5357\u98ce",
      "temperature_day": "21",
      "wind_direction_day": "\u5357\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-19",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:10",
      "temperature_night": "7",
      "sunriseTime": "06:04",
      "precipitation_probability_day": "0",
      "pm25": {
        "listTitle": "",
        "listQuality": {
          "listKey": "",
          "listValue": ""
        }
      }
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u5357\u98ce",
      "temperature_day": "24",
      "wind_direction_day": "\u5357\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-20",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:11",
      "temperature_night": "10",
      "sunriseTime": "06:03",
      "precipitation_probability_day": "0",
      "pm25": {
        "listTitle": "",
        "listQuality": {
          "listKey": "",
          "listValue": ""
        }
      }
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u897f\u5357\u98ce",
      "temperature_day": "24",
      "wind_direction_day": "\u4e1c\u5357\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-21",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:12",
      "temperature_night": "11",
      "sunriseTime": "06:02",
      "precipitation_probability_day": "0",
      "pm25": {
        "listTitle": "",
        "listQuality": {
          "listKey": "",
          "listValue": ""
        }
      }
    }, {
      "date": "2024-03-22",
      "weather_day": "\u5c0f\u96e8",
      "weather_night": "\u4e2d\u96e8",
      "temperature_night": "15",
      "temperature_day": "24"
    }, {
      "date": "2024-03-23",
      "weather_day": "\u4e2d\u96e8",
      "weather_night": "\u4e2d\u5230\u5927\u96e8",
      "temperature_night": "7",
      "temperature_day": "20"
    }, {
      "date": "2024-03-24",
      "weather_day": "\u591a\u4e91",
      "weather_night": "\u6674",
      "temperature_night": "5",
      "temperature_day": "14"
    }, {
      "date": "2024-03-25",
      "weather_day": "\u591a\u4e91",
      "weather_night": "\u5c0f\u96e8",
      "temperature_night": "8",
      "temperature_day": "17"
    }, {
      "date": "2024-03-26",
      "weather_day": "\u591a\u4e91",
      "weather_night": "\u9634",
      "temperature_night": "8",
      "temperature_day": "17"
    }, {
      "date": "2024-03-27",
      "weather_day": "\u591a\u4e91",
      "weather_night": "\u591a\u4e91",
      "temperature_night": "10",
      "temperature_day": "17"
    }, {
      "date": "2024-03-28",
      "weather_day": "\u591a\u4e91",
      "weather_night": "\u6674",
      "temperature_night": "11",
      "temperature_day": "21"
    }, {
      "date": "2024-03-29",
      "weather_day": "\u6674",
      "weather_night": "\u591a\u4e91",
      "temperature_night": "14",
      "temperature_day": "24"
    }, {
      "date": "2024-03-30",
      "weather_day": "\u591a\u4e91",
      "weather_night": "\u591a\u4e91",
      "temperature_night": "15",
      "temperature_day": "25"
    }, {
      "date": "2024-03-31",
      "weather_day": "\u6674",
      "weather_night": "\u591a\u4e91",
      "temperature_night": "16",
      "temperature_day": "28"
    }, {
      "date": "2024-04-01",
      "weather_day": "\u591a\u4e91",
      "weather_night": "\u591a\u4e91",
      "temperature_night": "18",
      "temperature_day": "29"
    }, {
      "date": "2024-04-02",
      "weather_day": "\u5c0f\u5230\u4e2d\u96e8",
      "weather_night": "\u6674",
      "temperature_night": "17",
      "temperature_day": "28"
    }, {
      "date": "2024-04-03",
      "weather_day": "\u6674",
      "weather_night": "\u6674",
      "temperature_night": "18",
      "temperature_day": "28"
    }, {
      "date": "2024-04-04",
      "weather_day": "\u5c0f\u5230\u4e2d\u96e8",
      "weather_night": "\u5c0f\u96e8",
      "temperature_night": "18",
      "temperature_day": "29"
    }, {
      "date": "2024-04-05",
      "weather_day": "\u4e2d\u5230\u5927\u96e8",
      "weather_night": "\u4e2d\u96e8",
      "temperature_night": "18",
      "temperature_day": "27"
    }, {
      "date": "2024-04-06",
      "weather_day": "\u4e2d\u5230\u5927\u96e8",
      "weather_night": "\u4e2d\u5230\u5927\u96e8",
      "temperature_night": "17",
      "temperature_day": "24"
    }, {
      "date": "2024-04-07",
      "weather_day": "\u9634",
      "weather_night": "\u9634",
      "temperature_night": "15",
      "temperature_day": "20"
    }, {
      "date": "2024-04-08",
      "weather_day": "\u5c0f\u96e8",
      "weather_night": "\u5c0f\u96e8",
      "temperature_night": "15",
      "temperature_day": "18"
    }, {
      "date": "2024-04-09",
      "weather_day": "\u5c0f\u96e8",
      "weather_night": "\u5927\u96e8",
      "temperature_night": "16",
      "temperature_day": "20"
    }, {
      "date": "2024-04-10",
      "weather_day": "\u5927\u5230\u66b4\u96e8",
      "weather_night": "\u4e2d\u96e8",
      "temperature_night": "11",
      "temperature_day": "17"
    }, {
      "date": "2024-04-11",
      "weather_day": "\u4e2d\u5230\u5927\u96e8",
      "weather_night": "\u5c0f\u96e8",
      "temperature_night": "11",
      "temperature_day": "12"
    }, {
      "date": "2024-04-12",
      "weather_day": "\u5c0f\u96e8",
      "weather_night": "\u5927\u96e8",
      "temperature_night": "11",
      "temperature_day": "13"
    }, {
      "date": "2024-04-13",
      "weather_day": "\u5c0f\u96e8",
      "weather_night": "\u9634",
      "temperature_night": "11",
      "temperature_day": "13"
    }, {
      "date": "2024-04-14",
      "weather_day": "\u5c0f\u96e8",
      "weather_night": "\u5c0f\u96e8",
      "temperature_night": "12",
      "temperature_day": "16"
    }, {
      "date": "2024-04-15",
      "weather_day": "\u9634",
      "weather_night": "\u5c0f\u96e8",
      "temperature_night": "13",
      "temperature_day": "18"
    }],
    "update_time": "2024-03-07 11:54",
    "publish_time": "2024-03-07 11:30",
    "pm25_update_time": "2024-03-07 11:54",
    "pm25_publish_time": "2024-03-07 11:30",
    "weather_publish_time": "2024-03-07 11:30",
    "weather_update_time": "2024-03-07 11:54",
    "info#num#baidu": 7,
    "days": "40"
  },
  "15_day_forecast": {
    "info": [{
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u897f\u5317\u98ce",
      "temperature_day": "14",
      "wind_direction_day": "\u65e0\u6301\u7eed\u98ce\u5411",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "3-4\u7ea7",
      "date": "2024-03-07",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:03",
      "temperature_night": "4",
      "sunriseTime": "06:19",
      "pm25": {
        "listQuality": {
          "listKey": "2",
          "listValue": "\u826f",
          "listAqiVal": "92",
          "site": "mlogcn"
        },
        "listTitle": "2024-03-07"
      },
      "precipitation_probability_day": "0",
      "humidity": {
        "tip": "\u6e7f\u5ea6",
        "text": "38.0"
      }
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u65e0\u6301\u7eed\u98ce\u5411",
      "temperature_day": "12",
      "wind_direction_day": "\u4e1c\u5317\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "4-5\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-08",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:03",
      "temperature_night": "3",
      "sunriseTime": "06:17",
      "pm25": {
        "listQuality": {
          "listKey": "2",
          "listValue": "\u826f",
          "listAqiVal": "69",
          "site": "mlogcn"
        },
        "listTitle": "2024-03-08"
      },
      "precipitation_probability_day": "0"
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u4e1c\u98ce",
      "temperature_day": "11",
      "wind_direction_day": "\u4e1c\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "3-4\u7ea7",
      "wind_power_night": "3-4\u7ea7",
      "date": "2024-03-09",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:04",
      "temperature_night": "2",
      "sunriseTime": "06:16",
      "pm25": {
        "listQuality": {
          "listKey": "2",
          "listValue": "\u826f",
          "listAqiVal": "65",
          "site": "mlogcn"
        },
        "listTitle": "2024-03-09"
      },
      "precipitation_probability_day": "0"
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u65e0\u6301\u7eed\u98ce\u5411",
      "temperature_day": "15",
      "wind_direction_day": "\u4e1c\u98ce",
      "weather_night": "\u5c0f\u96e8",
      "wind_power_day": "3-4\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-10",
      "precipitation_probability_night": "80",
      "sunsetTime": "18:05",
      "temperature_night": "5",
      "sunriseTime": "06:15",
      "pm25": {
        "listQuality": {
          "listKey": "2",
          "listValue": "\u826f",
          "listAqiVal": "59",
          "site": "mlogcn"
        },
        "listTitle": "2024-03-10"
      },
      "precipitation_probability_day": "0"
    }, {
      "weather_day": "\u5c0f\u96e8",
      "wind_direction_night": "\u897f\u5357\u98ce",
      "temperature_day": "16",
      "wind_direction_day": "\u897f\u5357\u98ce",
      "weather_night": "\u6674",
      "wind_power_day": "3-4\u7ea7",
      "wind_power_night": "3-4\u7ea7",
      "date": "2024-03-11",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:05",
      "temperature_night": "7",
      "sunriseTime": "06:14",
      "pm25": {
        "listQuality": {
          "listKey": "2",
          "listValue": "\u826f",
          "listAqiVal": "58",
          "site": "mlogcn"
        },
        "listTitle": "2024-03-11"
      },
      "precipitation_probability_day": "80"
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u4e1c\u5317\u98ce",
      "temperature_day": "21",
      "wind_direction_day": "\u897f\u5317\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "3-4\u7ea7",
      "wind_power_night": "3-4\u7ea7",
      "date": "2024-03-12",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:06",
      "temperature_night": "5",
      "sunriseTime": "06:13",
      "pm25": {
        "listQuality": {
          "listKey": "2",
          "listValue": "\u826f",
          "listAqiVal": "65",
          "site": "mlogcn"
        },
        "listTitle": "2024-03-12"
      },
      "precipitation_probability_day": "0"
    }, {
      "weather_day": "\u9634",
      "wind_direction_night": "\u65e0\u6301\u7eed\u98ce\u5411",
      "temperature_day": "17",
      "wind_direction_day": "\u4e1c\u98ce",
      "weather_night": "\u9634",
      "wind_power_day": "3-4\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-13",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:07",
      "temperature_night": "8",
      "sunriseTime": "06:11",
      "pm25": {
        "listQuality": {
          "listKey": "2",
          "listValue": "\u826f",
          "listAqiVal": "69",
          "site": "mlogcn"
        },
        "listTitle": "2024-03-13"
      },
      "precipitation_probability_day": "0"
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u4e1c\u98ce",
      "temperature_day": "19",
      "wind_direction_day": "\u4e1c\u5317\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-14",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:07",
      "temperature_night": "7",
      "sunriseTime": "06:10",
      "precipitation_probability_day": "0",
      "pm25": {
        "listTitle": "",
        "listQuality": {
          "listKey": "",
          "listValue": ""
        }
      }
    }, {
      "weather_day": "\u9634",
      "wind_direction_night": "\u897f\u5357\u98ce",
      "temperature_day": "19",
      "wind_direction_day": "\u4e1c\u5357\u98ce",
      "weather_night": "\u9634",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-15",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:08",
      "temperature_night": "9",
      "sunriseTime": "06:09",
      "precipitation_probability_day": "0",
      "pm25": {
        "listTitle": "",
        "listQuality": {
          "listKey": "",
          "listValue": ""
        }
      }
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u897f\u5317\u98ce",
      "temperature_day": "19",
      "wind_direction_day": "\u897f\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-16",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:08",
      "temperature_night": "10",
      "sunriseTime": "06:08",
      "precipitation_probability_day": "0",
      "pm25": {
        "listTitle": "",
        "listQuality": {
          "listKey": "",
          "listValue": ""
        }
      }
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u5357\u98ce",
      "temperature_day": "16",
      "wind_direction_day": "\u4e1c\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-17",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:09",
      "temperature_night": "10",
      "sunriseTime": "06:07",
      "precipitation_probability_day": "0",
      "pm25": {
        "listTitle": "",
        "listQuality": {
          "listKey": "",
          "listValue": ""
        }
      }
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u5357\u98ce",
      "temperature_day": "17",
      "wind_direction_day": "\u897f\u5357\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-18",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:10",
      "temperature_night": "6",
      "sunriseTime": "06:05",
      "precipitation_probability_day": "0",
      "pm25": {
        "listTitle": "",
        "listQuality": {
          "listKey": "",
          "listValue": ""
        }
      }
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u5357\u98ce",
      "temperature_day": "21",
      "wind_direction_day": "\u5357\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-19",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:10",
      "temperature_night": "7",
      "sunriseTime": "06:04",
      "precipitation_probability_day": "0",
      "pm25": {
        "listTitle": "",
        "listQuality": {
          "listKey": "",
          "listValue": ""
        }
      }
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u5357\u98ce",
      "temperature_day": "24",
      "wind_direction_day": "\u5357\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-20",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:11",
      "temperature_night": "10",
      "sunriseTime": "06:03",
      "precipitation_probability_day": "0",
      "pm25": {
        "listTitle": "",
        "listQuality": {
          "listKey": "",
          "listValue": ""
        }
      }
    }, {
      "weather_day": "\u591a\u4e91",
      "wind_direction_night": "\u897f\u5357\u98ce",
      "temperature_day": "24",
      "wind_direction_day": "\u4e1c\u5357\u98ce",
      "weather_night": "\u591a\u4e91",
      "wind_power_day": "<3\u7ea7",
      "wind_power_night": "<3\u7ea7",
      "date": "2024-03-21",
      "precipitation_probability_night": "0",
      "sunsetTime": "18:12",
      "temperature_night": "11",
      "sunriseTime": "06:02",
      "precipitation_probability_day": "0",
      "pm25": {
        "listTitle": "",
        "listQuality": {
          "listKey": "",
          "listValue": ""
        }
      }
    }],
    "update_time": "2024-03-07 09:48",
    "publish_time": "2024-03-07 09:40",
    "pm25_update_time": "2024-03-07 09:48",
    "pm25_publish_time": "2024-03-07 09:40",
    "weather_publish_time": "2024-03-07 09:40",
    "weather_update_time": "2024-03-07 09:48",
    "info#num#baidu": 15,
    "days": "15"
  },
  "recommend_zhishu": {
    "url": "\/sf?pd=life_compare_weather&from_sf=1&openapi=1&dspName=iphone&word=%E6%B1%9F%E5%B9%B2&title=%E7%94%9F%E6%B4%BB%E6%B0%94%E8%B1%A1%E6%8C%87%E6%95%B0&resource_id=4599&ext=%7B%22sf_tab_name%22%3A%22chuanyi%22%2C%22bar_sort%22%3A%22chuanyi%2Cchuyou%2Cxiche%2Chuazhuang%2Cganmao%22%7D&county_id=101210111",
    "title": "\u751f\u6d3b\u6c14\u8c61\u6307\u6570",
    "desc": "\u4e0b\u5348\u597d\uff0c\u4eca\u65e5\u5929\u6c14\u6674\u597d\uff0c\u5fc3\u60c5\u4e5f\u8981\u4fdd\u6301\u6674\u6717\u54e6",
    "other_url": "\/sf?pd=life_compare_weather&from_sf=1&openapi=1&dspName=iphone&word=%E6%B1%9F%E5%B9%B2&title=%E7%94%9F%E6%B4%BB%E6%B0%94%E8%B1%A1%E6%8C%87%E6%95%B0&resource_id=4599&ext=%7B%22sf_tab_name%22%3A%22chuanyi%22%2C%22bar_sort%22%3A%22chuanyi%2Cchuyou%2Cxiche%2Chuazhuang%2Cganmao%22%7D&county_id=101210111&top=%7B%22sfhs%22%3A1%7D",
    "item": [{
      "item_name": "\u7a7f\u8863",
      "item_title": "\u7a7f\u8863: \u6bdb\u8863\u7c7b",
      "item_icon": "https:\/\/search-operate.cdn.bcebos.com\/d76428db3dd46c38130dd344defe7d89.png",
      "item_icon_white": "https:\/\/search-operate.cdn.bcebos.com\/ef2f0f30ab2f56b2bf0f825f57db133e.png",
      "item_desc": "4\u2103~14\u2103",
      "item_url": "\/sf?pd=life_compare_weather&from_sf=1&openapi=1&dspName=iphone&word=%E6%B1%9F%E5%B9%B2&title=%E7%94%9F%E6%B4%BB%E6%B0%94%E8%B1%A1%E6%8C%87%E6%95%B0&resource_id=4599&ext=%7B%22sf_tab_name%22%3A%22chuanyi%22%2C%22bar_sort%22%3A%22chuanyi%2Cchuyou%2Cxiche%2Chuazhuang%2Cganmao%22%7D&county_id=101210111",
      "item_other_url": "\/sf?pd=life_compare_weather&from_sf=1&openapi=1&dspName=iphone&word=%E6%B1%9F%E5%B9%B2&title=%E7%94%9F%E6%B4%BB%E6%B0%94%E8%B1%A1%E6%8C%87%E6%95%B0&resource_id=4599&ext=%7B%22sf_tab_name%22%3A%22chuanyi%22%2C%22bar_sort%22%3A%22chuanyi%2Cchuyou%2Cxiche%2Chuazhuang%2Cganmao%22%7D&county_id=101210111&top=%7B%22sfhs%22%3A1%7D"
    }, {
      "item_name": "\u51fa\u6e38",
      "item_title": "\u51fa\u6e38: \u8f83\u9002\u5b9c",
      "item_icon": "https:\/\/search-operate.cdn.bcebos.com\/13c92a56c6176983cf3554a6586b797e.png",
      "item_icon_white": "https:\/\/search-operate.cdn.bcebos.com\/f3fb9f13f515fcb6881155ba44c46e4a.png",
      "item_desc": "\u591a\u4e91, \u7a7a\u6c14\u826f",
      "item_url": "\/sf?pd=life_compare_weather&from_sf=1&openapi=1&dspName=iphone&word=%E6%B1%9F%E5%B9%B2&title=%E7%94%9F%E6%B4%BB%E6%B0%94%E8%B1%A1%E6%8C%87%E6%95%B0&resource_id=4600&ext=%7B%22sf_tab_name%22%3A%22chuyou%22%2C%22bar_sort%22%3A%22chuanyi%2Cchuyou%2Cxiche%2Chuazhuang%2Cganmao%22%7D&county_id=101210111",
      "item_other_url": "\/sf?pd=life_compare_weather&from_sf=1&openapi=1&dspName=iphone&word=%E6%B1%9F%E5%B9%B2&title=%E7%94%9F%E6%B4%BB%E6%B0%94%E8%B1%A1%E6%8C%87%E6%95%B0&resource_id=4600&ext=%7B%22sf_tab_name%22%3A%22chuyou%22%2C%22bar_sort%22%3A%22chuanyi%2Cchuyou%2Cxiche%2Chuazhuang%2Cganmao%22%7D&county_id=101210111&top=%7B%22sfhs%22%3A1%7D"
    }, {
      "item_name": "\u6d17\u8f66",
      "item_title": "\u6d17\u8f66: \u4e0d\u9002\u5b9c",
      "item_icon": "https:\/\/search-operate.cdn.bcebos.com\/4fc1b9c1ee59ed6a3e5a05017fc9360b.png",
      "item_icon_white": "https:\/\/search-operate.cdn.bcebos.com\/8eda9c80e2fd0bf197243111762e6041.png",
      "item_desc": "\u8fd1\u671f\u6709\u5927\u98ce",
      "item_url": "\/sf?pd=life_compare_weather&from_sf=1&openapi=1&dspName=iphone&word=%E6%B1%9F%E5%B9%B2&title=%E7%94%9F%E6%B4%BB%E6%B0%94%E8%B1%A1%E6%8C%87%E6%95%B0&resource_id=4602&ext=%7B%22sf_tab_name%22%3A%22xiche%22%2C%22bar_sort%22%3A%22chuanyi%2Cchuyou%2Cxiche%2Chuazhuang%2Cganmao%22%7D&county_id=101210111",
      "item_other_url": "\/sf?pd=life_compare_weather&from_sf=1&openapi=1&dspName=iphone&word=%E6%B1%9F%E5%B9%B2&title=%E7%94%9F%E6%B4%BB%E6%B0%94%E8%B1%A1%E6%8C%87%E6%95%B0&resource_id=4602&ext=%7B%22sf_tab_name%22%3A%22xiche%22%2C%22bar_sort%22%3A%22chuanyi%2Cchuyou%2Cxiche%2Chuazhuang%2Cganmao%22%7D&county_id=101210111&top=%7B%22sfhs%22%3A1%7D"
    }, {
      "item_name": "\u5316\u5986",
      "item_title": "\u5316\u5986: \u4fdd\u6e7f",
      "item_icon": "https:\/\/search-operate.cdn.bcebos.com\/9198001541bb09c69208104519c96789.png",
      "item_icon_white": "https:\/\/search-operate.cdn.bcebos.com\/a851992b93143e0e308bc48c9380b6ac.png",
      "item_desc": "\u7a7a\u6c14\u6e7f\u5ea668.0%",
      "item_url": "\/sf?pd=life_compare_weather&from_sf=1&openapi=1&dspName=iphone&word=%E6%B1%9F%E5%B9%B2&title=%E7%94%9F%E6%B4%BB%E6%B0%94%E8%B1%A1%E6%8C%87%E6%95%B0&resource_id=4604&ext=%7B%22sf_tab_name%22%3A%22huazhuang%22%2C%22bar_sort%22%3A%22chuanyi%2Cchuyou%2Cxiche%2Chuazhuang%2Cganmao%22%7D&county_id=101210111",
      "item_other_url": "\/sf?pd=life_compare_weather&from_sf=1&openapi=1&dspName=iphone&word=%E6%B1%9F%E5%B9%B2&title=%E7%94%9F%E6%B4%BB%E6%B0%94%E8%B1%A1%E6%8C%87%E6%95%B0&resource_id=4604&ext=%7B%22sf_tab_name%22%3A%22huazhuang%22%2C%22bar_sort%22%3A%22chuanyi%2Cchuyou%2Cxiche%2Chuazhuang%2Cganmao%22%7D&county_id=101210111&top=%7B%22sfhs%22%3A1%7D"
    }],
    "strategy_log": {
      "recommend_zhishu_sort": ["chuanyi", "chuyou", "xiche", "huazhuang", "ganmao"],
      "user_attr": [],
      "observe_weather": {
        "bodytemp_info": "\u4eba\u4f53\u611f\u89c9\u5929\u6c14\u5bd2\u51c9",
        "wind_direction": "\u5317\u98ce",
        "site": "mlogcn",
        "weather": "\u591a\u4e91",
        "dew_temperature": "-1",
        "precipitation_type": "\u65e0\u964d\u96e8\u548c\u964d\u96ea",
        "wind_direction_num": "8",
        "temperature": "14",
        "wind_power": "3\u7ea7",
        "f1hInfo": [{
          "precipitation_probability": "0",
          "temperature": "12",
          "hour": "2024030715",
          "wind_direction": "\u897f\u5317\u98ce",
          "uv": "\u4e2d\u7b49",
          "uv_num": "5",
          "wind_power": "<3\u7ea7",
          "weather": "\u591a\u4e91",
          "wind_power_num": "2",
          "precipitation": "0.0"
        }, {
          "precipitation_probability": "0",
          "temperature": "11",
          "hour": "2024030716",
          "wind_direction": "\u897f\u5357\u98ce",
          "uv": "\u5f31",
          "uv_num": "4",
          "wind_power": "<3\u7ea7",
          "weather": "\u591a\u4e91",
          "wind_power_num": "2",
          "precipitation": "0.0"
        }, {
          "precipitation_probability": "0",
          "temperature": "10",
          "hour": "2024030717",
          "wind_direction": "\u5357\u98ce",
          "uv": "\u6700\u5f31",
          "uv_num": "2",
          "wind_power": "<3\u7ea7",
          "weather": "\u591a\u4e91",
          "wind_power_num": "2",
          "precipitation": "0.0"
        }],
        "update_time": "2024-03-07 15:01",
        "publish_time": "2024-03-07 15:00",
        "visibility": "7900",
        "pressure": "1015.5",
        "prec_monitor_time": "2024-03-07 14:00:00",
        "precipitation": "0.0",
        "real_feel_temperature": "13",
        "uv_info": "\u672a\u6765\u6709\u52a0\u5f3a\u8d8b\u52bf",
        "uv": "\u6700\u5f31",
        "humidity": "38.0",
        "uv_num": "2",
        "wind_power_num": "3",
        "f1hInfo#num#baidu": 3,
        "ps_pm25": "83"
      }
    }
  },
  "24_hour_forecast": {
    "info": [{
      "precipitation_probability": "0",
      "temperature": "12",
      "hour": "2024030715",
      "wind_direction": "\u897f\u5317\u98ce",
      "uv": "\u4e2d\u7b49",
      "site": "mlogcn",
      "uv_num": "5",
      "wind_power": "<3\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "2",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "90",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030715"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "11",
      "hour": "2024030716",
      "wind_direction": "\u897f\u5357\u98ce",
      "uv": "\u5f31",
      "site": "mlogcn",
      "uv_num": "4",
      "wind_power": "<3\u7ea7",
      "weather": "\u591a\u4e91",
      "wind_power_num": "2",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "89",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030716"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "10",
      "hour": "2024030717",
      "wind_direction": "\u5357\u98ce",
      "uv": "\u6700\u5f31",
      "site": "mlogcn",
      "uv_num": "2",
      "wind_power": "<3\u7ea7",
      "weather": "\u591a\u4e91",
      "wind_power_num": "2",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "89",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030717"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "9",
      "hour": "2024030718",
      "wind_direction": "\u4e1c\u5357\u98ce",
      "uv": "\u6700\u5f31",
      "site": "mlogcn",
      "uv_num": "0",
      "wind_power": "<3\u7ea7",
      "weather": "\u591a\u4e91",
      "wind_power_num": "2",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "89",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030718"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "9",
      "hour": "2024030719",
      "wind_direction": "\u4e1c\u98ce",
      "uv": "\u6700\u5f31",
      "site": "mlogcn",
      "uv_num": "0",
      "wind_power": "<3\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "2",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "89",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030719"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "9",
      "hour": "2024030720",
      "wind_direction": "\u4e1c\u5317\u98ce",
      "uv": "\u6700\u5f31",
      "site": "mlogcn",
      "uv_num": "0",
      "wind_power": "<3\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "2",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "88",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030720"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "8",
      "hour": "2024030721",
      "wind_direction": "\u5317\u98ce",
      "uv": "\u6700\u5f31",
      "site": "mlogcn",
      "uv_num": "0",
      "wind_power": "<3\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "2",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "88",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030721"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "7",
      "hour": "2024030722",
      "wind_direction": "\u897f\u98ce",
      "uv": "\u6700\u5f31",
      "site": "mlogcn",
      "uv_num": "0",
      "wind_power": "3-4\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "4",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "88",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030722"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "6",
      "hour": "2024030723",
      "wind_direction": "\u897f\u98ce",
      "uv": "\u6700\u5f31",
      "site": "mlogcn",
      "uv_num": "0",
      "wind_power": "4-5\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "5",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "89",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030723"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "5",
      "hour": "2024030800",
      "wind_direction": "\u897f\u5357\u98ce",
      "uv": "\u6700\u5f31",
      "site": "mlogcn",
      "uv_num": "0",
      "wind_power": "4-5\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "5",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "89",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030800"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "5",
      "hour": "2024030801",
      "wind_direction": "\u897f\u5357\u98ce",
      "uv": "\u6700\u5f31",
      "site": "mlogcn",
      "uv_num": "0",
      "wind_power": "4-5\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "5",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "86",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030801"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "5",
      "hour": "2024030802",
      "wind_direction": "\u897f\u5357\u98ce",
      "uv": "\u6700\u5f31",
      "site": "mlogcn",
      "uv_num": "0",
      "wind_power": "4-5\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "5",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "85",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030802"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "4",
      "hour": "2024030803",
      "wind_direction": "\u897f\u5357\u98ce",
      "uv": "\u6700\u5f31",
      "site": "mlogcn",
      "uv_num": "0",
      "wind_power": "3-4\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "4",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "83",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030803"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "4",
      "hour": "2024030804",
      "wind_direction": "\u897f\u98ce",
      "uv": "\u6700\u5f31",
      "site": "mlogcn",
      "uv_num": "0",
      "wind_power": "3-4\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "4",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "80",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030804"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "4",
      "hour": "2024030805",
      "wind_direction": "\u897f\u5317\u98ce",
      "uv": "\u6700\u5f31",
      "site": "mlogcn",
      "uv_num": "0",
      "wind_power": "4-5\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "5",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "77",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030805"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "5",
      "hour": "2024030806",
      "wind_direction": "\u897f\u5317\u98ce",
      "uv": "\u6700\u5f31",
      "site": "mlogcn",
      "uv_num": "0",
      "wind_power": "4-5\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "5",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "65",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030806"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "6",
      "hour": "2024030807",
      "wind_direction": "\u897f\u5317\u98ce",
      "uv": "\u6700\u5f31",
      "site": "mlogcn",
      "uv_num": "1",
      "wind_power": "4-5\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "5",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "68",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030807"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "7",
      "hour": "2024030808",
      "wind_direction": "\u897f\u5317\u98ce",
      "uv": "\u5f31",
      "site": "mlogcn",
      "uv_num": "3",
      "wind_power": "4-5\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "5",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "71",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030808"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "8",
      "hour": "2024030809",
      "wind_direction": "\u897f\u5317\u98ce",
      "uv": "\u4e2d\u7b49",
      "site": "mlogcn",
      "uv_num": "5",
      "wind_power": "3-4\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "4",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "74",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030809"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "9",
      "hour": "2024030810",
      "wind_direction": "\u5317\u98ce",
      "uv": "\u4e2d\u7b49",
      "site": "mlogcn",
      "uv_num": "6",
      "wind_power": "4-5\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "5",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "73",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030810"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "11",
      "hour": "2024030811",
      "wind_direction": "\u5317\u98ce",
      "uv": "\u5f3a",
      "site": "mlogcn",
      "uv_num": "7",
      "wind_power": "4-5\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "5",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "71",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030811"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "11",
      "hour": "2024030812",
      "wind_direction": "\u5317\u98ce",
      "uv": "\u5f3a",
      "site": "mlogcn",
      "uv_num": "8",
      "wind_power": "4-5\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "5",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "72",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030812"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "11",
      "hour": "2024030813",
      "wind_direction": "\u5317\u98ce",
      "uv": "\u5f3a",
      "site": "mlogcn",
      "uv_num": "7",
      "wind_power": "4-5\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "5",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "72",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030813"
      }
    }, {
      "precipitation_probability": "0",
      "temperature": "12",
      "hour": "2024030814",
      "wind_direction": "\u5317\u98ce",
      "uv": "\u4e2d\u7b49",
      "site": "mlogcn",
      "uv_num": "6",
      "wind_power": "5-6\u7ea7",
      "weather": "\u6674",
      "wind_power_num": "6",
      "precipitation": "0.0",
      "pm25": {
        "listAqiVal": "73",
        "listKey": "2",
        "listValue": "\u826f",
        "hour": "2024030814"
      }
    }],
    "loc": "http:\/\/www.mlogcn.com\/101210111",
    "update_time": "2024-03-07 14:26",
    "resource_name": "mlogcn",
    "@delflag": "0",
    "changefreq": "daily",
    "@id": "101210111",
    "@site": "http:\/\/vapi.mlogcn.com\/",
    "site": "mlogcn",
    "weather_id": "101210111",
    "id": "101210111",
    "@updatetime": "2024-03-07 14:26",
    "publish_time": "2024-03-07 14:00",
    "@templateid": "7307",
    "type": "f1h",
    "lastmod": "2024-03-07T14:23:05",
    "info#num#baidu": 48
  },
  "yesterday_15d": {
    "weather_day": "\u591a\u4e91",
    "wind_direction_night": "\u65e0\u6301\u7eed\u98ce\u5411",
    "temperature_day": "11",
    "wind_direction_day": "\u5317\u98ce",
    "weather_night": "\u591a\u4e91",
    "wind_power_day": "3-4\u7ea7",
    "wind_power_night": "<3\u7ea7",
    "date": "2024-03-06",
    "sunsetTime": "18:02",
    "temperature_night": "2",
    "sunriseTime": "06:20",
    "pm25": {
      "listQuality": {
        "listKey": "2",
        "listValue": "\u826f",
        "listAqiVal": "54",
        "site": "weather"
      },
      "listTitle": "2024-03-06"
    }
  },
  "do_not_show_longForecast": 0,
  "forecast": "long_day_forecast"
};

const getWeekday = (date) => {
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const weekday = new Date(date).getDay();
  return weekdays[weekday];
}
//24小时天气数据获取
const getHourWeatherData = async (flag) => {
  var option1;
  var option2;
  var option3;
  var option4;
  var option5;
  // let result1 = await get24HourdataService()
  let result1 = await getForecastdataService({ province: nowArea.value.province, city: nowArea.value.city })
  // console.log("mmmy", eval('(' + result1.data + ')')) //注意一定要加两个括号 才是正确的转换方式
  await nextTick()
  console.log("xxxx", result1.data)
  let xxxxx = eval('(' + result1.data + ')')
  await nextTick()
  nowWeather.value = xxxxx.now
  console.log("xxxx", xxxxx)
  let xdata = xxxxx["24_hour_forecast"].info
  let uv = []
  let hour = []
  let temp = []
  let precipitation = []
  let wind = []
  let pm25 = []
  for (let i = 0; i < 24; i++) {
    hour.push(xdata[i].hour.slice(-2) + ':00')
    temp.push(Number(xdata[i].temperature))
    uv.push({ value: Number(xdata[i].uv_num), uvlevel: xdata[i].uv })
    precipitation.push({ value: Number(xdata[i].precipitation), probability: Number(xdata[i].precipitation_probability) })
    wind.push({ value: Number(xdata[i].wind_power_num), power: xdata[i].wind_power, direction: xdata[i].wind_direction })
    pm25.push({ value: Number(xdata[i].pm25.listAqiVal), listValue: xdata[i].pm25.listValue }) //对象里面一定要有一个属性value
  }
  hour[0] = '现在'
  option1 = {
    dataZoom: [
      {
        type: "inside",//slider表示有滑动块的，
        show: true,
        xAxisIndex: [0],//表示x轴折叠
        start: 0,//数据窗口范围的起始百分比,表示1%
        end: 25,//数据窗口范围的结束百分比,表示35%坐标
        bottom: "10",
      },
    ],
    grid: {
      left: '3%', //默认10%
      right: '4%', //默认10%
      bottom: '10%', //默认60
      containLabel: true
      //grid区域是否包含坐标轴的刻度标签
    },
    xAxis: {
      type: 'category',
      data: hour
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        //这种做法就是在y轴的数据的值旁边拼接单位，貌似也挺方便的
        formatter: "{value}°C",
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: temp,
        name: '气温',
        type: 'line',
        smooth: true,
        areaStyle: {
          color: '#0092376b'
        },
        lineStyle: {
          cap: 'butt',
          width: 1,
          color: '#009238'
        },
        itemStyle: {
          color: '#009238'
        },
        symbolSize: 8,
        label: {
          show: true,
          position: 'top',
          formatter: function (params) {
            return params.value + '°C'
          }
        }
      }
    ]
  };
  option2 = {
    dataZoom: [
      {
        type: "inside",//slider表示有滑动块的，
        show: true,
        xAxisIndex: [0],//表示x轴折叠
        start: 0,//数据窗口范围的起始百分比,表示1%
        end: 25,//数据窗口范围的结束百分比,表示35%坐标
        bottom: "20",
      },
    ],
    grid: {
      left: '3%', //默认10%
      right: '4%', //默认10%
      bottom: '20%', //默认60
      containLabel: true
      //grid区域是否包含坐标轴的刻度标签
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        return '降水概率为' + params[0].data.probability
      }
    },
    xAxis: {
      type: 'category',
      data: hour
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        //这种做法就是在y轴的数据的值旁边拼接单位，貌似也挺方便的
        formatter: "{value}mm",
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: '降水量',
        data: precipitation,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: '#0092376b'
        },
        lineStyle: {
          cap: 'butt',
          width: 1,
          color: '#009238'
        },
        itemStyle: { color: '#009238' },
        symbolSize: 8,
        label: {
          show: true,
          position: 'top',
          formatter: function (params) {
            return params.value + 'mm'
          }
        }
      }
    ]
  };
  option3 = {
    dataZoom: [
      {
        type: "inside",//slider表示有滑动块的，
        show: true,
        xAxisIndex: [0],//表示x轴折叠
        start: 0,//数据窗口范围的起始百分比,表示1%
        end: 25,//数据窗口范围的结束百分比,表示35%坐标
        bottom: "10",
      },
    ],
    grid: {
      left: '3%', //默认10%
      right: '4%', //默认10%
      bottom: '20%', //默认60
      containLabel: true
      //grid区域是否包含坐标轴的刻度标签
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        if (params[0].data.direction == '西北风') return '↖' + params[0].data.direction + params[0].data.power
        if (params[0].data.direction == '东北风') return '↗' + params[0].data.direction + params[0].data.power
        if (params[0].data.direction == '东南风') return '↘' + params[0].data.direction + params[0].data.power
        if (params[0].data.direction == '西南风') return '↙' + params[0].data.direction + params[0].data.power
        if (params[0].data.direction == '北风') return '↑' + params[0].data.direction + params[0].data.power
        if (params[0].data.direction == '南风') return '↓' + params[0].data.direction + params[0].data.power
        if (params[0].data.direction == '东风') return '→' + params[0].data.direction + params[0].data.power
        if (params[0].data.direction == '西风') return '←' + params[0].data.direction + params[0].data.power
      }
    },
    xAxis: {
      type: 'category',
      data: hour
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        //这种做法就是在y轴的数据的值旁边拼接单位，貌似也挺方便的
        formatter: "{value}",
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: wind,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: '#0092376b'
        },
        lineStyle: {
          cap: 'butt',
          width: 1,
          color: '#009238'
        },
        itemStyle: { color: '#009238' },
        symbolSize: 8,
        label: {
          show: true,
          position: 'top'
        }
      }
    ]
  };
  option4 = {
    dataZoom: [
      {
        type: "inside",//slider表示有滑动块的，
        show: true,
        xAxisIndex: [0],//表示x轴折叠
        start: 0,//数据窗口范围的起始百分比,表示1%
        end: 25,//数据窗口范围的结束百分比,表示35%坐标
        bottom: "20",
      },
    ],
    grid: {
      left: '3%', //默认10%
      right: '4%', //默认10%
      bottom: '20%', //默认60
      containLabel: true
      //grid区域是否包含坐标轴的刻度标签
    },
    tooltip: {
      trigger: 'axis',
      position: 'top',
      formatter: function (params) {
        let content = "";

        params.forEach((item) => {
          // 提示框的内容样式及数据
          content += `<div style="height: 40px;">
          <!-- 圆点样式 -->
          <div><span>${item.data.listValue}<span></div>
          <div><span>${item.value}<span></div>
        </div>`;
        });

        return content;


      }
    },
    xAxis: {
      type: 'category',
      data: hour
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        //这种做法就是在y轴的数据的值旁边拼接单位，貌似也挺方便的
        formatter: "{value}",
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: pm25,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: '#0092376b'
        },
        lineStyle: {
          cap: 'butt',
          width: 1,
          color: '#009238'
        },
        itemStyle: { color: '#009238' },
        symbolSize: 8,
        label: {
          show: false,
          position: 'top',
          formatter: function (params) {

            return params.data.value
          }
        }
      }
    ]
  };
  option5 = {
    dataZoom: [
      {
        type: "inside",//slider表示有滑动块的，
        show: true,
        xAxisIndex: [0],//表示x轴折叠
        start: 0,//数据窗口范围的起始百分比,表示1%
        end: 25,//数据窗口范围的结束百分比,表示35%坐标
        bottom: "20",
      },
    ],
    grid: {
      left: '3%', //默认10%
      right: '4%', //默认10%
      bottom: '20%', //默认60
      containLabel: true
      //grid区域是否包含坐标轴的刻度标签
    },
    tooltip: {
      trigger: 'axis',
      position: 'top',
      formatter: function (params) {
        let content = "";

        params.forEach((item) => {
          // 提示框的内容样式及数据
          content += `<div style="height: 40px;">
          <!-- 圆点样式 -->
          <div><span>${item.data.uvlevel}<span></div>
          <div><span>${item.value}<span></div>
        </div>`;
        });

        return content;


      }
    },
    xAxis: {
      type: 'category',
      data: hour
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        //这种做法就是在y轴的数据的值旁边拼接单位，貌似也挺方便的
        formatter: "{value}",
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: uv,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: '#0092376b'
        },
        lineStyle: {
          cap: 'butt',
          width: 1,
          color: '#009238'
        },
        itemStyle: { color: '#009238' },
        symbolSize: 8,
        label: {
          show: false,
          position: 'top',
          formatter: function (params) {
            // console.log("xxxx", params)
            return params.data.value
          }
        }
      }
    ]
  };
  if (flag == 1) {
    await nextTick()
    var chartDom1 = document.getElementById('hourtemp');
    await nextTick()
    var myChart1 = echarts.init(chartDom1, { autoResize: true });
    await nextTick()
    option1 && myChart1.setOption(option1);
  } else if (flag == 2) {
    await nextTick()
    var chartDom2 = document.getElementById('hourrain');
    await nextTick()
    var myChart2 = echarts.init(chartDom2, { autoResize: true });
    await nextTick()
    option2 && myChart2.setOption(option2);
  } else if (flag == 3) {
    await nextTick()
    var chartDom3 = document.getElementById('hourwind');
    await nextTick()
    var myChart3 = echarts.init(chartDom3, { autoResize: true });
    await nextTick()
    option3 && myChart3.setOption(option3);
  } else if (flag == 4) {
    await nextTick()
    var chartDom4 = document.getElementById('hourair');
    await nextTick()
    var myChart4 = echarts.init(chartDom4, { autoResize: true });
    await nextTick()
    option4 && myChart4.setOption(option4);
  } else {
    await nextTick()
    var chartDom5 = document.getElementById('houruv');
    await nextTick()
    var myChart5 = echarts.init(chartDom5, { autoResize: true });
    await nextTick()
    option5 && myChart5.setOption(option5);
  }
}

//15天气数据获取
// console.log("yyyy", data1["long_day_forecast"].info)
const get15DayWeatherData = async () => {
  let result1 = await getForecastdataService({ province: nowArea.value.province, city: nowArea.value.city })
  // console.log("mmmy", eval('(' + result1.data + ')')) //注意一定要加两个括号 才是正确的转换方式
  await nextTick()
  let xxxxx = eval('(' + result1.data + ')')
  let xdata = xxxxx["15_day_forecast"].info
  // let xdata = data1["15_day_forecast"].info
  let date = []
  let humidity = []
  let pm25 = []
  let precipitation = []
  let sunriseTime = []
  let sunsetTime = []
  let temperature_day = []
  let temperature_night = []
  let weather_day = []
  let weather_night = []
  let wind_direction_day = []
  let wind_direction_night = []
  let wind_power_day = []
  let wind_power_night = []
  let day = []
  let night = []
  for (let i = 0; i < xdata.length; i++) {
    let item = xdata[i]
    let xxdate = item.date.split('-')
    let weekday = getWeekday(item.date)
    date.push(xxdate[1] + '/' + xxdate[2])

    day.push({
      date: xxdate[1] + '/' + xxdate[2] + weekday,
      value: Number(item.temperature_day),
      weather: item.weather_day,
      sunriseTime: item.sunriseTime,
      wind_power: item.wind_power_day,
      wind_direction: item.wind_direction_day,
      precipitation_probability: item.precipitation_probability_day,
      pm25: item.pm25.listQuality,
      humidity: item.humidity
    })
    night.push({
      value: Number(item.temperature_night),
      weather: item.weather_night,
      sunriseTime: item.sunsetTime,
      wind_power: item.wind_power_night,
      wind_direction: item.wind_direction_night,
      precipitation_probability: item.precipitation_probability_night
    })


    //var option1;
    var option1;
    option1 = {
      grid: {
        left: '3%', //默认10%
        right: '5%', //默认10%
        bottom: '20%', //默认60
        containLabel: true
        //grid区域是否包含坐标轴的刻度标签
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'white',
        borderColor: '#e9e9eb',
        borderWidth: 1,
        formatter: function (params) {
          let day = params[0].data
          let night = params[1].data
          let weather = ''
          let wind = ''
          let sun = ''
          let date = day.date
          let air = pm25
          // if(day.pm25.listValue=='优秀')
          if (night.weather == day.weather) weather = night.weather
          else weather = day.weather + '转' + night.weather
          // console.log("day", day)
          weather += ' ' + night.value + '°C~' + day.value + '°C'
          sun += day.sunriseTime + '/' + night.sunriseTime
          wind += day.wind_direction + night.wind_power
          let content = "";
          content = `<div ><div style="width:250px;"><div style="color:#333;text-shadow: 0px 0px 0px #333;">${date} ${weather}</div>`
          content += `<div style="margin-top:-8px;width:100%;height:10px;border-radius:10px;background-color:#a0cfff;"></div>`
          content += `<div style="background-color:white;padding-top:10px;padding-bottom:10px;">
            <div style="float:left;">
            <div style="color:#73767a;font-size:12px;">风力风向</div>
            <div  style="color:#73767a;">${wind}</div>
            </div>
            <div style="float:right;">
            <div style="color:#73767a;font-size:12px;">日出日落</div>
            <div  style="color:#73767a;">${sun}</div>
            </div>
            </div>

            </div>
            </div></div>`


          return content;


        }
      },
      legend: {},
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date,
        triggerEvent: true
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        }
      },
      series: [
        {
          name: '白天气温',
          type: 'line',
          smooth: true,
          data: day,
          lineStyle: {
            color: '#E6A23C'
          },
          itemStyle: {
            color: '#E6A23C'
          },
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
          markLine: {
            data: [{ type: 'average', name: 'Avg' }]
          }
        },
        {
          name: '夜晚气温',
          smooth: true,
          type: 'line',
          lineStyle: {
            color: '#009237'
          },
          itemStyle: {
            color: '#009237'
          },
          data: night,
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: 'Avg' },
              [
                {
                  symbol: 'none',
                  x: '90%',
                  yAxis: 'max'
                },
                {
                  symbol: 'circle',
                  label: {
                    position: 'start',
                    formatter: 'Max'
                  },
                  type: 'max',
                  name: '最高点'
                }
              ]
            ]
          }
        }
      ]
    };
    await nextTick()
    var chartDom1 = document.getElementById('day15weather');
    await nextTick()
    var myChart1 = echarts.init(chartDom1, { autoResize: true });
    await nextTick()
    option1 && myChart1.setOption(option1);

  }

}
get15DayWeatherData()

const get40DayweatherData = async () => {
  let result1 = await getForecastdataService({ province: nowArea.value.province, city: nowArea.value.city })
  // console.log("mmmy", eval('(' + result1.data + ')')) //注意一定要加两个括号 才是正确的转换方式
  await nextTick()
  let xxxxx = eval('(' + result1.data + ')')
  let xdata = xxxxx["long_day_forecast"].info
  day40Data.value = {}
  for (let i = 0; i < xdata.length; i++) {
    if (xdata[i].weather_day.indexOf('晴') != -1) xdata[i].wicon = '晴'
    else if (xdata[i].weather_day.indexOf('阵雨') != -1) xdata[i].wicon = '阵雨'
    else if (xdata[i].weather_day.indexOf('雨') != -1) xdata[i].wicon = '雨'
    else if (xdata[i].weather_day.indexOf('多云') != -1) xdata[i].wicon = '多云'
    else if (xdata[i].weather_day.indexOf('阴') != -1) xdata[i].wicon = '阴天'
    else if (xdata[i].weather_day.indexOf('雪') != -1) xdata[i].wicon = '雪'
    else if (xdata[i].weather_day.indexOf('雾') != -1) xdata[i].wicon = '雾'


    xdata[i].temperature = xdata[i].temperature_night + ' ~ ' + xdata[i].temperature_day + '°C' //气温
    if (xdata[i].weather_day == xdata[i].weather_night) xdata[i].weather = xdata[i].weather_day
    else xdata[i].weather = xdata[i].weather_day + '转' + xdata[i].weather_night

    if (xdata[i].wind_direction_day != undefined) {
      let wind_direction = ''
      if (xdata[i].wind_direction_day != '无持续风向') wind_direction = xdata[i].wind_direction_day
      else if (xdata[i].wind_direction_night != '无持续风向') wind_direction = xdata[i].wind_direction_night
      else wind_direction = ''

      let wind_power = xdata[i].wind_power_night
      xdata[i].wind = wind_direction + wind_power
    }
    day40Data.value[xdata[i].date] = xdata[i]
  }
  day40Data.value = cloneDeep(day40Data.value)
  // console.log("xxx34", day40Data.value)
}

const treeNodeClick = async (treeobj, node, treenode, event) => {

  if (node.level == 2) {
    let code = node.data.code
    nowArea.value.code = code
    let result1 = await getLocationService(code, 2)
    if (result1.data.length !== 0) {
      nowArea.value.province = result1.data[0].province
      if (node.data.name == '直辖市') nowArea.value.city = ''
      else nowArea.value.city = result1.data[0].city
    }
    await nextTick()
    getHourWeatherData(1)
    get15DayWeatherData()
    get40DayweatherData()
  }
  else if (node.level == 3) {
    let code = node.data.code
    nowArea.value.code = code
    let result1 = await getLocationService(code, 3)

    if (result1.data.length !== 0) {
      nowArea.value.province = result1.data[0].province
      nowArea.value.city = result1.data[0].city
    }
    console.log("nowArea.value", nowArea.value)
    await nextTick()
    getHourWeatherData(1)
    get15DayWeatherData()
    get40DayweatherData()
  } else {
    if ((node.data.name) == '北京市' || (node.data.name) == '天津市' || (node.data.name) == '重庆市' || (node.data.name) == '上海市') {
      nowArea.value.province = node.data.name
      nowArea.value.city = ''
      await nextTick()
      getHourWeatherData(1)
      get15DayWeatherData()
      get40DayweatherData()
    }
  }
}
</script>

<style lang="scss">
.day40weather {
  // background: linear-gradient(rgb(13, 104, 188), rgb(54, 131, 195));
  // color: white;

  .el-calendar__body {
    padding: 0px;
  }

  .el-calendar__header {
    padding: 0px 10px;
    border: 0;
  }

  .el-calendar-table .el-calendar-day {
    height: 100%;
  }

  .el-calendar-table thead th {
    color: #009238;
    font-size: 13px;
    // padding: 15px;
    height: 30px;
    background-color: #e5e5e5;
  }

  .el-calendar-table td {
    // border-bottom: 0.3px solid rgba(50, 50, 50, 0.592);
    // border-right: 0.3px solid rgba(50, 50, 50, 0.592);
  }

  .el-calendar-table tbody .el-calendar-table__row {
    height: 120px;
  }
}

.WeatherTreePanel {
  height: 92vh;
  border-right: 2px solid #e6e6e6b2;

  .el-tree {
    height: 100%;
    --el-tree-node-hover-bg-color: #ffebce;
    margin: 0px;
    overflow: auto;
  }
}

/*!src/error/index.atom.css*/
.weather_error {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -94px;
  margin-left: -100px;
  height: 152px;
  width: 200px
}

.weather_error p {
  color: #666;
  margin-top: 16px;
  font-size: 16px;
  line-height: 1
}

.weather_error_img {
  margin: 0 auto;
  display: block;
  width: 120px;
  height: 120px;
  -webkit-background-size: cover;
  background-size: cover;
  background-image: url(/static/weathernew/error/img/error_ebd7a66.png)
}

/*!src/home/index.atom.css*/
.weather {
  position: relative;
  width: 100%;
  font-family: PingFangSC-Regular;
  -webkit-user-select: none;
  user-select: none
}

.weather-main {
  width: 100%;
  height: 92vh;
  margin-top: -10px;
  overflow: auto;
  // background-color: linear-gradient(rgb(13, 104, 188), rgb(54, 131, 195));

}

.weather-content {
  position: relative;
  width: 100%;
  padding-bottom: 91px
}

.weather-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  // height: 342px;
  color: #333;
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(18%, rgba(255, 255, 255, 0)), to(rgba(0, 46, 120, .65)));
  background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 18%, rgba(0, 46, 120, .65) 100%);
  background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 18%, rgba(0, 46, 120, .65) 100%)
}

.weather-footer.bottomImg {
  background: url(/static/weathernew/static/image/bg/bottomImg_1c469f0.png) no-repeat !important;
  -webkit-background-size: 100% 342px !important;
  background-size: 100% 342px !important
}

.weather-main.baiqing {
  background: url(/static/weathernew/static/image/bg/baiqing_15dbf5e.png) no-repeat !important;
  -webkit-background-size: 100% 518px !important;
  background-size: 100% 518px !important
}

.weather-main.yeqing {
  background: url(/static/weathernew/static/image/bg/夜晴_79a7605.png) no-repeat !important;
  -webkit-background-size: 100% 518px !important;
  background-size: 100% 518px !important
}

.weather-main.yesha {
  background: url(/static/weathernew/static/image/bg/夜沙_e6c9cd2.png) no-repeat !important;
  -webkit-background-size: 100% 518px !important;
  background-size: 100% 518px !important
}

.weather-main.riluo {
  background: url(/static/weathernew/static/image/bg/日落_a2031ba.png) no-repeat !important;
  -webkit-background-size: 100% 518px !important;
  background-size: 100% 518px !important
}

.weather-main.shachen {
  background: url(/static/weathernew/static/image/bg/沙尘_2c2f414.png) no-repeat !important;
  -webkit-background-size: 100% 518px !important;
  background-size: 100% 518px !important
}

.weather-main.yuye {
  background: url(/static/weathernew/static/image/bg/雨夜_6afe959.png) no-repeat !important;
  -webkit-background-size: 100% 518px !important;
  background-size: 100% 518px !important
}

.weather-main.baiyu {
  background: url(/static/weathernew/static/image/bg/白雨_7d759a8.png) no-repeat !important;
  -webkit-background-size: 100% 518px !important;
  background-size: 100% 518px !important
}

.weather-bg-img.xiayu {
  background: url(/static/weathernew/static/image/雨_63eacb7.png) no-repeat;
  background-position: center 0
}

.weather-bg-img.yangguang {
  background: url(/static/weathernew/static/image/阳光_51f84c3.png) no-repeat;
  background-position: center 0
}

.weather-bg-img.xiaxue {
  background: url(/static/weathernew/static/image/雪_32e82b7.png) no-repeat;
  background-position: center 0
}

.weather-bg-img.xingkong {
  background: url(/static/weathernew/static/image/星空_3eb12b1.png) no-repeat;
  background-position: center 0
}

.weather-footer-text {
  position: absolute;
  bottom: 27px;
  font-size: 12px;
  line-height: 17px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%)
}

/*!src/home/icon.atom.css*/
.display-none[data-a-7bef3169] {
  display: none
}

/*!src/home/grayicon.atom.css*/
.display-none[data-a-c08dcf34] {
  display: none
}

/*!src/home/weatherHour.atom.css*/
div,
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none
}

.weather-hour {
  border-top: 1px solid rgba(169, 169, 169, 0.277);
  width: 100%;
  height: 350px;
  color: #333333;
  margin: 0 auto;
  padding-top: 5px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 3px;
  // background-color: rgba(0, 0, 0, 0.445);
  font-family: 'PingFangSC-Regular'
}

.weather-hour-header {
  .el-text {
    color: #009238;
  }
}

.weather-hour-header::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0
}

.weahter-hour-header {
  height: 18px;
  color: #0b5b16;
}

.weather-hour-title {
  line-height: 15px;
  float: left;
  font-size: 15px;
  color: #333;
}

.weather-hour-type-list {
  position: relative;
  line-height: 18px;
  float: right;
  font-size: 16px
}

.weather-hour-type-item {
  position: relative;
  display: inline-block;
  padding: 5px 5px;
  border-radius: 14px;
  color: #333;
  cursor: pointer
}

.weather-hour-type-item.text-color {
  color: #333333;
  background-color: rgba(255, 255, 255, .3)
}

.weather-hour-type-item:hover {
  color: #333333
}

.weather-hour-content {
  width: 100%;
  height: 193px
}

.weather-hour-bight-box {
  position: relative;
  display: inline-block;
  height: 193px;
  // width: 787px
}

.weather-hour-btn-box {
  position: relative;
  display: inline-block;
  width: 31.5px;
  height: 100%;
  cursor: pointer
}

.weather-hour-btn-box>span {
  position: relative;
  top: 65px;
  width: 31.5;
  height: 50px
}

.weather-hour-btn-box:hover>span {
  opacity: .4
}

.weather-hour-btn-box>span::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 18px;
  left: 10px;
  width: 9.5px;
  height: 9.5px;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg)
}

.weather-hour-btn-box>span.right::after {
  top: 18px;
  left: 10px;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg)
}

.type-bight {
  position: relative;
  left: 35px;
  width: 720px;
  margin: 0 auto;
  height: 153px;
  padding-top: 40px;
  overflow: hidden
}

.slider-box {
  position: absolute;
  left: 0;
  top: 18px;
  height: 175px;
  -webkit-transition: left .6s;
  transition: left .6s
}

.x-coordinate {
  position: absolute;
  left: 20px;
  line-height: 0;
  border-top: 1px solid rgba(255, 255, 255, .12)
}

.x-coordinate>.coordinate-item {
  position: relative;
  display: inline-block;
  height: 10px;
  width: 113px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-left: 1px solid rgba(255, 255, 255, .12)
}

.time-node {
  position: absolute;
  top: 20px;
  left: -19px;
  line-height: 14px;
  font-size: 14px;
  // text-algin: center;
  color: #333;
}

.coordinate-item:last-of-type {
  width: 0;
  border-left: 0
}

.y-coordinate {
  position: absolute;
  bottom: 38px;
  left: 20px;
  width: 45px;
  height: 132px
}

.y-coordinate>.y-item {
  display: inline-block;
  font-size: 14px;
  width: 45px;
  line-height: 20px;
  color: #333;
  text-align: center;
  margin-bottom: 36px
}

.y-item:last-of-type {
  margin-bottom: 0
}




#hourCvs {
  background-color: transparent
}

.PointMask {
  position: absolute;
  left: -25px;
  width: 59px;
  height: 59px;
  background-color: rgba(0, 0, 0, .4);
  border-radius: 4px;
  font-size: 14px
}

// .PointMask span {
//   display: inline-block;
//   width: 59px;
//   text-align: center
// }

.PointMask::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  top: -10px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-bottom-color: rgba(0, 0, 0, .4)
}

.PointMask.arrow-dir-bottom::after {
  top: 59px;
  border-bottom-color: transparent;
  border-top-color: rgba(0, 0, 0, .4)
}

// .PointMask.arrow-right {
//   left: -10px
// }

// .PointMask.arrow-right::after {
//   -webkit-transform: translateX(-20px);
//   transform: translateX(-20px)
// }

// .PointMask.arrow-left::after {
//   -webkit-transform: translateX(10px);
//   transform: translateX(10px)
// }

// .PointMask.arrow-left {
//   left: -40px
// }

.weather-hour-icon {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  display: block;
  font-family: arial, '微软雅黑'
}

.weather-hour-wind-icon {
  width: 20px;
  height: 20px;
  margin: 5px auto;
  display: block;
  font-family: arial, '微软雅黑'
}

.pm-icon {
  margin: 5px 0
}

.precipitation-icon {
  position: relative;
  left: 50%;
  margin-left: -12.5px;
  margin-top: 4px;
  width: 25px;
  height: 25px;
  background: url(/static/weathernew/static/image/icowater_78cfa24.png) no-repeat
}

.weather-hour-wind-icon.beifeng {
  -webkit-transform: rotateZ(180deg);
  transform: rotateZ(180deg)
}

.weather-hour-wind-icon.nanfeng {
  -webkit-transform: rotateZ(0deg);
  transform: rotateZ(0deg)
}

.weather-hour-wind-icon.xifeng {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg)
}

.weather-hour-wind-icon.dongfeng {
  -webkit-transform: rotateZ(-90deg);
  transform: rotateZ(-90deg)
}

.weather-hour-wind-icon.xibeifeng {
  -webkit-transform: rotateZ(135deg);
  transform: rotateZ(135deg)
}

.weather-hour-wind-icon.xinanfeng {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg)
}

.weather-hour-wind-icon.dongbeifeng {
  -webkit-transform: rotateZ(-135deg);
  transform: rotateZ(-135deg)
}

.weather-hour-wind-icon.dongnanfeng {
  -webkit-transform: rotateZ(-45deg);
  transform: rotateZ(-45deg)
}

.weather-hour-wind-icon.weifeng {
  -webkit-transform: rotateZ(-135deg);
  transform: rotateZ(-135deg)
}

/*!src/home/weather15Day.atom.css*/
div,
ul,
p,
li {
  padding: 0;
  margin: 0;
  list-style: none
}

.weather-15day {
  width: 100%;
  // height: 100%;
  border-top: 1px solid rgba(213, 213, 213, 0.277);
  position: relative;
  color: #333;
  margin: 0 auto;
  padding: 10px 16px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 3px;
  font-size: 0;
  background-color: rgb(255, 255, 255);
  font-family: 'PingFangSC-Regular'
}


.weather-15day-main {
  position: relative;
  width: 100%;
  // height: 409px
}

.weather-hour-btn-box {
  width: 52.5px;
  height: 100%;
  display: inline-block
}

.weather-hour-btn-box>span {
  position: relative;
  top: 157px;
  width: 52.5px;
  height: 50px
}

.weather-hour-btn-box:hover>span {
  opacity: .4
}

.weather-hour-btn-box>span::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 18px;
  left: 10px;
  width: 9.5px;
  height: 9.5px;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg)
}

.weather-hour-btn-box>span.right::after {
  top: 18px;
  left: 32px;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg)
}

.weather-15day-content-box {
  position: relative;
  display: inline-block;
  height: 100%;
}

.slider {
  position: absolute;
  left: 0;
  height: 350px;
  -webkit-transition: left .6s;
  transition: left .6s
}

.weather-15day-content {
  height: 350px
}

.weather-day {
  position: relative;
  display: inline-block;
  width: 107px;
  height: 389px;
  font-size: 0;
  border-right: 1px solid rgba(255, 255, 255, .1);
  color: #333;
}

.weather-day>p {
  font-size: 0;
  display: inline-block;
  width: 108px;
  text-align: center;
  color: #333;
}

.weather-day .icon-weather {
  height: 30px;
  color: #333;
}

.weather-day>.week {
  font-size: 14px;
  height: 20px;
  color: #333;
}

.weather-day>.date {
  font-size: 14px;
  margin-top: 12px;
  height: 20px;
  color: #333;
}

.weather-day .weather-hour-icon {
  width: 30px;
  height: 30px;
  color: #333;
  margin: 0 auto;
  display: block;
  margin-top: 20px;
  font-family: arial, '微软雅黑'
}

.weather-day:first-of-type {
  border-left: 1px solid rgba(255, 255, 255, .05)
}

.weather-15day-wind {
  font-size: 14px;
  margin-top: 220px;
  height: 20px;
  color: #333;
}

.weather-day .day-pm25 {
  margin-top: 20px;
  height: 15px
}

.weather-15day-pm25 {
  display: inline-block;
  width: 38px;
  height: 19px;
  border-radius: 9.5px;
  font-size: 12px;
  line-height: 19px;
  text-align: center
}

.weather-15day-pm25.excellent {
  background-color: #40c057
}

.weather-15day-pm25.good {
  background-color: #82c91e
}

.weather-15day-pm25.mild {
  background-color: #F76707
}

.weather-15day-pm25.mezzo {
  background-color: #e03131
}

.weather-15day-pm25.serious {
  background-color: #841c3c
}

.weather-15day-pm25.severity {
  background-color: #540822
}

.wind-direction-icon {
  width: 12px;
  height: 12px
}

.wind-direction-icon.beifeng {
  -webkit-transform: rotateZ(180deg);
  transform: rotateZ(180deg)
}

.wind-direction-icon.nanfeng {
  -webkit-transform: rotateZ(0deg);
  transform: rotateZ(0deg)
}

.wind-direction-icon.xifeng {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg)
}

.wind-direction-icon.dongfeng {
  -webkit-transform: rotateZ(-90deg);
  transform: rotateZ(-90deg)
}

.wind-direction-icon.xibeifeng {
  -webkit-transform: rotateZ(135deg);
  transform: rotateZ(135deg)
}

.wind-direction-icon.xinanfeng {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg)
}

.wind-direction-icon.dongbeifeng {
  -webkit-transform: rotateZ(-135deg);
  transform: rotateZ(-135deg)
}

.wind-direction-icon.dongnanfeng {
  -webkit-transform: rotateZ(-45deg);
  transform: rotateZ(-45deg)
}

.wind-direction-icon.weifeng {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg)
}

.canvas-box {
  z-index: 999;
  position: absolute;
  top: 135px;
  left: 44PX
}

#dayCvs {
  z-index: 998;
  position: absolute;
  top: 0;
  background-color: transparent
}

.day-item-point {
  z-index: 999;
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 50%
}

/*!src/home/weather15DayOther.atom.css*/
div[data-a-2f4f4166],
ul[data-a-2f4f4166],
p[data-a-2f4f4166],
li[data-a-2f4f4166] {
  padding: 0;
  margin: 0;
  list-style: none
}

.weather-15day-other[data-a-2f4f4166] {
  position: relative;
  z-index: 999;
  width: 895px;
  color: #fff;
  margin: 0 auto;
  padding: 10px 16px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, .1);
  font-family: PingFangSC-Regular
}

.weather-15day-header {
  position: relative;
  padding-left: 10px;
}

.weather-15day-header>p[data-a-2f4f4166] {
  font-size: 18px;
  line-height: 25px;
  margin-top: 8px;
  margin-bottom: 10px
}

.day-list>.day-item[data-a-2f4f4166] {
  position: relative;
  z-index: 999;
  height: 61px;
  line-height: 61px
}

.day-list>.day-item[data-a-2f4f4166]:last-of-type {
  border-bottom: 0 !important
}

.weather-hour-icon[data-a-2f4f4166] {
  display: inline-block;
  width: 30px;
  height: 30px;
  color: #fff;
  font-family: arial, '微软雅黑'
}

.icon[data-a-2f4f4166] {
  display: inline-block;
  width: 30px;
  height: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  vertical-align: middle
}

.icon-box[data-a-2f4f4166] {
  display: inline-block;
  width: 230px;
  margin-left: 125px
}

.weather {
  margin-left: 6px
}

.wind {
  float: right
}

.wind .wind-power {
  margin-left: 16px
}

/*!src/home/futureWeather.atom.css*/
div,
ul,
li,
p {
  padding: 0;
  list-style: none;
  margin: 0
}

.future-weather {
  border-top: 1px solid rgba(192, 192, 192, 0.277);
  position: relative;
  z-index: 999;
  width: 100%;
  color: #333;
  border-radius: 3px;
  // background: linear-gradient(rgb(13, 104, 188), rgb(54, 131, 195));
  font-family: 'PingFangSC-Regular'
}

.future-weather-header {
  line-height: 35px;
  font-size: 6px;
  color: #0b5b16;
  padding-left: 15px;
  border-bottom: 1px solid rgba(197, 197, 197, 0.277);
}

.future-weather-header span:nth-of-type(1) {
  margin-left: 16px;
  color: #333;
  font-size: 18px
}

.future-weather-header span:nth-of-type(2) {
  display: inline-block;
  width: 675px;
  margin-left: 20px;
  font-size: 14px;
  color: rgb(255, 255, 255, .6);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden
}

.header-week {
  padding: 0;
  width: 895px;
  line-height: 57px;
  font-size: 16px
}

.header-week-item {
  display: inline-block;
  width: 127.84px;
  text-align: center
}

.el-collapse-item__header {
  height: 35px;
}

.future-weather-box {
  padding: 0;
  width: 895px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-sizing: border-box;
  box-sizing: border-box
}

.ie-future-weather-box {
  padding: 0;
  width: 895px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box
}

.future-weather-item {
  z-index: 999;
  width: 127.85px;
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, .1);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 14px;
  text-align: center
}

.ie-future-weather-item {
  z-index: 999;
  display: inline-block;
  vertical-align: top;
  height: 209px;
  width: 127.85px;
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, .1);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 14px;
  text-align: center
}

.future-weather-item:hover {
  background-color: rgba(255, 255, 255, .1)
}

.ie-future-weather-item:hover {
  background-color: rgba(255, 255, 255, .1)
}

.ie-future-weather-item>p {
  margin-top: 15px;
  font-size: 14px;
  line-height: 14px;
  text-align: center
}

.future-weather-item>p {
  margin-top: 15px;
  font-size: 14px;
  line-height: 14px;
  text-align: center
}

.future-weather-date {
  font-size: 18px;
  line-height: 16px;
  text-align: left
}

.future-weather-day-icon-box {
  text-align: center
}

.future-weather-day-icon {
  position: relative;
  left: 50%;
  margin-left: -17.5px;
  width: 35px;
  height: 35px;
  display: block;
  font-family: arial, '微软雅黑'
}

.future-weather-pm {
  display: inline-block;
  width: 38px;
  height: 19px;
  font-size: 12px;
  border-radius: 9.5px;
  line-height: 19px !important
}

/*!src/home/weatherNav.atom.css*/
.weather-nav {
  z-index: 9999;
  position: fixed;
  top: -1px;
  width: 100%;
  height: 51px;
  // background-color: #fff;
  font-family: PingFangSC-Regular
}

.nav-inner {
  width: 895px;
  height: 100%;
  margin: 0 auto
}

.nav-logo {
  display: inline-block;
  height: 30px;
  padding: 10px 0
}

.nav-logo img {
  border: 0
}

/*!src/home/weatherBanner.atom.css*/
.weather-banner {
  padding: 20px 20px 10px 20px;
  margin: 0px auto 0;
  color: #333;
  // background: linear-gradient(rgb(13, 104, 188), rgb(54, 131, 195));
}

.weather-banner-header {
  height: 20px;
  line-height: 20px
}

.weather-banner-header-left {
  margin: 0;
  float: left;
}

.weather-banner-header-right {
  margin: 0;
  float: right
}

.weather-banner-header-left span {
  font-size: 14px;
  margin-right: 15px
}

.weather-banner-header-right span {
  font-size: 14px;
  margin-right: 15px
}

.weather-banner-header-left .city {
  font-size: 20px
}

.weather-banner-content {
  margin-top: 45px;
  height: 79px
}

.weather-banner-content-left {
  float: left
}

.weather-banner-content-temperature {
  position: relative;
  font-size: 60px;
  line-height: 60px
}

.weather-banner-content-right {
  margin-left: 30px;
  float: left;
  height: 53px;
  margin-top: 20px
}

.weather-banner-content-pm25 {
  display: inline-block;
  padding: 0 6px;
  height: 19px;
  line-height: 19px;
  font-size: 12px;
  border-radius: 9.5px;
  text-align: center
}

.weather-banner-content-svg {
  position: relative;
  top: 5px;
  width: 20px;
  height: 20px
}

.weather-banner-content-wind {
  margin-top: 10px;
  line-height: 14px;
  font-size: 14px;
  vertical-align: middle
}

.weather-banner-content-wind span {
  margin-right: 10px
}

.weather-banner-footer {
  margin-top: 30px;
  line-height: 14px;
  font-size: 14px
}

.weather-banner-footer span {
  margin-right: 20px
}

/*!src/home/weatherIndex.atom.css*/
.weather-zhishu {
  position: relative;
  z-index: 999;
  margin: 15px auto;
  width: 895px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, .1);
  font-family: PingFangSC-Regular
}

.zhishu-title {
  padding-top: 20px;
  height: 25px;
  color: #fff
}

.zhishu-titleone {
  display: inline-block;
  font-size: 18px;
  font-family: PingFangSC-Regular;
  margin: 0 15px
}

.zhishu-titletwo {
  display: inline-block;
  width: 703px;
  font-size: 14px;
  opacity: .6;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden
}

.zhishu-box {
  overflow: hidden;
  padding: 36px 45px 24px 42px
}

.zhishu-dec {
  float: left;
  width: 25%
}

.zhishu-item {
  height: 70px;
  width: 202px
}

.zhishu-item img {
  width: 48px;
  height: 48px
}

.item-right {
  position: relative;
  top: -51px;
  margin-left: 60px;
  height: 60px
}

.zhishu-item-top {
  height: 22px;
  color: #fff;
  margin-bottom: 16px
}

.zhishu-item-bottom {
  height: 22px;
  color: #fff;
  opacity: .6
}
</style>
