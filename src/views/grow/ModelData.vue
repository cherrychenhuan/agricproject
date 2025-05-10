<template>
  <div>
    <div
      style="color:black;padding-left:13px;margin-top:-5px;margin-left:-5px;border-bottom:2px solid #e6e6e6b2; font-size:13px;line-height:40px;height:40px;text-align: left;">
      <el-text><el-icon>
          <Calendar />
        </el-icon>农作物数据生长模拟&nbsp;<span style="font-family:'楷体';color:#529b2e;">当前选择地址：{{ getArea() }}</span>&nbsp;<span
          style="font-family:'楷体';color:#b88230;">作物：{{ cropname }}</span></el-text>
    </div>
    <el-form class="calendarForm" style="margin-left:-10px;" label-width="80px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="选择地区">
            <el-cascader width="200px" :value="xarea" v-model="address" :options="areaList" :props="props"
              @change="handleChange" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="选择分类">
            <el-select @change="changeCategory" v-model="cropcategory" placeholder="选择分类">
              <el-option v-for="item in categoryname" :key="item.key" :label="item.label" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="选择作物">
            <el-select @change="changeCrop" v-model="cropid">
              <el-option v-for="(item, index) in cropnameList" :key="item.id" :label="item.cropname" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择年份">
            <el-select v-model="beginYear" @change="getEndYearList"
              style="margin-left:5px; margin-right:5px;width:100px;">
              <el-option v-for="(item, index) in beginYearList" :key="item" :label="item" :value="item" />
            </el-select>
            <span class="demonstration">~</span>
            <el-select v-model="endYear" style=" margin-right:5px;margin-left:5px;width:100px;">
              <el-option v-for="(item, index) in endYearList" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button @click="filterHistoryDatalist" type="success" size='small' :icon="Filter"
            style="height:30px;margin-left:-45px;">查看</el-button>
          <el-button type="primary" size='small' :icon="Setting" style="height:30px;margin-left:5px;"
            @click="ModelHistoryDatalist">模拟</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-tabs type="" style="padding-left:0;width:100%;">
      <el-tab-pane label="数据列表">
        <el-table style="margin-left:0;height:66vh;" id="historydataTable" @select="setSelectRows" :row-key="getRowKey"
          :key="isUpdate" ref="myTableRef" v-loading="loading" border stripe class="xxtableList" :data="growModelData"
          :row-style="{ height: 0 + 'px' }" highlight-current-row @row-dblclick="rowlineEditBtn"
          :header-cell-style="{ color: '#595959' }" @row-click="handleSelectionChange">
          <el-table-column type="selection" width="40" />
          <el-table-column align="center" fixed prop="cropid" label="作物" width="60" />
          <!-- <el-table-column align="center" prop="address" label="地址" width="100" /> -->
          <!-- <el-table-column align="center" prop="lon" :show-overflow-tooltip="true" label="经度" width="60" />
                  <el-table-column align="center" prop="lat" label="纬度" width="60" />
                  <el-table-column align="center" prop="areacode" label="位置" width="80" /> -->
          <el-table-column align="center" prop="day" label="日期" width="120" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="dvs" label="生长进程" width="100" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="lai" label="叶面积指数" width="100" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="tagp" label="地上部分总干重" width="150" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="twso" label="存储器官干重" width="130" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="twlv" label="叶干重" width="70" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="twst" label="茎重" width="60" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="twrt" label="根重" width="60" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="tra" label="蒸腾速率" width="100" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="rd" label="根深" width="60" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="sm" label="土壤湿度" width="100" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="wwlow" label="土壤总水量" width="110" />
        </el-table>
        <!-- 分页条 -->
        <el-pagination class="xxxclass" v-model:current-page="pageNum" v-model:page-size="pageSize"
          :page-sizes="[8, 10, 13, 14, 15, 16, 17, 20]" small layout="total, sizes, prev, pager, next, jumper"
          background="black" :total="total" @size-change="onSizeChange" @current-change="onCurrentChange"
          style="margin-top:5px; justify-content: flex-end" />
        <el-dialog :show-close="false" class="myrDialog" :visible.sync="dialogVisible" align-center
          v-model="dialogVisible" width="30%">
          <!-- header部分 -->
          <template #header> <!-- vue3 这里不能使用slot  要用# -->
            <div style="padding-left:10px;" class="dialog-title-name"><el-icon
                style="position:relative;top:2.5px;margin-right:3px;">
                <InfoFilled />
              </el-icon><span style="vertical-align:top;">获取历史生长数据</span></div>
            <div style="padding-right:10px;"><el-icon @click="dialogCloseBtn">
                <Close />
              </el-icon>
            </div>
          </template>
          <div class="" style="padding-bottom:20px;padding-left:10px;">
            <el-form style="margin-top:0;">
              <el-row style="height:auto;">
                <el-form-item label="作物:">
                  {{ cropname }}
                </el-form-item>
              </el-row>
              <el-row style="margin-top:-10px;height:40px;">
                <el-form-item label="模拟年份:">
                  <el-select class="xselect" v-model="beginYear" @change="getEndYearList"
                    style="margin-left:5px; margin-right:5px;width:100px;">
                    <el-option v-for="(item, index) in beginYearList" :key="item" :label="item" :value="item" />
                  </el-select>
                  <span class="demonstration">~</span>
                  <el-select class="xselect" v-model="endYear" style=" margin-right:5px;margin-left:5px;width:100px;">
                    <el-option v-for="(item, index) in endYearList" :key="item" :label="item" :value="item" />
                  </el-select>
                  <el-button type="primary" size="small" @click="modelData">确定</el-button>
                </el-form-item>
              </el-row>
              <el-row style="height:40px;">

                <el-form-item v-if="isGetting" :label="getingCrop" style="width:100%;">
                  <div class="demo-progress" style="width:100%;">
                    <el-progress :percentage="getingPercent" />
                  </div>
                </el-form-item>
                <el-text v-if="!isGetting && isFinished" style="margin-left:6px;color:#F56C6C;"><el-icon>
                    <WarningFilled />
                  </el-icon> 尚未开始</el-text>
                <el-text v-if="!isGetting && !isFinished" style="margin-left:6px;color:#67C23A;"><el-icon>
                    <SuccessFilled />
                  </el-icon> 全部完成</el-text>
              </el-row>
            </el-form>
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="数据大屏" style="height:70vh;width:100%;">
        <div style="height:100%;overflow: auto;width:100%;">
          <el-row>
            <el-col :span="12">
              <el-card class="xcardClass" style="height:37.8vh;margin-bottom:5px;" shadow="hover">
                <template #header>
                  <div>
                    <span>DVS生长进程曲线</span>
                  </div>
                </template>
                <div style="height:35vh;width:500px;" :id="'dvsView'">
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="xcardClass" style="height:37.8vh;margin-left:5px;margin-bottom:5px;" shadow="hover">
                <template #header>
                  <div>
                    <span>LAI叶面积指数曲线</span>
                  </div>
                </template>
                <div style="height:35vh;width:500px;" :id="'laiView'">
                </div>
              </el-card>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="8">
              <el-card class="xcardClass" style="height:37.8vh;margin-bottom:5px;" shadow="hover">
                <template #header>
                  <div>
                    <span>TAGP地上部分总干重曲线</span>
                  </div>
                </template>
                <div style="height:35vh;width:300px;" :id="'tagpView'">
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="xcardClass" style="height:37.8vh;margin-left:5px;margin-bottom:5px;" shadow="hover">
                <template #header>
                  <div>
                    <span>TWSO存储器官干重曲线</span>
                  </div>
                </template>
                <div style="height:35vh;width:300px;" :id="'twsoView'">
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="xcardClass" style="height:37.8vh;margin-left:5px;margin-bottom:5px;" shadow="hover">
                <template #header>
                  <div>
                    <span>TWLV叶干重曲线</span>
                  </div>
                </template>
                <div style="height:35vh;width:300px;" :id="'twlvView'">
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-card class="xcardClass" style="height:37.8vh;margin-bottom:5px;" shadow="hover">
                <template #header>
                  <div>
                    <span>TWST茎重曲线</span>
                  </div>
                </template>
                <div style="height:35vh;width:300px;" :id="'twstView'">
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="xcardClass" style="height:37.8vh;margin-left:5px;margin-bottom:5px;" shadow="hover">
                <template #header>
                  <div>
                    <span>TWRT根重曲线</span>
                  </div>
                </template>
                <div style="height:35vh;width:300px;" :id="'twrtView'">
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="xcardClass" style="height:37.8vh;margin-left:5px;margin-bottom:5px;" shadow="hover">
                <template #header>
                  <div>
                    <span>RD根深曲线</span>
                  </div>
                </template>
                <div style="height:35vh;width:300px;" :id="'rdView'">
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-card class="xcardClass" style="height:37.8vh;margin-bottom:5px;" shadow="hover">
                <template #header>
                  <div>
                    <span>TRA蒸腾速率曲线</span>
                  </div>
                </template>
                <div style="height:35vh;width:300px;" :id="'traView'">
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="xcardClass" style="height:37.8vh;margin-left:5px;margin-bottom:5px;" shadow="hover">
                <template #header>
                  <div>
                    <span>SM土壤湿度曲线</span>
                  </div>
                </template>
                <div style="height:35vh;width:300px;" :id="'smView'">
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="xcardClass" style="height:37.8vh;margin-left:5px;margin-bottom:5px;" shadow="hover">
                <template #header>
                  <div>
                    <span>WWLOW土壤总水量曲线</span>
                  </div>
                </template>
                <div style="height:35vh;width:300px;" :id="'wwlowView'">
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>

import cloneDeep from 'lodash/cloneDeep'
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getLocationService, provinceListService, areaListService } from '@/api/area.js'
import { cropDataBycategoryService } from "@/api/cropcategory.js"
import { getHistoryGrowDataBycropService, getAreaInfoService } from "@/api/grow.js"
import { generateHistoryGrowDataService, getHistoryGrowDataService, getHistoryGrowDataBycropidService } from "@/api/recommend.js"
import { locationStore } from '@/stores/location.js'
const isGetting = ref(false)
const getingCrop = ref('')
const cropid = ref('')
const getingPercent = ref(0)
const isFinished = ref(true)
const locationstore = locationStore();
const areaList = ref([])
const dialogVisible = ref(false)
const areacode = ref(locationstore.location.areacode)
const cropcategory = ref('')
const address = ref([])
const cropnameList = ref([])
const xarea = ref('')
const cropname = ref('')
const crop = ref({ id: 101, cropname: '水稻', label: '水稻' })
const beginYear = ref(2021)
const endYear = ref(2023)
const beginYearList = ref([])
const endYearList = ref([])
const getBeginYearList = () => {
  let xdata = []
  for (let i = 2010; i <= new Date().getFullYear(); i++) xdata.push(i)
  beginYearList.value = xdata
}
getBeginYearList()
const getEndYearList = () => {
  let xdata = []
  for (let i = beginYear.value; i <= new Date().getFullYear(); i++) xdata.push(i)
  endYearList.value = xdata
}
getEndYearList()
import { Filter, Setting } from '@element-plus/icons-vue'
//表格数据
const categoryname = ref([
  { key: 1, value: "粮食作物", label: "粮食作物" },
  { key: 2, value: "油料作物", label: "油料作物" },
  { key: 3, value: "纤维作物", label: "纤维作物" },
  { key: 4, value: "糖料作物", label: "糖料作物" },
  { key: 5, value: "嗜好作物", label: "嗜好作物" }
])
const haveData = ref(true)
const growModelData = ref([])
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(16)//每页条数
const getAreaList = async (val) => {

  // area.value = xx
  // alert(val[0])
  let params = {
    code: val
  }
  let xxx = []
  let result = await areaListService(params)
  for (let i = 0; i < result.data.length; i++) {
    result.data[i].label = result.data[i].name
    result.data[i].value = result.data[i]
    if (result.data[i].level == 5) result.data[i].leaf = true

    if (result.data[i].level == 3 && result.data[i].label == '市辖区') result.data[i].leaf = true
  }
  return result.data

}
const props = {
  lazy: true,
  lazyLoad: async (node, resolve) => {
    const { level } = node
    // setTimeout(() => {

    let nodes = await getAreaList(node.data.code)
    resolve(nodes)
  }
}
const getProvinceList = async () => {
  let result = await provinceListService()
  for (let i = 0; i < result.data.length; i++) {
    result.data[i].label = result.data[i].name
    result.data[i].value = result.data[i]
  }
  areaList.value = result.data
}
getProvinceList() //首先调用
//获取全部数据
const getHistoryDatalist = async () => {
  try {
    let params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value
    }
    let result = await getHistoryGrowDataBycropService({
      pageNum: pageNum.value,
      pageSize: pageSize.value, areacode: areacode.value.replace(' ', ''),
      cropid: cropid.value,
      byear: beginYear.value,
      eyear: endYear.value
    })
    //渲染视图
    total.value = result.data.total;
    growModelData.value = result.data.items;
    getCharts()

  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }
}
getHistoryDatalist()
const changeCategory = async (val) => {
  let params = { category: categoryname.value[val - 1].label }
  let result = await cropDataBycategoryService(params)
  cropnameList.value = result.data
  cropid.value = cropnameList.value[0].id
  changeCrop(cropid.value)
}
const getArea = () => {
  let xx = ''
  if (address.value.length > 0) {
    for (let i = 0; i < address.value.length; i++) {
      xx += address.value[i].name
    }
  } else {
    xx = locationstore.location.province + locationstore.location.city
  }


  return xx
}
const onSizeChange = (size) => {
  pageSize.value = size
  getHistoryDatalist()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  getHistoryDatalist()
}
const filterHistoryDatalist = () => {
  areacode.value = address.value[address.value.length - 1].code
  getHistoryDatalist()
}
const ModelHistoryDatalist = () => {
  //打开弹窗
  // console.log("mmmmm", address.value)
  areacode.value = address.value[address.value.length - 1].code
  dialogVisible.value = true
}
const modelData = async () => {
  let y1 = 0
  if (Number(endYear.value) - Number(beginYear.value) > 2) {
    y1 = Number(endYear.value) - 2
    // alert(y1)
  }
  else y1 = beginYear.value

  isGetting.value = true
  getingCrop.value = cloneDeep(cropname.value)
  getingPercent.value = 0
  let xxcode = areacode.value.replace(' ', '')
  // 获取经纬度
  let result0 = await getLocationService(xxcode, 1)
  if (result0.data.length == 0) result0 = await getLocationService(xxcode, 2)

  if (result0.data.length == 0) result0 = await getLocationService(xxcode, 3)
  for (let year = beginYear.value; year <= endYear.value; year++) {
    // for (let year = endYear.value; year >= beginYear.value; year--) {


    let result1 = await generateHistoryGrowDataService({ lon: result0.data[0].lng84, lat: result0.data[0].lat84, areacode: areacode.value, cropid: cropid.value, year: year.toString() })
    console.log("rrr", result1, result0.data)
    if (result1.code == 0) {
      getingPercent.value = Math.round((year - beginYear.value + 1) / (endYear.value - beginYear.value + 1) * 100)
    }
  }
  getingPercent.value = 100

  // await sleep(100)

  isFinished.value = false
  isGetting.value = false
  //加载数据
  getHistoryDatalist()
  dialogVisible.value = false
  haveData.value = false

}
const changeCrop = (val) => {
  cropnameList.value.forEach((item, index, arr) => {
    if (item.id == val) cropname.value = item.cropname
  })
}

//关于数据大屏
const setOneView = (name, alldata) => {
  let seriesData = []
  let day = []
  let legend = []
  for (let year = beginYear.value; year <= endYear.value; year++) {
    day = []
    let xSeries = {}
    legend.push(year + '年')
    xSeries.name = year + '年'
    xSeries.type = 'line'
    xSeries.data = []
    alldata.forEach((item, index, arr) => {
      if (item.day.split('-')[0] == year.toString()) {
        day.push(item.day.split('-')[1] + '.' + item.day.split('-')[2])
        xSeries.data.push(item[name])
      }
    })
    seriesData.push(xSeries)
  }
  // console.log(seriesData)
  var chartDom1 = document.getElementById(name + 'View');
  var myChart1 = echarts.init(chartDom1, { autoResize: true });
  var option1;
  option1 = {
    color: ['#67C23A', '#E6A23C', '#F56C6C'],
    xAxis: {
      type: 'category',
      data: day
    },
    legend: {
      data: legend
    },
    grid: {
      left: '3%', //默认10%
      right: '4%', //默认10%
      bottom: '5%', //默认60
      top: '10%',
      containLabel: true
      //grid区域是否包含坐标轴的刻度标签
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      }
    },
    series: seriesData
  };

  option1 && myChart1.setOption(option1);
}
const getCharts = async () => {
  //首先获取生长数据
  let result1 = await getHistoryGrowDataBycropidService({ areacode: areacode.value.replace(' ', ''), cropid: cropid.value })


  // console.log("result1", result1.data)
  let xkeys = Object.keys(result1.data[0])
  xkeys.forEach((item, index, arr) => {
    if (item !== 'areacode' && item !== 'calendarid' && item !== 'cropid' && item !== 'day' && item !== 'flag' && item !== 'lat' && item !== 'lon' && item !== 'varietyid' && item !== 'wofostid') {
      setOneView(item, result1.data)
    }
  })


}
</script>
<style lang="scss"></style>
