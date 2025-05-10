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
                <span style="margin-left:5px;">{{ flags.flag1 == 1 ? '地处华北平原' : '' }}</span>
                <span style="margin-left:5px;">{{ flags.flag2 == 1 ? '地处东北平原' : '' }}</span>
                <span style="margin-left:5px;">{{ flags.flag3 == 1 ? '地处四川盆地' : '' }}</span>
                <span style="margin-left:5px;">{{ flags.flag4 == 1 ? '地处华长江中下游平原' : '' }}</span>


          </el-text>

        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div
          style="border-bottom:3px solid #e6e6e6b2;font-size:15px;font-family:'楷体' ;padding-left:10px;background-color: #f4f4f5;height:40px;width:100%;overflow:auto;line-height:40px;">
          <span style="margin-left:5px;">可选作物：</span>
          <el-tag style="margin:0 5px 3px 0;" v-for="item in recommendCrops" :key="item" type="warning" closable
            @close="handleClose(item)">
            {{ item.name }}
          </el-tag>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <div class="rtreePanel">
          <div
            style="padding-left:10px;color:black;border-bottom:2px solid #e6e6e6b2; font-size:13px;line-height:35px;height:35px;text-align: left;">
            <el-text>农作物自由选择
              <!-- <span style="margin-left:30px;margin-top:-20px;"><el-button size="small" type="success"
                  round>获取历史数据</el-button></span> -->
            </el-text>
          </div>
          <el-tree ref="treeRef" style="max-width: 600px" :data="data" show-checkbox default-expand-all node-key="id"
            highlight-current :props="defaultProps" @check-change="treeCheckChange"
            :default-checked-keys="defaultCheckedKeys" />
        </div>
      </el-col>
      <el-col :span="19">
        <el-tabs @tab-remove="removeTab" v-model="paneactiveName" class="rtabs" @tab-click="handleClick">
          <el-tab-pane key="1" label="历史数据" name="1">
            <template #>
              <el-empty v-if="haveData">
                <el-button type="success" @click="getHistoryData">点击获取</el-button>
              </el-empty>
              <div v-else>
                <el-table id="historydataTable" @select="setSelectRows" :row-key="getRowKey" :key="isUpdate"
                  ref="myTableRef" v-loading="loading" border stripe class="xxtableList" :data="historyData"
                  :row-style="{ height: 0 + 'px' }" highlight-current-row @row-dblclick="rowlineEditBtn"
                  :header-cell-style="{ color: '#595959' }" @row-click="handleSelectionChange">
                  <el-table-column type="selection" width="40" />
                  <el-table-column align="center" fixed prop="cropid" label="作物" width="60" />
                  <el-table-column align="center" prop="varietyid" label="品种" width="100" />
                  <!-- <el-table-column align="center" prop="lon" :show-overflow-tooltip="true" label="经度" width="60" />
                  <el-table-column align="center" prop="lat" label="纬度" width="60" />
                  <el-table-column align="center" prop="areacode" label="位置" width="80" /> -->
                  <el-table-column align="center" prop="day" label="日期" width="120" />
                  <el-table-column align="center" :show-overflow-tooltip="true" prop="dvs" label="生长进程" width="100" />
                  <el-table-column align="center" :show-overflow-tooltip="true" prop="lai" label="叶面积指数" width="100" />
                  <el-table-column align="center" :show-overflow-tooltip="true" prop="tagp" label="地上部分总干重"
                    width="150" />
                  <el-table-column align="center" :show-overflow-tooltip="true" prop="twso" label="存储器官干重"
                    width="130" />
                  <el-table-column align="center" :show-overflow-tooltip="true" prop="twlv" label="叶干重" width="70" />
                  <el-table-column align="center" :show-overflow-tooltip="true" prop="twst" label="茎重" width="60" />
                  <el-table-column align="center" :show-overflow-tooltip="true" prop="twrt" label="根重" width="60" />
                  <el-table-column align="center" :show-overflow-tooltip="true" prop="tra" label="蒸腾速率" width="100" />
                  <el-table-column align="center" :show-overflow-tooltip="true" prop="rd" label="根深" width="60" />
                  <el-table-column align="center" :show-overflow-tooltip="true" prop="sm" label="土壤湿度" width="100" />
                  <el-table-column align="center" :show-overflow-tooltip="true" prop="wwlow" label="土壤总水量"
                    width="110" />
                </el-table>
                <!-- 分页条 -->
                <el-pagination class="xxxclass" v-model:current-page="pageNum" v-model:page-size="pageSize"
                  :page-sizes="[8, 10, 13, 14, 15, 16, 17, 20]" small layout="total, sizes, prev, pager, next, jumper"
                  background="black" :total="total" @size-change="onSizeChange" @current-change="onCurrentChange"
                  style="margin-top:5px; justify-content: flex-end" />
              </div>
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
                        <el-tag v-for="item in checkedCrop" class="rTag" type="primary">{{ item.cropname }}</el-tag>
                      </el-form-item>
                    </el-row>
                    <el-row style="margin-top:-10px;height:40px;">
                      <el-form-item label="模拟年份:">
                        <el-select class="xselect" v-model="beginYear" @change="getEndYearList"
                          style="margin-left:5px; margin-right:5px;width:100px;">
                          <el-option v-for="(item, index) in beginYearList" :key="item" :label="item" :value="item" />
                        </el-select>
                        <span class="demonstration">~</span>
                        <el-select class="xselect" v-model="endYear"
                          style=" margin-right:5px;margin-left:5px;width:100px;">
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
            </template>

          </el-tab-pane>
          <el-tab-pane closable v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
            <template #>
              <!-- <div v-if="item.name === 'tab0'">
                <RouterView></RouterView>
                <Cropcategory></Cropcategory>
              </div> -->
            </template>

          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

  </div>
</template>
<script setup>
import cloneDeep from 'lodash/cloneDeep'
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { cropAllDataService } from "@/api/cropcategory.js"
import { RecommendCropStore } from '@/stores/recommendcrops.js'
const recommendcropstore = RecommendCropStore();
import { generateHistoryGrowDataService, getHistoryGrowDataService } from "@/api/recommend.js"
const historyData = ref([])
// import { defineProps } from 'vue';
//树的数据
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(16)//每页条数
const isFinished = ref(true)
const treeRef = ref(null)
const recommendCrops = ref([])
const defaultCheckedKeys = ref([])
const isGetting = ref(false)
const getingCrop = ref('')
const getingPercent = ref(0)
const paneactiveName = ref('1')
const haveData = ref(true)
const checkedCrop = ref([])
const dialogVisible = ref(false)
const editableTabs = ref([])
const data = ref([])
const beginYear = ref(2021)
const endYear = ref(2023)
const beginYearList = ref([])
const endYearList = ref([])
const emit = defineEmits(["func1", "func2"])
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
const flags = ref({
  flag1: 0,
  flag2: 0,
  flag3: 0,
  flag4: 0,
  flag5: 0,
  flag6: 0
})
const props = defineProps({
  location: {
    type: Object,
    required: true
  }
})
const location = props.location
//获取数据
const getCropData = async () => {
  let data0 = [{ id: 0, value: "全部作物", label: "全部作物", level: 1, children: [] }]
  let data1 = [
    { id: 1, value: "粮食作物", label: "粮食作物", level: 2, children: [] },
    { id: 2, value: "油料作物", label: "油料作物", level: 2, children: [] },
    { id: 3, value: "纤维作物", label: "纤维作物", level: 2, children: [] },
    { id: 4, value: "糖料作物", label: "糖料作物", level: 2, children: [] },
    { id: 5, value: "嗜好作物", label: "嗜好作物", level: 2, children: [] }
  ]
  let result1 = await cropAllDataService()
  let data2 = result1.data
  let result2
  let result3
  let data3
  for (let i = 0; i < data2.length; i++) {
    data2[i].label = data2[i].id + data2[i].cropname
    data2[i].level = 3
    for (let xx = 0; xx < data1.length; xx++) {
      if (data2[i].category == data1[xx].value) {
        data2[i].children = []
        data1[xx].children.push(data2[i])
      }
    }
  }
  data0[0].children = data1
  data.value = cloneDeep(data0)
}

// 初始化页面
const initPage = async () => {
  await getCropData()
  //获得地址
  location.value = props.location
  let lon = location.value.lon
  let lat = location.value.lat
  let province = location.value.province.name
  let city = location.value.city.name
  let county = location.value.county ? location.value.county.name : ''
  let town = location.value.town ? location.value.town.name : ''
  let village = location.value.village ? location.value.village.name : ''
  if (city == '市辖区') city = province

  //1.无论是哪个区域 都可以种玉米
  recommendCrops.value.push({ id: 103, name: '玉米' })
  //判断现在是在哪个区域
  //在秦岭淮河以南还是以北 南方：水稻  春小麦
  if (lat <= 32) {
    recommendCrops.value.push({ id: 101, name: '水稻' })
    // recommendCrops.value.push({ id: 102, name: '春小麦' })
  } else {
    recommendCrops.value.push({ id: 103, name: '小麦' })
    // recommendCrops.value.push({ id: 102, name: '冬小麦' })
  }
  //华北平原所在城市 华北平原适合：
  let flag1 = 0
  let huabei = ["北京", "天津", "石家庄", "唐山", "廊坊", "秦皇岛", "保定", "沧州", "衡水", "邢台", "邯郸", "济南", "德州", "滨州", "东营", "聊城", "济宁", "菏泽", "枣庄", "临沂", "郑州", "安阳", "濮阳", "鹤壁", "新乡", "商丘", "开封", "许昌", "漯河", "周口", "驻马店", "淮北", "宿州", "亳州", "阜阳", "蚌埠", "淮南", "徐州", "连云港", "宿迁", "淮安", "盐城"]
  if (huabei.indexOf(city.replace('市', '')) !== -1) {
    flag1 = 1
    if (recommendCrops.value.indexOf({ id: 103, name: '小麦' }) == -1) recommendCrops.value.push({ id: 102, name: '（冬小麦）' })
  }

  //东北平原
  let flag2 = 0
  let dongbei = ['黑龙江省', '吉林省', '辽宁省']
  if (dongbei.indexOf(province) !== -1) {
    flag2 = 1
    if (recommendCrops.value.indexOf({ id: 103, name: '小麦' }) == -1) recommendCrops.value.push({ id: 102, name: '（春小麦）' })
  }
  //四川盆地
  let sichuanpendi = ["成都", "绵阳", "泸州", "南充", "自贡", "德阳", "广元", "遂宁", "内江", "乐山", "宜宾", "广安", "达州", "雅安", "巴中", "眉山", "资阳", "遵义", "毕节", "昭通", "重庆市"]
  let flag3 = 0
  if (sichuanpendi.indexOf(city.replace('市', '')) !== -1) {
    flag3 = 1
    recommendCrops.value.push({ id: 201, name: '油菜' })
  }
  //长江中下游平原
  let changjiang = ["南京市", "扬州市", "镇江市", "常州市", "无锡市", "合肥市", "芜湖市", "马鞍山市", "安庆市", "武汉市", "襄阳市", "黄石市", "孝感市", "南昌市", "九江市", "景德镇市", "萍乡市", "郑州市", "开封市", "南阳市", "周口市"]
  let flag4 = 0
  if (changjiang.indexOf(city) !== -1) {
    flag4 = 1
    recommendCrops.value.push({ id: 201, name: '油菜' })
    recommendCrops.value.push({ id: 206, name: '大豆' })
  }
  //甜菜产区
  let tiancai = ['新疆维吾尔自治区', '内蒙古自治区', '吉林省', '黑龙江省']
  let flag5 = 0
  if (tiancai.indexOf(city) !== -1) {
    flag5 = 1
    recommendCrops.value.push({ id: 402, name: '甜菜' })
  }
  let ganzhe = ['四川省', '云南省', '广西壮族自治区', '广东省', '福建省', '台湾省']
  let flag6 = 0
  if (ganzhe.indexOf(province) !== -1) {
    flag6 = 1
    recommendCrops.value.push({ id: 401, name: '甘蔗' })
  }


  // //棉花种植产区
  // if(p)
  let mianhua = []
  //北疆早熟棉区
  // let mianhua_1 = ['奎屯市', '沙湾市', '乌苏市和布克赛尔县', '精河县博乐市', '玛纳斯县', '呼图壁县昌吉市', '克拉玛依区']//
  //南疆早中熟棉区
  // let mianhua_2 = ['尉犁县', '轮台县', '库尔勒市', '且末县', '博湖县', '若羌县', '沙雅县', '库车市', '阿瓦提县', '阿克苏市', '新和县', '温宿县', '柯坪县', '伽师县', '巴楚县', '莎车县', '岳普湖县', '麦盖提县', '疏勒县', '英吉沙县', '叶城县', '喀什市', '阿图什市', '阿克陶县']
  //新疆棉区
  // let mianhua_3 = ['阿克苏地区',巴楚,'博尔塔拉蒙古自治州博乐市','哈密市','喀什地区','巴音郭楞蒙古自治州','吐鲁番市','塔城地区乌苏市','昌吉回族自治州']
  //长江流域棉区
  let mianhua_4 = ['安阳', '南阳', '开封杞县', '商丘', '周口西华', '许昌', '驻马店', '荆州江陵', '天门', '武汉', '黄石阳新', '宜昌', '襄阳枣阳', '荆门钟祥', '安庆', '蚌埠', '滁州', '阜阳', '合肥', '宿州', '济南', '济宁', '滨州惠民', '聊城', '潍坊', '连云港赣榆', '南通', '泰州兴化', '徐州', '盐城',
    '常德', '衡阳', '益阳', '岳阳', '九江修水', '宜春']
  let flag7 = 0
  if (mianhua_4.indexOf(city.replace('市', '') !== -1) || county.indexOf('杞县') !== -1 || county.indexOf('江陵') !== -1 || county.indexOf('阳新') !== -1 || county.indexOf('枣阳') !== -1 || county.indexOf('钟祥') !== -1 || county.indexOf('惠民') !== -1 || county.indexOf('赣榆') !== -1 || county.indexOf('兴化') !== -1 || county.indexOf('修水') !== -1) flag7 = 1
  //黄河流域棉区
  let mianhua_5 = ['廊坊霸州', '保定', '沧州黄骅', '邢台南宫', '石家庄', '唐山', '邢台', '延安洛川', '酒泉', '武威', '运城', '天津']
  if (mianhua_5.indexOf(city.replace('市', '') !== -1) || county.indexOf('霸州') !== -1 || county.indexOf('黄骅') !== -1 || county.indexOf('南宫') !== -1 || county.indexOf('洛川') !== -1) flag7 = 1

  if (province == '新疆维吾尔自治区') flag7 = 1

  if (flag7 == 1) recommendCrops.value.push({ id: 301, name: '棉花' })
  flags.value.flag1 = flag1
  flags.value.flag2 = flag2
  flags.value.flag3 = flag3
  flags.value.flag4 = flag4
  flags.value.flag5 = flag5
  flags.value.flag6 = flag6
  flags.value.flag7 = flag7


  //高粱判断：
  // if (['辽宁省', '河北省', '山东省', '河南省', '吉林省'].indexOf(province) !== -1 || city == '吐鲁番市') recommendCrops.value.push({ id: 104, name: '高粱' })
  // 除了这三大作物，其他的判断：
  let xdata = []
  await nextTick()
  for (let i = 0; i < 5; i++) {
    data.value[0].children[i].children.forEach((item, index, arr) => {
      xdata.push(item)
    })
  }
  xdata.forEach((item, index, arr) => {
    let distribution = item.distribution
    if (distribution != '' && distribution != null) {
      if (distribution.indexOf(province.replace('省', '').replace('壮族自治区', '').replace('维吾尔自治区', '').replace('回族自治区', '').replace('自治区', '')) !== -1 || distribution.indexOf(city.replace('市', '')) !== -1) recommendCrops.value.push({ id: item.id, name: item.cropname })
    }
  })

  let uniqueArr = recommendCrops.value.filter((item, index) => recommendCrops.value.indexOf(item) === index);
  recommendCrops.value = uniqueArr
  uniqueArr.forEach((item, index, arr) => {
    defaultCheckedKeys.value.push(item.id)
  })
  treeRef.value.setCheckedKeys(defaultCheckedKeys.value)
}
initPage()
const htagclose = ref(0)
const handleClose = (tag) => {
  let xx = []
  recommendCrops.value.splice(recommendCrops.value.indexOf(tag), 1)
  recommendCrops.value.forEach((item, index, arr) => {
    xx.push(item.id)
  })
  htagclose.value = 1
  treeRef.value.setCheckedKeys(xx)
  // console.log("recommendCrops",recommendCrops.value)
}
const getHistoryData = () => {

  if (checkedCrop.value.length == 0) ElMessage.warning("尚未选择作物！")
  else {
    isGetting.value = false
    getingCrop.value = ''
    getingPercent.value = 0
    isFinished.value = true
    dialogVisible.value = true
  }
}

const treeCheckChange = (data, checked, indeterminate) => {
  if (checked == true) {
    checkedCrop.value.push(data)
    // if (recommendCrops.value.indexOf({ id: data.id, name: data.cropname }) == -1) {
    //   recommendCrops.value.push({ id: data.id, name: data.cropname })
    // }
  }
  else {
    // if (recommendCrops.value.indexOf({ id: data.id, name: data.cropname }) !== -1) {
    //   recommendCrops.value.splice(recommendCrops.value.indexOf({ id: data.id, name: data.cropname }), 1)
    // }
    checkedCrop.value.forEach((obj, index, arr) => {
      if (obj.id == data.id) checkedCrop.value.splice(index, 1)
    })
  }
  if (htagclose.value != 1) {
    recommendCrops.value = []
    checkedCrop.value.forEach((obj, index, arr) => {
      recommendCrops.value.push({ id: obj.id, name: obj.cropname })
    })
  } else {
    htagclose.value = 0
  }

  emit('func1', checkedCrop.value)
  let y1 = 0
  if (Number(endYear.value) - Number(beginYear.value) > 2) {
    y1 = Number(endYear.value) - 2
    // alert(y1)
  }
  else y1 = beginYear.value
  emit('func2', [y1, endYear.value])
}
//模拟休眠
const sleep = (millisecond) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}
const getHistoryDatalist = async () => {
  try {
    let cropids = []
    recommendCrops.value.forEach((item, index, arr) => {
      cropids.push(item.id)
    })

    let params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value
    }
    let result = await getHistoryGrowDataService({
      pageNum: pageNum.value,
      pageSize: pageSize.value, lon: location.value.lon, lat: location.value.lat, areacode: location.value.code.replace(' ', ''),
      cropids: cropids.join(','),
      byear: beginYear.value,
      eyear: endYear.value

    })
    //渲染视图
    total.value = result.data.total;
    historyData.value = result.data.items;

  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }

}
//获取模拟数据
const modelData = async () => {
  let y1 = 0
  if (Number(endYear.value) - Number(beginYear.value) > 2) {
    y1 = Number(endYear.value) - 2
    // alert(y1)
  }
  else y1 = beginYear.value
  emit('func2', [y1, endYear.value])
  isGetting.value = true
  for (let i = 0; i < checkedCrop.value.length; i++) {
    getingCrop.value = checkedCrop.value[i].cropname
    getingPercent.value = 0
    for (let year = beginYear.value; year <= endYear.value; year++) {
      // for (let year = endYear.value; year >= beginYear.value; year--) {
      let result1 = await generateHistoryGrowDataService({ lon: location.value.lon, lat: location.value.lat, areacode: location.value.code, cropid: checkedCrop.value[i].id, year: year.toString() })
      if (result1.code == 0) {
        getingPercent.value = Math.round((year - beginYear.value + 1) / (endYear.value - beginYear.value + 1) * 100)
      }
    }
    getingPercent.value = 100

    // await sleep(100)
  }
  isFinished.value = false
  isGetting.value = false
  //加载数据
  getHistoryDatalist()
  await sleep(100)
  dialogVisible.value = false
  haveData.value = false

}
//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size
  getHistoryDatalist()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  getHistoryDatalist()
}
</script>
<style lang="scss">
.xxtableList {
  margin-top: 0px;
  height: 60vh;

  //表头
  th {
    padding: 0 !important;
    height: 30px;
    line-height: 30px;
    // background-color: #5e8dff;
    color: '#606266';
    font-weight: 700;
  }

  //行高
  td {
    padding: 0 !important;
    height: 32px;
    font-weight: 500;
    line-height: 32px;
    font-size: 12px;
  }

}

.rtreePanel {
  .el-tree-node__content {

    font-family: '楷体';
  }

  height: 74vh;
  border-right: 3px solid #e6e6e6b2;
  // background-color: #F6F6F6;
  margin-bottom: 0px;
}

.rtabs {
  --el-tabs-header-height: 37px;
}

.myrDialog {
  border-radius: 5px;
  height: auto;

  .el-dialog__body {
    padding-bottom: 0px;
    padding: 5px;
  }

  .el-dialog__header {
    border-radius: 5px 5px 0 0;
    padding: 0px !important;
    color: #ffffff;
    font-weight: 400;
    font-size: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 40px;
    width: 100%; //一定要设置，否则header会出问题
    line-height: 40px;
    background: #009237;
    border-bottom: 3px solid #e6e6e6b2;
  }

  .el-dialog__footer {
    padding-top: 0px;
  }
}

.rTag {
  margin-left: 5px;
  margin-top: 5px;
}

.xselect {
  .el-select__wrapper {
    min-height: 25px;
  }
}

.demo-progress .el-progress--line {
  // margin-bottom: 15px;
  max-width: 100%;
}

.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #009238;
  border-color: #009238;
}

.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #009238;
  border-color: #009238;
}

.el-checkbox__inner:hover {
  border-color: #009238;
}
</style>
