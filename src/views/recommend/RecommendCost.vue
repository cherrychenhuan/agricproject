<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div
          style="border-bottom:3px solid #e6e6e6b2;font-size:15px;font-family:'楷体' ;padding-left:10px;background-color:aliceblue;height:40px;line-height:40px;">
          <el-text style="font-size:15px;font-family:'楷体';">
            <el-icon>
              <Place />
            </el-icon>{{ location.province.name }}{{ location.city.name }}{{ location.county ? location.county.name : ''
            }}
          </el-text>
          <el-text><span style="margin-left:10px;">{{ location.lat <= 32 ? '秦岭淮河以南' : '秦岭淮河以北' }}</span>
                <span style="margin-left:5px;">选取作物：</span>
                <el-tag style="margin:0 5px 3px 0;" v-for="item in crops" :key="item" type="danger">
                  {{ item.cropname }}
                </el-tag>

          </el-text>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div
          style="border-bottom:3px solid #e6e6e6b2;font-size:15px;font-family:'楷体' ;padding-left:10px;background-color: #f4f4f5;height:40px;width:100%;overflow:auto;line-height:40px;">
          <span style="margin-left:5px;color:#c45656;">部分市场数据缺失，可能导致推荐不够准确，建议将数据补充完整</span>
        </div>
      </el-col>
    </el-row>
    <el-tabs v-model="activePaneName" @tab-change="xtabChange" tab-position="left" style="height:74vh" class="allxtabs">
      <el-tab-pane v-for="item in crops" :label="item.cropname" :name="item.id" style="height:77vh;width:100%;">
        <el-tabs type="border-card" class="indexTabClass" style="width:100%;">
          <el-tab-pane label="成本效益" style="width:100%;">
            <div style="height:64vh;width:100%;" :id="'costView' + item.id">
              <el-empty v-show="isCostEmpty" :description="'当前所在地的' + item.cropname + '成本收益数据暂缺'">
                <el-button type="success" @click="openDialog(item.cropname, item.id)">输入数据</el-button>
              </el-empty>

            </div>
          </el-tab-pane>
          <el-tab-pane label="模拟产量" style="width:100%;">
            <div style="height:64vh;width:900px;" :id="'amountView' + item.id">
              <el-empty v-show="isYieldEmpty" :description="'当前所在地的' + item.cropname + '产量数据暂缺'">
                <el-button type="success" @click="openDialog1(item.cropname, item.id)">输入数据</el-button>
              </el-empty>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :show-close="false" class="myrDialog" :visible.sync="dialogVisible" align-center v-model="dialogVisible"
      width="40%">
      <!-- header部分 -->
      <template #header> <!-- vue3 这里不能使用slot  要用# -->
        <div style="padding-left:10px;" class="dialog-title-name"><el-icon
            style="position:relative;top:2.5px;margin-right:3px;">
            <InfoFilled />
          </el-icon><span style="vertical-align:top;">输入{{ dialogTitle }}成本收益数据</span></div>
        <div style="padding-right:10px;"><el-icon @click="dialogCloseBtn">
            <Close />
          </el-icon>
        </div>
      </template>
      <div class="" style="padding-top:10px;">

        <el-form>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2013年成本">
                <el-input type="number" v-model="costList[0]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="净利润">
                <el-input type="number" v-model="profitList[0]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2014年成本">
                <el-input type="number" v-model="costList[1]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="净利润">
                <el-input type="number" v-model="profitList[1]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2015年成本">
                <el-input type="number" v-model="costList[2]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="净利润">
                <el-input type="number" v-model="profitList[2]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2016年成本">
                <el-input type="number" v-model="costList[3]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="净利润">
                <el-input type="number" v-model="profitList[3]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2017年成本">
                <el-input type="number" v-model="costList[4]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="净利润">
                <el-input type="number" v-model="profitList[4]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2018年成本">
                <el-input type="number" v-model="costList[5]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="净利润">
                <el-input type="number" v-model="profitList[5]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2019年成本">
                <el-input type="number" v-model="costList[6]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="净利润">
                <el-input type="number" v-model="profitList[6]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2020年成本">
                <el-input type="number" v-model="costList[7]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="净利润">
                <el-input type="number" v-model="profitList[7]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2021年成本">
                <el-input type="number" v-model="costList[8]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="净利润">
                <el-input type="number" v-model="profitList[8]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2022年成本">
                <el-input type="number" v-model="costList[9]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="净利润">
                <el-input type="number" v-model="profitList[9]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2023年成本">
                <el-input type="number" v-model="costList[10]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="净利润">
                <el-input type="number" v-model="profitList[10]">
                  <template #suffix>
                    元/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

      </div>
      <template #footer>
        <span style="margin-top:-20px;">
          <el-button @click="dialogCloseBtn">取消</el-button>
          <el-button type="success" @click="saveCost">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog :show-close="false" class="myrDialog" :visible.sync="dialogVisible1" align-center
      v-model="dialogVisible1" width="40%">
      <!-- header部分 -->
      <template #header> <!-- vue3 这里不能使用slot  要用# -->
        <div style="padding-left:10px;" class="dialog-title-name"><el-icon
            style="position:relative;top:2.5px;margin-right:3px;">
            <InfoFilled />
          </el-icon><span style="vertical-align:top;">输入{{ dialogTitle1 }}产量数据</span></div>
        <div style="padding-right:10px;"><el-icon @click="dialogCloseBtn">
            <Close />
          </el-icon>
        </div>
      </template>
      <div class="" style="padding-top:10px;">
        <el-form>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2013年 总产量">
                <el-input type="number" v-model="yieldList[0]">
                  <template #suffix>
                    kg
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位产量">
                <el-input type="number" v-model="yieldunitList[0]">
                  <template #suffix>
                    kg/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2014年 总产量">
                <el-input type="number" v-model="yieldList[1]">
                  <template #suffix>
                    kg
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位产量">
                <el-input type="number" v-model="yieldunitList[1]">
                  <template #suffix>
                    kg/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2015年 总产量">
                <el-input type="number" v-model="yieldList[2]">
                  <template #suffix>
                    kg
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位产量">
                <el-input type="number" v-model="yieldunitList[2]">
                  <template #suffix>
                    kg/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2016年 总产量">
                <el-input type="number" v-model="yieldList[3]">
                  <template #suffix>
                    kg
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位产量">
                <el-input type="number" v-model="yieldunitList[3]">
                  <template #suffix>
                    kg/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2017年 总产量">
                <el-input type="number" v-model="yieldList[4]">
                  <template #suffix>
                    kg
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位产量">
                <el-input type="number" v-model="yieldunitList[4]">
                  <template #suffix>
                    kg/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2018年 总产量">
                <el-input type="number" v-model="yieldList[5]">
                  <template #suffix>
                    kg
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位产量">
                <el-input type="number" v-model="yieldunitList[5]">
                  <template #suffix>
                    kg/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2019年 总产量">
                <el-input type="number" v-model="yieldList[6]">
                  <template #suffix>
                    kg
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位产量">
                <el-input type="number" v-model="yieldunitList[6]">
                  <template #suffix>
                    kg/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2020年 总产量">
                <el-input type="number" v-model="yieldList[7]">
                  <template #suffix>
                    kg
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位产量">
                <el-input type="number" v-model="yieldunitList[7]">
                  <template #suffix>
                    kg/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2021年 总产量">
                <el-input type="number" v-model="yieldList[8]">
                  <template #suffix>
                    kg
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位产量">
                <el-input type="number" v-model="yieldunitList[8]">
                  <template #suffix>
                    kg/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2022年 总产量">
                <el-input type="number" v-model="yieldList[9]">
                  <template #suffix>
                    kg
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位产量">
                <el-input type="number" v-model="yieldunitList[9]">
                  <template #suffix>
                    kg/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="2023年 总产量">
                <el-input type="number" v-model="yieldList[10]">
                  <template #suffix>
                    kg
                  </template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位产量">
                <el-input type="number" v-model="yieldunitList[10]">
                  <template #suffix>
                    kg/亩
                  </template></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>

      </div>
      <template #footer>
        <span style="margin-top:-20px;">
          <el-button @click="dialogCloseBtn1">取消</el-button>
          <el-button type="success" @click="saveYield">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import cloneDeep from 'lodash/cloneDeep'
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { cropAllDataService } from "@/api/cropcategory.js"
import { filterProfitInfoService, getProfitDataService, deletePriceInfoService, updateProfitDataService, getNewProfitService, addProfitDataService, deleteProfitInfoService } from '@/api/admin.js'

import { filterProductInfoService, deleteProductInfoService, getProductDataService, addProductDataService, updateProductDataService, getNewProductService } from '@/api/admin.js'
import { getCropProductByProvinceService, getCostDataService, getCropProductService, addYieldDataService } from "@/api/recommend.js"
import * as echarts from 'echarts';
import { Edit, Delete, Plus, Upload, Search } from '@element-plus/icons-vue'
const isCostEmpty = ref(false)
const isYieldEmpty = ref(false)
const isCanEdit = ref(true)
const dialogVisible = ref(false)
const dialogVisible1 = ref(false)
const dialogTitle = ref('')
const dialogTitle1 = ref('')
const productForm = ref('')
const yearList = ref([])
const costList = ref([
  '', '', '', '', '', '', '', '', '', '', ''
])
const profitList = ref([
  '', '', '', '', '', '', '', '', '', '', ''
])
const yieldList = ref([
  '', '', '', '', '', '', '', '', '', '', ''
])
const yieldunitList = ref([
  '', '', '', '', '', '', '', '', '', '', ''
])
const addProductInfo = () => {
  productData.value.areaSeed = ''
  productData.value.yieldTotal = ''
  productData.value.yieldUnit = ''
  editState1.value = 'add'
  isCanEdit.value = false
}
const getYearList = async () => {
  for (let i = 2013; i <= 2023; i++) {
    yearList.value.push(i)
  }
}
const initProductList = () => {

}
getYearList()
const productList = ref([
])
const productData = ref({
  "cropid": "",
  "cropname": "",
  "year": "",
  "value": '',
  "province": "",
  "type": ""
})
const yieldData = ref({
  "provinceName": "",
  "cropid": "",
  "cropname": "",
  "xyear": "",
  "yieldTotal": '',
  "yieldUnit": ""
})
const props = defineProps({
  location: {
    type: Object,
    required: true
  },
  checkedCrops: {
    type: Object,
    required: true
  },
  yearRange: {
    type: Array,
    required: true
  },
})
const editState1 = ref('edit')
const profuctTableRef = ref('')
const location = props.location
const crops = props.checkedCrops
const yearRange = props.yearRange
const activePaneName = ref(crops[0].id)
const saveCost = async () => {
  let year
  for (let x = 0; x <= 10; x++) {
    year = 2013 + x
    productData.value.year = year
    let xdata1 = cloneDeep(productData.value)
    let xdata2 = cloneDeep(productData.value)
    xdata1.value = costList.value[x]
    xdata1.type = 'cost'
    xdata2.value = profitList.value[x]
    xdata2.type = 'profit'
    let result1 = await addProfitDataService(xdata1)
    let result2 = await addProfitDataService(xdata2)
  }
  ElMessage.success('新增成功')
  dialogVisible.value = false
  xtabChange(productData.value.cropid)

}
const saveYield = async () => {
  let year
  for (let x = 0; x <= 10; x++) {
    year = 2013 + x
    yieldData.value.xyear = year
    yieldData.value.yieldTotal = yieldList.value[x]
    yieldData.value.yieldUnit = yieldunitList.value[x]
    let result1 = await addYieldDataService(yieldData.value)
    // console.log("cccccccccccccccc", yieldData.value)
  }
  ElMessage.success('新增成功')
  dialogVisible1.value = false
  xtabChange(yieldData.value.cropid)

}
const xtabChange = async (name) => {

  // 成本效益数据
  let result = await getCostDataService({ province: location.province.name.replace('省', '').replace('市', '').replace('壮族自治区', '').replace('维吾尔自治区', '').replace('回族自治区', '').replace('自治区', ''), cropid: name })
  let cost = []
  let profit = []
  let data = result.data
  let year = []
  if (data.length == 0) isCostEmpty.value = true
  else {
    data.forEach((item, index, arr) => {
      if (item.type == 'cost') {
        cost.push(Number(item.value))
        year.push(Number(item.year))
      } else if (item.type == 'profit') profit.push(Number(item.value))
    })
    var chartDom = document.getElementById('costView' + name);
    var myChart = echarts.init(chartDom, { autoResize: true });
    var option;
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      grid: {
        left: '3%', //默认10%
        right: '4%', //默认10%
        bottom: '10%', //默认60
        top: '10%',
        containLabel: true
        //grid区域是否包含坐标轴的刻度标签
      },
      legend: {
        data: ['总成本', '净利润']
      },
      xAxis: [
        {
          type: 'category',
          data: year,
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '总成本',
          // min: 0,
          // max: 250,
          // interval: 50,
          axisLabel: {
            formatter: '{value}元/亩'
          }
        },
        {
          type: 'value',
          name: '净利润',
          // min: 0,
          // max: 25,
          // interval: 5,
          axisLabel: {
            formatter: '{value}元/亩'
          }
        }
      ],
      series: [
        {
          name: '总成本',
          type: 'bar',
          barWidth: 15,
          tooltip: {
            valueFormatter: function (value) {
              return value + '元/亩';
            }
          },
          itemStyle: {
            normal: {
              //这里是颜色
              color: '#f0ce70'
            }
          },

          data: cost
        },
        {
          name: '净利润',
          type: 'bar',
          barWidth: 15,
          tooltip: {
            valueFormatter: function (value) {
              return value + '元/亩';
            }
          },
          itemStyle: {
            normal: {
              //这里是颜色
              color: '#b3df9f'
            }
          },
          data: profit
        }
      ]
    };
    option && myChart.setOption(option);
  }


  // 产量分析
  //模拟产量
  let result1 = await getCropProductService({ areacode: location.code.toString().replace(' ', ''), cropid: name })
  //标准平均产量
  let result2 = await getCropProductByProvinceService({ province: location.province.name ? location.province.name.replace('省', '').replace('市', '').replace('壮族自治区', '').replace('维吾尔自治区', '').replace('回族自治区', '').replace('自治区', '') : '浙江', cropid: name })

  let data1 = result1.data
  let data2 = result2.data
  if (data2.length == 0) isYieldEmpty.value = true
  else {
    let year1 = []
    let productivity = []
    let yieldUnit = []
    data1.forEach((item, index, arr) => {
      year1.push(item.xyear)
      productivity.push((item.mtwso / 15).toFixed(2))
      // console.log("dddd", item.mtwso, (item.mtwso / 15).toFixed(2) + 250)
    })
    data2.forEach((item, index, arr) => {
      year1.forEach((xitem, index, arr) => {
        if (xitem.toString() == item.xyear.toString()) yieldUnit.push(item.yieldUnit)
      })
    })

    var chartDom1 = document.getElementById('amountView' + name);
    var myChart1 = echarts.init(chartDom1, { autoResize: true });
    var option1;
    option1 = {
      xAxis: {
        type: 'category',
        data: year1
      },
      grid: {
        left: '3%', //默认10%
        right: '4%', //默认10%
        bottom: '10%', //默认60
        top: '10%',
        containLabel: true
        //grid区域是否包含坐标轴的刻度标签
      },
      yAxis: {
        type: 'value'
      },
      legend: {
        data: ['模拟产量', '实际历史平均产量']
      },
      series: [
        {
          name: '模拟产量',
          data: productivity,
          type: 'line',
          lineStyle: {
            color: '#00b2b2'
          },
          itemStyle: {
            color: '#00b2b2'
          }
          // barWidth: 15,
        },
        {
          name: '实际历史平均产量',
          data: yieldUnit,
          type: 'line',
          lineStyle: {
            color: '#efc95b'
          },
          itemStyle: {
            color: '#efc95b'
          }
          // barWidth: 15,
        }
      ]
    };
    option1 && myChart1.setOption(option1);
  }

}

xtabChange(crops[0].id)
const getProductList = async () => {
  try {

    let result = await getCropProductByProvinceService({ province: location.province.name ? location.province.name.replace('省', '').replace('市', '').replace('壮族自治区', '').replace('维吾尔自治区', '').replace('回族自治区', '').replace('自治区', '') : '浙江', cropid: productData.value.cropid })
    console.log("xxx", result.data)
    if (flag == 1) {//代表是新增
      nextTick(() => {
        let itemRow = {};
        let rowIndex = 0;
        for (let i = 0; i < productList.value.length; i++) {
          let item = productList.value[i];
          console.log("xxx", item, productData.value)
          // 判断查询的数据是否存在，存在则进行定位操作
          if (item.cropname == productData.value.cropname && item.xyear == productData.value.xyear && item.provinceName == productData.value.provinceName) {

            itemRow = item;
            rowIndex = i;
            break;
          }
        }
        profuctTableRef.value.setCurrentRow(itemRow)
      })
    }
  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }
}
const openDialog = (cropname, id) => {
  dialogTitle.value = location.province.name + cropname
  dialogVisible.value = true
  productData.value.cropname = cropname
  productData.value.cropid = id
  productData.value.province = location.province.name.replace('市', '').replace('省', '').replace('自治区', '').replace('维吾尔', '').replace('壮族', '').replace('回族', '')
}
const openDialog1 = (cropname, id) => {
  dialogTitle1.value = location.province.name + cropname
  dialogVisible1.value = true
  yieldData.value.cropname = cropname
  yieldData.value.cropid = id
  yieldData.value.provinceName = location.province.name.replace('市', '').replace('省', '').replace('自治区', '').replace('维吾尔', '').replace('壮族', '').replace('回族', '')
}
const saveProductInfo = async () => {

  if (editState1.value == 'add') {

    let result = await addProductDataService(productData.value)
    if (result.data == '已经存在') {
      ElMessage.error('新增失败，该作物相应年份和城市的数据已存在！')
    } else {
      isCanEdit.value = true
      ElMessage.success('新增成功')
      editState1.value == 'edit'
      await getProductList()
      productList.value.push(productData.value)
    }
  } else {
    let result = await updateProductDataService(productData.value)
    ElMessage.success('更新成功')
    isCanEdit.value = true
    getProductList()
    let itemRow = {};
    let rowIndex = 0;
    for (let i = 0; i < productList.value.length; i++) {
      let item = productList.value[i];
      console.log("xxx", item, productData.value)
      // 判断查询的数据是否存在，存在则进行定位操作
      if (item.cropname == productData.value.cropname && item.xyear == productData.value.xyear && item.provinceName == productData.value.provinceName) {
        itemRow = item;
        rowIndex = i;
        break;
      }
    }
    profuctTableRef.value.setCurrentRow(itemRow)

  }
}
</script>
<style lang="scss">
.indexTabClass {
  .el-tabs__nav-wrap {
    height: 30px;
  }

  .el-tabs__nav .is-top {
    height: 30px;
    font-size: 13px;
  }
}

.allxtabs {
  .el-tabs__content {
    padding: 0px !important;
  }

  border:0px;
}
</style>
