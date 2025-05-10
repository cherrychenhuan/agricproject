<template>
  <div>
    <div class="homeheader">
      全国重点作物产品市场信息
    </div>

    <el-tabs @tab-change="changeCategory" type="card" class="homepageTabs" v-model="categoryName">
      <!-- 作物大类，一级tabs -->
      <el-tab-pane v-for="item in menuList" :name="item.id + item.name">
        <template #label>
          <span class="custom-tabs-label" v-if="categoryName !== (item.id + item.name)">
            <div style="float:left;margin-right:3px;"><img :src="getImageUrl(item.icon1)" width="20px" /></div>
            <span>{{ item.name }}</span>
          </span>
          <span class="custom-tabs-label" v-else>
            <div style="float:left;margin-right:3px;"><img :src="getImageUrl(item.icon2)" width="20px" /></div>
            <span>{{ item.name }}</span>
          </span>
        </template>
        <el-tabs @tab-change="changeCrop" type="border-card" class="childhomepageTabs" v-model="cropName"
          style="margin-top:-5px;">
          <!-- 二级作物 -->
          <el-tab-pane v-for="crop in item.children" :name="crop.id + crop.name">
            <template #label>
              <span class="custom-tabs-label" v-if="cropName !== (crop.id + crop.name)">
                <div style="float:left;margin-right:3px;"><img :src="getImageUrl(crop.icon1)" width="20px" /></div>
                <span>{{ crop.name }}</span>
              </span>
              <span class="custom-tabs-label" v-else>
                <div style="float:left;margin-right:3px;"><img :src="getImageUrl(crop.icon2)" width="20px" /></div>
                <span>{{ crop.name }}</span>
              </span>
            </template>
            <!-- 具体内容 -->
            <!-- 左侧侧栏 -->
            <el-tabs @tab-change="changeInfo" v-model="infoName" class="cropChildTabs" tab-position="left">
              <!-- 生产板块 -->
              <el-tab-pane style="height:73vh;overflow: auto;" name="product">
                <template #label>
                  <div style="float:left;margin-top:2px;"><img src="../../assets/menu/shengc.png" width="20px" />
                  </div>
                  <span style="margin-left:20px;">生产</span>
                </template>
                <el-row>
                  <el-col :span="24">
                    <div
                      style="font-weight:550;color:var(--el-text-color-regular);position:absolute;top:0;z-index:1000;left:20px;font-size:14px;height:35px;line-height:37px;">
                      全国{{ crop.name }}种植分布
                    </div>
                    <el-tabs type="card" class="productTabs" style="margin-left:0px;border-radius: 5px;height:500px;
  border: 1px solid var(--el-border-color);" v-model="cropproducttabname">
                      <el-tab-pane label="播种面积" name="播种面积" style="">
                        <el-row>
                          <el-col :span="13">
                            <div style="margin-top:5px;">
                              <span style="font-size:12px;color:grey;padding-left:10px;">时间：</span>
                              <el-date-picker style="height:25px;width:120px;" type="year" placeholder=""
                                v-model="cropProductAreaYear" @change="changeCropProductYear" />
                            </div><br />
                            <span style=" z-index: 1000;font-size:16px;font-weight:700;color:gray;padding-left:10px;">
                              全国{{
                                crop.name
                              }}总播种面积:</span><span
                              style=" z-index: 1000;font-size:20px;font-weight:700;color:#009237;">{{
                                totalcroparea.toFixed(2)
                              }}千公顷</span>
                            <div :id="'areaseed' + crop.id" class="areaseedClass">
                            </div>
                          </el-col>
                          <el-col :span="11">
                            <el-table :data="cropproductDataArea" style="margin-top:5px;height:400px;">
                              <el-table-column type="index" width="50" />
                              <el-table-column prop='name' label="分省情况" width="90" />
                              <el-table-column align="right" :label="crop.name + cropproducttabname + '(千公顷)'"
                                width="250">
                                <template #default="scope"> <!-- scoped -->
                                  <el-progress class="xprogress" :stroke-width="10"
                                    :percentage="scope.row.value / cropproduct_maxprogress_area * 100"
                                    status="exception">
                                    <span style="color:gray;">{{ scope.row.value.toLocaleString() }}</span>
                                  </el-progress>
                                </template>
                              </el-table-column>
                            </el-table>

                          </el-col>
                        </el-row>
                      </el-tab-pane>
                      <el-tab-pane label="产量" name="产量">
                        <el-row>
                          <el-col :span="13">
                            <div style="margin-top:5px;">
                              <span style="font-size:12px;color:grey;padding-left:10px;">时间
                                ：</span>
                              <el-date-picker @change="changeCropProductYear" style="height:25px;width:120px;"
                                type="year" placeholder="" :default-value="new Date(2022, 9, 1)"
                                v-model="cropProductYieldYear" />
                            </div><br />
                            <span style=" z-index: 1000;font-size:16px;font-weight:700;color:gray;padding-left:10px;">
                              全国{{
                                crop.name
                              }}总产量:</span><span style=" z-index: 1000;font-size:20px;font-weight:700;color:#009237;">{{
                                totalcropyield.toFixed(2)
                              }}万吨</span>
                            <div :id="'yieldtotal' + crop.id" class="areaseedClass">
                            </div>
                          </el-col>
                          <el-col :span="11">
                            <el-table ref="singleTableRef" :data="cropproductDataYield"
                              style="margin-top:5px;height:400px;">
                              <el-table-column type="index" width="50" />
                              <el-table-column prop='name' label="分省情况" width="90" />
                              <el-table-column align="right" :label="crop.name + cropproducttabname + '(万吨)'"
                                width="250">
                                <template #default="scope"> <!-- scoped -->
                                  <el-progress class="xprogress" :stroke-width="10"
                                    :percentage="scope.row.value / cropproduct_maxprogress_yield * 100"
                                    status="exception">
                                    <span style="color:gray;">{{ scope.row.value.toLocaleString() }}</span>
                                  </el-progress>
                                </template>
                              </el-table-column>
                            </el-table>

                          </el-col>
                        </el-row>
                      </el-tab-pane>
                      <el-tab-pane label="单产" name="单产">
                        <el-row>
                          <el-col :span="13">
                            <div style="margin-top:5px;">
                              <span style="font-size:12px;color:grey;padding-left:10px;">时间：</span>
                              <el-date-picker @change="changeCropProductYear" style="height:25px;width:120px;"
                                v-model="cropProductUnitYear" type="year" placeholder="" />
                            </div><br />
                            <span style=" z-index: 1000;font-size:16px;font-weight:700;color:gray;padding-left:10px;">
                              全国{{ crop.name }}平均单产:</span><span
                              style=" z-index: 1000;font-size:20px;font-weight:700;color:#009237;">{{
                                cropavgunit
                              }}千克/亩</span>
                            <div :id="'yieldunit' + crop.id" class="areaseedClass">
                            </div>
                          </el-col>
                          <el-col :span="11">
                            <el-table :data="cropproductDataUnit" style="margin-top:5px;height:400px;">
                              <el-table-column type="index" width="50" />
                              <el-table-column prop='name' label="分省情况" width="90" />
                              <el-table-column align="right" :label="crop.name + cropproducttabname + '(千克/亩)'"
                                width="250">
                                <template #default="scope"> <!-- scoped -->
                                  <el-progress class="xprogress" :stroke-width="10"
                                    :percentage="scope.row.value / cropproduct_maxprogress_unit * 100"
                                    status="exception">
                                    <span style="color:gray;">{{ scope.row.value.toLocaleString() }}</span>
                                  </el-progress>
                                </template>
                              </el-table-column>
                            </el-table>

                          </el-col>
                        </el-row>
                      </el-tab-pane>
                    </el-tabs>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div
                      style="height:400px;margin-top:5px;border-radius: 5px;height:73vh;margin-left:0px;border: 1px solid var(--el-border-color);">
                      <div
                        style="padding-left:20px;font-weight:550;color:var(--el-text-color-regular);font-size:14px;height:35px;line-height:34px;border-radius: 5px 5px 0px 0px;background-color:aliceblue;">
                        全国{{ crop.name }}生长走势</div>
                      <el-row style="margin-top:10px; padding-left:10px;">

                        <el-text><span style="font-size:12px;color:grey;padding-left:10px;">地区：</span>
                          <el-select @change="changeCropproductArea" style="margin-left:5px;width:100px;" size="small"
                            v-model="areaCropproduct">
                            <el-option v-for="(item, index) in provinceData" :key="item['PROVINCE_NAME']"
                              :label="item['PROVINCE_NAME']" :value="item['PROVINCE_CODE']" />
                          </el-select>
                        </el-text>

                      </el-row>
                      <div :id="'yieldTrend' + crop.id" style="width:950px;" class="yieldTrendClass">
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <!-- 价格板块 -->
              <el-tab-pane name="price">
                <template #label>
                  <div style="float:left;margin-top:2px;"><img src="../../assets/menu/jiag.png" width="20px" />
                  </div>
                  <span style="margin-left:20px;">价格</span>
                </template>
                <div style="height:73vh;overflow: auto;">
                  <el-row
                    style="height:420px;border-radius: 5px;margin-left:0px;border: 1px solid var(--el-border-color);">
                    <el-col :span="24">
                      <div
                        style="padding-left:20px;font-weight:550;color:var(--el-text-color-regular);font-size:14px;height:35px;line-height:34px;border-radius: 5px 5px 0px 0px;background-color:aliceblue;">
                        全国{{ crop.name == '水稻' ? '大米' : '' }}{{ crop.name == '小麦' ? '面粉' : '' }}批发价格</div>
                      <el-row>
                        <el-col :span="10">
                          <div style="margin-top:5px;"><span
                              style="font-size:12px;color:grey;padding-left:10px;">时间：</span>
                            <el-date-picker style="margin-top:5px;height:25px;width:120px;" placeholder=""
                              v-model="cropPriceDate1" @change="changeCropPriceDate1" />
                          </div>
                          <div v-if="cropPriceData1.length > 0">
                            <span style=" z-index: 1000;font-size:12px;font-weight:500;color:gray;padding-left:10px;">
                              全国{{
                                crop.name
                              }}平均批发价格:</span>
                            <span style=" z-index: 1000;font-size:13px;font-weight:700;color:#009237;">{{
                              avgpifaprice[0] ? avgpifaprice[0].toFixed(2) : ''
                            }}元/公斤</span>
                            <span
                              style=" z-index: 1000;font-size:12px;font-weight:500;color:gray;padding-left:10px;">,日环比涨跌幅</span>
                            <span style=" z-index: 1000;font-size:13px;font-weight:700;color:#009237;">{{
                              avgpifaprice[1] ? avgpifaprice[1] : ''
                            }}%</span>
                          </div>
                          <div :id="'pifaprice' + crop.id" style="padding-top:-10px;height:330px;"
                            class="areaseedClass">

                          </div>
                        </el-col>
                        <el-col :span="14">
                          <div>
                            <el-table class="xxpriceTable" :data="cropPriceData1" style="margin-top:5px;height:370px;">
                              <el-table-column align="center" type="index" width="60" label="排名" />
                              <el-table-column align="right" :show-overflow-tooltip="true" prop='marketname'
                                label="批发市场价格排名" width="130" />
                              <el-table-column align="left" label=" " width="105">
                                <template #default="scope"> <!-- scoped -->
                                  <el-progress class="xxprogress" :stroke-width="7"
                                    :percentage="scope.row.priceMarket / cropprice_maxprogress_pifa * 100"
                                    status="exception">
                                    <span style="color:gray;"></span>
                                  </el-progress>
                                </template>
                              </el-table-column>
                              <el-table-column align="center" width="125" label="今日价格(元/公斤)">
                                <template #default="scope"> <!-- scoped -->
                                  <span v-if="scope.row.priceMarket > scope.row.nextPriceMarket"
                                    style="color:#009237;font-size:14px;">
                                    {{ scope.row.priceMarket }}
                                  </span>
                                  <span v-if="scope.row.priceMarket < scope.row.nextPriceMarket"
                                    style="color:#c45656;font-size:14px;">
                                    {{ scope.row.priceMarket }}
                                  </span>
                                  <span v-if="scope.row.priceMarket = scope.row.nextPriceMarket"
                                    style="color:#b88230;font-size:14px;">
                                    {{ scope.row.priceMarket }}
                                  </span>
                                </template>
                              </el-table-column>
                              <el-table-column align="center" width="125" label="昨日价格(元/公斤)">
                                <template #default="scope"> <!-- scoped -->
                                  <span style="color:gray;font-size:14px;">
                                    {{ scope.row.nextPriceMarket }}
                                  </span>
                                </template>
                              </el-table-column>
                            </el-table>
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row style=" margin-top:5px;border-radius: 5px;margin-left:0px;">
                    <el-col :span="12">
                      <div style="border-radius: 5px;margin-left:0px;border: 1px solid var(--el-border-color);">
                        <div v-if="crop.name == '水稻' || '小麦'" style="
                        padding-left:20px;font-weight:550;color:var(--el-text-color-regular);font-size:14px;height:35px;line-height:34px;border-radius:
                        5px 5px 0px 0px;background-color:aliceblue;">
                          全国{{ crop.name == '水稻' ? '大米' : '' }}{{ crop.name == '小麦' ? '面粉' : '' }}批发价格走势
                        </div>
                        <div v-else
                          style="padding-left:20px;font-weight:550;color:var(--el-text-color-regular);font-size:14px;height:35px;line-height:34px;border-radius: 5px 5px 0px 0px;background-color:aliceblue;">
                          全国{{ crop.name }}批发价格走势
                        </div>

                        <div>
                          <span style="font-size:12px;color:grey;padding-left:10px;">时间：</span>
                          <el-date-picker style="margin-top:5px;height:25px;width:120px;" placeholder=""
                            v-model="cropPriceDatet1" @change="changeCropPriceTrendDate" /> ~ <el-date-picker
                            style="margin-top:5px;height:25px;width:120px;" placeholder="" v-model="cropPriceDatet2"
                            @change="changeCropPriceTrendDate" />
                          <div :id="'pifapriceTrend' + crop.id" style="padding-top:0px;width:400px;height:330px;"
                            class="areaseedClass">

                          </div>

                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12" v-if="cropName !== '马铃薯' && cropName !== '棉花' && cropName !== '甘蔗'">
                      <div style="border-radius: 5px;margin-left:5px;border: 1px solid var(--el-border-color);">
                        <div
                          style="padding-left:20px;font-weight:550;color:var(--el-text-color-regular);font-size:14px;height:35px;line-height:34px;border-radius: 5px 5px 0px 0px;background-color:aliceblue;">
                          全国{{ crop.name }}期货价格走势</div>
                        <span style="font-size:12px;color:grey;padding-left:10px;">时间：</span>
                        <el-date-picker style="margin-top:5px;height:25px;width:120px;" placeholder=""
                          v-model="cropPriceDatef1" @change="changeCropPriceFutureDate" /> ~ <el-date-picker
                          style="margin-top:5px;height:25px;width:120px;" placeholder="" v-model="cropPriceDatef2"
                          @change="changeCropPriceFutureDate" />
                        <div :id="'priceFuture' + crop.id" style="padding-top:0px;width:500px;height:330px;"
                          class="areaseedClass">
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-tab-pane>
              <el-tab-pane label="成本收益" name="cost" style="height:73vh;overflow:auto;">
                <template #label>
                  <div style="float:left;margin-top:2px;"><img src="../../assets/menu/chengb.png" width="20px" />
                  </div>
                  <span style="margin-left:5px;">成本收益</span>
                </template>
                <el-row style="margin-top:0px;">
                  <el-col :span="24">
                    <div
                      style="font-weight:600;color:var(--el-text-color-regular);position:absolute;top:0;z-index:1000;left:20px;font-size:15px;height:35px;line-height:38px;">
                      全国{{ crop.name }}种植成本收益分布
                    </div>
                    <el-tabs @tab-change="changeCostTab" type="card" v-model="cropcosttabs" class="cproductTabs" style="margin-left:1px;border-radius: 5px;
  border: 1px solid var(--el-border-color);">
                      <el-tab-pane label="总成本" name="总成本" style="">
                        <el-row>
                          <el-col :span="12">
                            <div style="margin-top:5px;">
                              <span style="font-size:12px;color:grey;padding-left:10px;">时间：</span>
                              <el-date-picker style="height:25px;width:120px;" type="year" placeholder=""
                                v-model="cropCostYear" @change="changeCropCostYear" />
                            </div>
                            <span style=" z-index: 1000;font-size:16px;font-weight:700;color:gray;padding-left:10px;">
                              全国{{
                                crop.name
                              }}总成本:</span><span style=" z-index: 1000;font-size:20px;font-weight:700;color:#009237;">{{
                                totalcost.toFixed(2)
                              }}元/亩</span>
                            <div :id="'cropCost' + crop.id" style="width:450px;" class="areaseedClass">
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div :id="'cropCostTrend' + crop.id" style="width:480px;" class="areaseedClass">
                            </div>

                          </el-col>
                        </el-row>

                      </el-tab-pane>
                      <el-tab-pane label="净利润" name="净利润">
                        <el-row>
                          <el-col :span="12">
                            <div style="margin-top:5px;"><span
                                style="font-size:12px;color:grey;padding-left:10px;">时间：</span>
                              <el-date-picker style="height:25px;width:120px;" type="year" placeholder=""
                                v-model="cropProfitYear" @change="changeCropProfitYear" />
                            </div>
                            <span style=" z-index: 1000;font-size:16px;font-weight:700;color:gray;padding-left:10px;">
                              全国{{
                                crop.name
                              }}净利润:</span><span style=" z-index: 1000;font-size:20px;font-weight:700;color:#009237;">{{
                                avgprofit
                              }}元/亩</span>
                            <div :id="'cropProfit' + crop.id" style="width:450px;" class="areaseedClass">
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div :id="'cropProfitTrend' + crop.id" style="width:480px;" class="areaseedClass">
                            </div>

                          </el-col>
                        </el-row>
                      </el-tab-pane>

                    </el-tabs>
                  </el-col>
                </el-row>
                <el-row
                  style="margin-top:5px;height:420px;border-radius: 5px;margin-left:0px;border: 1px solid var(--el-border-color);">
                  <el-col :span="24">
                    <div>
                      <!-- 成本收益 -->
                      <div
                        style="padding-left:20px;font-weight:550;color:var(--el-text-color-regular);font-size:14px;height:35px;line-height:34px;border-radius: 5px 5px 0px 0px;background-color:aliceblue;">
                        全国{{ crop.name }}种植成本收益
                      </div>
                      <!-- <span style="font-size:12px;color:grey;padding-left:10px;">时间：</span>
                          <el-date-picker style="margin-top:5px;height:25px;width:120px;" placeholder=""
                            v-model="cropCostYear1" @change="changeCropCostTrendDate" /> ~ <el-date-picker
                            style="margin-top:5px;height:25px;width:120px;" placeholder="" v-model="cropCostYear2"
                            @change="changeCropCostTrendDate" /> -->
                      <el-text><span style="margin-top:5px;font-size:12px;color:grey;padding-left:10px;">地区：</span>
                        <el-select @change="changeCropCostArea" style="margin-left:5px;width:100px;" size="small"
                          v-model="areaCropCost">
                          <el-option v-for="(xitem, index) in provinceData" :key="xitem['PROVINCE_NAME']"
                            :label="xitem['PROVINCE_NAME']" :value="xitem['PROVINCE_NAME']" />
                        </el-select>
                      </el-text>

                      <div :id="'cropCostProfit' + crop.id" style="width:900px;" class="areaseedClass">
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
        <!-- 大节点点击 -->
        <el-row v-if="cropName == ''" style="margin-top:-5px;">
          <el-col :span="24">
            <div
              style="font-weight:600;color:var(--el-text-color-regular);position:absolute;top:0;z-index:1000;left:20px;font-size:15px;height:35px;line-height:38px;">
              全国{{ item.name }}种植分布
            </div>
            <el-tabs type="card" v-model="parentxtabname" class="productTabs" style="margin-left:1px;border-radius: 5px;
  border: 1px solid var(--el-border-color);">
              <el-tab-pane label="播种面积" name="播种面积" style="">
                <el-row>
                  <el-col :span="13">
                    <div style="margin-top:5px;">
                      <span style="font-size:12px;color:grey;padding-left:10px;">时间：</span>
                      <el-date-picker style="height:25px;width:120px;" type="year" placeholder=""
                        v-model="categoryAreaYear" @change="changeCategoryYear" />
                    </div><br />
                    <span style=" z-index: 1000;font-size:16px;font-weight:700;color:gray;padding-left:10px;"> 全国{{
                      item.name
                    }}总播种面积:</span><span style=" z-index: 1000;font-size:20px;font-weight:700;color:#009237;">{{
                        totalarea.toFixed(2)
                      }}千公顷</span>
                    <div :id="'areaseed' + item.id" class="areaseedClass">
                    </div>
                  </el-col>
                  <el-col :span="11">
                    <el-table ref="singleTableRef" :data="categoryDataArea" style="margin-top:5px;height:400px;">
                      <el-table-column type="index" width="50" />
                      <el-table-column prop='name' label="分省情况" width="90" />
                      <el-table-column align="right" :label="item.name + parentxtabname + '(' + unit + ')'" width="250">
                        <template #default="scope"> <!-- scoped -->
                          <el-progress class="xprogress" :stroke-width="10"
                            :percentage="scope.row.value / maxprogress_area * 100" status="exception">
                            <span style="color:gray;">{{ scope.row.value.toLocaleString() }}</span>
                          </el-progress>
                        </template>
                      </el-table-column>
                    </el-table>

                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="产量" name="产量">
                <el-row>
                  <el-col :span="13">
                    <div style="margin-top:5px;">
                      <span style="font-size:12px;color:grey;padding-left:10px;">时间：</span>
                      <el-date-picker @change="changeCategoryYear" style="height:25px;width:120px;" type="year"
                        placeholder="" :default-value="new Date(2022, 9, 1)" v-model="categoryYieldYear" />
                    </div><br />
                    <span style=" z-index: 1000;font-size:16px;font-weight:700;color:gray;padding-left:10px;"> 全国{{
                      item.name
                    }}总产量:</span><span style=" z-index: 1000;font-size:20px;font-weight:700;color:#009237;">{{
                        totalyield.toFixed(2)
                      }}万吨</span>
                    <div :id="'yieldtotal' + item.id" class="areaseedClass">
                    </div>
                  </el-col>
                  <el-col :span="11">
                    <el-table ref="singleTableRef" :data="categoryDataYield" style="margin-top:5px;height:400px;">
                      <el-table-column type="index" width="50" />
                      <el-table-column prop='name' label="分省情况" width="90" />
                      <el-table-column align="right" :label="item.name + parentxtabname + '(万吨)'" width="250">
                        <template #default="scope"> <!-- scoped -->
                          <el-progress class="xprogress" :stroke-width="10"
                            :percentage="scope.row.value / maxprogress_yield * 100" status="exception">
                            <span style="color:gray;">{{ scope.row.value.toLocaleString() }}</span>
                          </el-progress>
                        </template>
                      </el-table-column>
                    </el-table>

                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="单产" name="单产">
                <el-row>
                  <el-col :span="13">
                    <div style="margin-top:5px;"><span style="font-size:12px;color:grey;padding-left:10px;">时间：</span>
                      <el-date-picker @change="changeCategoryYear" style="height:25px;width:120px;"
                        v-model="categoryUnitYear" type="year" placeholder="" />
                    </div><br />
                    <span style=" z-index: 1000;font-size:16px;font-weight:700;color:gray;padding-left:10px;"> 全国{{
                      item.name
                      }}平均单产:</span><span style=" z-index: 1000;font-size:20px;font-weight:700;color:#009237;">{{
                        avgunit
                      }}千克/亩</span>
                    <div :id="'yieldunit' + item.id" class="areaseedClass">
                    </div>
                  </el-col>
                  <el-col :span="11">
                    <el-table :data="categoryDataUnit" style="margin-top:5px;height:400px;">
                      <el-table-column type="index" width="50" />
                      <el-table-column prop='name' label="分省情况" width="90" />
                      <el-table-column align="right" :label="item.name + parentxtabname + '(千克/亩)'" width="250">
                        <template #default="scope"> <!-- scoped -->
                          <el-progress class="xprogress" :stroke-width="10"
                            :percentage="scope.row.value / maxprogress_unit * 100" status="exception">
                            <span style="color:gray;">{{ scope.row.value.toLocaleString() }}</span>
                          </el-progress>
                        </template>
                      </el-table-column>
                    </el-table>

                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
        <el-row v-if="cropName == ''" style="margin-top:5px;">
          <el-col :span="24">
            <div style="height:500px;border-radius: 5px;margin-left:2px;border: 1px solid var(--el-border-color);">
              <div
                style="padding-left:20px;font-weight:600;color:var(--el-text-color-regular);font-size:15px;height:35px;line-height:35px;border-radius: 5px 5px 0px 0px;background-color:aliceblue;">
                全国{{ item.name }}生产走势</div>
              <el-row style="margin-top:10px; padding-left:10px;">

                <el-text><span style="font-size:12px;color:grey;padding-left:10px;">地区：</span>
                  <el-select @change="changeCategoryArea" style="margin-left:5px;width:100px;" size="small"
                    v-model="areaCategory">
                    <el-option v-for="(item, index) in provinceData" :key="item['PROVINCE_NAME']"
                      :label="item['PROVINCE_NAME']" :value="item['PROVINCE_CODE']" />
                  </el-select>
                </el-text>

              </el-row>
              <div :id="'yieldTrend' + item.id" class="yieldTrendClass">
              </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
// import * as echarts from "echarts";
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { userInfoService } from '@/api/user.js'
import { getCropCostDataService, getCropCostService, getPriceFutureService, getPifaPriceTrendService, getPifaPriceService, getCropConsumeService, getCropProductAllService, getCropProductByProvinceService } from "@/api/homepage.js"
//标题中的总量
const router = useRouter()
const route = useRoute()
const totalcost = ref(0)
const avgprofit = ref(0)
const totalarea = ref(0)
const totalcroparea = ref(0)
const totalyield = ref(0)
const totalcropyield = ref(0)
const parentxtabname = ref('播种面积')
const cropproducttabname = ref('播种面积')
const cropcosttabs = ref('总成本')
const unit = ref('')
const avgunit = ref(0)
const cropavgunit = ref(0)
const areaCropCost = ref('全国')
const nowdate = new Date()
const cropPriceData1 = ref([])
const cropCostYear = ref(new Date(2021, 1, 1))
const cropProfitYear = ref(new Date(2021, 1, 1))
import { UserInfoStore } from '@/stores/userInfo.js'
const avgpifaprice = ref([])
const cropPriceDate1 = ref(new Date(nowdate.setDate(nowdate.getDate() - 1)))
// import "@/utils/china.js";
import "echarts/map/js/china.js";
const areaCategory = ref('0')
const areaCropproduct = ref('0')
const userInfoStore = UserInfoStore();
//点击总父节点,生产走势的起止时间
const infoName = ref('生产')
const cropPriceDatet1 = ref(new Date(2024, 1, 1))
const cropPriceDatet2 = ref(new Date())
const cropPriceDatef1 = ref(new Date(2021, 1, 1))
const cropPriceDatef2 = ref(new Date(2022, 6, 30))
const pbyear = ref(new Date(2014, 1, 1))
const peyear = ref(new Date(2023, 1, 1))
const categoryDataArea = ref([])
const categoryDataYield = ref([])
const categoryDataUnit = ref([])
const cropproductDataArea = ref([])
const cropproductDataYield = ref([])
const cropproductDataUnit = ref([])
const activeButton = ref(0)
const maxprogress_area = ref(0)//category播种面积
const maxprogress_yield = ref(0)
const maxprogress_unit = ref(0)
const cropproduct_maxprogress_area = ref(0)//category播种面积
const cropproduct_maxprogress_yield = ref(0)
const cropproduct_maxprogress_unit = ref(0)
const cropprice_maxprogress_pifa = ref(0)
const provinceData = [
  {
    "PROVINCE_NAME": "全国",
    "PROVINCE_CODE": "0"
  },
  {
    "PROVINCE_NAME": "北京",
    "PROVINCE_CODE": "110000"
  },
  {
    "PROVINCE_NAME": "天津",
    "PROVINCE_CODE": "120000"
  },
  {
    "PROVINCE_NAME": "河北",
    "PROVINCE_CODE": "130000"
  },
  {
    "PROVINCE_NAME": "山西",
    "PROVINCE_CODE": "140000"
  },
  {
    "PROVINCE_NAME": "内蒙古",
    "PROVINCE_CODE": "150000"
  },
  {
    "PROVINCE_NAME": "辽宁",
    "PROVINCE_CODE": "210000"
  },
  {
    "PROVINCE_NAME": "吉林",
    "PROVINCE_CODE": "220000"
  },
  {
    "PROVINCE_NAME": "黑龙江",
    "PROVINCE_CODE": "230000"
  },
  {
    "PROVINCE_NAME": "上海",
    "PROVINCE_CODE": "310000"
  },
  {
    "PROVINCE_NAME": "江苏",
    "PROVINCE_CODE": "320000"
  },
  {
    "PROVINCE_NAME": "浙江",
    "PROVINCE_CODE": "330000"
  },
  {
    "PROVINCE_NAME": "安徽",
    "PROVINCE_CODE": "340000"
  },
  {
    "PROVINCE_NAME": "福建",
    "PROVINCE_CODE": "350000"
  },
  {
    "PROVINCE_NAME": "江西",
    "PROVINCE_CODE": "360000"
  },
  {
    "PROVINCE_NAME": "山东",
    "PROVINCE_CODE": "370000"
  },
  {
    "PROVINCE_NAME": "河南",
    "PROVINCE_CODE": "410000"
  },
  {
    "PROVINCE_NAME": "湖北",
    "PROVINCE_CODE": "420000"
  },
  {
    "PROVINCE_NAME": "湖南",
    "PROVINCE_CODE": "430000"
  },
  {
    "PROVINCE_NAME": "广东",
    "PROVINCE_CODE": "440000"
  },
  {
    "PROVINCE_NAME": "广西",
    "PROVINCE_CODE": "450000"
  },
  {
    "PROVINCE_NAME": "重庆",
    "PROVINCE_CODE": "500000"
  },
  {
    "PROVINCE_NAME": "四川",
    "PROVINCE_CODE": "510000"
  },
  {
    "PROVINCE_NAME": "贵州",
    "PROVINCE_CODE": "520000"
  },
  {
    "PROVINCE_NAME": "云南",
    "PROVINCE_CODE": "530000"
  },
  {
    "PROVINCE_NAME": "西藏",
    "PROVINCE_CODE": "540000"
  },
  {
    "PROVINCE_NAME": "陕西",
    "PROVINCE_CODE": "610000"
  },
  {
    "PROVINCE_NAME": "甘肃",
    "PROVINCE_CODE": "620000"
  },
  {
    "PROVINCE_NAME": "青海",
    "PROVINCE_CODE": "630000"
  },
  {
    "PROVINCE_NAME": "宁夏",
    "PROVINCE_CODE": "640000"
  },
  {
    "PROVINCE_NAME": "新疆",
    "PROVINCE_CODE": "650000"
  }
]
//年份
const categoryAreaYear = ref(new Date(2022, 1, 1))
const categoryYieldYear = ref(new Date(2022, 1, 1))
const categoryUnitYear = ref(new Date(2022, 1, 1))
const cropProductAreaYear = ref(new Date(2022, 1, 1))
const cropProductYieldYear = ref(new Date(2022, 1, 1))
const cropProductUnitYear = ref(new Date(2022, 1, 1))
const menuList = ref([
  {
    id: 1, name: '粮食', icon1: 'liangs.png', icon2: 'liangss.png', children: [
      { id: 101, name: '水稻', icon1: 'daog.png', icon2: 'daogs.png' },
      { id: 102, name: '小麦', icon1: 'xiaom.png', icon2: 'xiaoms.png' },
      { id: 103, name: '玉米', icon1: 'yum.png', icon2: 'yums.png' },
      { id: 109, name: '大豆', icon1: 'dad.png', icon2: 'dads.png' },
      { id: 110, name: '马铃薯', icon1: 'mals.png', icon2: 'malss.png' }
    ]
  },
  {
    id: 2, name: '棉花', icon1: 'mianh.png', icon2: 'mianhs.png', children: [
      { id: 301, name: '棉花', icon1: 'mianh.png', icon2: 'mianhs.png' }
    ]
  },
  {
    id: 3, name: '油料', icon1: 'youl.png', icon2: 'youls.png', children: [
      { id: 201, name: '油菜', icon1: 'youcaiz.png', icon2: 'youcaizs.png' },
      { id: 202, name: '花生', icon1: 'huas.png', icon2: 'huass.png' }
    ]
  },
  {
    id: 4, name: '糖料', icon1: 'tangl.png', icon2: 'tangls.png', children: [
      { id: 401, name: '甘蔗', icon1: 'ganz.png', icon2: 'ganzs.png' }
    ]
  }
])
const userInfo = ref({
  userId: "15027219612",
  username: "用户15027219612",
  password: "814444127604540e1fba1e28ea85b181",
  email: null,
  phone: "15027219612",
  registerTime: "2024-04-01T06:08:56.000+00:00",
  gender: null,
  age: 0,
  userType: null,
  selfintroduction: null,
  address: null,
  avatarurl: "15027219612.png"
})
const categoryName = ref('1粮食')
const cropName = ref('')
const getUserInfo = async () => {
  // console.log("xxx", userInfoStore.info)
  // let userid = history.state.userid
  // let result = await userInfoService(userid)
  // userInfo.value = result.data
}
getUserInfo()
const getImageUrl = (name) => {
  return new URL(`../../assets/menu/${name}`, import.meta.url).href
}
//图片路径以自己的为准
//点击父tab

const GetDate = (date) => {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  month = month >= 10 ? month : ("0" + month);
  day = day >= 10 ? day : ("0" + day);
  return year + "-" + month + "-" + day;
}

//更改
const changeCategoryYear = (val) => {

  getCategoryPageData('category', categoryName.value, parentxtabname.value)
}
const changeCropProductYear = (val) => {
  getCategoryPageData('crop', cropName.value, cropproducttabname.value)
}
///统一写一个函数，地图的生成
const getMapCharts = (data, mydata, id, type) => {
  var optionMap = {
    backgroundColor: '#FFFFFF',
    textStyle: {
      fontSize: 6,
      fontWeight: 'bold'
    },
    grid: {
      left: '0%', //默认10%
      right: '0%', //默认10%
      bottom: '0%', //默认60
      top: '0%',
      containLabel: true
      //grid区域是否包含坐标轴的刻度标签
    },
    //左侧小导航图标
    visualMap: {
      min: Math.min(...data),
      max: Math.max(...data),
      show: true,
      x: 'left',
      y: 'bottom',
      // text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['#d6ffe5', '#8ed3a8', '#74b98e']
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: type != 'cost' ? '{b}<br/>{c} (千公顷)' : '{b}<br/>{c} (元/亩)'
    },
    //配置属性

    series: [{
      name: '数据',
      type: 'map',
      map: 'china',
      roam: true,
      selectedMode: 'single',
      select: {

        label: {
          show: true,
          color: 'rgb(100,0,0)'
        },
        itemStyle: {
          color: '#fff',
          areaColor: "red",
          // borderColor: '#000',
          // borderWidth: 20
        },

      },
      label: {
        normal: {
          show: true  //省份名称
        },
        emphasis: {
          show: false
        }
      },
      data: mydata  //数据
    }]
  };

  // 'areaseed' + name.replaceAll(name.slice(-2), ''
  var chartDom = document.getElementById(id);
  var myChart = echarts.init(chartDom, { autoResize: true });
  //使用制定的配置项和数据显示图表
  myChart.setOption(optionMap);


}
const convertData = (geoCoordMap, data) => {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].marketname];
    if (geoCoord) {
      res.push({
        name: data[i].marketname,
        value: geoCoord.concat(data[i].priceMarket).concat(data[i].priceMarketRate)
      });
    }
  }
  return res;
};
const getAverage = (arr) => {
  if (arr.length === 0) return 0; // 防止除以0
  const sum = arr.reduce((acc, current) => acc + current, 0);
  return sum / arr.length;
}
const getMapCharts1 = (geoCoordMap, xdata, id) => {

  var chartDom = document.getElementById(id);
  var myChart = echarts.init(chartDom, { autoResize: true });
  // //使用制定的配置项和数据显示图表
  // myChart.setOption(optionMap);
  let price = []
  let price1 = []
  let xdata1 = []
  let xdata2 = []
  let xdata3 = []
  for (let i = 0; i < xdata.length; i++) {
    xdata[i]['name'] = xdata[i]['marketname']
    price.push(xdata[i]['priceMarket'])
    price1.push(xdata[i]['nextPriceMarket'])
    if (xdata[i].priceMarketRate > 0) xdata1.push(xdata[i])
    else if (xdata[i].priceMarketRate = 0) xdata2.push(xdata[i])
    else xdata3.push(xdata[i])
  }
  if (xdata.length > 0) avgpifaprice.value = [getAverage(price), ((getAverage(price) - getAverage(price1)) / getAverage(price1) * 100).toFixed(2)]
  var option = {
    backgroundColor: '#FFFFFF',
    tooltip: {
      trigger: 'item'
      // formatter: '{b}<br/>{c} (千公顷)'
    },
    textStyle: {
      fontSize: 6,
      fontWeight: 'bold'
    },
    grid: {
      left: '0%', //默认10%
      right: '0%', //默认10%
      bottom: '0%', //默认60
      top: '0%',
      containLabel: true
      //grid区域是否包含坐标轴的刻度标签
    },
    geo: {
      map: "china",
      roam: false,// 一定要关闭拖拽
      zoom: 1.05,
      center: [122, 33], // 调整地图位置
      label: {
        normal: {
          show: false, //关闭省份名展示
          fontSize: "10",
          color: "rgba(0,0,0,0.7)"
        },
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          areaColor: "#f4f4f5",
          borderColor: "#b1b3b8",
          borderWidth: 0.7 //设置外层边框
        },
        emphasis: {
          areaColor: "#f3d19e",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 5,
          borderWidth: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    },
    legend: {
      left: 'left',
      bottom: 15,
      orient: 'vertical',
      textStyle: {
        color: 'gray',
        fontSize: '12px',
        fontWeight: 500
      }
    },
    //配置属性
    series: [
      {
        name: "日环比涨价",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: convertData(geoCoordMap, xdata1),
        symbolSize: function (val) {
          return (val[2] / Math.max(...price)) * 10;
        },
        symbol: "circle",
        // symbolSize: 8,
        // hoverSymbolSize: 10,
        tooltip: {
          formatter(value) {
            // dataValue.forEach((item,index,arr)=>{
            //   if(value.data.)
            // })
            return '<span style="font-weight:500;font-size:12px;">' + value.data.name + '</span><br/>'
              + '<span style="font-weight:500;font-size:12px;">批发价格' + value.data.value[2] + '元/公斤</span><br/>' +
              '<span style="font-weight:500;font-size:12px;">日环比涨跌幅' + value.data.value[3] + '%</span>'
          },
          show: true
        },
        encode: {
          value: 2
        },
        // label: {
        //   formatter: "{b}",
        //   position: "right",
        //   show: false
        // },
        itemStyle: {
          color: "#F56C6C"
        }
        // emphasis: {
        //   label: {
        //     show: false
        //   }
        // }
      },
      {
        name: "价格未改变",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: convertData(geoCoordMap, xdata2),
        symbolSize: function (val) {

          return (val[2] / Math.max(...price)) * 10;
        },
        symbol: "circle",
        // symbolSize: 8,
        // hoverSymbolSize: 10,
        tooltip: {
          formatter(value) {

            return '<span style="font-weight:500;font-size:12px;">' + value.data.name + '</span><br/>'
              + '<span style="font-weight:500;font-size:12px;">批发价格' + value.data.value[2] + '元/公斤</span><br/>' +
              '<span style="font-weight:500;font-size:12px;">日环比涨跌幅' + value.data.value[3] + '%</span>'
          },
          show: true
        },
        encode: {
          value: 2
        },
        // label: {
        //   formatter: "{b}",
        //   position: "right",
        //   show: false
        // },
        itemStyle: {
          color: "#67C23A"
        }
        // emphasis: {
        //   label: {
        //     show: false
        //   }
        // }
      },
      {
        name: "日环比跌价",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: convertData(geoCoordMap, xdata3),
        symbolSize: function (val) {

          return (val[2] / Math.max(...price)) * 10;
        },
        symbol: "circle",
        // symbolSize: 8,
        // hoverSymbolSize: 10,
        tooltip: {
          formatter(value) {

            // dataValue.forEach((item,index,arr)=>{
            //   if(value.data.)
            // })
            return '<span style="font-weight:500;font-size:12px;">' + value.data.name + '</span><br/>'
              + '<span style="font-weight:500;font-size:12px;">批发价格' + value.data.value[2] + '元/公斤</span><br/>' +
              '<span style="font-weight:500;font-size:12px;">日环比涨跌幅' + value.data.value[3] + '%</span>'
          },
          show: true
        },
        encode: {
          value: 2
        },
        // label: {
        //   formatter: "{b}",
        //   position: "right",
        //   show: false
        // },
        itemStyle: {
          color: "#E6A23C"
        }
        // emphasis: {
        //   label: {
        //     show: false
        //   }
        // }
      }
    ]
  };
  myChart.setOption(option);

}
const changeCropCostYear = async (val) => {
  let xyear = cropCostYear.value.getFullYear()
  let result1 = await getCropCostService({ cropname: cropName.value.replace(/\d+/g, ''), year: xyear, type: 'cost' })
  let mydata = []
  let province = []
  let cost = []
  let aldata = 0
  result1.data.forEach((item, index, arr) => {
    mydata.push({ name: item.province, value: item.value })
    province.push(item.province)
    cost.push(item.value)
    aldata += item.value
  })
  totalcost.value = aldata
  getMapCharts(cost, mydata, 'cropCost' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, ''), ''), 'cost')
  getTrendCost(province, cost, 'cropCostTrend' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, ''), ''))

}
const changeCropCostTrendDate = async () => {

}
const changeCropCostArea = async () => {
  let result = await getCropCostDataService({ province: areaCropCost.value, cropname: cropName.value.replace(/\d+/g, '') })
  let cost = []
  let profit = []
  let data = result.data
  let year = []
  data.forEach((item, index, arr) => {
    if (item.type == 'cost') {
      cost.push(Number(item.value))
      year.push(Number(item.year))
    } else if (item.type == 'profit') profit.push(Number(item.value))
  })
  var chartDom = document.getElementById('cropCostProfit' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, ''), ''));
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
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value}元/亩'
        }
      },
      {
        type: 'value',
        name: '净利润',
        // min: 0,
        // max: 25,
        // interval: 5,\
        splitLine: {
          show: false
        },
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
const getCategoryPageData = async (type, name, tabname) => {
  let xyear
  // console.log("66666666666", categoryAreaYear.value.getFullYear())
  if (type == 'category') {
    if (tabname == '播种面积') xyear = categoryAreaYear.value.getFullYear()
    else if (tabname == '产量') xyear = categoryYieldYear.value.getFullYear()
    else if (tabname == '单产') xyear = categoryUnitYear.value.getFullYear()
    else {
      parentxtabname.value == '播种面积'
      xyear = categoryAreaYear.value.getFullYear()
    }
  } else {
    if (tabname == '播种面积') xyear = cropProductAreaYear.value.getFullYear()
    else if (tabname == '产量') xyear = cropProductYieldYear.value.getFullYear()
    else if (tabname == '单产') xyear = cropProductUnitYear.value.getFullYear()
    else {
      cropproducttabname.value == '播种面积'
      xyear = cropProductAreaYear.value.getFullYear()
    }
  }

  let result = await getCropProductAllService({ cropname: name.replace(/\d+/g, ''), year: xyear, flag: type == 'category' ? 0 : 1 })
  // console.log("xxxxxx", result.data)
  let mydata = [] //播种面积
  let areaSeed = []
  let yieldTotal = []
  let yieldUnit = []
  let mydata1 = [] //产量
  let mydata2 = [] //单产
  let xtotalarea = 0
  let xtotalyield = 0
  let xavgunit = 0
  result.data.forEach((item, index, arr) => {
    areaSeed.push(item.areaSeed.toFixed(0))
    yieldTotal.push(item.yieldTotal.toFixed(2))
    yieldUnit.push(item.yieldUnit.toFixed(2))
    xtotalarea += item.areaSeed
    xtotalyield += item.yieldTotal
    xavgunit += item.yieldUnit
    mydata.push({ name: item.provinceName, value: item.areaSeed.toFixed(2) })
    mydata1.push({ name: item.provinceName, value: item.yieldTotal.toFixed(2) })
    mydata2.push({ name: item.provinceName, value: item.yieldUnit.toFixed(2) })
  })
  if (type == 'category') {
    categoryDataArea.value = mydata.sort((a, b) => b.value - a.value);
    categoryDataYield.value = mydata1.sort((a, b) => b.value - a.value);
    categoryDataUnit.value = mydata2.sort((a, b) => b.value - a.value);
    totalarea.value = xtotalarea
    totalyield.value = xtotalyield
    avgunit.value = (xavgunit / result.data.length).toFixed(2)
    cropName.value = ''
    // alert(categoryName.value)
    maxprogress_area.value = Math.max(...areaSeed)
    maxprogress_yield.value = Math.max(...yieldTotal)
    maxprogress_unit.value = Math.max(...yieldUnit)

  } else {
    cropproductDataArea.value = mydata.sort((a, b) => b.value - a.value);
    cropproductDataYield.value = mydata1.sort((a, b) => b.value - a.value);
    cropproductDataUnit.value = mydata2.sort((a, b) => b.value - a.value);
    totalcroparea.value = xtotalarea
    totalcropyield.value = xtotalyield
    cropavgunit.value = (xavgunit / result.data.length).toFixed(2)
    // cropName.value = ''
    // alert(categoryName.value)
    cropproduct_maxprogress_area.value = Math.max(...areaSeed)
    cropproduct_maxprogress_yield.value = Math.max(...yieldTotal)
    cropproduct_maxprogress_unit.value = Math.max(...yieldUnit)

  }
  getMapCharts(areaSeed, mydata, 'areaseed' + name.replaceAll(name.replace(/\d+/g, ''), ''))
  getMapCharts(yieldTotal, mydata1, 'yieldtotal' + name.replaceAll(name.replace(/\d+/g, ''), ''))
  getMapCharts(yieldUnit, mydata2, 'yieldunit' + name.replaceAll(name.replace(/\d+/g, ''), ''))

}
const getYieldTrendPage = async (name, province) => {
  // let yieldTrend = []
  let result = await getCropProductByProvinceService({ cropname: name.slice(-2), province: province })
  let rdata = result.data[0]
  let areaSeedList = []
  let xyearList = []
  let yieldTotalList = []
  let areaSeed = rdata.areaSeed.replaceAll('[', '').replaceAll(']', '').replaceAll(' ', '').replaceAll("'", "").split(',')
  let xyear = rdata.xyear.replaceAll('[', '').replaceAll(']', '').replaceAll("'", "").replaceAll("年", "").replaceAll(' ', '').split(',')
  let yieldTotal = rdata.yieldTotal.replaceAll('[', '').replaceAll(']', '').replaceAll(' ', '').replaceAll("'", "").split(',')
  areaSeed.forEach((item, index, arr) => {
    areaSeedList.push(Number(item.replaceAll(' ', '')))
  })
  xyear.forEach((item, index, arr) => {
    let xitem = item.replaceAll(' ', '')
    xitem = xitem.replaceAll("'", "")
    xitem = xitem.replaceAll('年', '')
    xyearList.push(parseInt(xitem))
  })
  yieldTotal.forEach((item, index, arr) => {
    yieldTotalList.push(parseFloat(item.replaceAll(' ', '')))
  })
  var chartDom = document.getElementById('yieldTrend' + name.replaceAll(name.replace(/\d+/g, ''), ''));
  var myChart = echarts.init(chartDom, { autoResize: true });
  var option;
  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          // color: '#999'
        }
      }
    },
    grid: {
      borderWidth: 0,
      show: true,
      borderColor: 'white'
    },
    toolbox: {

    },
    legend: {
      data: ['播种面积', '产量']
    },
    xAxis: [
      {
        type: 'category',
        data: xyearList,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '播种面积(千公顷)',
        splitLine: {
          show: false
        },
        // min: Math.min(areaSeedList),
        // max: Math.max(areaSeedList),
        // interval: 50,
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        splitLine: {
          show: false
        },
        name: '产量(万吨)',
        // min: 0,
        // max: 25,
        // interval: 5,
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name: '产量',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 万吨';
          }
        },
        data: yieldTotalList,
        barWidth: 20,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,  //右
            y: 1,  //下
            x2: 0,  //左
            y2: 0,  //上
            colorStops: [
              {
                offset: 0,
                color: '#f5f2dc' // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: '#f7e565' // 70% 处的颜色
              },
              {
                offset: 1,
                color: '#efc85b' // 100% 处的颜色
              }
            ]
          }
        }
      },
      {
        name: '播种面积',
        type: 'line',
        yAxisIndex: 1,
        lineStyle: {
          color: '#009237'
        },
        itemStyle: {
          normal: {
            lineStyle: '#009237'
          },
          borderColor: '#009237'
        },
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 千公顷';
          }
        },
        data: areaSeedList
      }
    ]
  };

  option && myChart.setOption(option);

}
const changeCategory = (name) => {
  parentxtabname.value = '播种面积'
  categoryAreaYear.value = new Date(2022, 1, 1)
  categoryYieldYear.value = new Date(2022, 1, 1)
  categoryUnitYear.value = new Date(2022, 1, 1)
  nextTick(() => {
    getCategoryPageData('category', name, parentxtabname.value)
  })

  ///全国生产走势
  getYieldTrendPage(name, areaCategory.value)

  // let result1 = await getCropProductByYearService({ cropname: name.slice(-2), byear: pbyear.value, eyear: peyear.value, province })
}
changeCategory(categoryName.value)
const changeCropPriceDate1 = async (val) => {
  let result1 = await getPifaPriceService({ cropname: cropName.value.replace(/\d+/g, ''), date: GetDate(val) })
  let data1 = result1.data
  data1.sort((a, b) => b.priceMarket - a.priceMarket);
  if (data1.length > 0) cropprice_maxprogress_pifa.value = data1[0].priceMarket
  cropPriceData1.value = data1
  let geoCoordMap = {}
  data1.forEach((item, index, arr) => {
    geoCoordMap[item.marketname] = [item.longitude, item.latitude]
  })
  getMapCharts1(geoCoordMap, data1, 'pifaprice' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, ''), ''))

}
const changeCropPriceTrendDate = async (val) => {
  let result2 = await getPifaPriceTrendService({ cropname: cropName.value.replace(/\d+/g, ''), date1: GetDate(cropPriceDatet1.value), date2: GetDate(cropPriceDatet2.value) })

  let trenddata = result2.data
  let xday = []
  let xprice = []
  trenddata.forEach((item, index, arr) => {
    xday.push(item.date)
    xprice.push(item.avgprice.toFixed(2))
  })
  var chartDom = document.getElementById('pifapriceTrend' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, ''), ''));
  // console.log("hhhh", cropName.value.replace(cropName.value.replace(/\d+/g, '')), 'pifapriceTrend' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, '')), chartDom)
  var myChart = echarts.init(chartDom, { autoResize: true });
  var option;

  option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xday
    },
    yAxis: {
      type: 'value',
      name: cropName.value == '油菜' ? '元/吨' : '元/公斤',
      splitLine: {
        show: false
      },
      min: 'dataMin'
    },
    grid: {
      left: '2%', //默认10%
      right: '2%', //默认10%
      bottom: '4%', //默认60
      top: '4%',
      containLabel: true
      //grid区域是否包含坐标轴的刻度标签
    },
    series: [
      {
        data: xprice,
        type: 'line',
        name: '油菜籽',
        areaStyle: {
          color: '#baf49b8f'
        },
        lineStyle: {
          color: '#009237'
        },
        itemStyle: {
          color: '#009237'
        }
      }
    ]
  };

  option && myChart.setOption(option);


}
const changeCropPriceFutureDate = async (val) => {
  getPriceFuturePage()
}
const changeCrop = (name) => {
  infoName.value = 'product'
  // changeInfo('product')
  cropproducttabname.value = '播种面积'
  cropProductAreaYear.value = new Date(2022, 1, 1)
  cropProductYieldYear.value = new Date(2022, 1, 1)
  cropProductUnitYear.value = new Date(2022, 1, 1)
  cropPriceDatet1.value = new Date(2024, 1, 1)
  cropPriceDatet2.value = new Date()
  cropPriceDatef1.value = new Date(2021, 1, 1)
  cropPriceDatef2.value = new Date(2022, 6, 30)


  nextTick(() => {
    getCategoryPageData('crop', name, cropproducttabname.value)
  })

  // 全国生产走势
  getYieldTrendPage(name, areaCropproduct.value)

  // let result1 = await getCropProductByYearService({ cropname: name.slice(-2), byear: pbyear.value, eyear: peyear.value, province })
}
const getPriceTrendPage = async () => {
  let result2 = await getPifaPriceTrendService({ cropname: cropName.value.replace(/\d+/g, ''), date1: GetDate(cropPriceDatet1.value), date2: GetDate(cropPriceDatet2.value) })

  let trenddata = result2.data

  let xday = []
  let xprice = []
  trenddata.forEach((item, index, arr) => {
    xday.push(item.date)
    xprice.push(item.avgprice.toFixed(2))
  })
  var chartDom = document.getElementById('pifapriceTrend' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, ''), ''));
  // console.log("hhhh", cropName.value.replace(cropName.value.replace(/\d+/g, '')), 'pifapriceTrend' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, '')), chartDom)
  var myChart = echarts.init(chartDom, { autoResize: true });
  var option;

  option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xday
    },
    yAxis: {
      type: 'value',
      name: cropName.value == '油菜' ? '元/吨' : '元/公斤',
      splitLine: {
        show: false
      },
      min: 'dataMin'
    },
    grid: {
      left: '4%', //默认10%
      right: '4%', //默认10%
      bottom: '4%', //默认60
      top: '10%',
      containLabel: true
      //grid区域是否包含坐标轴的刻度标签
    },

    series: [
      {
        data: xprice,
        type: 'line',
        name: '油菜籽',
        areaStyle: {
          color: '#baf49b8f'
        },
        lineStyle: {
          color: '#009237'
        },
        itemStyle: {
          color: '#009237'
        }
      }
    ]
  };

  option && myChart.setOption(option);
}
const getPriceFuturePage = async () => {
  let result2 = await getPriceFutureService({ cropname: cropName.value.replace(/\d+/g, ''), date1: GetDate(cropPriceDatef1.value), date2: GetDate(cropPriceDatef2.value) })
  let fdata = []
  let fdate = []
  for (let i = 0; i < result2.data.length; i++) {
    fdate.push(result2.data[i].date)
    fdata.push([result2.data[i].priceOpen, result2.data[i].priceClose, result2.data[i].priceHigh, result2.data[i].priceLow])
  }
  var chartDom = document.getElementById('priceFuture' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, ''), ''))
  var myChart = echarts.init(chartDom, { autoResize: true });
  var option;

  option = {
    xAxis: {
      data: fdate
    },
    yAxis: {
      min: 'dataMin',
      splitLine: { show: false },
      name: '元/吨'

    },
    grid: {
      left: '2%', //默认10%
      right: '2%', //默认10%
      bottom: '2%', //默认60
      top: '9%',
      containLabel: true
      //grid区域是否包含坐标轴的刻度标签
    },
    tooltip: {
      formatter(value) {
        // dataValue.forEach((item,index,arr)=>{
        //   if(value.data.)
        // })
        let x = fdate[value.data[0]].split('-')
        let x1 = x[0] + '年' + x[1] + '月' + x[2] + '日'
        return '<span style="font-weight:500;font-size:12px;">' + x1 + '</span><br/>' + '<span style="font-weight:500;font-size:12px;">开：' + value.data[1] + '元/吨</span><br/>'
          + '<span style="font-weight:500;font-size:12px;">高：' + value.data[2] + '元/吨</span><br/>' +
          '<span style="font-weight:500;font-size:12px;">收：' + value.data[3] + '元/吨</span><br/>' +
          '<span style="font-weight:500;font-size:12px;">低：' + value.data[4] + '元/吨</span>'
      },
      show: true
    },
    series: [
      {
        type: 'candlestick',
        data: fdata,
        itemStyle: {
          color: '#eb5454',
          color0: '#47b262',
          borderColor: '#eb5454',
          borderColor0: '#47b262',
          borderColorDoji: null,
          borderWidth: 1
        }
      }
    ]
  };

  option && myChart.setOption(option);
}
///ccccccccccc
const changeInfo = async (name) => {
  cropProductUnitYear.value = new Date(2022, 1, 1)
  cropProductYieldYear.value = new Date(2022, 1, 1)
  cropproducttabname.value = '播种面积'
  cropProductAreaYear.value = new Date(2022, 1, 1)
  areaCropproduct.value = '全国'
  areaCropCost.value = '全国'
  cropcosttabs.value = '总成本'
  if (name == 'price') {
    //获取当日价格
    let result1 = await getPifaPriceService({ cropname: cropName.value.replace(/\d+/g, ''), date: GetDate(cropPriceDate1.value) })
    let data1 = result1.data
    data1.sort((a, b) => b.priceMarket - a.priceMarket);
    if (data1.length > 0) cropprice_maxprogress_pifa.value = data1[0].priceMarket
    cropPriceData1.value = data1
    // for000000000000
    let geoCoordMap = {}
    data1.forEach((item, index, arr) => {
      geoCoordMap[item.marketname] = [item.longitude, item.latitude]
    })
    //价格
    getMapCharts1(geoCoordMap, data1, 'pifaprice' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, ''), ''))
    //价格走势
    getPriceTrendPage()
    //期货走势
    getPriceFuturePage()


  } else if (name == 'cost') {
    // change
    changeCostTab('总成本')
    let result = await getCropCostDataService({ province: areaCropCost.value, cropname: cropName.value.replace(/\d+/g, '') })
    let cost = []
    let profit = []
    let data = result.data
    let year = []
    data.forEach((item, index, arr) => {
      if (item.type == 'cost') {
        cost.push(Number(item.value))
        year.push(Number(item.year))
      } else if (item.type == 'profit') profit.push(Number(item.value))
    })
    var chartDom = document.getElementById('cropCostProfit' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, ''), ''));
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
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: '{value}元/亩'
          }
        },
        {
          type: 'value',
          name: '净利润',
          // min: 0,
          // max: 25,
          // interval: 5,\
          splitLine: {
            show: false
          },
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

  //获取下面的成本收益柱状图


  // console.log("changeinfo", name, cropName.value)
}
const changeCategoryArea = (val) => {
  getYieldTrendPage(categoryName.value, val)
}
const changeCropproductArea = (val) => {
  getYieldTrendPage(cropName.value, areaCropproduct.value)
  // getYieldTrendPage(cropName.value)

}
const getTrendCost = (province, ydata, id, type) => {
  var chartDom = document.getElementById(id);
  var myChart = echarts.init(chartDom, { autoResize: true });
  var option;
  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          // color: '#999'
        }
      }
    },
    grid: {
      borderWidth: 0,
      show: true,
      borderColor: 'white'
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 0,
        end: 40
      },
      {
        type: 'inside',
        realtime: true,
        start: 0,
        end: 40
      }
    ],
    toolbox: {

    },
    legend: {
      data: type == 'cost' ? ['总成本'] : ['净利润']
    },
    xAxis: [
      {
        type: 'category',
        data: province,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: type == 'cost' ? '总成本(元/亩)' : '净利润(元/亩)',
        // min: Math.min(areaSeedList),
        // max: Math.max(areaSeedList),
        // interval: 50,
        axisLabel: {
          formatter: '{value}'
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: type == 'cost' ? '总成本' : '净利润',
        type: 'bar',
        tooltip: {
          formatter: function (value) {
            return value + '元/亩';
          }
        },
        data: ydata,
        barWidth: 15,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,  //右
            y: 1,  //下
            x2: 0,  //左
            y2: 0,  //上
            colorStops: [
              {
                offset: 0,
                color: '#f5f2dc' // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: '#f7e565' // 70% 处的颜色
              },
              {
                offset: 1,
                color: '#efc85b' // 100% 处的颜色
              }
            ]
          }
        }
      }
    ]
  };

  option && myChart.setOption(option);
}
// changeCategory(categoryName.value)
const changeCostTab = async (name) => {
  let xyear = cropCostYear.value.getFullYear()
  if (name == '总成本') {
    let result1 = await getCropCostService({ cropname: cropName.value.replace(/\d+/g, ''), year: xyear, type: 'cost' })
    let mydata = []
    let province = []
    let cost = []
    let aldata = 0
    result1.data.forEach((item, index, arr) => {
      mydata.push({ name: item.province, value: item.value })
      province.push(item.province)
      cost.push(item.value)
      aldata += item.value
    })
    totalcost.value = aldata
    getMapCharts(cost, mydata, 'cropCost' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, ''), ''), 'cost')
    getTrendCost(province, cost, 'cropCostTrend' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, ''), ''), 'cost')
  } else if (name == '净利润') {
    let result1 = await getCropCostService({ cropname: cropName.value.replace(/\d+/g, ''), year: xyear, type: 'profit' })
    let mydata = []
    let province = []
    let cost = []
    let aldata = 0
    result1.data.forEach((item, index, arr) => {
      mydata.push({ name: item.province, value: item.value })
      province.push(item.province)
      cost.push(item.value)
      aldata += item.value
    })
    avgprofit.value = (aldata / cost.length).toFixed(2)
    getMapCharts(cost, mydata, 'cropProfit' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, ''), ''), 'profit')
    getTrendCost(province, cost, 'cropProfitTrend' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, ''), ''), 'profit')
  }
}
const changeCropProfitYear = async () => {
  let xyear = cropProfitYear.value.getFullYear()
  let result1 = await getCropCostService({ cropname: cropName.value.replace(/\d+/g, ''), year: xyear, type: 'profit' })

  let mydata = []
  let province = []
  let cost = []
  let aldata = 0
  result1.data.forEach((item, index, arr) => {
    mydata.push({ name: item.province, value: item.value })
    province.push(item.province)
    cost.push(item.value)
    aldata += item.value
  })
  avgprofit.value = (aldata / cost.length).toFixed(2)
  getMapCharts(cost, mydata, 'cropProfit' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, ''), ''), 'profit')
  getTrendCost(province, cost, 'cropProfitTrend' + cropName.value.replaceAll(cropName.value.replace(/\d+/g, ''), ''), 'profit')

}
</script>

<style lang="scss">
.xxpriceTable {
  margin-top: 10px;

  // height: 75vh;
  thead th {
    font-size: 12px;
  }

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
    font-size: 11px;
    ;
  }

}

.areaseedClass {
  height: 350px;
  width: 600px;
  padding-left: 10px;
}

.yieldTrendClass {
  height: 380px;
  width: 1060px;
  // padding-left: 10px;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.left-wrap {
  float: left;
  width: 130px;
  height: 73vh;
  border-radius: 5px;
  border: 1px solid var(--el-border-color);
  background-color: aliceblue;
}

.el-tabs--left .el-tabs__item.is-left {
  text-align: center;
  justify-content: flex-start !important;
}



.cropChildTabs {
  height: 73vh;
  margin-left: -5px;
  margin-top: -5px;
  border: 0;

  .childhomepageTabs .el-tabs__header {
    border-left: 0;
  }

  .el-tabs__item .is-left .is-active {
    background-color: red !important;
  }

  .el-tabs__content {
    padding: 3px;
  }

  .el-tabs__header .is-left {
    background-color: aliceblue;

    .el-tabs__item {
      height: 60px;
    }


  }


  #tab-0 {
    margin-top: 80px;
  }

  .el-tabs__nav-wrap .is-left {
    background-color: aliceblue;

  }

  // .el-tabs__header {
  //   width: 130px;
  // }

  // .el-tabs__item {
  //   justify-content: flex-start;
  // }

  // .el-tabs__item.is-left {
  //   border-radius: 5px;
  //   // border: 1px solid var(--el-border-color) !important;
  //   // background-color: aliceblue;
  // }


  .el-tabs__content {
    padding: 0;
  }
}

.left-menu {
  padding: 10px;

  li {
    text-align: left;
    font-size: 13px;

    .el-button {
      width: 110px;
      justify-content: flex-start;
      // --el-button-hover-bg-color: #009237 !important;
      // --el-button-hover-text-color: white !important;
    }

    // border-radius: 20px;
    // border: 1px solid #009237;
    margin-top: 20px;
    // padding: 6px;
    // font-weight: 600;
    // color: var(--el-color-info);

    // :active {
    //   background-color: #009237;
    // }

  }
}

.xprogress {
  .el-progress-bar {
    width: 150px;
  }

  .el-progress-bar__outer {
    width: 150px;
    background-color: rgba(255, 255, 255, 0);
  }


}

.xprogress.is-exception .el-progress-bar__inner {
  background: linear-gradient(to right, #b7ffd2, #009238d7) !important;
  ;
}

.xxprogress {
  .el-progress-bar {
    width: 90px;
  }

  .el-progress-bar__outer {
    width: 90px;
    background-color: rgba(255, 255, 255, 0);
  }


}

.xxprogress.is-exception .el-progress-bar__inner {
  background: linear-gradient(to right, #b7ffd2, #009238d7) !important;
  ;
}

.productTabs {
  .el-tabs__nav-scroll {
    padding-left: 150px;
  }

  .el-tabs__header .el-tabs__nav {
    border-top: 0;
    border-bottom: 0;
    // border-left: 0;
  }

  .el-tabs__header {
    background-color: aliceblue !important;
    border-left: 0;
  }

  .el-tabs__item {}

  --el-tabs-header-height: 35px;
}

.cproductTabs {
  .el-tabs__nav-scroll {
    padding-left: 250px;
  }

  .el-tabs__header .el-tabs__nav {
    border-top: 0;
    border-bottom: 0;
    // border-left: 0;
  }

  .el-tabs__header {
    background-color: aliceblue !important;
    border-left: 0;
  }

  .el-tabs__item {}

  --el-tabs-header-height: 35px;
}

.homeheader {
  width: 100%;
  height: 50px;
  text-shadow:
    -1px -1px 0 white,
    1px -1px 0 #fff,
    -1px 1px 0 #fff,
    1px 1px 0 #fff;
  /* 边框颜色 */
  /* text-shadow: 2px 2px 5px white; */
  background-image: url('@/assets/homeheadbg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: -5px 0px 0px -5px;
  line-height: 46px;
  padding-left: 10px;
  font-weight: 700;
  color: #009237;
  font-size: 17px;
}

.homepageTabs,
.childhomepageTabs {
  .custom-tabs-label {
    margin-top: 5px;
  }

  margin-left: -5px;
  margin-right: -5px;
  border:0;
  // border-left: 1px solid var(--el-border-color-light);
  --el-tabs-header-height: 35px;

  .el-tabs__header {
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid var(--el-border-color-light);
  }
}

.childhomepageTabs {
  .el-tabs__header {
    background-color: rgb(255, 255, 255);
    border-left: 1px solid var(--el-border-color-light);

  }

  height:100%;
}
</style>
