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
                <el-tag style="margin:0 5px 3px 0;" v-for="item in crops" :key="item" type="success">
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
          <span style="margin-left:5px;">近三年内作物模拟生长数据趋势</span>
        </div>
      </el-col>
    </el-row>
    <el-tabs v-model="activePaneName" @tab-change="xtabChange" tab-position="left" style="height:74vh"
      class="demo-tabs">
      <el-tab-pane label="对比分析" name="0" style="height:71vh;">
        <div style="height:100%;overflow: auto;">
          <el-row>
            <el-col :span="8">
              <el-card class="xcardClass" style="height:70vh;margin-bottom:5px;" shadow="hover">
                <template #header>
                  <div>
                    <span>DVS生长进程曲线</span>
                  </div>
                </template>
                <div style="height:65vh;width:100%;" id='firstView'>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="xcardClass" style="height:70vh;margin-left:5px;margin-bottom:5px;" shadow="hover">
                <template #header>
                  <div>
                    <span>LAI叶面积指数曲线</span>
                  </div>
                </template>
                <div style="height:65vh;width:100%;" id='secondView'>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="xcardClass" style="height:70vh;margin-left:5px;margin-bottom:5px;" shadow="hover">
                <template #header>
                  <div>
                    <span>TWSO存储器官干重曲线</span>
                  </div>
                </template>
                <div style="height:65vh;width:100%;" id='thirdView'>
                </div>
              </el-card>
            </el-col>

          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane v-for="item in crops" :label="item.cropname" :name="item.id" style="height:71vh;">
        <div style="height:100%;overflow: auto;">
          <el-row>
            <el-col :span="12">
              <el-card class="xcardClass" style="height:37.8vh;margin-bottom:5px;" shadow="hover">
                <template #header>
                  <div>
                    <span>DVS生长进程曲线</span>
                  </div>
                </template>
                <div style="height:35vh;width:99%;" :id="'dvsView' + item.id">
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
                <div style="height:35vh;width:100%;" :id="'laiView' + item.id">
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
                <div style="height:35vh;width:100%;" :id="'tagpView' + item.id">
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
                <div style="height:35vh;width:99%;" :id="'twsoView' + item.id">
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
                <div style="height:35vh;width:100%;" :id="'twlvView' + item.id">
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
                <div style="height:35vh;width:100%;" :id="'twstView' + item.id">
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
                <div style="height:35vh;width:99%;" :id="'twrtView' + item.id">
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
                <div style="height:35vh;width:100%;" :id="'rdView' + item.id">
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
                <div style="height:35vh;width:100%;" :id="'traView' + item.id">
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
                <div style="height:35vh;width:100%;" :id="'smView' + item.id">
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
                <div style="height:35vh;width:100%;" :id="'wwlowView' + item.id">
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
import { cropAllDataService } from "@/api/cropcategory.js"
import { generateHistoryGrowDataService, getHistoryGrowDataService, getHistoryGrowDataBycropidService } from "@/api/recommend.js"
import * as echarts from 'echarts';
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
const location = props.location
const crops = props.checkedCrops
const yearRange = props.yearRange
const activePaneName = ref(crops[0].id)

//把作物的数据分析展现出来
const setOneView = (name, alldata, cropid) => {
  let seriesData = []
  let day = []
  let legend = []
  for (let year = yearRange[0]; year <= yearRange[1]; year++) {
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
  var chartDom1 = document.getElementById(name + 'View' + cropid);
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
const getCharts = async (cropid) => {
  //首先获取生长数据
  let result1 = await getHistoryGrowDataBycropidService({ areacode: location.code, cropid: cropid })


  // console.log("result1", result1.data)
  let xkeys = Object.keys(result1.data[0])
  xkeys.forEach((item, index, arr) => {
    if (item !== 'areacode' && item !== 'calendarid' && item !== 'cropid' && item !== 'day' && item !== 'flag' && item !== 'lat' && item !== 'lon' && item !== 'varietyid' && item !== 'wofostid') {
      setOneView(item, result1.data, cropid)
    }
  })


}
//求中位数
const middle = (args) => {

  args.sort() //排序
  if (args.length % 2 === 0) { //判断数字个数是奇数还是偶数
    return ((args[args.length / 2] + args[args.length / 2 - 1]) / 2);//偶数个取中间两个数的平均数
  } else {
    return args[parseInt(args.length / 2)];//奇数个取最中间那个数
  }
}
const xtabChange = async (name) => {
  if (name != '0') getCharts(name)
  //获取对比的曲线
  else {
    let result1
    let xseriesData1 = []
    let xseriesData2 = []
    let xseriesData3 = []
    let legend = []
    let day = []
    for (let mm = 0; mm < crops.length; mm++) {
      let item1 = crops[mm]
      result1 = await getHistoryGrowDataBycropidService({ areacode: location.code, cropid: item1.id })
      let alldata = result1.data
      //求DVS的中位数
      legend.push(item1.cropname)
      let xdvs = []
      let xlai = []
      let xtwso = []
      let yearDataList = {}
      //获取每年的数据
      for (let year = yearRange[0]; year <= yearRange[1]; year++) {
        let yearData = []
        day = []
        alldata.forEach((item2, index2, arr2) => {
          if (item2.day.split('-')[0] == year.toString()) {
            yearData.push(item2)
            day.push(item2.day.split('-')[1] + '.' + item2.day.split('-')[2])
          }
        })
        yearDataList[year.toString()] = yearData
      }
      //求中位数
      for (let i = 0; i < yearDataList[yearRange[0].toString()].length; i++) {
        let mdvs = []
        let mlai = []
        let mtwso = []
        for (let year = yearRange[0]; year <= yearRange[1]; year++) {
          let item = yearDataList[year.toString()][i]
          // console.log("item", item)
          mdvs.push(item.dvs)
          mlai.push(item.lai)
          mtwso.push(item.twso)
        }
        xdvs.push(middle(mdvs))
        xlai.push(middle(mlai))
        xtwso.push(middle(mtwso))
      }
      // console.log("xxdata", xdvs)
      xseriesData1.push({ name: item1.cropname, type: 'line', data: xdvs })
      xseriesData2.push({ name: item1.cropname, type: 'line', data: xlai })
      xseriesData3.push({ name: item1.cropname, type: 'line', data: xtwso })

    }
    let chartDom1 = document.getElementById('firstView');
    let myChart1 = echarts.init(chartDom1, { autoResize: true });
    let option1;
    option1 = {
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
      series: xseriesData1
    };
    option1 && myChart1.setOption(option1);

    let chartDom2 = document.getElementById('secondView');
    let myChart2 = echarts.init(chartDom2, { autoResize: true });
    let option2;
    option2 = {
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
      series: xseriesData2
    };
    option2 && myChart2.setOption(option2);

    let chartDom3 = document.getElementById('thirdView');
    let myChart3 = echarts.init(chartDom3, { autoResize: true });
    let option3;
    option3 = {
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
      series: xseriesData3
    };
    option3 && myChart3.setOption(option3);
  }

}
getCharts(crops[0].id)
</script>
<style lang="scss">
.xcardClass {
  .el-card__header {
    height: 25px;
    font-weight: 400;
    font-family: '楷体', 'Times New Roman';
    background-color: #F6F6F6;
  }

  .el-card__body {
    padding: 0px;
  }
}

.el-tabs--left .el-tabs__header.is-left {
  margin-right: 0px;
}

.el-tabs--left .el-tabs__item.is-left {
  text-align: center;
  justify-content: center;
}
</style>
