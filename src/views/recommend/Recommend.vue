<template>
  <div>
    <!-- 步骤条 -->
    <div style="padding:10px;height:26px;background:#F6F6F6;z-index: 1000;">
      <el-steps :active="activeStep" finish-status="success">
        <el-step v-for="step in steps" :key="step.title" :title="step.title">
          <!-- 使用 title 插槽自定义标题位置 -->
          <template #title>
            <div class="step-title">
              {{ step.title }}
            </div>
          </template>
        </el-step>
      </el-steps>

    </div>
    <!-- 步骤一 -->
    <div v-if="activeStep == 0" style="margin-top:5px;">
      <el-row>
        <el-col :span="6">
          <div class="choose-area">
            <el-card class="box-card" shadow="Never" style="height:82.2vh; overflow: auto;">
              <template #header>
                <div class="card-header" style="margin-top: 5px;">
                  <el-text>
                    <el-icon :size="15">
                      <Place />
                    </el-icon>
                    输入地点
                    <!-- <el-link :underline="false">直接获取当前定位</el-link> -->
                    <el-button @click="submitLocation"
                      style="color:#009238; position:absolute;margin-top:-5px;left:190px;" plain text type="success"
                      :loading="isload">确定</el-button>
                  </el-text>

                </div>
              </template>
              <div>
                <el-form-item label="省级:">
                  <el-select filterable @change="changeProvince" v-model="provinceValue" placeholder="选择">
                    <el-option v-for="(item, index) in provinceList" :key="item.code" :label="item.name"
                      :value="item.code" />
                  </el-select>
                </el-form-item>
                <el-form-item label="市级:">
                  <el-select filterable @change="changeCity" v-model="cityValue" placeholder="选择">
                    <el-option v-for="item in cityList" :key="item.code" :label="item.name" :value="item.code" />
                  </el-select>
                </el-form-item>
                <el-form-item label="县级:">
                  <el-select filterable @change="changeCounty" v-model="countyValue" placeholder="选择">
                    <el-option v-for="item in countyList" :key="item.code" :label="item.name" :value="item.code" />
                  </el-select>
                </el-form-item>
                <el-form-item label="乡镇:">
                  <el-select filterable @change="changeTown" v-model="townValue" class="m-2" placeholder="选择">
                    <el-option v-for="item in townList" :key="item.code" :label="item.name" :value="item.code" />
                  </el-select>
                </el-form-item>
                <el-form-item label="村级:">
                  <el-select filterable @change="changeVillage" v-model="villageValue" placeholder="选择">
                    <el-option v-for="item in villageList" :key="item.code" :label="item.name" :value="item.code" />
                  </el-select>
                </el-form-item>
              </div>
              <div id="guide-map" style="height: 300px;"></div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="18">
          <div style="position:absolute;top:12px;right:10px;z-index: 1000;">
            <el-button type="success" size="small" :disabled="isNextOK" @click="stepNext">下一步</el-button>
          </div>
          <el-tabs type="border-card" class="demo-tabs" v-model="step1tabs"
            style="margin-top:3px;height:100%;width:100%;">
            <el-tab-pane name="weathertab">
              <template #label>
                <span class="custom-tabs-label">
                  <el-text>
                    <el-icon :size="15">
                      <Sunny />
                    </el-icon>
                    气候特征
                  </el-text>
                </span>
              </template>
              <el-tabs v-model="activeTab" @tab-change="WeathertabClick" tab-position="top" class="xweather-tabs">
                <!-- 气温 -->
                <el-tab-pane name="temptab" style="padding:10px;height:60vh;">
                  <template #label>
                    <span class="weather-tabs-label">
                      <el-icon :size="15" style="vertical-align: middle;margin-right:5px;">
                        <Histogram />
                      </el-icon>
                      <span>气温</span>

                    </span>
                  </template>
                  <div class="weather-box" style="width:800px;height:500px;" id="tempView"><el-empty
                      v-show="isweatherEmpty" description="请先确认地址" /></div>
                </el-tab-pane>
                <!-- 降雨 -->
                <el-tab-pane name="raintab"> <template #label>
                    <span class="weather-tabs-label">
                      <el-icon :size="15" style="vertical-align: middle;margin-right:5px;">
                        <Pouring />
                      </el-icon>
                      降雨量
                    </span>
                  </template>
                  <div class="weather-box" style="width:800px;height:500px;" id="rainView"><el-empty
                      v-show="isweatherEmpty" description="请先确认地址" /></div>
                </el-tab-pane>
                <!-- 气压 -->
                <el-tab-pane name="vaptab">
                  <template #label>
                    <span class="weather-tabs-label">
                      <el-icon :size="15" style="vertical-align: middle;margin-right:5px;">
                        <DataAnalysis />
                      </el-icon>
                      气压

                    </span>
                  </template>
                  <div class="weather-box" style="width:800px;height:500px;" id="vapView"><el-empty
                      v-show="isweatherEmpty" description="请先确认地址" /></div>
                </el-tab-pane>
                <!-- 风速 -->
                <el-tab-pane name="windtab">
                  <template #label>
                    <span class="weather-tabs-label">
                      <el-icon :size="15" style="vertical-align: middle;margin-right:5px;">
                        <Position />
                      </el-icon>
                      风速
                    </span>
                  </template>
                  <div class="weather-box" style="width:800px;height:500px;" id="windView"><el-empty
                      v-show="isweatherEmpty" description="请先确认地址" /></div>
                </el-tab-pane>
              </el-tabs>
              <div style="position:absolute;top:12px;right:10px; font-size:15px;" class="block">
                <el-text><span class="demonstration" style="font-weight: 500;font-size:12px;">年份:</span>
                  <el-date-picker style="margin-left:5px; margin-right:5px;width:100px;" size="small"
                    v-model="beginYear" type="year" placeholder="选择" />
                  <span class="demonstration">~</span>
                  <el-date-picker style="margin-left:5px;width:100px;" size="small" v-model="endYear" type="year"
                    placeholder="选择" />
                  <el-button @click="reFreshWeather" :disabled="weatherData.length == 0" style="margin-left:5px;"
                    type="warning" size="small">确认</el-button>
                </el-text>
              </div>
            </el-tab-pane>
            <el-tab-pane name="soiltab">
              <template #label>
                <span class="custom-tabs-label">
                  <el-text>
                    <el-icon :size="15">
                      <Odometer />
                    </el-icon>
                    土壤特征
                  </el-text>
                </span>
              </template>
              <div class="soil-box" id="soilView">
                <el-divider style="margin-top:10px;color:red;" content-position="center">土壤HWSD数据</el-divider>
                <!-- <el-tabs tab-position="top" class="demo-tabs" style="width:100%;">
                气温
                <el-tab-pane style="padding:10px;height:60vh; overflow: auto;">
                  <template #label>
                    <span>
                      <el-text>
                        <el-icon :size="15">
                          <Histogram />
                        </el-icon>
                        土壤HWSD数据
                      </el-text>
                    </span>
                  </template> -->
                <el-descriptions v-model="soilData" size="small" class="margin-top" title="" :column="2" :size="size"
                  border>
                  <!-- 第一行 -->
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item" id="T_GRAVEL"> 碎石体积百分比(GRAVEL)
                      </div>
                    </template>
                    <div class="cell-content" style="display:flex;">
                      <div style="width:50%;flex:left;">顶层{{ soilData.tgravel }}%vol.</div>
                      底层{{ soilData.sgravel }}%vol.
                    </div>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        含沙量(SAND)
                      </div>
                    </template>
                    <div class="cell-content" style="display:flex;">
                      <div style="width:50%;flex:left;">顶层{{ soilData.tsand }}%wt.</div>
                      底层{{ soilData.ssand }}%wt.
                    </div>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        粉沙粒含量(SILT)
                      </div>
                    </template>
                    <div class="cell-content" style="display:flex;">
                      <div style="width:50%;flex:left;">顶层{{ soilData.tsilt }}%wt.</div>
                      底层{{ soilData.ssilt }}%wt.
                    </div>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        粘土含量(CLAY)
                      </div>
                    </template>
                    <div class="cell-content" style="display:flex;">
                      <div style="width:50%;flex:left;">顶层{{ soilData.tclay }}%wt.</div>
                      底层{{ soilData.sclay }}%wt.
                    </div>
                  </el-descriptions-item>
                  <!-- 第二行 -->
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        土壤质地分类(USDA_TEX)
                      </div>
                    </template>
                    <div class="cell-content" style="display:flex;">
                      <div style="width:50%;flex:left;">顶层：{{ soilData.soilname }}</div>
                      底层：{{ soilData.soilname }}
                    </div>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        土壤容重(REF_BULK)
                      </div>
                    </template>
                    <div class="cell-content" style="display:flex;">
                      <div style="width:50%;flex:left;">顶层{{ soilData.trefBulkDensity }}kg/dm³</div>
                      底层{{ soilData.srefBulkDensity }}kg/dm³
                    </div>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        有机碳含量(OC)
                      </div>
                    </template>
                    <div class="cell-content" style="display:flex;">
                      <div style="width:50%;flex:left;">顶层{{ soilData.toc }}%wt.</div>
                      底层{{ soilData.soc }}%wt.
                    </div>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        酸碱度(PH_H2O)
                      </div>
                    </template>
                    <div class="cell-content" style="display:flex;">
                      <div style="width:50%;flex:left;">顶层{{ soilData.tphH2O }}-log(H⁺)</div>
                      底层{{ soilData.sphH2O }}-log(H⁺)
                    </div>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        粘性层土壤的阳离子交换能力(CEC_CLAY)
                      </div>
                    </template>
                    <div class="cell-content" style="display:flex;">
                      <div style="width:50%;flex:left;">顶层{{ soilData.tcecClay }}cmol/kg</div>
                      底层{{ soilData.scecClay }}cmol/kg
                    </div>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        土壤的阳离子交换能力(CEC_SOIL)
                      </div>
                    </template>
                    <div class="cell-content" style="display:flex;">
                      <div style="width:50%;flex:left;">
                        顶层{{ soilData.tcecSoil }}cmol/kg</div>
                      底层{{ soilData.scecSoil }}cmol/kg
                    </div>

                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        基本饱和度(BS)
                      </div>
                    </template>
                    <div class="cell-content" tyle="display:flex;">
                      <div style="width:50%;flex:left;">
                        顶层{{ soilData.tbs }}%</div>
                      底层{{ soilData.sbs }}%
                    </div>

                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        交换性盐基(TEB)
                      </div>
                    </template>
                    <div class="cell-content" style="display:flex;">
                      <div style="width:50%;flex:left;">
                        顶层{{ soilData.tteb }}cmol/kg</div>
                      底层{{ soilData.steb }}cmol/kg
                    </div>

                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        碳酸盐含量(CACO3)
                      </div>
                    </template>
                    <div class="cell-content" style="display:flex;">
                      <div style="width:50%;flex:left;">
                        顶层{{ soilData.tcaco3 }}%wt.</div>
                      底层{{ soilData.scaco3 }}%wt.
                    </div>

                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        硫酸盐含量(CASO4)
                      </div>
                    </template>
                    <div class="cell-content" style="display:flex;">
                      <div style="width:50%;flex:left;">
                        顶层{{ soilData.tcaso4 }}%wt.</div>
                      底层{{ soilData.scaso4 }}%wt.
                    </div>

                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        可交换钠盐(ESP)
                      </div>
                    </template>
                    <div class="cell-content" style="display:flex;">
                      <div style="width:50%;flex:left;">
                        顶层{{ soilData.tesp }}</div>
                      底层{{ soilData.sesp }}
                    </div>

                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        电导率(ECE)
                      </div>
                    </template>
                    <div class="cell-content" style="display:flex;">
                      <div style="width:50%;flex:left;">
                        顶层{{ soilData.tece }}</div>
                      底层{{ soilData.sece }}
                    </div>

                  </el-descriptions-item>
                </el-descriptions>
                <!-- </el-tab-pane> -->
                <!-- 降雨 -->
                <!-- <el-tab-pane> <template #label>
                    <span>
                      <el-text>
                        <el-icon :size="15">
                          <Pouring />
                        </el-icon>
                        模拟生长所需土壤数据
                      </el-text>
                    </span> -->
                <!-- </template> -->
                <el-divider content-position="center">模拟生长所需土壤数据</el-divider>
                <el-form ref="soilviewForm" :disabled="isSoilEdit" :rules="rules" :model="soilForm" class="soilForm"
                  :show-message="false" label-position="left" style="font-weight: 400;">
                  <el-row style="margin-top:10px;">
                    <el-col :span="14">
                      <el-form-item prop="smtabx" label-width="135px" label="土壤体积含水量pF:">
                        <el-input placeholder="X:1.2;1.3;..." v-model="soilForm.smtabx" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item prop="smtaby" label="">
                        <el-input placeholder="Y" v-model="soilForm.smtaby" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="14">
                      <el-form-item prop="contabx" label-width="135px" label="土壤导水率pF:">
                        <el-input placeholder="X" v-model="soilForm.contabx" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item prop="contaby" label="">
                        <el-input placeholder="Y" v-model="soilForm.contaby" />
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item prop="smw" label-width="135px" :label="'凋萎系数:'">
                        <el-input type='number' placeholder="" v-model="soilForm.smw">
                          <template #suffix>
                            cm3/cm3
                          </template></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="smfcf" label-width="135px" :label="'田间持水量:'">
                        <el-input type='number' placeholder="" v-model="soilForm.smfcf">
                          <template #suffix>
                            cm3/cm3
                          </template></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="sm0" label-width="135px" :label="'土壤饱和含水量:'">
                        <el-input type='number' placeholder="" v-model="soilForm.sm0">
                          <template #suffix>
                            cm3/cm3
                          </template></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item prop="crairc" label-width="135px" :label="'临界土壤含氧量:'">
                        <el-input type='number' placeholder="" v-model="soilForm.crairc">
                          <template #suffix>
                            cm3/cm3
                          </template></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="k0" label-width="135px" :label="'饱和土壤导水率:'">
                        <el-input type='number' placeholder="" v-model="soilForm.k0">
                          <template #suffix>
                            cm/day
                          </template></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="sope" label-width="135px" :label="'根层最大入渗速率:'">
                        <el-input type='number' placeholder="" v-model="soilForm.sope">
                          <template #suffix>
                            cm/day
                          </template></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="ksub" label-width="185px" :label="'根层以下土壤最大入渗速率:'">
                        <el-input type='number' placeholder="" v-model="soilForm.ksub">
                          <template #suffix>
                            cm/day
                          </template></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="spads" label-width="185px" :label="'深苗床第一层表土渗漏参数:'">
                        <el-input type='number' placeholder="" v-model="soilForm.spads" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="spods" label-width="185px" :label="'深苗床第二层表土渗漏参数:'">
                        <el-input type='number' placeholder="" v-model="soilForm.spods" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="spass" label-width="185px" :label="'浅苗床第一层表土渗漏参数:'">
                        <el-input type='number' placeholder="" v-model="soilForm.spass" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item prop="sposs" label-width="185px" :label="'浅苗床第二层表土渗漏参数:'">
                        <el-input type='number' placeholder="" v-model="soilForm.sposs" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="deflim" label-width="185px" :label="'深苗床所需水分亏缺参数:'">
                        <el-input type='number' placeholder="" v-model="soilForm.deflim" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-row>
                  <el-col :span="18"></el-col>
                  <el-col :span="6">
                    <el-button :disabled="isSavebtnOK" type="success" size="small"
                      @click="saveSoilcropdata">保存</el-button>
                    <el-button :disabled="isEditbtnOK" type="primary" size="small"
                      @click="editSoilcropdata">编辑</el-button>
                    <el-button :disabled="isClearbtnOK" type="default" size="small"
                      @click="clearSoilForm">清空</el-button></el-col>

                </el-row>


                <!-- </el-tab-pane>
              </el-tabs> -->



              </div>
            </el-tab-pane>

          </el-tabs>

        </el-col>
      </el-row>
    </div>
    <!-- 步骤二 -->
    <div v-if="activeStep == 1">
      <RecommendModelHistory :location="proplocation" @func1="getCheckedCrops" @func2="getYears">
      </RecommendModelHistory>
      <div style="background-color: aliceblue;position:absolute;top:105px;right:10px;z-index: 1000;">
        <el-button type="warning" size="small" :disabled="isLastOK" @click="stepNext(-1)">上一步</el-button>
        <el-button type="success" size="small" :disabled="isNextOK" @click="stepNext">下一步</el-button>
      </div>
    </div>
    <!-- 步骤三 -->
    <div v-if="activeStep == 2">
      <GrowingState :location="proplocation" :checkedCrops="checkedCrops" :yearRange="yearRange"></GrowingState>
      <div style="background-color: aliceblue;position:absolute;top:105px;right:10px;z-index: 1000;">
        <el-button type="warning" size="small" :disabled="isLastOK" @click="stepNext(-1)">上一步</el-button>
        <el-button type="success" size="small" :disabled="isNextOK" @click="stepNext">下一步</el-button>
      </div>
    </div>
    <!-- 步骤四 -->
    <div v-if="activeStep == 3">
      <RecommendCost :location="proplocation" :checkedCrops="checkedCrops" :yearRange="yearRange"></RecommendCost>
      <div style="background-color: aliceblue;position:absolute;top:105px;right:10px;z-index: 1000;">
        <el-button type="warning" size="small" :disabled="isLastOK" @click="stepNext(-1)">上一步</el-button>
        <el-button type="success" size="small" :disabled="isNextOK" @click="stepNext">下一步</el-button>
      </div>
    </div>
    <div v-if="activeStep == 4">
      <RecommendIndex :location="proplocation" :checkedCrops="checkedCrops" :yearRange="yearRange"></RecommendIndex>
      <div style="padding-left:20px;background-color: aliceblue; position:absolute;top:105px;right:10px;z-index: 1000;">
        <el-button type="warning" size="small" :disabled="isLastOK" @click="stepNext(-1)">上一步</el-button>
      </div>
    </div>
    <!-- <el-button style="margin-top: 12px" @click="next">Next step</el-button> -->
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import * as echarts from "echarts";
import AMapLoader from "@amap/amap-jsapi-loader";
import { useRouter, useRoute } from 'vue-router';
import RecommendModelHistory from '@/views/recommend/RecommendModelHistory.vue'
import GrowingState from '@/views/recommend/GrowingState.vue'
import RecommendCost from '@/views/recommend/RecommendCost.vue'
import RecommendIndex from '@/views/recommend/RecommendIndex.vue'
import RecommendProject from '@/views/recommend/RecommendProject.vue'
const router = useRouter();
const route = useRoute();
import { getLocationService, provinceListService, areaListService } from '@/api/area.js'
import { updateSoilCropdataService, addSoilCropdataService, getSoilnameService, getSoilcropdataService, getHwsddataService, getClimatedataService } from '@/api/recommend.js'
import { locationStore } from '@/stores/location.js'
import { RecommendCropStore } from '@/stores/recommendcrops.js'
import { timelineItemProps } from 'element-plus';
const locationstore = locationStore();
const recommendcropstore = RecommendCropStore();
const step1tabs = ref('weathertab')
const isload = ref(false)
const isweatherEmpty = ref(true)
const activeTab = ref('temptab')
const beginYear = ref('2023')
const endYear = ref('2023')
const isNextOK = ref(true)
const isSoilEdit = ref(false)
const isSavebtnOK = ref(false)
const isEditbtnOK = ref(false)
const isAddorEdit = ref('add') //add,edit
const isClearbtnOK = ref(false)
const checkedCrops = ref([])
// 设置安全密钥
window._AMapSecurityConfig = {
  securityJsCode: '382e2bc088531849b40e2a14e5e8cff5',
}
const location = ref()
const yearRange = ref([])
const areacode = ''
// const xarea = locationstore.location
// const rectangle_1 = ''
// const rectangle_2 = ''
// const lat = 40
// const lon = 116
// console.log("xarea", xarea)
const getCheckedCrops = (data) => {
  checkedCrops.value = data
}
const getYears = (data) => {
  yearRange.value = data
}
const getLocation = () => {
  let xarea = locationstore.location
  let rectangle_1 = ''
  let rectangle_2 = ''
  let lat = 40
  let lon = 116
  if (xarea.rectangle != undefined) {
    rectangle_1 = xarea.rectangle.split(';')[0].split(',')
    rectangle_2 = xarea.rectangle.split(';')[1].split(',')
    lat = (Number(rectangle_2[0]) + Number(rectangle_1[0])) / 2
    lon = (Number(rectangle_2[1]) + Number(rectangle_1[1])) / 2
  }
  location.value = [lat, lon]
  locationstore.location.lon = lon
  locationstore.location.lat = lat
}

const newLocation = ref([])
const proplocation = ref({ lon: 120.21885035, lat: 30.239899035, province: { name: '浙江省' }, city: { name: '杭州市' }, code: '330100000000 ' })
const activeStep = ref(0)
const steps = ref([
  { title: '用户输入' },
  { title: '历史数据' },
  { title: '生长进程' },
  { title: '成本收益' },
  { title: '推荐方案' }
])
const stepNext = (flag) => {
  if (flag == -1) {
    if (activeStep.value-- < 1) activeStep.value = 0
  }
  else {
    if (activeStep.value++ > 3) activeStep.value = 0
  }
}
//
//初始化地图
const initMap = (location) => {
  console.log("location", location)
  AMapLoader.reset()
  AMapLoader.load({
    key: 'ab72f78b39cbc866a7a122a545f5861b',
    version: '2.0',   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.AutoComplete', 'AMap.PlaceSearch', 'AMap.Marker'],  // 需要使用的的插件列表
    AMapUI: {
      version: '1.1',
      plugins: []
    }
  }).then((AMap) => {
    // 初始化地图
    this.map = new AMap.Map('guide-map', {
      viewMode: "2D",  //  是否为3D地图模式
      zoom: 13,   // 初始化地图级别
      center: location, //中心点坐标  广州
      resizeEnable: true,
      willreadoften: true
    });
    //鼠标点击事件
    this.map.on('click', this.clickMapHandler)
    // 搜索提示插件
    this.AutoComplete = new AMap.AutoComplete({ city: "全国" });
  }).catch(e => {
    console.log(e);
  });
}
getLocation()
initMap(location.value)
//土壤数据
const soilviewForm = ref(null)
const soilForm = ref({
  lon: '',
  lat: '',
  smtabx: '',
  smtaby: '',
  contabx: '',
  contaby: '',
  smw: '',
  smfcf: '',
  crairc: '',
  k0: '',
  sope: "",
  ksub: '',
  spads: '',
  spods: '',
  spass: '',
  sposs: '',
  deflim: '',
  soilFao90Type: '',
  soilname: '',
  sm0: ''
})
//表单验证
const checkSmtabx = (rule, value, callback) => {
  value = soilForm.value.smtabx
  let flag = 0
  let x = value.split(';')
  var numRe = new RegExp("^[0-9]+\.{0,1}[0-9]{0,2}$")
  for (let i = 0; i < x.length; i++) {
    if (!numRe.test(x[i]) && x[i] != '') {
      flag = 1
      return callback(new Error('格式错误'))
      break
    }
  }
  if (flag === 0) return callback()
}

const checkSmtaby = (rule, value, callback) => {
  value = soilForm.value.smtaby
  let flag = 0
  let x = value.split(';')
  var numRe = new RegExp("^[0-9]+\.{0,1}[0-9]{0,2}$")
  for (let i = 0; i < x.length; i++) {
    if (!numRe.test(x[i]) && x[i] != '') {
      flag = 1
      callback(new Error('格式错误'))
      break
    }
  }
  if (flag === 0) return callback()
}
const checkContabx = (rule, value, callback) => {
  value = soilForm.value.contabx
  let flag = 0
  let x = value.split(';')
  var numRe = new RegExp("^[0-9]+\.{0,1}[0-9]{0,2}$")
  for (let i = 0; i < x.length; i++) {
    if (!numRe.test(x[i]) && x[i] != '') {
      flag = 1
      callback(new Error('格式错误'))
      break
    }
  } if (flag === 0) return callback()
}
const checkContaby = (rule, value, callback) => {
  value = soilForm.value.contaby
  let flag = 0
  let x = value.split(';')
  var numRe = new RegExp("^[0-9]+\.{0,1}[0-9]{0,2}$")
  for (let i = 0; i < x.length; i++) {
    if (!numRe.test(x[i]) && x[i] != '') {
      flag = 1
      callback(new Error('格式错误'))
      break
    }
  }
  if (flag === 0) {
    callback()
  }
}
const rules = {
  smtabx: [{ required: true, validator: checkSmtabx, trigger: 'blur' }],
  smtaby: [{ required: true, validator: checkSmtaby, trigger: 'blur' }],
  contabx: [{ required: true, validator: checkContabx, trigger: 'blur' }],
  contaby: [{ required: true, validator: checkContaby, trigger: 'blur' }],
  smtab: [{ required: true, trigger: 'blur' }],
  smw: [{ required: true, trigger: 'blur' }],
  smfcf: [{ required: true, trigger: 'blur' }],
  crairc: [{ required: true, trigger: 'blur' }],
  k0: [{ required: true, trigger: 'blur' }],
  sope: [{ required: true, trigger: 'blur' }],
  ksub: [{ required: true, trigger: 'blur' }],
  spads: [{ required: true, trigger: 'blur' }],
  spods: [{ required: true, trigger: 'blur' }],
  spass: [{ required: true, trigger: 'blur' }],
  sposs: [{ required: true, trigger: 'blur' }],
  deflim: [{ required: true, trigger: 'blur' }],
  soilname: [{ required: true, trigger: 'blur' }],
  sm0: [{ required: true, trigger: 'blur' }]

}

//地区五级行政单位联动
//1.定义每个选择框
const provinceValue = ref('')
const cityValue = ref('')
const countyValue = ref('')
const townValue = ref('')
const villageValue = ref('')
const provinceList = ref([])
const cityList = ref([])
const countyList = ref([])
const townList = ref([])
const villageList = ref([])

//首先获取省份数据
const getProvinceList = async () => {
  let result = await provinceListService()
  // result.data.forEach((item,index,arr)=>{
  //   if(item==)
  // })
  provinceValue.value = locationstore.location.areacode.substring(0, 2) + '0000000000 '
  provinceList.value = result.data.reverse()
  // console.log(provinceList.value[0])
  // provinceValue.value = provinceList.value[-1]
  changeProvince(provinceValue.value)
}
getProvinceList() //首先调用
const changeProvince = async (val) => {
  isweatherEmpty.value = true
  let params = {
    code: val
  }
  let result = await areaListService(params)
  cityList.value = result.data
  cityValue.value = cityList.value[0].code
  proplocation.value.code = cityValue.value
  changeCity(cityValue.value)
}
const changeCity = async (val) => {

  isweatherEmpty.value = true
  let params = {
    code: val
  }
  let result = await areaListService(params)
  countyList.value = result.data
  countyValue.value = countyList.value[0].code
  let result2 = await getLocationService(val, 2)
  let lat = result2.data[0].lat84
  let lon = result2.data[0].lng84
  newLocation.value = [lat, lon, val]
  initMap([lon, lat])
  if (countyList.value.length === 0) {
    townList.value = ''
    townValue.value = []
    villageList.value = []
    villageValue.value = ''
  }
  else changeCounty(countyValue.value)
}
const changeCounty = async (val) => {
  isweatherEmpty.value = true
  let params = {
    code: val
  }
  proplocation.value.code = val
  let result = await areaListService(params)
  townList.value = result.data

  if (townList.value.length === 0) {
    villageList.value = []
    villageValue.value = ''
    townValue.value = ''
  }
  else {
    townValue.value = townList.value[0].code
    changeTown(townValue.value)
  }
}
const changeTown = async (val) => {
  proplocation.value.code = val
  isweatherEmpty.value = true
  let params = {
    code: val
  }
  let result = await areaListService(params)
  villageList.value = result.data

  if (villageList.value.length === 0) {
    villageValue.value = ''
    villageList.value = []
    villageValue.value = ''
  }
  else {
    villageValue.value = villageList.value[0].code
    changeVillage(villageValue.value, 1)
  }

}

const changeVillage = async (val) => {
  proplocation.value.code = val
  isweatherEmpty.value = true
  //地图定位
  //1.先去获取当地的经纬度
  let result = await getLocationService(val, 1)
  let lat = result.data[0].lat84
  let lon = result.data[0].lng84
  newLocation.value = [lat, lon, val]
  initMap([lon, lat])
}
//天气数据保存
const weatherData = ref([])

const getEcharts = (flag) => {
  isload.value = false
  isweatherEmpty.value = false
  let tmax = []
  let tmin = []
  let day = []
  let rain = []
  let wind = []
  let vap = []
  let irrad = []
  for (var i = 0; i < weatherData.value.length; i++) {
    tmax.push(weatherData.value[i].tmax)
    tmin.push(weatherData.value[i].tmin)
    rain.push(weatherData.value[i].rain)
    vap.push(weatherData.value[i].vap)
    irrad.push(weatherData.value[i].irrad)
    wind.push(weatherData.value[i].wind)
    let dd = weatherData.value[i].date
    day.push(dd)
    // day.push(dd.split('-')[1] + '.' + dd.split('-')[2])
  }
  let xeyear
  let xbyear
  if (endYear.value.toString().split(' ')[3] != undefined) xeyear = endYear.value.toString().split(' ')[3]
  else xeyear = endYear.value
  if (beginYear.value.toString().split(' ')[3] != undefined) xbyear = beginYear.value.toString().split(' ')[3]
  else xbyear = beginYear.value

  let text0
  if (weatherData.value.length > 366) {
    text0 = xbyear + '~' + xeyear + '年'
  } else {
    text0 = xbyear + '年'
  }
  //气温模块
  if (flag == 1) {
    let chartDom_temp = document.getElementById('tempView');
    // nextTick(() => {
    let myChart_temp = echarts.init(chartDom_temp, { autoResize: true });
    // })
    let option_temp;
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
          data: tmin,
          markPoint: {
            data: [{ name: '年最低', value: -2, xAxis: 1, yAxis: -1.5 }]
          },
          lineStyle: {
            color: '#67C23A'
          },
          itemStyle: {
            color: '#67C23A'
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
    myChart_temp.setOption(option_temp);
  }
  //降水量模块
  if (flag == 2) {
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
        left: 'center',
        text: text0 + '日降水量/cm'
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
          type: 'line',
          lineStyle: {
            color: '#fab6b6'
          },
          areaStyle: {
            color: '#fde2e2'
          },
          itemStyle: {
            color: '#fab6b6'
          },
          data: wind
        }
      ]
    };
    myChart_rain.setOption(option_rain);
  }
  //气压模块
  if (flag == 3) {
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
        left: 'center',
        text: text0 + '日气压/hPa'
      },
      series: [
        {
          data: vap,
          type: 'line',
          lineStyle: {
            color: '#eebe77'
          },
          areaStyle: {
            color: '#f3d19e'
          },
          itemStyle: {
            color: '#eebe77'
          }
        }
      ]
    };
    myChart_vap.setOption(option_vap);
    // myChart_vap.resize()
  }
  //风速模块
  if (flag == 4) {
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
        left: 'center',
        text: text0 + '距地面2m处的平均日风速/m/s'
      },
      series: [
        {
          data: wind,
          type: 'line',
          lineStyle: {
            color: ' #95d475'
          },
          areaStyle: {
            color: '#d1edc4'
          },
          itemStyle: {
            color: ' #95d475'
          }
        }
      ]
    };
    myChart_wind.setOption(option_wind);
  }
}
//土壤数据
// soilData
const soilData = ref({
  tgravel: '',
  tsand: '',
  tsilt: '',
  tclay: '',
  tusdaTexClass: '',
  trefBulkDensity: '',
  toc: "",
  tphH2O: '',
  tcecClay: '',
  tcecSoil: '',
  tbs: "",
  tteb: '',
  tcaco3: '',
  tcaso4: '',
  tesp: '',
  tece: '',
  sgravel: '',
  ssand: '',
  ssilt: '',
  sclay: '',
  susdaTexClass: '',
  srefBulkDensity: '',
  soc: "",
  sphH2O: '',
  scecClay: '',
  scecSoil: '',
  sbs: "",
  steb: '',
  scaco3: '',
  scaso4: '',
  sesp: '',
  sece: '',
  soilname: ''
})

// saveSoilcropdata
const saveSoilcropdata = () => {
  //全局验证表单
  soilviewForm.value.validate(async (valid) => {
    // console.log(valid)
    if (valid) {
      // 校验成功
      soilForm.value.lon = newLocation.value[1]
      soilForm.value.lat = newLocation.value[0]
      soilForm.value.areacode = proplocation.value.code
      if (isAddorEdit.value === 'add') { //新增
        let result = await addSoilCropdataService(soilForm.value)
        if (result.code === 0) {
          ElMessage.success('保存成功')
          isSoilEdit.value = true //所有表单禁止编辑
          isNextOK.value = false //可以跳转下一步
          isAddorEdit.value = 'edit'
          isSavebtnOK.value = true
          isClearbtnOK.value = true
        }
        else ElMessage.error('保存失败')
      }
      if (isAddorEdit.value === 'edit') { //更新
        // console.log('更新', soilForm.value)
        let result = await updateSoilCropdataService(soilForm.value)
        if (result.code === 0) {
          ElMessage.success('更新成功')
          isSoilEdit.value = true //所有表单禁止编辑
          isNextOK.value = false //可以跳转下一步
          isAddorEdit.value = 'edit'
          isSavebtnOK.value = true
          isClearbtnOK.value = true
        }
        else ElMessage.error('更新失败')
        // let result = await updateSoilCropdataService(soilForm.value)
        // if (result.code === 0) {
        //   ElMessage.success('保存成功')
        //   isSoilEdit.value = true //所有表单禁止编辑
        //   isNextOK.value = false //可以跳转下一步
        // }
        // else ElMessage.error('保存失败')
      }

    }
    else {
      ElMessage.error('必填项不能为空')
    }
  })
}
//编辑soilForm
const editSoilcropdata = () => {
  isSoilEdit.value = false
  isSavebtnOK.value = false
  isNextOK.value = true
  isClearbtnOK.value = false
}
//清空表单
const clearSoilForm = () => {
  soilviewForm.value.resetFields()
  soilForm.value.soilFao90Type = soil_fao
  soilForm.value.soilname = soilData.value.soilname
  soilForm.value.lon = newLocation.value[1]
  soilForm.value.lat = newLocation.value[0]
  isSavebtnOK.value = false
  isNextOK.value = true
}
//标签点击事件
const WeathertabClick = (name) => {
  console.log("nname", name, activeTab.value)
  // activeTab.value = tab.props.name
  if (isweatherEmpty.value == false) {
    if (activeTab.value == 'temptab') getEcharts(1)
    if (activeTab.value == 'raintab') {
      getEcharts(2)
    }
    if (activeTab.value == 'vaptab') getEcharts(3)
    if (activeTab.value == 'windtab') getEcharts(4)
  }
}
const submitLocation = async () => {
  //
  isSoilEdit.value = false
  isNextOK.value = true
  isSavebtnOK.value = false
  step1tabs.value = 'weathertab'
  activeTab.value = 'temptab'
  isload.value = true
  let params = {
    lat: newLocation.value[0], lon: newLocation.value[1], code: newLocation.value[2].replace(' ', ''),
    byear: '2023', eyear: '2023'
  }
  let params1 = {
    lat: newLocation.value[0], lon: newLocation.value[1]
  }
  //传递数据
  proplocation.value.lat = newLocation.value[0]
  proplocation.value.lon = newLocation.value[1]
  provinceList.value.forEach((item, index, arr) => {
    if (item.code == provinceValue.value) proplocation.value.province = item
  })
  cityList.value.forEach((item, index, arr) => {
    if (item.code == cityValue.value) proplocation.value.city = item
  })
  countyList.value.forEach((item, index, arr) => {
    if (item.code == countyValue.value) proplocation.value.county = item
  })
  townList.value.forEach((item, index, arr) => {
    if (item.code == townValue.value) proplocation.value.town = item
  })
  villageList.value.forEach((item, index, arr) => {
    if (item.code == villageValue.value) proplocation.value.village = item
  })
  // console.log("mmy", provinceValue.value, cityValue.value, countyValue.value, townValue.value, villageValue.value)
  // proplocation.value.province = provinceValue.value.name
  // proplocation.value.city = cityValue.value.name
  // proplocation.value.county = countyValue.value.name
  // proplocation.value.town = townValue.value.name
  // proplocation.value.village = villageValue.value.name
  //土壤数据加载
  //hwsd
  let result1 = await getHwsddataService(params1)
  soilData.value = result1.data[0]
  let soil_fao = result1.data[0].suSym90
  //获取土壤名称
  let result11 = await getSoilnameService({ id: soil_fao })
  soilData.value.soilname = result11.data[0].chineseValue
  // console.log("result11", soil_fao, result11.data) //chineseValue
  //模型所需数据
  let result2 = await getSoilcropdataService(params1)
  // console.log("111", result2.data[0])
  if (result2.data[0] != undefined) {
    //这个时候说明是有已有数据的
    soilForm.value = result2.data[0] //如果是undefined会出现错误
    // soilForm.value.soilFao90Type = soil_fao
    soilForm.value.soilname = soilData.value.soilname
    isSoilEdit.value = true //禁止编辑
    isSavebtnOK.value = true  //保存按钮禁止
    isNextOK.value = false //可以进行下一步
    isAddorEdit.value = 'edit' //此时是编辑状态
    isClearbtnOK.value = true


  }
  else {
    soilviewForm.value.resetFields()
    soilForm.value.soilFao90Type = soil_fao
    soilForm.value.soilname = soilData.value.soilname
    isAddorEdit.value = 'add' //此时是新增状态
    isClearbtnOK.value = true
  }

  //天气数据加载
  let result = await getClimatedataService(params)
  weatherData.value = result.data
  getEcharts(1)
  // getEcharts(2)
  // getEcharts(3)
  // getEcharts(4)

}
//根据年份重新运行
const reFreshWeather = async () => {
  let xeyear
  let xbyear
  if (endYear.value.toString().split(' ')[3] != undefined) xeyear = endYear.value.toString().split(' ')[3]
  else xeyear = endYear.value

  if (beginYear.value.toString().split(' ')[3] != undefined) xbyear = beginYear.value.toString().split(' ')[3]
  else xbyear = beginYear.value

  if (Number(xeyear) - Number(xbyear) > 3) {
    ElMessageBox.confirm(
      '是否确认导出超过<strong>3</strong>年的数据? <br/>可能会<span style="color:red;">影响判断</span>且<span style="color:red;">运行时间更长</span>',
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
          lat: newLocation.value[0], lon: newLocation.value[1], code: newLocation.value[2].replace(' ', ''),
          byear: xbyear, eyear: xeyear
        }
        let result = await getClimatedataService(params)
        weatherData.value = result.data
        getEcharts(1)
        getEcharts(2)
        getEcharts(3)
        getEcharts(4)
      }

    })
  } else {
    let params = {
      lat: newLocation.value[0], lon: newLocation.value[1], code: newLocation.value[2].replace(' ', ''),
      byear: xbyear, eyear: xeyear
    }
    let result = await getClimatedataService(params)
    weatherData.value = result.data
    getEcharts(1)
    getEcharts(2)
    getEcharts(3)
    getEcharts(4)
  }

}

</script>

<style lang="scss">
.el-card__header {
  padding: 5px;
  height: 40px;
  color: #009238;
  font-size: 14px;
  // background-color: ;
}


input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.step-title {
  // width: 100px;
  height: 30px;
  text-align: center;
  font-size: 14px;
  margin-top: -32px;
  margin-left: 26px;
  text-align: left;
  font-weight: 520;
}

//步骤条进行中的样式
.el-step__head.is-process {
  .el-step__icon {
    border: 2px solid #009238;
    color: #009238;
  }

  .el-step__line {
    // width: 20%;
    margin-left: 90px;
    background-color: rgb(240, 240, 240);
  }
}

.el-step__line {
  // width: 20%;
  margin-left: 90px;
  background-color: rgb(240, 240, 240);
}

.el-step__head.is-success {
  color: #fff;

  .el-step__icon {
    background-color: #009238;
    border: #009238;
  }

  .el-step__line {
    // width: 20%;
    background-color: #009238;
  }
}

.choose-area {
  background-color: #F6F6F6;
  border: #F6F6F6;

  // height: 80vh;
}

.box-card {
  margin: 3px;
}


.el-tabs__content {
  padding: 5px !important; //必须要写！important才生效
}

.el-tabs__header {
  margin: 0px;
}

.el-tabs__nav-wrap {
  margin-bottom: 0px;
}

.el-tabs__nav {
  z-index: 0;
}

.el-tabs__item .is-active {
  padding: 20px !important;
  background-color: #009238 !important;
}

.el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2),
.el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
.el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 20px;
}

.el-form-item__label {
  font-size: 13px;
}

.el-tabs__active-bar .is-top {
  background-color: #009238 !important;
}

.el-tabs__item:hover {
  color: #009238 !important;
}

.el-tabs__active-bar {
  background-color: #ffffff !important;
  // z-index: 0 !important;

}

.el-tabs__item.is-active {
  color: #009238 !important;
}

.el-tabs__item .is-active {
  color: #009238 !important;
  // border-bottom: 1px solid #009238;
}

.soilForm .el-form-item {
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
}

.soil-box {
  height: 75vh;
  overflow: auto;
}

.el-divider__text.is-center {
  color: #009238;
}

.cell-item {
  font-weight: 500;
}

.cell-content {
  // color: red;
  font-family: 'Times New Roman', Times, serif;
}

.el-form-item__content {
  font-family: 'Times New Roman', Times, serif;
}

.xweather-tabs {
  .el-tabs__item .is-top .is-active {
    color: #009238 !important;
  }

  .el-tabs__item .is-active .el-text {
    padding: 20px !important;
    color: #009238 !important;
  }
}
</style>
