<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div class="WeatherTreePanel">
          <div
            style="color:black;margin-top:-5px;margin-left:-5px;border-bottom:2px solid #e6e6e6b2; font-size:13px;line-height:40px;height:40px;text-align: center;">
            <el-text><el-icon>
                <Location />
              </el-icon>选择地区</el-text>
          </div>
          <!-- 树tttt -->
          <div style="height:86vh;">
            <el-tree lazy :load="loadNode" ref="treeRef" :expand-on-click-node="false" :accordion="true"
              :current-node-key="currentNodekeys" highlight-current="true" :props="props" :data="data"
              @node-click="treeNodeClick" node-key="code" :default-expanded-keys="treeExpandData">
              <template #default="{ node, data }">
                <span class="custom-tree-node"
                  style="flex:1;padding-right:10px;display: flex; align-items: center;justify-content: space-between;">
                  <span>
                    <el-text>
                      <el-icon v-if="node.expanded === false && node.isLeaf === false && node.level !== 5" size="small"
                        style="color:darkolivegreen">
                        <Folder />
                      </el-icon>
                      <el-icon v-if="node.expanded === true && node.level !== 5" style="color:rgb(58, 107, 47);">
                        <FolderOpened />
                      </el-icon>
                      <el-icon v-if="node.level === 5" style="color:rgb(0, 72, 255);">
                        <Coordinate />
                      </el-icon>
                      <span class="labelName" :id="'node' + node.data.id" v-if="node.level == 2"
                        style="margin-left:5px;margin-top:-5px; font-size: 13px;color:rgb(58, 107, 47);">
                        {{ node.label }}
                      </span>
                      <span class="labelName" :id="'node' + node.data.id" v-if="node.level == 5"
                        style="margin-left:5px;margin-top:-5px; font-size: 13px;">
                        {{ node.label }}
                      </span>
                      <span class="labelName" :id="'node' + node.data.id"
                        v-if="node.level == 1 || node.level == 3 || node.level == 4"
                        style="margin-left:5px;margin-top:-5px; font-size: 13px;">
                        {{ node.label }}
                      </span>
                    </el-text>
                  </span>

                </span>
              </template>
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div
          style="color:black;padding-left:13px;margin-top:-5px;margin-left:-5px;border-bottom:2px solid #e6e6e6b2; font-size:13px;line-height:40px;height:40px;text-align: left;">
          <el-text><el-icon>
              <Pouring />
            </el-icon>天气数据详细信息</el-text>
        </div>
        <el-form ref="weatherForm" :show-message="false" :rules="rules" class="areaform" @submit.native.prevent=""
          :model="areaData" label-width="50px" label-position="right">
          <el-row>
            <el-col :span="24">
              <el-form-item label="地址">
                <el-input :disabled="true" v-model="areaData.address" class="LineInput" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label-width="60px" label="经纬度">
                <el-input :disabled="true" v-model="areaData.locat" class="LineInput" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label-width="90px" label="有数据年份">
                <el-select multiple collapse-tags collapse-tags-tooltip :max-collapse-tags="2"
                  v-model="chooseHaveDataYear">

                  <template #header>
                    <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
                      全选
                    </el-checkbox>
                  </template>
                  <el-option v-for="(item, index) in haveDataYearList" :key="item" :label="item" :value="item" />
                </el-select>

              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click="filterWeartherData" style="height:31px;" size="small" type="success" plain><el-icon>
                  <Filter />
                </el-icon>筛选</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-button :disabled="haveDataYearList.length == 0" @click="weatherDataView" round
                style="margin-left:15px;height:30.2px;" size="small" type="primary">
                <el-icon>
                  <TrendCharts />
                </el-icon>&nbsp;可视化大屏</el-button>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="90px" label="新增新数据：">
                <el-select v-model="beginYear" @change="getEndYearList"
                  style="margin-left:5px; margin-right:5px;width:80px;">
                  <el-option v-for="(item, index) in beginYearList" :key="item" :label="item" :value="item" />
                </el-select>
                <span class="demonstration">~</span>
                <el-select v-model="endYear" style="margin-left:5px;width:80px;">
                  <el-option v-for="(item, index) in endYearList" :key="item" :label="item" :value="item" />
                </el-select>
                <el-button v-if="isGeting == false" :disabled="beginYear == '' || endYear == ''"
                  @click="getNewWeatherData" round style="margin-left:5px;height:30.2px;" size="small"
                  type="success"><el-icon>
                    <Aim />
                  </el-icon>&nbsp;获取</el-button>
                <el-button v-else type="primary" loading round style="margin-left:5px;height:30.2px;"
                  size="small">正在获取</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label-width="90px" label="删除原数据：">
                <el-select multiple collapse-tags collapse-tags-tooltip :max-collapse-tags="0"
                  v-model="chooseDeleteDataYear">

                  <template #header>
                    <el-checkbox v-model="xcheckAll" :indeterminate="xindeterminate" @change="xhandleCheckAll">
                      全选
                    </el-checkbox>
                  </template>
                  <el-option v-for="(item, index) in haveDataYearList" :key="item" :label="item" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button round :disabled="chooseDeleteDataYear.length == 0" @click="deleteWeatherData"
                style="margin-left:0px;height:30.2px;" size="small" type="danger"><el-icon>
                  <Delete />
                </el-icon>&nbsp;删除</el-button>
            </el-col>
          </el-row>
        </el-form>
        <!-- 表格 -->
        <el-table style="margin-left:-1px;" id="weatherTable" @select="setSelectRows" :row-key="getRowKey"
          :key="isUpdate" ref="myTableRef" :current-node-key="currentNodekeys" v-loading="loading" border stripe
          class="weatherTableList" :data="weatherDataList" :row-style="{ height: 0 + 'px' }" highlight-current-row
          @row-dblclick="rowlineEditBtn" :header-cell-style="{ color: '#595959' }" @row-click="handleSelectionChange">
          <el-table-column type="selection" width="40" />
          <el-table-column align="center" fixed prop="id" label="编码" width="60" />
          <el-table-column align="center" prop="date" label="日期" width="90" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="tmax" label="日最高温" width="100" />
          <el-table-column align="center" prop="tmin" :show-overflow-tooltip="true" label="日最低温" width="100" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="vap" label="日平均气压" width="120" />
          <el-table-column align="center" prop="wind" label="平均日风速" width="120" />
          <el-table-column align="center" prop="rain" label="降水量" width="80" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="irrad" label="日辐射" width="80" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="snowdepth" label="雪深" width="60" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="remark" label="备注" width="60" />
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[8, 10, 13, 15]" small
          layout="total, sizes, prev, pager, next, jumper" background="black" :total="total" @size-change="onSizeChange"
          @current-change="onCurrentChange" style="margin-top:5px; justify-content: flex-end" />
      </el-col>
    </el-row>
    <el-dialog :show-close="false" class="myViewDialog" :visible.sync="dialogVisible" align-center
      v-model="dialogVisible" width="70%">
      <!-- header部分 -->

      <template #header> <!-- vue3 这里不能使用slot  要用# -->
        <div style="padding-left:10px;" class="dialog-title-name"><el-icon
            style="position:relative;top:2.5px;margin-right:3px;">
            <InfoFilled />
          </el-icon><span style="vertical-align:top;">数据可视化</span></div>
        <div style="padding-right:10px;"><el-icon @click="dialogCloseBtn">
            <Close />
          </el-icon></div>
      </template>
      <!-- 主体部分 -->
      <div class="dialog-main">
        <el-form class="dialog-form" label-width="50px" label-position="right">
          <el-row>
            <el-col :span="24">
              <el-form-item label="地址">
                <span>{{ areaData.address }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label-width="60px" label="经纬度">
                <span>{{ areaData.locat }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label-width="90px" label="可选年份">
                <el-select v-model="chooseViewYear">
                  <el-option v-for="(item, index) in haveDataYearList" :key="item" :label="item" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click="getViewWeartherData" style="height:31px;" size="small" type="success" plain><el-icon>
                  <Check />
                </el-icon>确定</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-divider content-position="center">气温</el-divider>
        <el-row>
          <el-col :span="24">
            <div class="weather-box" style="width:100%;height:350px;" id="tempView">
            </div>
          </el-col>
        </el-row>
        <el-divider content-position="center">降水量</el-divider>
        <el-row>
          <el-col :span="24">
            <div class="weather-box" style="width:100%;height:250px;" id="rainView">
            </div>
          </el-col>
        </el-row>

        <el-divider content-position="center">风速</el-divider>
        <el-row>
          <el-col :span="24">
            <div class="weather-box" style="width:100%;height:500px;" id="windView">
            </div>
          </el-col>
        </el-row>
        <el-divider content-position="center">辐射量</el-divider>
        <el-row>
          <el-col :span="24">
            <div class="weather-box" style="width:100%;height:500px;" id="irradView">
            </div>
          </el-col>
        </el-row>
        <el-divider content-position="center">气压</el-divider>
        <el-row>
          <el-col :span="24">
            <div class="weather-box" style="width:100%;height:500px;" id="vapView">
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 注意 为了实现表单验证，这个el-form里面的双向数据绑定不能用v-model,尽量后面都打冒号，否则容易出问题要用：model -->

    </el-dialog>
  </div>
</template>

<script setup>
import { getLocationService } from '@/api/area.js'
import { getClimatedataService } from '@/api/recommend.js'
import { deleteWeatherDataService, FilterWeartherDataService, getYearListService, getProvinceDataService, getAreaDataService, getWeatherDataService } from '@/api/weather.js'
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import { toRaw } from '@vue/reactivity'
import * as echarts from 'echarts';
import { Filter, Edit, Delete, Plus, Upload, Search } from '@element-plus/icons-vue'
import { ElMessage, genFileId, ElMessageBox } from 'element-plus'
import cloneDeep from 'lodash/cloneDeep'
import { locationStore } from '@/stores/location.js'
const isGeting = ref(false)
const locationstore = locationStore();
const haveDataYearList = ref([])
const chooseDeleteDataYear = ref([])
const chooseViewYear = ref(2023)
const dialogVisible = ref(false)
const chooseHaveDataYear = ref('')
const checkAll = ref(false)
const xcheckAll = ref(false)
const indeterminate = ref(false)
const xindeterminate = ref(false)
const filterstate = ref(false)
const beginYear = ref('')
const endYear = ref('')
const beginYearList = ref([])
const endYearList = ref([])
const getBeginYearList = () => {
  let xdata = []
  for (let i = 1980; i <= new Date().getFullYear(); i++) xdata.push(i)
  beginYearList.value = xdata
}
getBeginYearList()
const getEndYearList = () => {
  let xdata = []
  for (let i = beginYear.value; i <= new Date().getFullYear(); i++) xdata.push(i)
  endYearList.value = xdata
}
getEndYearList()
//------------------------------------------树的操作
const customNodeClass = (data, node) => {
  // node.label = data.name
  if (data.level === 1) {
    return 'levelFirst'
  } else if (data.level === 2) {
    return 'levelSecond'
  } else if (data.level === 3) {
    return 'levelThird'
  } else if (data.level === 4) {
    return 'levelFourth'
  } else {
    return 'levelFifth'
  }
}
const props = {
  label: 'name',
  children: 'children',
  isLeaf: 'leaf',
  class: customNodeClass
}
const getAreaData = async () => {
  let result = await getProvinceDataService()
  data.value = result.data
}
const handleCheckAll = (val) => {
  indeterminate.value = false
  if (val) {
    chooseHaveDataYear.value = haveDataYearList.value.map((_) => _)
  } else {
    chooseHaveDataYear.value = []
  }
}
const xhandleCheckAll = (val) => {
  xindeterminate.value = false
  if (val) {
    chooseDeleteDataYear.value = haveDataYearList.value.map((_) => _)
  } else {
    chooseDeleteDataYear.value = []
  }
}
//树的数据
const data = ref([])
const nowLoadData = ref([])
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(13)//每页条数
const weatherDataList = ref([]) //表格数据
const areaData = ref({
  address: '',
  lat: '',
  lon: '',
  locat: ''
})
const nowArea = ref({
  code: '',
  lat: '',
  lon: ''
})
const treeRef = ref(null)
const treeExpandData = ref([]) //默认展开节点
const currentNodekeys = ref('')
const treeNodeClick = async (treeobj, node, treenode, event) => {
  beginYear.value = ''
  endYear.value = ''
  let code = node.data.code
  nowArea.value.code = code
  let result1 = await getLocationService(code, 1)
  if (result1.data.length !== 0) {
    areaData.value.address = result1.data[0].address
    areaData.value.lon = result1.data[0].lng84
    areaData.value.lat = result1.data[0].lat84
    areaData.value.locat = result1.data[0].lat84 + '°N' + result1.data[0].lng84 + '°E'
  }
  else {

  }
  nowArea.value.lon = areaData.value.lon
  nowArea.value.lat = areaData.value.lat


  getWeatherDataList()
  //获取有数据的年份
  let params1 = { code: code.replace(' ', ''), lat: areaData.value.lat, lon: areaData.value.lon }
  let result2 = await getYearListService(params1)
  haveDataYearList.value = result2.data
}

const InitTree = async () => {
  await getAreaData()
  nextTick(() => {
    treeExpandData.value = [data.value[0].code]
    treeExpandData.value.push("110100000000 ")
    nextTick(() => {
      treeExpandData.value.push("110101000000 ")
    })
    nextTick(() => {
      treeExpandData.value.push("110101001000 ")

    })
    nextTick(() => {
      treeExpandData.value.push("110101001001 ")

    })
    nextTick(() => {
      currentNodekeys.value = "110101001001 "
      currentNodekeys.value = cloneDeep(currentNodekeys.value)

    })
    nextTick(() => {
      // let xnode = {}
      // xnode.data = { code: "110101001001 " }
      // treeRef.value.setCurrentKey()
      // treeRef.value.setCurrentKey("110101001001 ", true)
      // treeNodeClick(null, xnode, null, null)
    })
  })

}
InitTree()
const filterWeartherData = async () => {
  filterstate.value = true
  let xxstr = ''
  console.log("sssd", chooseHaveDataYear.value.length)
  if (chooseHaveDataYear.value.length == 0) {
    getWeatherDataList()
    filterstate.value = false
  }
  else {
    chooseHaveDataYear.value.forEach((item, index, arr) => {
      if (index == 0) xxstr += item.toString()
      else xxstr += "," + item.toString()
    })
    let params1 = {
      yearstr: xxstr, pageNum: pageNum.value, pageSize: pageSize.value, code: nowArea.value.code, lat: nowArea.value.lat, lon: nowArea.value.lon
    }
    let result1 = await FilterWeartherDataService(params1)
    total.value = result1.data.total;
    weatherDataList.value = result1.data.items;
    // console.log(result1)
  }
}
//分页条数据模型

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size
  if (filterstate.value == false) getWeatherDataList()
  else filterWeartherData()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  if (filterstate.value == false) getWeatherDataList()
  else filterWeartherData()
}
//getWeatherDataList
const getWeatherDataList = async () => {
  try {
    let params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      code: nowArea.value.code.replace(' ', '')
    }
    let result = await getWeatherDataService(params)
    //渲染视图
    total.value = result.data.total;
    weatherDataList.value = result.data.items;
  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }
}

//获取数据
const loadNode = async (node, resolve) => {
  if (node.level === 0) {
    return resolve([data.value])
  }
  else if (node.level >= 1 && node.level <= 5) {
    try {
      let result1 = await getAreaDataService(node.data.code, node.level + 1)
      if (result1.code == 0) {
        let xdata = result1.data
        if (node.level == 4) {
          for (let i = 0; i < xdata.length; i++) {
            xdata[i].leaf = true
          }

        }

        nowLoadData.value = xdata
        await nextTick();
        treeExpandData.value.push(node.data.code);

        // 选中节点
        await nextTick();
        console.log(node)
        if (node.level == 5) {
          currentNodekeys.value = node.data.code;
          currentNodekeys.value = cloneDeep(currentNodekeys.value);
          treeRef.value.setCurrentKey()
          treeRef.value.setCurrentKey(node.data.code, true)
          treeNodeClick(null, node, null, null)
        }


        resolve(xdata)
      }
      else resolve([])
    } catch {
      resolve([])
    }
  } else {

    resolve([])
  }
  // if (node.level > 1) return resolve([])

  // setTimeout(() => {
  //   const data= [
  //     {
  //       name: 'leaf',
  //       leaf: true,
  //     },
  //     {
  //       name: 'zone',
  //     },
  //   ]

  //   resolve(data)
  // }, 500)
}
const getNewWeatherData = async () => {
  let xeyear = endYear.value
  let xbyear = beginYear.value
  isGeting.value = true
  if (Number(xeyear) - Number(xbyear) > 3) {
    ElMessageBox.confirm(
      '是否确认一次性获取超过<strong>3</strong>年的数据? <br/>可能会<span style="color:red;">影响判断</span>且<span style="color:red;">运行时间更长</span>',
      '提示',
      {
        dangerouslyUseHTMLString: true,//使用html
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(async (action, instance, done) => {
      if (action === 'confirm') {
        let params = {
          lat: nowArea.value.lat, lon: nowArea.value.lon, code: nowArea.value.code.replace(' ', ''),
          byear: xbyear, eyear: xeyear
        }
        let result = await getClimatedataService(params)
        getWeatherDataList()
        for (let xx = parseInt(xbyear); xx <= parseInt(xeyear); xx++) {
          haveDataYearList.value.push(xx)
        }
        haveDataYearList.value = haveDataYearList.value.filter((item, index) => haveDataYearList.value.indexOf(item) === index)
        haveDataYearList.value.sort()
        ElMessage.success('数据已经更新成功')
        isGeting.value = false
        beginYear.value = ''
        endYear.value = ''

      }

    })
  } else {
    let params = {
      code: nowArea.value.code.replace(' ', ''), lat: nowArea.value.lat, lon: nowArea.value.lon,
      byear: xbyear, eyear: xeyear
    }
    let result = await getClimatedataService(params)
    getWeatherDataList()
    for (let xx = parseInt(xbyear); xx <= parseInt(xeyear); xx++) {
      haveDataYearList.value.push(xx)
    }
    haveDataYearList.value = haveDataYearList.value.filter((item, index) => haveDataYearList.value.indexOf(item) === index)
    haveDataYearList.value.sort()
    ElMessage.success('数据已经更新成功')
    isGeting.value = false
    beginYear.value = ''
    endYear.value = ''
  }
}
///---------------------------------------------------表格操作
// 根据年份获取天气数据
const getCharts = (data) => {
  let tmax = []
  let tmin = []
  let day = []
  let rain = []
  let wind = []
  let vap = []
  let irrad = []
  for (var i = 0; i < data.length; i++) {
    tmax.push(data[i].tmax)
    tmin.push(data[i].tmin)
    rain.push(data[i].rain)
    vap.push(data[i].vap)
    irrad.push(data[i].irrad)
    wind.push(data[i].wind)
    let dd = data[i].date
    day.push(dd)
    // day.push(dd.split('-')[1] + '.' + dd.split('-')[2])
  }
  ////气温
  let chartDom_temp = document.getElementById("tempView");
  let myChart_temp = echarts.init(chartDom_temp, { autoResize: true });
  let option_temp;
  let text0 = '2023年'
  option_temp = {
    title: {
      text: text0 + '气温变化'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: day
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    series: [
      {
        name: '日最高温',
        type: 'line',
        data: tmax,
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
        name: '日最低温',
        type: 'line',
        lineStyle: {
          color: '#67C23A'
        },
        itemStyle: {
          color: '#67C23A'
        },
        data: tmin,
        markPoint: {
          data: [{ name: '年最低', value: -2, xAxis: 1, yAxis: -1.5 }]
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
  nextTick(() => {
    myChart_temp.setOption(option_temp);
  })
  ////降雨
  let chartDom_rain = document.getElementById('rainView');
  let myChart_rain = echarts.init(chartDom_rain, { autoResize: true });
  let option_rain;
  option_rain = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '100%'];
      }
    },
    title: {
      // left: 'center',
      text: text0 + '日降水量(cm)'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: day
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        start: 0,
        end: 100
      }
    ],
    series: [
      {
        name: 'Fake Data',
        type: 'bar',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)'
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }
          ])
        },
        data: wind
      }
    ]
  };
  nextTick(() => {
    myChart_rain.setOption(option_rain);
  })
  /////气压
  let chartDom_vap = document.getElementById('vapView');
  let myChart_vap = echarts.init(chartDom_vap, { autoResize: true });
  let option_vap;
  option_vap = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: day
    },
    yAxis: {
      type: 'value'
    },
    title: {
      // left: 'center',
      text: text0 + '日气压(hPa)'
    },
    series: [
      {
        data: vap,
        type: 'line',
        areaStyle: {}
      }
    ]
  };
  nextTick(() => {
    myChart_vap.setOption(option_vap);
  })


  //风速
  let chartDom_wind = document.getElementById('windView');
  let myChart_wind = echarts.init(chartDom_wind, { autoResize: true });
  let option_wind;
  option_wind = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: day
    },
    yAxis: {
      type: 'value'
    },
    title: {
      // left: 'center',
      text: text0 + '距地面2m处的平均日风速(m/s)'
    },
    series: [
      {
        data: wind,
        type: 'line',
        areaStyle: {}
      }
    ]
  };
  nextTick(() => {
    myChart_wind.setOption(option_wind);
  })
  //辐射
  let chartDom_irrad = document.getElementById('irradView');
  let myChart_irrad = echarts.init(chartDom_irrad, { autoResize: true });
  let option_irrad;
  option_irrad = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },
    title: {
      // left: 'center',
      text: text0 + '日辐射量(辐射/Jm²/天)'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: day
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10
      },
      {
        start: 0,
        end: 10
      }
    ],
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)'
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }
          ])
        },
        data: irrad
      }
    ]
  };
  nextTick(() => {
    myChart_irrad.setOption(option_irrad);
  })
}
const deleteWeatherData = async () => {
  let dstr = ''
  for (let i = 0; i < chooseDeleteDataYear.value.length; i++) {
    if (i !== 0) dstr += '、'
    dstr += chooseDeleteDataYear.value[i]
  }
  ElMessageBox.confirm(
    '是否确认删除<strong>' + dstr + '</strong>年的天气数据',
    '提示',
    {
      dangerouslyUseHTMLString: true,//使用html
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async (action, instance, done) => {
    if (action === 'confirm') {
      let params = {
        code: nowArea.value.code.replace(' ', ''), lat: nowArea.value.lat, lon: nowArea.value.lon,
        yearstr: chooseDeleteDataYear.value.join(',')
      }
      try {
        let result = await deleteWeatherDataService(params)
        if (result.code == 0) {
          ElMessage.success('删除成功')
          for (let j = 0; j < chooseDeleteDataYear.value.length; j++) {
            haveDataYearList.value = haveDataYearList.value.filter(element => element !== chooseDeleteDataYear.value[j])
          }

          chooseDeleteDataYear.value = []
          //重新获取数据
          getWeatherDataList()
        }
      } catch {
        ElMessage.error('删除失败')
      }
    }
  })
}
//可视化大屏
const weatherDataView = async () => {
  dialogVisible.value = true
  await nextTick()
  //获取2023年数据
  let params = {
    code: nowArea.value.code.replace(' ', ''), lat: nowArea.value.lat, lon: nowArea.value.lon,
    byear: 2023, eyear: 2023
  }
  let result = await getClimatedataService(params)
  getCharts(result.data)
}
//获取指定年份数据
const getViewWeartherData = async () => {
  let year = chooseViewYear.value
  let params = {
    code: nowArea.value.code.replace(' ', ''), lat: nowArea.value.lat, lon: nowArea.value.lon,
    byear: year, eyear: year
  }
  let result = await getClimatedataService(params)
  getCharts(result.data)
}

const dialogCloseBtn = () => {
  dialogVisible.value = false
}

</script>

<style lang="scss">
.WeatherTreePanel {
  // height: 92vh;
  border-right: 2px solid #e6e6e6b2;

  .el-tree {
    height: 100%;
    --el-tree-node-hover-bg-color: #ffebce;
    margin: 0px;
    overflow: auto;
  }
}

.areaform {
  .el-input.is-disabled {
    .el-input__wrapper {
      border: 0px;
      box-shadow: 0 0 0 0 aliceblue inset;
      background-color: aliceblue;
      text-align: center;
    }

    .el-input__inner {
      -webkit-text-fill-color: red;
      font-size: 15px;
    }
  }

  padding-top: 10px;
  background-color: aliceblue;

  .el-row {
    font-size: 12px;
    margin-bottom: 2px;
  }


  .el-form-item {
    margin-bottom: 10px;
  }

  .el-form-item__label {
    /* display: inline-block必须要有，不然布局出问题，之前我看别人都加在伪类中，我试了没效果 */
    display: inline-block;
    text-align: right;
    //  text-align-last: justify;
  }

  .el-select {

    font-family: '楷体';

    .el-input .el-input__inner {
      font-family: '楷体';
    }

  }
}





.LineInput {
  .is-disabled .el-input__wrapper {
    border: 0px;
    box-shadow: 0;
    background-color: aliceblue;
  }

  .el-input__wrapper {
    border: 0px;
    box-shadow: 0 0 0 0 aliceblue inset;
    background-color: aliceblue;
  }

  .el-input__inner {

    border: 0.5px solid aliceblue; //修改4个边框颜色

    border-radius: 0px; //取消圆角

    border-bottom-color: rgb(102, 102, 117); //修改底部边框颜色

  }

}

.dLineInput {
  .is-disabled .el-input__wrapper {
    border: 0px;
    box-shadow: 0;
    background-color: #100C2A;
  }

  .el-input__wrapper {
    border: 0px;
    box-shadow: 0 0 0 0 #100C2A inset;
    background-color: #100C2A;
  }

  .el-input__inner {

    border: 0.5px solid #100C2A; //修改4个边框颜色

    border-radius: 0px; //取消圆角

    border-bottom-color: rgb(102, 102, 117); //修改底部边框颜色

  }

}

.weatherTableList {
  margin-top: 10px;
  height: 59vh;

  //表头
  th {
    padding: 0 !important;
    height: 35px;
    line-height: 35px;
    // background-color: #5e8dff;
    color: '#606266';
    font-weight: 420;
  }

  //行高
  td {
    padding: 0 !important;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    ;
  }

}

.myViewDialog {
  border-radius: 5px;
  height: 90vh;

  .el-dialog__body {
    padding-bottom: 0px;
    height: 79vh;
    overflow: auto;
    // background-color: #100C2A;
  }

  .el-dialog__header {
    border-radius: 5px 5px 0 0;
    padding: 0px !important;
    color: #0b5e2f;
    font-weight: 400;
    font-size: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 40px;
    width: 100%; //一定要设置，否则header会出问题
    line-height: 40px;
    background: #bed1c5;
    border-bottom: 3px solid #e6e6e6b2;
  }

  .el-dialog__footer {
    padding-top: 0px;
  }
}
</style>
