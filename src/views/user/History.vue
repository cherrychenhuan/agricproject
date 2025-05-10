<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div
          style="border-bottom:3px solid #e6e6e6b2;font-size:15px;color:#303133 ;padding-left:10px;background-color:#e9e9eb;height:40px;line-height:40px;">
          <el-text><el-icon>
              <Search />
            </el-icon> 历史推荐记录</el-text>
          <div style="position:absolute;top:0px;right:10px;">
            <el-button size="small" type="info" plain @click="deleteAll">清空历史</el-button>
            <el-button size="small" type="warning" plain @click="deleteChecked">删除选中历史记录</el-button>
          </div>
        </div>
        <div v-if="historyData.length > 0">
          <div style="float:left;">
            <ul style="overflow: auto" v-infinite-scroll="load" class="infinite-list">
              <el-checkbox-group v-model="checkList">
                <li v-for="item in historyData" :key="item" class="infinite-list-item">
                  <el-checkbox @click="getRecommendItem(item)" :value="item.createtime" :label="item.createtime"
                    size="small" />

                  <!-- <el-link
                  @click="getRecommendItem(item)"
                  style="--el-link-hover-text-color:#009237;--el-link-active-text-color:#009237;"><el-icon>
                    <Link />
                  </el-icon>{{ item.createtime
                  }}</el-link> -->
                </li>
              </el-checkbox-group>
            </ul>
          </div>
          <div class="xprojectClass">

            <el-row style="background-color:#f6f6f675;">
              <el-divider class="hhdivder" content-position="left">
                <el-text><el-icon>
                    <LocationFilled />
                  </el-icon>{{ createtime }}{{ address.address }}</el-text></el-divider>
              <el-col :span="12">
                <el-card class="mcardClass" style="height:80vh;margin-bottom:5px;" shadow="never">
                  <template #header>
                    <div class="card-header">
                      <span>推荐指数</span>
                    </div>
                  </template>
                  <div>
                    <el-table id="indexTable" ref="indexTableRef" v-loading="loading" border stripe
                      class="indextableList" @row-click="rowClick" highlight-current-row :data="recommendList"
                      :row-style="{ height: 0 + 'px' }" :header-cell-style="{ color: '#595959' }">
                      <el-table-column align="center" :show-overflow-tooltip="true" fixed prop="cropname" label="作物"
                        width="70" />

                      <el-table-column align="center" :show-overflow-tooltip="true" label="平均利润" width="95"><template
                          #default="scope">
                          <span>{{ scope.row.avgprofit != '-' && scope.row.avgprofit != null ?
                            scope.row.avgprofit.toFixed(2)
                            : '-' }} 元/亩</span>
                        </template></el-table-column>
                      <el-table-column align="center" :show-overflow-tooltip="true" label="模拟产量" width="95"><template
                          #default="scope">
                          <span>{{ scope.row.avgmodelyield != '-' && scope.row.avgmodelyield != null ?
                            scope.row.avgmodelyield.toFixed(2) : '-' }} kg/亩</span>
                        </template></el-table-column>
                      <el-table-column align="center" :show-overflow-tooltip="true" label="种植价值" width="90"><template
                          #default="scope">
                          <span style="color:red;" v-if="scope.row.index < 0">{{ scope.row.index.toFixed(2) }}</span>
                          <span style="color:green;" v-else>{{ scope.row.index.toFixed(2) }}</span>
                        </template></el-table-column>
                      <el-table-column align="center" label="推荐指数"><template #default="scope">
                          <!-- 0-0.5 -->
                          <span v-if="scope.row.star >= 0 && scope.row.star <= 0.5 && scope.row.star != null">
                            <img style="margin-top:5px;" src="../../assets/star2.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                          </span>
                          <!-- 0.5-1 -->
                          <span v-if="scope.row.star > 0.5 && scope.row.star <= 1">
                            <img style="margin-top:5px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                          </span>
                          <!-- 1-1.5 -->
                          <span v-if="scope.row.star > 1 && scope.row.star <= 1.5">
                            <img style="margin-top:5px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star2.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                          </span>
                          <!-- 1.5-2 -->
                          <span v-if="scope.row.star > 1.5 && scope.row.star <= 2">
                            <img style="margin-top:5px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                          </span>
                          <!-- 2-2.5 -->
                          <span v-if="scope.row.star > 2 && scope.row.star <= 2.5">
                            <img style="margin-top:5px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star2.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                          </span>
                          <!-- 2.5-3 -->
                          <span v-if="scope.row.star > 2.5 && scope.row.star <= 3">
                            <img style="margin-top:5px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                          </span>
                          <!-- 3-3.5 -->
                          <span v-if="scope.row.star > 3 && scope.row.star <= 3.5">
                            <img style="margin-top:5px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star2.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                          </span>
                          <!-- 3.5-4 -->
                          <span v-if="scope.row.star > 3.5 && scope.row.star <= 4">
                            <img style="margin-top:5px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star3.png" width="12px">
                          </span>
                          <!-- 4-4.5 -->
                          <span v-if="scope.row.star > 4 && scope.row.star <= 4.5">
                            <img style="margin-top:5px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star2.png" width="12px">
                          </span>
                          <!-- 4.5-5 -->
                          <span v-if="scope.row.star > 4.5 && scope.row.star <= 5">
                            <img style="margin-top:5px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star1.png" width="12px">
                            <img style="margin-top:5px;margin-left:3px;" src="../../assets/star1.png" width="12px">
                          </span>
                          <span v-if="scope.row.star == null" style="color:red;">
                            不推荐种植
                          </span>
                          <!-- {{ scope.row.star }} -->
                        </template></el-table-column>
                    </el-table>

                  </div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="mcardClass" style="height:80vh;margin-left:5px;margin-bottom:5px;overflow: auto;"
                  shadow="never">
                  <template #header>
                    <div class="card-header">
                      <span>建议农事安排{{ nowClickCrop }}</span>

                    </div>
                  </template>
                  <div v-loading="xloading" element-loading-text="预计需要等待15s..." v-if="nowClickCrop != ''"
                    style="font-size:13px;background-color:white;height:70vh;width:100%;overflow: auto;">
                    <el-divider border-style="dotted" content-position="center"><el-text
                        style="font-weight:600;font-size:14px;color:#009237;vertical-align: top;"><el-icon size='large'
                          style="">
                          <Timer />
                        </el-icon> 灌溉活动</el-text></el-divider>
                    <div class="recommendClass">
                      <el-table :data="projectData.irrigation != undefined ? projectData.irrigation.timeevent : []"
                        class="projecttableList" style="margin-left:-1px;height:100%;border:0;" border stripe
                        :row-style="{ height: 0 + 'px' }" :header-cell-style="{ color: '#595959' }">
                        <el-table-column align="center" label="日期"><template #default="scope">
                            <span>{{ scope.row.date.getMonth() + '月' + scope.row.date.getDate() + '日' }} 前后</span>
                          </template></el-table-column>
                        <el-table-column align="center" label="灌溉平均水深"><template #default="scope">
                            <span>{{ scope.row.amount }} cm左右</span>
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-row style="margin-top:10px;background-color:#f6f6f600;">
                        <el-col :span="4">
                          <div style="height:60px;line-height:60px;padding:10px;">
                            <img src="../../assets/laba.png" width="60px" />
                          </div>
                        </el-col>
                        <el-col :span="20">
                          <div class="reminderClass"
                            style="height:60px;line-height:30px;padding:10px;width:80%;border-radius:10px;border:1px solid var(--el-border-color);">
                            <el-text style="font-weight:500;font-size:13px;">提示:请实时观测土壤湿度，当土壤体积含水量
                              <span style="color:#F56C6C;font-size:14px;font-weight:550;">
                                <={{ (projectData.irrigation != undefined && projectData.irrigation.stateevent
                                  != undefined) ? projectData.irrigation.stateevent[0].sm : '' }} </span>
                                  <span>时，需灌溉平均水深不少于</span>
                                  <span style="color:#F56C6C;font-size:14px;font-weight:550;">{{
                                    (projectData.irrigation != undefined && projectData.irrigation.stateevent !=
                                      undefined) ?
                                      projectData.irrigation.stateevent[0].amount : ''
                                  }}cm</span></el-text>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <el-divider border-style="dotted" content-position="center"><el-text
                        style="font-weight:600;font-size:14px;color:#009237;vertical-align: top;"><el-icon size='large'>
                          <Stopwatch />
                        </el-icon> 施肥活动</el-text></el-divider>
                    <el-table :data="projectData.applynpk != undefined ? projectData.applynpk.timeevent : []"
                      class="projecttableList" style="border:0;" border stripe :row-style="{ height: 0 + 'px' }"
                      :header-cell-style="{ color: '#595959' }">
                      <el-table-column align="center" label="日期"><template #default="scope">
                          <span>{{ scope.row.date.getMonth() + '月' + scope.row.date.getDate() + '日' }} 前后</span>
                        </template></el-table-column>
                      <el-table-column align="center" label="含氮量"><template #default="scope">
                          <span>{{ scope.row.namount }} kg/公顷左右</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="含磷量"><template #default="scope">
                          <span>{{ scope.row.pamount }} kg/公顷左右</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="含钾量"><template #default="scope">
                          <span>{{ scope.row.kamount }} kg/公顷左右</span>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-row style="margin-top:10px;background-color:#f6f6f600;">
                      <el-col :span="24">
                        <div class="reminderClass"
                          style="margin-left:10px;padding:10px;width:94%;border-radius:10px;border:1px solid var(--el-border-color);">
                          <el-text style="font-weight:500;font-size:13px;">提示：可定期记录作物生长状态，当达到一定状态点时再施肥，如表：
                          </el-text>
                          <el-table v-loading="xloading"
                            :data="projectData.applynpk != undefined ? projectData.applynpk.stateevent : []"
                            class="projecttableList" style="margin-left:0px;margin-top:5px;height:100%;border:0;" stripe
                            :row-style="{ height: 0 + 'px' }" :header-cell-style="{ color: '#595959' }">
                            <el-table-column align="center" label="状态"><template #default="scope">
                                <span>DVS={{ scope.row.dvs }}</span>
                              </template></el-table-column>
                            <el-table-column align="center" label="含氮量"><template #default="scope">
                                <span>{{ scope.row.namount }} kg/公顷左右</span>
                              </template>
                            </el-table-column>
                            <el-table-column align="center" label="含磷量"><template #default="scope">
                                <span>{{ scope.row.pamount }} kg/公顷左右</span>
                              </template>
                            </el-table-column>
                            <el-table-column align="center" label="含钾量"><template #default="scope">
                                <span>{{ scope.row.kamount }} kg/公顷左右</span>
                              </template>
                            </el-table-column>
                          </el-table>
                        </div>
                      </el-col>
                    </el-row>

                    <el-divider border-style="dotted" content-position="center"><el-text
                        style="font-weight:600;font-size:14px;color:#009237;vertical-align: top;"><el-icon size='large'>
                          <Scissor />
                        </el-icon> 除草活动</el-text></el-divider>
                    <el-table :data="projectData.mowing != undefined ? projectData.mowing.timeevent : []"
                      class="projecttableList" border style="margin-left:0px;border:0;" stripe
                      :row-style="{ height: 0 + 'px' }" :header-cell-style="{ color: '#595959' }">
                      <el-table-column align="center" label="日期"><template #default="scope">
                          <span>{{ scope.row.date.getMonth() + '月' + scope.row.date.getDate() + '日' }} 前后</span>
                        </template></el-table-column>
                      <el-table-column align="center" label="剩余生物量"><template #default="scope">
                          <span>{{ scope.row.biomass_remaining }} kg/公顷左右</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <el-result v-else icon="warning" title="提示" sub-title="模型暂未运行出最优种植计划">

                  </el-result>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
        <div v-else>
          <el-empty description="暂无历史推荐记录">
            <el-button type="success" @click="getRecom">去获取推荐</el-button>
          </el-empty>
        </div>
      </el-col>
    </el-row>


  </div>
</template>
<script setup>
import cloneDeep from 'lodash/cloneDeep'
import { ref, nextTick, toRefs, toRef, watch, defineAsyncComponent } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getRecommendRecordTimeListService, getAddressService, deleteRecommendRecordService, deleteRecommendRecordAllService } from "@/api/user.js"
import { addCropcalendarService, addArgoService, getStateEventSmDataService, updateStateSmService, getMaxSmIdService, deleteSmService, getTimeEventTmDataService, updateTimeTmService, getMaxTmIdService, deleteTmService, getStateEventSnDataService, updateStateSnService, getMaxSnIdService, deleteSnService, getTimeEventTnDataService, updateTimeTnService, getMaxTnIdService, deleteTnService, deleteSiService, updateStateIrrigateService, getMaxSiIdService, getStateEventIrriDataService, deleteTiService, addTimeIrrigateService, getMaxTiIdService, updateTimeIrrigateService, getArgoService, getCropCalendarService, getTimeEventIrriDataService } from '@/api/argomanage.js'
import { addRecommendService, getRecommendIndexService, getRecommendProjectService, getRecommendRecordService } from "@/api/recommend.js"
import { useRouter, useRoute } from 'vue-router';
import { getLocationService, provinceListService, areaListService } from '@/api/area.js'
import { UserInfoStore } from '@/stores/userInfo.js'
import { locationStore } from '@/stores/location'
const xloading = ref(false)
const router = useRouter();
const indexTableRef = ref('')
const address = ref({})
const createtime = ref('')
const historyData = ref([])
const checkList = ref([])
const userInfoStore = UserInfoStore()
const nowClickCrop = ref('')
const recommendList = ref([
  {
    "cropname": "小麦",
    "index": -12.15333138947858,
    "avgprofit": -94.17666666666668,
    "avgyeild": 274.816,
    "avgmodelyield": 2129.560529310726,
    "star": 3.3537024489751337
  },
  {
    "cropname": "玉米",
    "index": 6.297052355454636,
    "avgprofit": 62.56777777777778,
    "avgyeild": 368.006,
    "avgmodelyield": 3656.5231364074466,
    "star": 3.792228099076146
  },
  {
    "cropname": "马铃薯",
    "index": 57.11244945539533,
    "avgprofit": 370.4322222222222,
    "avgyeild": 73.94,
    "avgmodelyield": 479.575972879651,
    "star": 5
  },
  {
    "cropname": "棉花",
    "index": -153.2559034640208,
    "avgprofit": -1128.7783333333334,
    "avgyeild": 75.52,
    "avgmodelyield": 556.228750779222,
    "star": 0
  }
])
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
const getRecom = () => {
  router.push({ path: '/recommend' })
}
const deleteChecked = async () => {
  //获取当前状态
  if (checkList.value.length == 0) {
    ElMessage.warning('尚无选中记录')
  } else {
    ElMessageBox.confirm(
      '确认删除选中的' + (checkList.value.length) + '条历史推荐记录吗?',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(async (action, instance, done) => {
      if (action === 'confirm') {
        for (let i = 0; i < checkList.value.length; i++) {

          historyData.value.forEach((v, j) => {
            if (checkList.value[i] === v.createtime) {
              historyData.value.splice(j, 1);
              // alert(1)
            }

          });
          await deleteRecommendRecordService({ userid: userInfoStore.info.userId, createtime: checkList.value[i] });
        }
        getRecommendItem(historyData.value[0])
        rowClick(historyData.value[0].datalist[0])
        indexTableRef.value.setCurrentRow(historyData.value[0].datalist[0])
        checkList.value = [historyData.value[0].createtime]
        //getcategoryList()
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      }

    })
  }

}
const deleteAll = async () => {
  ElMessageBox.confirm(
    '确认清空历史推荐记录吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async (action, instance, done) => {
    if (action === 'confirm') {
      await deleteRecommendRecordAllService({ userid: userInfoStore.info.userId });

      historyData.value = []
      //getcategoryList()
      ElMessage({
        type: 'success',
        message: '已清空'
      })
    }

  })
}
const getAverage = (arr) => {
  if (arr.length === 0) return 0; // 如果数组为空，则返回0
  const sum = arr.reduce((acc, current) => acc + current, 0); // 累加数组元素
  return sum / arr.length; // 计算平均值
}
//获取指数
//获取推荐记录列表-按照时间
const getRecommendRecords = async () => {
  let result = await getRecommendRecordTimeListService({ userid: userInfoStore.info.userId })
  for (let i = 0; i < result.data.length; i++) {
    result.data[i].datalist = eval(result.data[i].datalist)
  }
  historyData.value = result.data
  getRecommendItem(result.data[0])
  rowClick(result.data[0].datalist[0])
  indexTableRef.value.setCurrentRow(result.data[0].datalist[0])
}
getRecommendRecords()

const formatDate = (dataString) => {
  //dataString是整数，否则要parseInt转换
  var time = new Date(dataString);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
}
const getRecommendItem = async (data) => {
  let xxxxdata = cloneDeep(data.datalist)
  xxxxdata.sort(function (a, b) {
    return b.index - a.index; // 按照分数从高到低排序
  })
  recommendList.value = xxxxdata
  let result1 = await getAddressService({ areacode: data.datalist[0].areacode.replace(' ', '') })
  address.value = result1.data[0]
  createtime.value = data.createtime
  console.log(recommendList.value)
  rowClick(data.datalist[0])
  indexTableRef.value.setCurrentRow(data.datalist[0])
}
const projectData = ref({
  // irrigation: { timeevent: [], stateevent: [] },
  // applynpk: { timeevent: [], stateevent: [] },
  // mowing: { timeevent: [], stateevent: [] }
})
const rowClick = async (row) => {
  xloading.value = false
  if (row.index == -999) return false
  nowClickCrop.value = '-' + row.cropname
  projectData.value = {
    // irrigation: { timeevent: [], stateevent: [] },
    // applynpk: { timeevent: [], stateevent: [] },
    // mowing: { timeevent: [], stateevent: [] }
  }
  //先判断是否数据已经存在
  let result0 = await getRecommendRecordService({ userid: userInfoStore.info.userId, areacode: row.areacode, cropname: row.cropname })
  // console.log("rrrr", result1.data)
  if (result0.data.length != 0) { //如果有就去获取
    let cropcalendarid = result0.data[0].cropCalendarid
    // 获取灌溉时间事件
    let result1 = await getTimeEventIrriDataService({ cropcalendarid: cropcalendarid })
    projectData.value.irrigation = {}
    projectData.value.irrigation.timeevent = []
    projectData.value.irrigation.timeevent.push({ date: new Date(result1.data[0].date), amount: result1.data[0].irrigationAmount })
    projectData.value.irrigation.timeevent.push({ date: new Date(result1.data[1].date), amount: result1.data[1].irrigationAmount })

    //获取灌溉状态事件
    let result2 = await getStateEventIrriDataService({ cropcalendarid: cropcalendarid })
    console.log("1111", result2.data)
    projectData.value.irrigation.stateevent = []
    projectData.value.irrigation.stateevent.push({ sm: result2.data[0].statenum, amount: result2.data[0].irrigationAmount })


    // //施肥时间事件
    let result3 = await getTimeEventTnDataService({ cropcalendarid: cropcalendarid })
    console.log("xxxxxx", result3.data)
    projectData.value.applynpk = {}
    projectData.value.applynpk.timeevent = []
    projectData.value.applynpk.timeevent.push({ date: new Date(result3.data[0].date), namount: result3.data[0].namount, pamount: result3.data[0].pamount, kamount: result3.data[0].kamount })
    projectData.value.applynpk.timeevent.push({ date: new Date(result3.data[1].date), namount: result3.data[1].namount, pamount: result3.data[1].pamount, kamount: result3.data[1].kamount })
    console.log("yyyy", projectData.value)
    // //施肥状态事件
    let result4 = await getStateEventSnDataService({ cropcalendarid: cropcalendarid })
    projectData.value.applynpk.stateevent = []
    projectData.value.applynpk.stateevent.push({ dvs: result4.data[0].statenum, namount: result4.data[0].namount, pamount: result4.data[0].pamount, kamount: result4.data[0].kamount })
    projectData.value.applynpk.stateevent.push({ dvs: result4.data[1].statenum, namount: result4.data[1].namount, pamount: result4.data[1].pamount, kamount: result4.data[1].kamount })
    projectData.value.applynpk.stateevent.push({ dvs: result4.data[2].statenum, namount: result4.data[2].namount, pamount: result4.data[2].pamount, kamount: result4.data[2].kamount })


    // //割草时间事件
    let result5 = await getTimeEventTmDataService({ cropcalendarid: cropcalendarid })
    projectData.value.mowing = {}
    projectData.value.mowing.timeevent = []
    projectData.value.mowing.timeevent.push({ date: new Date(result5.data[0].date), biomass_remaining: result5.data[0].biomassRemaining })
    projectData.value.mowing.timeevent.push({ date: new Date(result5.data[1].date), biomass_remaining: result5.data[1].biomassRemaining })
    console.log("projectData", projectData.value)

  } else {
    xloading.value = true
    let year = (new Date().getFullYear() - 1)
    // 获取lon,lat

    let result = await getRecommendProjectService({ lon: address.value.lng84, lat: address.value.lat84, areacode: row.areacode, cropid: row.cropid, year: (new Date().getFullYear() - 1).toString() })
    // let data = ",19.0,102.0,10.0,10.0,14.0,67.0,20.0,23.0,16.0,24.0,23.0,23.0,20.0,88.0,90.0,88.0,0.38,1.01,1.51,20.0,24.0,14.0,20.0,19.0,21.0,14.0,27.0,14.0,0.0,10.0&,4106.55"
    let data = result.data

    let arr1 = data.split('&')[0].split(',')
    let str2 = data.split('&')[1]
    let xarray = []
    let item = []
    for (let i = 1; i < arr1.length; i++) {
      item.push(Number(arr1[i]))
      if (i % 30 == 0) {
        xarray.push(item)
        item = []
      }
    }
    console.log("dddare", xarray)
    if (xarray.length == 0) {
      nowClickCrop.value = ''
    }
    else {
      ///计算灌溉日期
      //第1次灌溉
      var date1 = new Date();
      date1.setFullYear(2023); // 设置年份
      date1.setMonth(3); // 设置月份（0-11，0是一月，11是十二月）
      date1.setDate(1);

      date1 = new Date(date1.setDate(date1.getDate() + xarray[0][0]))

      //第2次灌溉
      var date2 = new Date();
      date2.setFullYear(2023); // 设置年份
      date2.setMonth(3); // 设置月份（0-11，0是一月，11是十二月）
      date2.setDate(1);
      date2 = new Date(date2.setDate(date2.getDate() + xarray[0][1]))

      var irriamount1 = xarray[0][2]
      var irriamount2 = xarray[0][3]
      projectData.value.irrigation = {}
      projectData.value.irrigation.timeevent = []
      projectData.value.irrigation.timeevent.push({ date: date1, amount: irriamount1 })
      projectData.value.irrigation.timeevent.push({ date: date2, amount: irriamount2 })
      projectData.value.irrigation.stateevent = []
      projectData.value.irrigation.stateevent.push({ sm: xarray[0][28], amount: xarray[0][29] })
      //第1次施肥
      var date3 = new Date();
      date3.setFullYear(2023); // 设置年份
      date3.setMonth(3); // 设置月份（0-11，0是一月，11是十二月）
      date3.setDate(1);
      date3 = new Date(date3.setDate(date3.getDate() + xarray[0][4]))
      //第2次施肥
      var date4 = new Date();
      date4.setFullYear(2023); // 设置年份
      date4.setMonth(3); // 设置月份（0-11，0是一月，11是十二月）
      date4.setDate(1);
      date4 = new Date(date4.setDate(date4.getDate() + xarray[0][5]))
      var namount1 = xarray[0][6]
      var pamount1 = xarray[0][7]
      var kamount1 = xarray[0][8]
      var namount2 = xarray[0][9]
      var pamount2 = xarray[0][10]
      var kamount2 = xarray[0][11]
      projectData.value.applynpk = {}
      projectData.value.applynpk.timeevent = []
      projectData.value.applynpk.timeevent.push({ date: date3, namount: namount1, pamount: pamount1, kamount: kamount1 })
      projectData.value.applynpk.timeevent.push({ date: date4, namount: namount2, pamount: pamount2, kamount: kamount2 })

      //状态参数
      projectData.value.applynpk.stateevent = []
      projectData.value.applynpk.stateevent.push({ dvs: xarray[0][16], namount: xarray[0][19], pamount: xarray[0][20], kamount: xarray[0][21] })
      projectData.value.applynpk.stateevent.push({ dvs: xarray[0][17], namount: xarray[0][22], pamount: xarray[0][23], kamount: xarray[0][24] })
      projectData.value.applynpk.stateevent.push({ dvs: xarray[0][18], namount: xarray[0][25], pamount: xarray[0][26], kamount: xarray[0][27] })
      console.log(projectData.value.applynpk.stateevent)
      //割草的行为
      //第1次除草
      var date5 = new Date();
      date5.setFullYear(2023); // 设置年份
      date5.setMonth(3); // 设置月份（0-11，0是一月，11是十二月）
      date5.setDate(1);
      date5 = new Date(date5.setDate(date5.getDate() + xarray[0][12]))
      //第2次除草
      var date6 = new Date();
      date6.setFullYear(2023); // 设置年份
      date6.setMonth(3); // 设置月份（0-11，0是一月，11是十二月）
      date6.setDate(1);
      date6 = new Date(date6.setDate(date6.getDate() + xarray[0][13]))
      projectData.value.mowing = {}
      projectData.value.mowing.timeevent = []
      projectData.value.mowing.timeevent.push({ date: date5, biomass_remaining: xarray[0][14] })
      projectData.value.mowing.timeevent.push({ date: date6, biomass_remaining: xarray[0][15] })

      // 处理projectData
      // 存数据入argomanagement

      addRecommendArgo(row)
    }
    xloading.value = false
    // console.log("newww", projectData.value)

  }


}
// rowClick()
</script>

<style lang="scss">
.infinite-list {
  height: 85vh;
  padding: 0;
  margin: 0;
  width: 170px;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-size: 13px;
  background: #f0f9eb;
  margin: 5px;
  margin-left: 0px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
  margin-top: 10px;
}

.mcardClass {
  margin-top: 0px;
  background-color: #f6f6f675;

  .el-text>.el-icon {
    vertical-align: -3.5px;
  }

  .el-card__header {
    height: 30px;
    font-weight: 400;
    font-size: 14px;
    // font-family: '楷体', 'Times New Roman';
    background-color: #F6F6F6;
  }

  .el-card__body {
    padding: 0px;
    background-color: #f6f6f600;
    // height: 100%;
    // overflow: auto;
  }
}

.el-checkbox__input.is-checked+.el-checkbox__label {
  color: #009237;
}

.recommendIndexClass {
  li {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
  }
}

.indextableList {
  margin-top: 0px;
  border: 0;
  height: 73vh;

  .el-table__body tr.current-row>td {
    background-color: #ffdeac !important;
    // color: #ffffff;
  }

  // height: 65vh;
  //表头
  thead th {
    padding: 0 !important;
    height: 30px;
    line-height: 30px;
    // background-color: #5e8dff;
    color: 'gray';
    font-weight: 530;
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

.projecttableList {
  margin-top: 0px;
  border: 0;

  // height: 65vh;
  //表头
  thead th {
    padding: 0 !important;
    height: 30px;
    line-height: 30px;


    font-weight: 530;


  }

  thead th.el-table__cell {
    color: #009237;
    // background-color: rgb(180, 210, 171);
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

.recommendClass {
  // line-height: 40px;
  // font-weight: 700;
  // text-align: center;
  // font-family: '华文仿宋'
  // height: auto;
  background-color: #f6f6f675;

}

.reminderClass {
  --el-box-shadow: lighter;
  background-color: aliceblue;
}

.el-loading-spinner .el-loading-text {
  color: #009237;
  font-size: 13px;
}

.el-loading-spinner {
  color: #009237;

  .circular {
    color: #009237;
  }
}

.hhdivder {
  margin: 15px 0px;
  font-size: 14px;
  font-weight: 600;
}
</style>
