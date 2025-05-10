<template>
  <div>
    <el-row>
      <el-col :span="5">
        <div class="mTreepanel">
          <div
            style="color:black;margin-top:-5px;margin-left:-5px;border-bottom:2px solid #e6e6e6b2; font-size:13px;line-height:40px;height:40px;text-align: center;">
            <el-text><el-icon>
                <List />
              </el-icon>农事计划</el-text>
          </div>
          <div style="margin-left:-5px;border-bottom:2px solid #e6e6e6b2; font-size:13px;">
            <el-switch v-model="isFinishState" @click="getFilterData" class="ml-2" inline-prompt
              style="margin-left:15px;--el-switch-on-color: #13ce66; " active-text="已完成" inactive-text="已完成" />
            <el-switch v-model="isStartState" @click="getFilterData" class="ml-2" inline-prompt
              style="margin-left:7px;--el-switch-on-color: #13ce66; " active-text="未开始" inactive-text="未开始" />
            <el-switch v-model="isDoingState" @click="getFilterData" class="ml-2" inline-prompt
              style="margin-left:7px;--el-switch-on-color: #13ce66; " active-text="进行中" inactive-text="进行中" />
          </div>
          <el-tree style="height:79vh;" lazy :load="loadNode" ref="treeRef" :expand-on-click-node="false"
            :accordion="true" :current-node-key="currentNodekeys" highlight-current="true" :props="props" :data="data"
            :filter-node-method="filterFn" @node-click="treeNodeClick" node-key="id"
            :default-expanded-keys="treeExpandData">
            <template #default="{ node, data }">
              <span class="custom-tree-node"
                style="flex:1;padding-right:10px;display: flex; align-items: center;justify-content: space-between;">
                <span>
                  <div style="float:left;width:150px;">
                    <el-text>
                      <el-icon v-if="node.expanded === false && node.isLeaf === false && node.level !== 2" size="small"
                        style="color:darkolivegreen">
                        <Folder />
                      </el-icon>
                      <el-icon v-if="node.expanded === true && node.level !== 2" style="color:rgb(58, 107, 47);">
                        <FolderOpened />
                      </el-icon>
                      <el-icon v-if="node.level === 2 && data.flag === -1" style="color:#c45656;">
                        <Warning />
                      </el-icon>

                      <el-icon v-if="node.level === 2 && data.flag === 0" style="color:#337ecc;">
                        <Clock />
                      </el-icon>
                      <el-icon v-if="node.level === 2 && data.flag === 1" style="color:#529b2e;">
                        <CircleCheck />
                      </el-icon>

                      <span class="labelName" :id="'node' + node.data.id" v-if="node.level == 2"
                        style="margin-left:5px;margin-top:-5px; font-size: 13px;color:rgb(58, 107, 47);">
                        {{ node.label }}
                      </span>
                      <span class="labelName" :id="'node' + node.data.id" v-if="node.level == 1"
                        style="margin-left:5px;margin-top:-5px; font-size: 13px;">
                        {{ node.label }}
                      </span>
                    </el-text>
                  </div>
                  <div style="padding-top:2px;">
                    <el-icon @click="deleteTreenode(node, data)">
                      <Delete />
                    </el-icon>
                  </div>
                </span>
              </span>
            </template>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="19" v-if="info2">
        <div
          style="color:black;padding-left:13px;margin-top:-5px;margin-left:-5px;border-bottom:2px solid #e6e6e6b2; font-size:13px;line-height:40px;height:40px;text-align: left;">
          <el-text><el-icon>
              <Calendar />
            </el-icon>日志基本信息</el-text>
        </div>
        <el-form class="calendarForm" :model="cropcalendarData" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="日志编号">
                <el-input :disabled="true" v-model="cropcalendarData.cropCalendarid" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="计划编号">
                <el-input :disabled="true" v-model="cropcalendarData.argomid" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="计划名称">
                <el-input :disabled="caledit" v-model="cropcalendarData.argoname" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="农田编号">
                <el-input :disabled="caledit" v-model="cropcalendarData.landid" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="作物分类">
                <el-select :disabled="caledit" @change="changeCategory" v-model="cropcalendarData.category"
                  placeholder="选择分类">
                  <el-option v-for="item in categoryname" :key="item.key" :label="item.label" :value="item.key" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="作物名称">
                <el-select :disabled="caledit" @change="changeCrop" v-model="cropcalendarData.cropName">
                  <el-option v-for="(item, index) in cropnameList" :key="item.id" :label="item.cropname"
                    :value="item.cropname" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="品种名称">
                <el-input :disabled="caledit" v-model="cropcalendarData.varietyName" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="最大生长周期" label-width="110px">
                <el-input :disabled="caledit" v-model="cropcalendarData.maxDuration" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="开始日期">
                <el-input :disabled="caledit" v-model="cropcalendarData.cropStartDate" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结束日期">
                <el-input :disabled="caledit" v-model="cropcalendarData.cropEndDate" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开始类型">
                <el-input :disabled="caledit" v-model="cropcalendarData.cropStartType" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结束类型">
                <el-input :disabled="caledit" v-model="cropcalendarData.cropEndType" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20"></el-col>
            <el-col :span="4">
              <el-button style="margin-left:25px;" size="small" type="danger" :disabled="false"
                @click="caledit = false">编辑</el-button>
              <el-button size="small" type="success" :disabled="false" @click="saveCropCalendar">保存</el-button>
            </el-col>
          </el-row>

        </el-form>
        <el-tabs class="argomTabClass" type="border-card" style="border-left:0;">
          <!-- 灌溉 -->
          <el-tab-pane label="灌溉">
            <el-row>
              <el-col :span="12">
                <el-card class="argomCardClass" style="max-width: 480px" shadow="never">
                  <template #header>
                    <div class="card-header">
                      <span><el-text style="color:#009238;font-size:13px;"><el-icon>
                            <Calendar />
                          </el-icon>时间事件</el-text></span>
                    </div>
                  </template>
                  <el-table ref="tiTable" class="argoTableClass" style="margin-left:-1px;height:100%;border:0;"
                    @select="setSelectTiRows" v-loading="loading" border stripe :data="timeEventIrriData"
                    :row-style="{ height: 0 + 'px' }" highlight-current-row :header-cell-style="{ color: '#595959' }"
                    @row-click="tiRowClick">
                    <el-table-column type="selection" fixed width="40" />
                    <el-table-column align="center" prop="timeeventid" label="编码" width="53" />
                    <el-table-column align="center" prop="cropCalendarid" label="日志编号" width="84" />
                    <el-table-column align="center" label="日期" width="145">

                      <template #default="scope">
                        <el-date-picker @blur="validateDateInput1(scope.row.date)" format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD" id="datePicker" v-if="tiTableRowEditId === scope.row.timeeventid"
                          class="rowEditItem" v-model="scope.row.date" type="date" placeholder="选择日期" :size="small" />
                        <div v-else class="txt">{{ scope.row.date }}</div>
                      </template></el-table-column>
                    <el-table-column align="center" label="灌溉量(cm)" width="100">

                      <template #default="scope">
                        <el-input type="number" @Input="validateAmountInput" id="amountInput"
                          v-if="tiTableRowEditId === scope.row.timeeventid" class="xrowEditItem"
                          v-model="scope.row.irrigationAmount" placeholder="输入"></el-input>
                        <div v-else class="txt">
                          {{
                            scope.row.irrigationAmount }}</div>
                      </template></el-table-column>
                    <el-table-column fixed="right" :show-overflow-tooltip="true" align="center" label="操作" width="100">

                      <template #default="scope"> <!-- scoped -->
                        <el-button @click="rowlineDeleteBtnTi(scope.row)" size="small" type="round" :icon="Delete"
                          circle />
                        <el-button @click="rowlineSaveBtnTi(scope.row)" size="small" type="round" :icon="Check"
                          circle />
                      </template>
                    </el-table-column>
                  </el-table>

                  <template #footer>
                    <el-button-group class="ml-4" style="float:right;">
                      <el-button @click="addTiRow" size="small" type="primary" :icon="Plus">新增</el-button>
                      <el-button @click="handleDeleteTiBtn" size="small" type="danger" :icon="Delete">删除</el-button>
                    </el-button-group>
                  </template>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="argomCardClass" style="max-width: 480px" shadow="never">

                  <template #header>
                    <div class="card-header">
                      <span><el-text style="color:#009238;font-size:13px;"><el-icon>
                            <Calendar />
                          </el-icon>状态事件</el-text></span>
                    </div>
                  </template>
                  <el-table ref="siTable" class="argoTableClass" style="margin-left:-1px;height:100%;border:0;"
                    @select="setSelectSiRows" :row-key="getRowKey" :key="isUpdate" :current-node-key="currentNodekeys"
                    v-loading="loading" border stripe :data="stateEventIrriData" :row-style="{ height: 0 + 'px' }"
                    highlight-current-row :header-cell-style="{ color: '#595959' }" @row-click="siRowClick">
                    <el-table-column type="selection" fixed width="40" />
                    <!-- 临界条件 -->
                    <el-table-column align="center" label="临界条件" width="100">

                      <template #default="scope">
                        <el-select placeholder="选择" v-model="scope.row.zeroCondition" class="xrowEditItem"
                          v-if="siTableRowEditId === scope.row.stateeventid">
                          <el-option v-for="item in siZcList" :key="item.key" :label="item.label" :value="item.value" />
                        </el-select>
                        <div v-else class="txt">{{ scope.row.zeroCondition }}</div>
                      </template>
                    </el-table-column>
                    <!-- 状态 -->
                    <el-table-column align="center" label="状态" width="100">

                      <template #default="scope">
                        <el-select placeholder="选择" v-model="scope.row.eventState" class="xrowEditItem"
                          v-if="siTableRowEditId === scope.row.stateeventid">
                          <el-option v-for="item in siStateList" :key="item.key" :label="item.label"
                            :value="item.value" />
                        </el-select>

                        <div v-else class="txt">{{ scope.row.eventState }}</div>
                      </template>
                    </el-table-column>
                    <!-- 状态值 -->
                    <el-table-column align="center" label="状态值" width="84">

                      <template #default="scope">
                        <el-input @Input="validateStateInput" type="number"
                          v-if="siTableRowEditId === scope.row.stateeventid" class="xrowEditItem"
                          v-model="scope.row.statenum" placeholder="输入"></el-input>
                        <div v-else class="txt">{{ scope.row.statenum }}</div>
                      </template>
                    </el-table-column>
                    <!-- 灌溉量 -->
                    <el-table-column align="center" label="灌溉量(cm)" width="100">

                      <template #default="scope">
                        <el-input @Input="validateAmountInput" type="number" id="amountInput"
                          v-if="siTableRowEditId === scope.row.stateeventid" class="xrowEditItem"
                          v-model="scope.row.irrigationAmount" placeholder="输入"></el-input>
                        <div v-else class="txt">{{ scope.row.irrigationAmount }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column fixed="right" :show-overflow-tooltip="true" align="center" label="操作" width="100">

                      <template #default="scope"> <!-- scoped -->
                        <el-button @click="rowlineDeleteBtnSi(scope.row)" size="small" type="round" :icon="Delete"
                          circle />
                        <el-button @click="rowlineSaveBtnSi(scope.row)" size="small" type="round" :icon="Check"
                          circle />
                      </template>
                    </el-table-column>
                  </el-table>

                  <template #footer>
                    <el-button-group class="ml-4" style="float:right;">
                      <el-button @click="addSiRow" size="small" type="primary" :icon="Plus">新增</el-button>
                      <el-button @click="handleDeleteSiBtn" size="small" type="danger" :icon="Delete">删除</el-button>
                    </el-button-group>
                  </template>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!-- 施肥 -->
          <el-tab-pane label="施肥">
            <el-row>
              <el-col :span="12">
                <el-card class="argomCardClass" style="max-width: 480px" shadow="never">

                  <template #header>
                    <div class="card-header">
                      <span><el-text style="color:#b88230;font-size:13px;"><el-icon>
                            <Calendar />
                          </el-icon>时间事件</el-text></span>
                    </div>
                  </template>
                  <el-table ref="tnTable" class="argoTableClass" style="margin-left:-1px;height:100%;border:0;"
                    @select="setSelectTnRows" v-loading="loading" border stripe :data="timeEventTnData"
                    :row-style="{ height: 0 + 'px' }" highlight-current-row :header-cell-style="{ color: '#595959' }"
                    @row-click="tnRowClick">
                    <el-table-column type="selection" fixed width="40" />
                    <el-table-column align="center" prop="timeeventid" label="编码" width="53" />
                    <el-table-column align="center" prop="cropCalendarid" label="日志编号" width="84" />
                    <el-table-column align="center" label="日期" width="145">

                      <template #default="scope">
                        <el-date-picker @blur="validateDateInput1(scope.row.date)" format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD" id="datePicker" v-if="tnTableRowEditId === scope.row.timeeventid"
                          class="rowEditItem" v-model="scope.row.date" type="date" placeholder="选择日期" :size="small" />
                        <div v-else class="txt">{{ scope.row.date }}</div>
                      </template></el-table-column>
                    <el-table-column align="center" label="氮肥(kg/ha)" width="100">

                      <template #default="scope">
                        <el-input type="number" @Input="validateNpkamountInput" id="amountInput"
                          v-if="tnTableRowEditId === scope.row.timeeventid" class="xrowEditItem"
                          v-model="scope.row.namount" placeholder="输入"></el-input>
                        <div v-else class="txt">
                          {{ scope.row.namount }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="磷肥(kg/ha)" width="100">

                      <template #default="scope">
                        <el-input type="number" @Input="validateNpkamountInput" id="amountInput"
                          v-if="tnTableRowEditId === scope.row.timeeventid" class="xrowEditItem"
                          v-model="scope.row.pamount" placeholder="输入"></el-input>
                        <div v-else class="txt">
                          {{ scope.row.pamount }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="钾肥(kg/ha)" width="100">

                      <template #default="scope">
                        <el-input type="number" @Input="validateNpkamountInput" id="amountInput"
                          v-if="tnTableRowEditId === scope.row.timeeventid" class="xrowEditItem"
                          v-model="scope.row.kamount" placeholder="输入"></el-input>
                        <div v-else class="txt">
                          {{ scope.row.kamount }}
                        </div>
                      </template>
                    </el-table-column>

                    <el-table-column align="center" label="氮回收率" width="100">

                      <template #default="scope">
                        <el-input type="number" id="amountInput" v-if="tnTableRowEditId === scope.row.timeeventid"
                          class="xrowEditItem" v-model="scope.row.nrecovery" placeholder="输入"></el-input>
                        <div v-else class="txt">
                          {{ scope.row.nrecovery }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="磷回收率" width="100">

                      <template #default="scope">
                        <el-input type="number" id="amountInput" v-if="tnTableRowEditId === scope.row.timeeventid"
                          class="xrowEditItem" v-model="scope.row.precovery" placeholder="输入"></el-input>
                        <div v-else class="txt">
                          {{ scope.row.precovery }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="钾回收率" width="100">

                      <template #default="scope">
                        <el-input type="number" id="amountInput" v-if="tnTableRowEditId === scope.row.timeeventid"
                          class="xrowEditItem" v-model="scope.row.krecovery" placeholder="输入"></el-input>
                        <div v-else class="txt">
                          {{ scope.row.krecovery }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column fixed="right" :show-overflow-tooltip="true" align="center" label="操作" width="100">

                      <template #default="scope"> <!-- scoped -->
                        <el-button @click="rowlineDeleteBtnTn(scope.row)" size="small" type="round" :icon="Delete"
                          circle />
                        <el-button @click="rowlineSaveBtnTn(scope.row)" size="small" type="round" :icon="Check"
                          circle />
                      </template>
                    </el-table-column>
                  </el-table>

                  <template #footer>
                    <el-button-group class="ml-4" style="float:right;">
                      <el-button @click="addTnRow" size="small" type="primary" :icon="Plus">新增</el-button>
                      <el-button @click="handleDeleteTnBtn" size="small" type="danger" :icon="Delete">删除</el-button>
                    </el-button-group>
                  </template>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="argomCardClass" style="max-width: 480px" shadow="never">

                  <template #header>
                    <div class="card-header">
                      <span><el-text style="color:#b88230;font-size:13px;"><el-icon>
                            <Calendar />
                          </el-icon>状态事件</el-text></span>
                    </div>
                  </template>
                  <el-table ref="siTable" class="argoTableClass" style="margin-left:-1px;height:100%;border:0;"
                    @select="setSelectSnRows" :row-key="getRowKey" :key="isUpdate" :current-node-key="currentNodekeys"
                    v-loading="loading" border stripe :data="stateEventSnData" :row-style="{ height: 0 + 'px' }"
                    highlight-current-row :header-cell-style="{ color: '#595959' }" @row-click="snRowClick">
                    <el-table-column type="selection" fixed width="40" />
                    <!-- 临界条件 -->
                    <el-table-column align="center" label="临界条件" width="100">

                      <template #default="scope">
                        <el-select placeholder="选择" v-model="scope.row.zeroCondition" class="xrowEditItem"
                          v-if="snTableRowEditId === scope.row.stateeventid">
                          <el-option v-for="item in siZcList" :key="item.key" :label="item.label" :value="item.value" />
                        </el-select>
                        <div v-else class="txt">{{ scope.row.zeroCondition }}</div>
                      </template>
                    </el-table-column>
                    <!-- 状态 -->
                    <el-table-column align="center" label="状态" width="100">

                      <template #default="scope">
                        <el-select placeholder="选择" v-model="scope.row.eventState" class="xrowEditItem"
                          v-if="snTableRowEditId === scope.row.stateeventid">
                          <el-option v-for="item in siStateList" :key="item.key" :label="item.label"
                            :value="item.value" />
                        </el-select>

                        <div v-else class="txt">{{ scope.row.eventState }}</div>
                      </template>
                    </el-table-column>
                    <!-- 状态值 -->
                    <el-table-column align="center" label="状态值" width="84">

                      <template #default="scope">
                        <el-input @Input="validateStateInput" type="number"
                          v-if="snTableRowEditId === scope.row.stateeventid" class="xrowEditItem"
                          v-model="scope.row.statenum" placeholder="输入"></el-input>
                        <div v-else class="txt">{{ scope.row.statenum }}</div>
                      </template>
                    </el-table-column>
                    <!-- 灌溉量 -->
                    <el-table-column align="center" label="氮肥(kg/ha)" width="100">

                      <template #default="scope">
                        <el-input type="number" @Input="validateNpkamountInput" id="amountInput"
                          v-if="snTableRowEditId === scope.row.stateeventid" class="xrowEditItem"
                          v-model="scope.row.namount" placeholder="输入"></el-input>
                        <div v-else class="txt">
                          {{ scope.row.namount }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="磷肥(kg/ha)" width="100">

                      <template #default="scope">
                        <el-input type="number" @Input="validateNpkamountInput" id="amountInput"
                          v-if="snTableRowEditId === scope.row.stateeventid" class="xrowEditItem"
                          v-model="scope.row.pamount" placeholder="输入"></el-input>
                        <div v-else class="txt">
                          {{ scope.row.pamount }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="钾肥(kg/ha)" width="100">

                      <template #default="scope">
                        <el-input type="number" @Input="validateNpkamountInput" id="amountInput"
                          v-if="snTableRowEditId === scope.row.stateeventid" class="xrowEditItem"
                          v-model="scope.row.kamount" placeholder="输入"></el-input>
                        <div v-else class="txt">
                          {{ scope.row.kamount }}
                        </div>
                      </template>
                    </el-table-column>

                    <el-table-column align="center" label="氮回收率" width="100">

                      <template #default="scope">
                        <el-input type="number" id="amountInput" v-if="snTableRowEditId === scope.row.stateeventid"
                          class="xrowEditItem" v-model="scope.row.nrecovery" placeholder="输入"></el-input>
                        <div v-else class="txt">
                          {{ scope.row.nrecovery }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="磷回收率" width="100">

                      <template #default="scope">
                        <el-input type="number" id="amountInput" v-if="snTableRowEditId === scope.row.stateeventid"
                          class="xrowEditItem" v-model="scope.row.precovery" placeholder="输入"></el-input>
                        <div v-else class="txt">
                          {{ scope.row.precovery }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="钾回收率" width="100">

                      <template #default="scope">
                        <el-input type="number" id="amountInput" v-if="snTableRowEditId === scope.row.stateeventid"
                          class="xrowEditItem" v-model="scope.row.krecovery" placeholder="输入"></el-input>
                        <div v-else class="txt">
                          {{ scope.row.krecovery }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column fixed="right" :show-overflow-tooltip="true" align="center" label="操作" width="100">

                      <template #default="scope"> <!-- scoped -->
                        <el-button @click="rowlineDeleteBtnSn(scope.row)" size="small" type="round" :icon="Delete"
                          circle />
                        <el-button @click="rowlineSaveBtnSn(scope.row)" size="small" type="round" :icon="Check"
                          circle />
                      </template>
                    </el-table-column>

                  </el-table>

                  <template #footer>
                    <el-button-group class="ml-4" style="float:right;">
                      <el-button @click="addSnRow" size="small" type="primary" :icon="Plus">新增</el-button>
                      <el-button @click="handleDeleteSnBtn" size="small" type="danger" :icon="Delete">删除</el-button>
                    </el-button-group>
                  </template>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="割草">
            <el-row>
              <el-col :span="12">
                <el-card class="argomCardClass" style="max-width: 480px" shadow="never">

                  <template #header>
                    <div class="card-header">
                      <span><el-text style="color:#c45656;font-size:13px;"><el-icon>
                            <Calendar />
                          </el-icon>时间事件</el-text></span>
                    </div>
                  </template>
                  <el-table ref="tmTable" class="argoTableClass" style="margin-left:-1px;height:100%;border:0;"
                    @select="setSelectTmRows" v-loading="loading" border stripe :data="timeEventTmData"
                    :row-style="{ height: 0 + 'px' }" highlight-current-row :header-cell-style="{ color: '#595959' }"
                    @row-click="tmRowClick">
                    <el-table-column type="selection" fixed width="40" />
                    <el-table-column align="center" prop="timeeventid" label="编码" width="53" />
                    <el-table-column align="center" prop="cropCalendarid" label="日志编号" width="84" />
                    <el-table-column align="center" label="日期" width="145">

                      <template #default="scope">
                        <el-date-picker @blur="validateDateInput1(scope.row.date)" format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD" id="datePicker" v-if="tmTableRowEditId === scope.row.timeeventid"
                          class="rowEditItem" v-model="scope.row.date" type="date" placeholder="选择日期" :size="small" />
                        <div v-else class="txt">{{ scope.row.date }}</div>
                      </template></el-table-column>
                    <el-table-column align="center" label="剩余生物量(kg/ha)" width="100">

                      <template #default="scope">
                        <el-input type="number" @Input="validateAmountInput" id="amountInput"
                          v-if="tmTableRowEditId === scope.row.timeeventid" class="xrowEditItem"
                          v-model="scope.row.biomassRemaining" placeholder="输入"></el-input>
                        <div v-else class="txt">
                          {{
                            scope.row.biomassRemaining }}</div>
                      </template></el-table-column>
                    <el-table-column fixed="right" :show-overflow-tooltip="true" align="center" label="操作" width="100">

                      <template #default="scope"> <!-- scoped -->
                        <el-button @click="rowlineDeleteBtnTm(scope.row)" size="small" type="round" :icon="Delete"
                          circle />
                        <el-button @click="rowlineSaveBtnTm(scope.row)" size="small" type="round" :icon="Check"
                          circle />
                      </template>
                    </el-table-column>
                  </el-table>

                  <template #footer>
                    <el-button-group class="ml-4" style="float:right;">
                      <el-button @click="addTmRow" size="small" type="primary" :icon="Plus">新增</el-button>
                      <el-button @click="handleDeleteTmBtn" size="small" type="danger" :icon="Delete">删除</el-button>
                    </el-button-group>
                  </template>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="argomCardClass" style="max-width: 480px" shadow="never">

                  <template #header>
                    <div class="card-header">
                      <span><el-text style="color:#c45656;font-size:13px;"><el-icon>
                            <Calendar />
                          </el-icon>状态事件</el-text></span>
                    </div>
                  </template>
                  <el-table ref="smTable" class="argoTableClass" style="margin-left:-1px;height:100%;border:0;"
                    @select="setSelectSmRows" :row-key="getRowKey" :key="isUpdate" :current-node-key="currentNodekeys"
                    v-loading="loading" border stripe :data="stateEventSmData" :row-style="{ height: 0 + 'px' }"
                    highlight-current-row :header-cell-style="{ color: '#595959' }" @row-click="smRowClick">
                    <el-table-column type="selection" fixed width="40" />
                    <!-- 临界条件 -->
                    <el-table-column align="center" label="临界条件" width="100">

                      <template #default="scope">
                        <el-select placeholder="选择" v-model="scope.row.zeroCondition" class="xrowEditItem"
                          v-if="smTableRowEditId === scope.row.stateeventid">
                          <el-option v-for="item in siZcList" :key="item.key" :label="item.label" :value="item.value" />
                        </el-select>
                        <div v-else class="txt">{{ scope.row.zeroCondition }}</div>
                      </template>
                    </el-table-column>
                    <!-- 状态 -->
                    <el-table-column align="center" label="状态" width="100">

                      <template #default="scope">
                        <el-select placeholder="选择" v-model="scope.row.eventState" class="xrowEditItem"
                          v-if="smTableRowEditId === scope.row.stateeventid">
                          <el-option v-for="item in siStateList" :key="item.key" :label="item.label"
                            :value="item.value" />
                        </el-select>

                        <div v-else class="txt">{{ scope.row.eventState }}</div>
                      </template>
                    </el-table-column>
                    <!-- 状态值 -->
                    <el-table-column align="center" label="状态值" width="84">

                      <template #default="scope">
                        <el-input @Input="validateStateInput" type="number"
                          v-if="smTableRowEditId === scope.row.stateeventid" class="xrowEditItem"
                          v-model="scope.row.statenum" placeholder="输入"></el-input>
                        <div v-else class="txt">{{ scope.row.statenum }}</div>
                      </template>
                    </el-table-column>
                    <!-- 剩余量 -->
                    <el-table-column align="center" label="剩余生物量(kg/ha)" width="100">

                      <template #default="scope">
                        <el-input type="number" @Input="validateAmountInput" id="amountInput"
                          v-if="smTableRowEditId === scope.row.stateeventid" class="xrowEditItem"
                          v-model="scope.row.biomassRemaining" placeholder="输入"></el-input>
                        <div v-else class="txt">
                          {{
                            scope.row.biomassRemaining }}</div>
                      </template></el-table-column>
                    <el-table-column fixed="right" :show-overflow-tooltip="true" align="center" label="操作" width="100">

                      <template #default="scope"> <!-- scoped -->
                        <el-button @click="rowlineDeleteBtnSm(scope.row)" size="small" type="round" :icon="Delete"
                          circle />
                        <el-button @click="rowlineSaveBtnSm(scope.row)" size="small" type="round" :icon="Check"
                          circle />
                      </template>
                    </el-table-column>

                  </el-table>

                  <template #footer>
                    <el-button-group class="ml-4" style="float:right;">
                      <el-button @click="addSmRow" size="small" type="primary" :icon="Plus">新增</el-button>
                      <el-button @click="handleDeleteSmBtn" size="small" type="danger" :icon="Delete">删除</el-button>
                    </el-button-group>
                  </template>
                </el-card>
              </el-col>
            </el-row>

          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="19" v-else>
        <div
          style="color:black;padding-left:13px;margin-top:-5px;margin-left:-5px;border-bottom:2px solid #e6e6e6b2; font-size:13px;line-height:40px;height:40px;text-align: left;">
          <el-text><el-icon>
              <Calendar />
            </el-icon>总计划信息</el-text>
        </div>
        <el-form class="calendarForm" :model="argoData" label-width="80px" :disabled="argoEdit">
          <el-row>
            <el-col :span="12">
              <el-form-item label="计划编号">
                <el-input :disabled="true" v-model="argoData.mid" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="计划名称">
                <el-input v-model="argoData.managename" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="创建时间">
                <el-input v-model="argoData.createtime" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="isAddEdit">
            <el-col :span="12">
              <el-form-item label="选择地区">
                <el-cascader width="200px" @change="changeDialogArea" :value="area" v-model="address"
                  :options="areaList" :props="xxprops" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="地区编号">
                <el-input :disabled="true" v-model="argoData.areacode" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="经度">
                <el-input v-model="argoData.lon" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="纬度">
                <el-input v-model="argoData.lat" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="padding-left:5px;padding-top:10px;">
          <el-button size="small" type="primary" @click="addArgo">新增</el-button>
          <el-button size="small" type="danger" @click="argoEdit = false">编辑</el-button>
          <el-button size="small" type="success" @click="saveArgo">保存</el-button>
          <el-button size="small" type="warning" @click="addCropCalendar">新增日志</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { deleteCropcalendarService, upDateCropCalendarService, getMaxCalIdService, deleteArgoService, getMaxArgoIDService, updateArgoService, getStateEventSmDataService, updateStateSmService, getMaxSmIdService, deleteSmService, getTimeEventTmDataService, updateTimeTmService, getMaxTmIdService, deleteTmService, getStateEventSnDataService, updateStateSnService, getMaxSnIdService, deleteSnService, getTimeEventTnDataService, updateTimeTnService, getMaxTnIdService, deleteTnService, deleteSiService, updateStateIrrigateService, getMaxSiIdService, getStateEventIrriDataService, deleteTiService, addTimeIrrigateService, getMaxTiIdService, updateTimeIrrigateService, getArgoService, getCropCalendarService, getTimeEventIrriDataService } from '@/api/argomanage.js'
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import { getLocationService, provinceListService, areaListService } from '@/api/area.js'

import {
  Check,
  Delete,
  Plus,
  Edit,
  Share,
} from '@element-plus/icons-vue'
import { cropDataBycategoryService } from "@/api/cropcategory.js"
import cloneDeep from 'lodash/cloneDeep'
import { ElMessageBox, ElMessage } from 'element-plus'
import { UserInfoStore } from '@/stores/userInfo.js'
import { update } from 'lodash'
const isEdit = ref(false)
const argoEdit = ref(false)
const caledit = ref(true)
const address = ref([])
const areaList = ref([])
const userInfoStore = UserInfoStore();
const data = ref([])
const info3 = ref(false)
const treeRef = ref(null)
const isValidateAmountInput = ref(false)
const timeEventIrriData = ref([])
const irrigateState = ref("0")
const currentNodekeys = ref('')
const tiTableRowEditId = ref(null)
const tiTableRowEditRow = ref({})
const tiAddState = ref(false)
const argoData = ref({})
const info2 = ref(false)
const tiTable = ref(null)
const isAddEdit = ref(false)
const isAddCal = ref(false)
const siStateList = ref([
  { key: 1, value: 'DVS', label: "DVS-发展阶段" },
  { key: 2, value: 'LAI', label: "LAI-叶面积指数" },
  { key: 3, value: 'TAGP', label: "TAGP-地上总干重" },
  { key: 4, value: 'TWSO', label: "TWSO-存储器官干重" },
  { key: 5, value: 'TWLV', label: "TWLV-叶干重" },
  { key: 6, value: 'TWST', label: "TWST-茎重" },
  { key: 7, value: 'TWRT', label: "TWRT-根重" },
  { key: 8, value: 'TRA', label: "TRA-蒸腾速率" },
  { key: 9, value: 'RD', label: "RD-根深" },
  { key: 10, value: 'SM', label: "SM-土壤湿度" },
  { key: 11, value: 'WWLOW', label: "WWLOW-水限的水分吸收" }
])
const siZcList = ref([
  { key: 1, value: 'falling', label: "falling" },
  { key: 2, value: 'rising', label: "rising" },
  { key: 3, value: 'either', label: "either" }
])
//si
const siTable = ref(null)
const stateEventIrriData = ref([])
const siTableRowEditId = ref(null)
const siTableRowEditRow = ref({})
const categoryname = ref([
  { key: 1, value: "粮食作物", label: "粮食作物" },
  { key: 2, value: "油料作物", label: "油料作物" },
  { key: 3, value: "纤维作物", label: "纤维作物" },
  { key: 4, value: "糖料作物", label: "糖料作物" },
  { key: 5, value: "嗜好作物", label: "嗜好作物" }
])
//施肥tnnn
//si
const tnTable = ref(null)
const timeEventTnData = ref([])
const tnTableRowEditId = ref(null)
const tnTableRowEditRow = ref({})
const snTable = ref(null)
const stateEventSnData = ref([])
const snTableRowEditId = ref(null)
const snTableRowEditRow = ref({})

const tmTable = ref(null)
const timeEventTmData = ref([])
const tmTableRowEditId = ref(null)
const tmTableRowEditRow = ref({})

const smTable = ref(null)
const stateEventSmData = ref([])
const smTableRowEditId = ref(null)
const smTableRowEditRow = ref({})
const cropnameList = ref([])
//日志基本信息
const cropcalendarData = ref({
  cropCalendarid: '',
  argomid: 1,
  landid: 370,
  plandate: "2021-07-26",
  cropName: "马铃薯",
  varietyName: "Festien",
  cropStartDate: "2021-09-30",
  cropStartType: "出苗",
  cropEndDate: "2021-12-24",
  cropEndType: "收获",
  maxDuration: 110,
  category: '',
  id: 2,
  flag: 1
})
const changeDialogArea = async (val) => {
  argoData.value.areacode = val[val.length - 1].code
  // 获取经纬度
  let xxcode = argoData.value.areacode.replace(' ', '')
  // 获取经纬度
  let result0 = await getLocationService(xxcode, 1)
  if (result0.data.length == 0) result0 = await getLocationService(xxcode, 2)

  if (result0.data.length == 0) result0 = await getLocationService(xxcode, 3)

  argoData.value.lon = result0.data[0].lng84
  argoData.value.lat = result0.data[0].lat84

}
const customNodeClass = (data, node) => {
  // node.label = data.name
  if (data.level === 1) {
    return 'levelFirst'
  } else if (data.level === 2) {
    return 'levelSecond'
  }
}
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
const xxprops = {
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
  result.data.unshift({ name: '全部', label: '全部', id: '0', leaf: true })
  areaList.value = result.data
}
getProvinceList() //首先调用
const props = {
  id: 'id',
  label: 'label',
  children: 'children',
  isLeaf: 'leaf',
  flag: 'flag',
  class: customNodeClass
}
const isFinishState = ref(false)
const isStartState = ref(false)
const isDoingState = ref(false)
const dataLoaded = ref(false);
const treeExpandData = ref([])
const getData = async () => {
  //先获取第一层数据
  let result1 = await getArgoService({ flag: 0 })
  for (let i = 0; i < result1.data.length; i++) {
    result1.data[i].id = result1.data[i].mid
    result1.data[i].label = result1.data[i].managename
  }
  data.value = result1.data
  data.value = cloneDeep(data.value)
  treeExpandData.value.push(data.value[0].id)

}
getData()
//获取数据
const loadNode = async (node, resolve) => {
  if (node.level === 0) {
    // console.log("11111111", data.value)
    // treeExpandData.value.push(data.value[0].id)
    return resolve([data.value])
  } else {
    let result1
    result1 = await getCropCalendarService({ argomid: node.data.mid, flag: 0 })
    for (let i = 0; i < result1.data.length; i++) {
      result1.data[i].id = result1.data[i].cropCalendarid
      result1.data[i].label = result1.data[i].plandate + ' ' + result1.data[i].cropName
      result1.data[i].leaf = true
      //获取是否完成的状态 flag=-1未开始 flag=0进行中 flag=1已完成
      let nowDateTime = new Date()
      let year = nowDateTime.getFullYear();
      let month = ('0' + (nowDateTime.getMonth() + 1)).slice(-2);
      let day = ('0' + nowDateTime.getDate()).slice(-2);
      let nowDate = new Date(year + '-' + month + '-' + day)
      if (new Date(result1.data[i].cropStartDate) > nowDate) result1.data[i].flag = -1
      if (new Date(result1.data[i].cropEndDate >= nowDate) && new Date(result1.data[i].cropStartDate) < nowDate) result1.data[i].flag = 0
      if (new Date(result1.data[i].cropEndDate) <= nowDate) result1.data[i].flag = 1
    }
    nextTick(() => {
      currentNodekeys.value = result1.data[0].id
      let xnode = {}
      xnode.data = result1.data[0]
      xnode.level = 2
      xnode.parent = node
      treeNodeClick(null, xnode, null, null)

    })
    resolve(result1.data)
  }
}
//d点击树ttttttttttttttt
const treeNodeClick = async (treeobj, node, treenode, event) => {
  tiTableRowEditId.value = ''
  siTableRowEditId.value = ''
  tnTableRowEditId.value = ''
  snTableRowEditId.value = ''
  tmTableRowEditId.value = ''
  smTableRowEditId.value = ''
  if (node.level == 2) {
    info2.value = true
    let xdata = node.data
    xdata.argoname = node.parent.data.managename
    for (let i = 0; i < xdata.length; i++) xdata[i].isEdit = false
    cropcalendarData.value = xdata
    //获取灌溉时间事件
    let result1 = await getTimeEventIrriDataService({ cropcalendarid: cropcalendarData.value.cropCalendarid })
    timeEventIrriData.value = result1.data
    //获取灌溉状态事件
    let result2 = await getStateEventIrriDataService({ cropcalendarid: cropcalendarData.value.cropCalendarid })
    stateEventIrriData.value = result2.data
    //施肥时间事件
    let result3 = await getTimeEventTnDataService({ cropcalendarid: cropcalendarData.value.cropCalendarid })
    timeEventTnData.value = result3.data
    //施肥状态事件
    let result4 = await getStateEventSnDataService({ cropcalendarid: cropcalendarData.value.cropCalendarid })
    stateEventSnData.value = result4.data

    //割草时间事件
    let result5 = await getTimeEventTmDataService({ cropcalendarid: cropcalendarData.value.cropCalendarid })
    timeEventTmData.value = result5.data
    //割草状态事件
    let result6 = await getStateEventSmDataService({ cropcalendarid: cropcalendarData.value.cropCalendarid })
    stateEventSmData.value = result6.data
  }
  else if (node.level == 1) {
    info2.value = false
    argoData.value = node.data
    argoEdit.value = true
    console.log("cc", node.parent)
  }
}
const filterFn = (value, data, node) => {
  //1.没有任何过滤
  if (value == 'all') {
    return true
  }
  //2.已完成的
  else if (value == 'finish') {
    if (node.level == 2) {
      if (node.data.flag == 1) return true
      else return false
    } else {
      return true
    }
  }
  //3.未开始的
  else if (value == 'start') {
    if (node.level == 2) {
      if (node.data.flag == -1) return true
      else return false
    } else {
      return true
    }
  }
  //4.进行中的
  else if (value == 'doing') {
    if (node.level == 2) {
      if (node.data.flag == 0) return true
      else return false
    } else {
      return true
    }
  }
  //5.已完成的+未开始的
  else if (value == 'fs') {
    if (node.level == 2) {
      if (node.data.flag == 0) return false
      else return true
    } else {
      return true
    }
  }
  //6.已完成的+进行中的
  else if (value == 'fd') {
    if (node.level == 2) {
      if (node.data.flag == -1) return false
      else return true
    } else {
      return true
    }
  }
  //7.未开始的+进行中的
  else if (value == 'sd') {
    if (node.level == 2) {
      if (node.data.flag == 1) return false
      else return true
    } else {
      return true
    }
  }
  //7.已完成的+未开始的+进行中的


}
const getFilterData = () => {
  //1.没有任何过滤
  if (isFinishState.value == false && isStartState.value == false && isDoingState.value == false) {
    //获取所有已经展开的节点
    treeRef.value.filter('all')
  }
  //2.已完成的
  else if (isFinishState.value == true && isStartState.value == false && isDoingState.value == false) {
    treeRef.value.filter('finish')
  }
  //3.未开始的
  else if (isFinishState.value == false && isStartState.value == true && isDoingState.value == false) {
    treeRef.value.filter('start')
  }
  //4.进行中的
  else if (isFinishState.value == false && isStartState.value == false && isDoingState.value == true) {
    treeRef.value.filter('doing')
  }
  //5.已完成的+未开始的
  else if (isFinishState.value == true && isStartState.value == true && isDoingState.value == false) {
    treeRef.value.filter('fs')
  }
  //6.已完成的+进行中的
  else if (isFinishState.value == true && isStartState.value == false && isDoingState.value == true) {
    treeRef.value.filter('fd')
  }
  //7.未开始的+进行中的
  else if (isFinishState.value == false && isStartState.value == true && isDoingState.value == true) {
    treeRef.value.filter('sd')
  }
  //8.未开始的+进行中的+已完成的
  else if (isFinishState.value == true && isStartState.value == true && isDoingState.value == true) {
    treeRef.value.filter('all')
  }
}
const changeCategory = async (val) => {
  let params = { category: categoryname.value[val - 1].label }
  let result = await cropDataBycategoryService(params)
  cropnameList.value = result.data
  cropcalendarData.value.cropName = cropnameList.value[0].cropname
}
const selectTiRows = ref(null)
const selectSiRows = ref(null)
const selectTnRows = ref(null)
const selectSnRows = ref(null)
const selectTmRows = ref(null)
const selectSmRows = ref(null)
const setSelectTnRows = (selection) => {
  selectTnRows.value = selection //注意 selection是所有的选中行，不是当前勾选的行
}
const addCropCalendar = async () => {
  info2.value = true
  info3.value = true
  caledit.value = false
  isAddCal.value = true
  ////ddddddddddddd
  timeEventIrriData.value = []
  timeEventTnData.value = []
  timeEventTmData.value = []
  stateEventIrriData.value = []
  stateEventSnData.value = []
  stateEventSmData.value = []
  let result1 = await getMaxCalIdService(argoData.value.mid)
  cropcalendarData.value = {
    cropCalendarid: result1.data + 1,
    argomid: argoData.value.mid,
    argoname: argoData.value.managename,
    landid: '',
    plandate: formatDate(new Date()).split(' ')[0],
    cropName: "",
    varietyName: "",
    cropStartDate: "",
    cropStartType: "",
    cropEndDate: "",
    cropEndType: "",
    maxDuration: '',
    category: '',
    id: '',
    flag: 0
  }
}
const setSelectTiRows = (selection) => {
  selectTiRows.value = selection //注意 selection是所有的选中行，不是当前勾选的行
}
const setSelectTmRows = (selection) => {
  selectTmRows.value = selection //注意 selection是所有的选中行，不是当前勾选的行
}
const setSelectSiRows = (selection) => {
  selectSiRows.value = selection //注意 selection是所有的选中行，不是当前勾选的行
}
const setSelectSnRows = (selection) => {
  selectSnRows.value = selection //注意 selection是所有的选中行，不是当前勾选的行
}
const setSelectSmRows = (selection) => {
  selectSmRows.value = selection //注意 selection是所有的选中行，不是当前勾选的行
}
//灌溉时间事件的点击行事件ttttiiii
const tiRowClick = (row, column, event) => {
  // 先看刚刚保存的tiTableRowEditId
  // 把刚刚的保存到数据库
  let result1
  // if (tiTableRowEditRow.value != {}) {
  //   result1 = updateTimeIrrigateService(tiTableRowEditRow.value)
  // }
  tiTableRowEditId.value = row.timeeventid //设置编辑
  tiTableRowEditRow.value = row
}
const tmRowClick = (row, column, event) => {
  // 先看刚刚保存的tiTableRowEditId
  // 把刚刚的保存到数据库
  tmTableRowEditId.value = row.timeeventid //设置编辑
  tmTableRowEditRow.value = row
}
const snRowClick = (row, column, event) => {
  // 先看刚刚保存的tiTableRowEditId
  // 把刚刚的保存到数据库

  snTableRowEditId.value = row.stateeventid //设置编辑
  snTableRowEditRow.value = row
}
const smRowClick = (row, column, event) => {
  // 先看刚刚保存的tiTableRowEditId
  // 把刚刚的保存到数据库

  smTableRowEditId.value = row.stateeventid //设置编辑
  smTableRowEditRow.value = row
}
const siRowClick = (row, column, event) => {
  // 先看刚刚保存的tiTableRowEditId
  // 把刚刚的保存到数据库
  siTableRowEditId.value = row.stateeventid //设置编辑
  siTableRowEditRow.value = row
}
//施肥
const tnRowClick = (row, column, event) => {
  // 先看刚刚保存的tiTableRowEditId
  // 把刚刚的保存到数据库
  tnTableRowEditId.value = row.timeeventid //设置编辑
  tnTableRowEditRow.value = row
}
///ssstttii
const rowlineSaveBtnTi = (row) => {
  let result1

  if (row.date != '' && row.irrigationAmount != '') {
    result1 = updateTimeIrrigateService(row)
    ElMessage({
      message: '保存成功',
      type: 'success',
      offset: window.screen.height / 3.5
    })
    tiTableRowEditId.value = ''
    nextTick(() => {
      tiTable.value.setCurrentRow()
      tiTableRowEditId.value = ''
    })
    tiTable.value.setCurrentRow()
  } else {
    ElMessage({
      message: '请检查字段是否为空',
      type: 'error',
      offset: window.screen.height / 3.5
    })
  }
}
const saveCropCalendar = async () => {
  //sssssssssssssssss
  let result = await upDateCropCalendarService(cropcalendarData.value)
  caledit.value = true
  ElMessage.success('保存成功')
  if (isAddCal.value == true) {
    let xdata = cropcalendarData.value
    xdata.label = xdata.plandate + ' ' + xdata.cropName
    xdata.id = xdata.cropCalendarid
    xdata.isLeaf = true
    xdata.level = 2
    treeRef.value.append(xdata, xdata.argomid)
    nextTick(() => {
      treeRef.value.setCurrentKey(xdata.id)
      let xnode = {}
      xnode.data = xdata
      xnode.level = 2
      xnode.isLeaf = true
      treeNodeClick(null, xnode, null, null)
    })
    isAddCal.value == false
  }
  caledit.value = true
}
const rowlineSaveBtnTn = (row) => {

  let result1
  if (row.date != '' && row.namount != '' && row.pamount != '' && row.kamount != '') {
    result1 = updateTimeTnService(row)
    ElMessage({
      message: '保存成功',
      type: 'success',
      offset: window.screen.height / 3.5
    })
    nextTick(() => { tnTable.value.setCurrentRow() })
    tnTable.value.setCurrentRow()
  } else {
    ElMessage({
      message: '请检查字段是否为空',
      type: 'error',
      offset: window.screen.height / 3.5
    })
  }
}
const rowlineSaveBtnTm = (row) => {
  console.log(row)
  let result1
  if (row.date != '' && row.biomassRemaining != '') {
    result1 = updateTimeTmService(row)
    ElMessage({
      message: '保存成功',
      type: 'success',
      offset: window.screen.height / 3.5
    })
    nextTick(() => { tmTable.value.setCurrentRow() })
    tmTable.value.setCurrentRow()
  } else {
    ElMessage({
      message: '请检查字段是否为空',
      type: 'error',
      offset: window.screen.height / 3.5
    })
  }
}
const rowlineSaveBtnSi = (row) => {

  let result1
  if (row.eventState != '' && row.zeroCondition != '' && row.statenum != '' && row.irrigationAmount != '') {
    result1 = updateStateIrrigateService(row)
    ElMessage({
      message: '保存成功',
      type: 'success',
      offset: window.screen.height / 3.5
    })
    nextTick(() => { siTable.value.setCurrentRow(null) })
    siTable.value.setCurrentRow()
  }
  else {
    ElMessage({
      message: '请检查字段是否为空',
      type: 'error',
      offset: window.screen.height / 3.5
    })
  }
}
const rowlineSaveBtnSn = (row) => {
  let result1
  console.log("mmmm", row)
  if (row.eventState != '' && row.zeroCondition != '' && row.statenum != '' && row.namount != '' && row.pamount != '' && row.kamount != '') {
    result1 = updateStateSnService(row)
    ElMessage({
      message: '保存成功',
      type: 'success',
      offset: window.screen.height / 3.5
    })
    nextTick(() => { snTable.value.setCurrentRow(null) })
    snTable.value.setCurrentRow()
  }
  else {
    ElMessage({
      message: '请检查字段是否为空',
      type: 'error',
      offset: window.screen.height / 3.5
    })
  }
}
const rowlineSaveBtnSm = (row) => {
  let result1
  if (row.eventState != '' && row.zeroCondition != '' && row.statenum != '' && row.biomassRemaining != '') {
    result1 = updateStateSmService(row)
    ElMessage({
      message: '保存成功',
      type: 'success',
      offset: window.screen.height / 3.5
    })
    nextTick(() => { smTable.value.setCurrentRow(null) })
    smTable.value.setCurrentRow()
  }
  else {
    ElMessage({
      message: '请检查字段是否为空',
      type: 'error',
      offset: window.screen.height / 3.5
    })
  }
}
const deleteTi = (timeeventid) => {
  let result = deleteTiService(timeeventid)
}
const deleteSi = (stateeventid) => {
  let result = deleteSiService(stateeventid)
}
const deleteTn = (timeeventid) => {
  let result = deleteTnService(timeeventid)
}
const deleteTm = (timeeventid) => {
  let result = deleteTmService(timeeventid)
}
const deleteSn = (stateeventid) => {
  let result = deleteSnService(stateeventid)
}
const deleteSm = (stateeventid) => {
  let result = deleteSmService(stateeventid)
}

const saveArgo = async () => {
  console.log("cccccccc", argoData.value)
  let xdata = argoData.value
  xdata.userid = userInfoStore.info.userId
  let result = await updateArgoService(xdata)
  argoEdit.value = true
  ElMessage.success('保存成功')
  if (isAddEdit.value == true) {
    xdata.label = xdata.managename
    xdata.id = xdata.mid
    xdata.isLeaf = true
    xdata.level = 1
    treeRef.value.append(xdata, 0)
    nextTick(() => {
      treeRef.value.setCurrentKey(xdata.id)
    })
    isAddEdit.value == false
  }
}
//////dti
const rowlineDeleteBtnTn = (row) => {
  ElMessageBox.confirm(
    '确认删除编号为' + row.timeeventid + '的施肥时间事件吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then((action, instance, done) => {
    if (action === 'confirm') {
      timeEventTnData.value.forEach((v, i) => {
        if (row.timeeventid === v.timeeventid) {
          timeEventTnData.value.splice(i, 1);
          deleteTn(row.timeeventid);
        }
      });
      //getcategoryList()
      ElMessage({
        type: 'success',
        message: '已删除',
        offset: window.screen.height / 3.5
      })
    }

  })
}
const rowlineDeleteBtnTm = (row) => {
  ElMessageBox.confirm(
    '确认删除编号为' + row.timeeventid + '的除草时间事件吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then((action, instance, done) => {
    if (action === 'confirm') {
      timeEventTmData.value.forEach((v, i) => {
        if (row.timeeventid === v.timeeventid) {
          timeEventTmData.value.splice(i, 1);
          deleteTn(row.timeeventid);
        }
      });
      //getcategoryList()
      ElMessage({
        type: 'success',
        message: '已删除',
        offset: window.screen.height / 3.5
      })
    }

  })
}
const rowlineDeleteBtnTi = (row) => {
  ElMessageBox.confirm(
    '确认删除编号为' + row.timeeventid + '的灌溉时间事件吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then((action, instance, done) => {
    if (action === 'confirm') {
      timeEventIrriData.value.forEach((v, i) => {
        if (row.timeeventid === v.timeeventid) {
          timeEventIrriData.value.splice(i, 1);
          deleteTi(row.timeeventid);
        }
      });
      //getcategoryList()
      ElMessage({
        type: 'success',
        message: '已删除',
        offset: window.screen.height / 3.5
      })
    }

  })
}
const rowlineDeleteBtnSi = (row) => {
  ElMessageBox.confirm(
    '确认删除编号为' + row.stateeventid + '的灌溉状态事件吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then((action, instance, done) => {
    if (action === 'confirm') {
      stateEventIrriData.value.forEach((v, i) => {
        if (row.stateeventid === v.stateeventid) {
          stateEventIrriData.value.splice(i, 1);
          deleteSi(row.stateeventid);
        }
      });
      //getcategoryList()
      ElMessage({
        type: 'success',
        message: '已删除',
        offset: window.screen.height / 3.5
      })
    }

  })
}
const rowlineDeleteBtnSn = (row) => {
  ElMessageBox.confirm(
    '确认删除编号为' + row.stateeventid + '的施肥状态事件吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then((action, instance, done) => {
    if (action === 'confirm') {
      stateEventSnData.value.forEach((v, i) => {
        if (row.stateeventid === v.stateeventid) {
          stateEventSnData.value.splice(i, 1);
          deleteSn(row.stateeventid);
        }
      });
      //getcategoryList()
      ElMessage({
        type: 'success',
        message: '已删除',
        offset: window.screen.height / 3.5
      })
    }

  })
}
const rowlineDeleteBtnSm = (row) => {
  ElMessageBox.confirm(
    '确认删除编号为' + row.stateeventid + '的除草状态事件吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then((action, instance, done) => {
    if (action === 'confirm') {
      stateEventSmData.value.forEach((v, i) => {
        if (row.stateeventid === v.stateeventid) {
          stateEventSmData.value.splice(i, 1);
          deleteSm(row.stateeventid);
        }
      });
      //getcategoryList()
      ElMessage({
        type: 'success',
        message: '已删除',
        offset: window.screen.height / 3.5
      })
    }

  })
}
const handleDeleteTiBtn = () => {
  if (selectTiRows.value !== null) {
    const deleteRows = selectTiRows.value
    // console.log(JSON.parse(JSON.stringify(selectRows))['_rawValue'])
    ElMessageBox.confirm(
      selectTiRows.value.length > 1 ? '确认删除编号' + deleteRows[0].timeeventid + '...等共' + selectTiRows.value.length + '行灌溉时间事件吗?' : '确认删除编号' + deleteRows[0].timeeventid + '的灌溉时间事件?',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then((action, instance, done) => {
      if (action === 'confirm') {
        let rows1 = selectTiRows.value; //checkedDetail为表格多选选中的数组
        rows1.forEach((rows1, index) => {
          timeEventIrriData.value.forEach((v, i) => {
            if (rows1.timeeventid === v.timeeventid) {
              timeEventIrriData.value.splice(i, 1);
              deleteTi(rows1.timeeventid);

            }
          });

        });
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      }
    })
  }
}
const handleDeleteTnBtn = () => {
  if (selectTnRows.value !== null) {
    const deleteRows = selectTnRows.value
    // console.log(JSON.parse(JSON.stringify(selectRows))['_rawValue'])
    ElMessageBox.confirm(
      selectTnRows.value.length > 1 ? '确认删除编号' + deleteRows[0].timeeventid + '...等共' + selectTnRows.value.length + '行施肥时间事件吗?' : '确认删除编号' + deleteRows[0].timeeventid + '的施肥时间事件?',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then((action, instance, done) => {
      if (action === 'confirm') {
        let rows1 = selectTnRows.value; //checkedDetail为表格多选选中的数组
        rows1.forEach((rows1, index) => {
          timeEventTnData.value.forEach((v, i) => {
            if (rows1.timeeventid === v.timeeventid) {
              timeEventTnData.value.splice(i, 1);
              deleteTn(rows1.timeeventid);

            }
          });

        });
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      }
    })
  }
}
const handleDeleteSiBtn = () => {
  if (selectSiRows.value !== null) {
    const deleteRows = selectSiRows.value
    // console.log(JSON.parse(JSON.stringify(selectRows))['_rawValue'])
    ElMessageBox.confirm(
      selectSiRows.value.length > 1 ? '确认删除编号' + deleteRows[0].stateeeventid + '...等共' + selectSiRows.value.length + '行灌溉状态事件吗?' : '确认删除编号' + deleteRows[0].stateeventid + '的灌溉状态事件?',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then((action, instance, done) => {
      if (action === 'confirm') {
        let rows1 = selectSiRows.value; //checkedDetail为表格多选选中的数组
        rows1.forEach((rows1, index) => {
          stateEventIrriData.value.forEach((v, i) => {
            if (rows1.stateeventid === v.stateeventid) {
              stateEventIrriData.value.splice(i, 1);
              deleteSi(rows1.stateeventid);
            }
          });

        });
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      }
    })
  }
}
const handleDeleteSnBtn = () => {
  if (selectSnRows.value !== null) {
    const deleteRows = selectSnRows.value
    // console.log(JSON.parse(JSON.stringify(selectRows))['_rawValue'])
    ElMessageBox.confirm(
      selectSnRows.value.length > 1 ? '确认删除编号' + deleteRows[0].stateeeventid + '...等共' + selectSnRows.value.length + '行施肥状态事件吗?' : '确认删除编号' + deleteRows[0].stateeventid + '的施肥状态事件?',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then((action, instance, done) => {
      if (action === 'confirm') {
        let rows1 = selectSnRows.value; //checkedDetail为表格多选选中的数组
        rows1.forEach((rows1, index) => {
          stateEventSnData.value.forEach((v, i) => {
            if (rows1.stateeventid === v.stateeventid) {
              stateEventSnData.value.splice(i, 1);
              deleteSn(rows1.stateeventid);
            }
          });

        });
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      }
    })
  }
}
const handleDeleteSmBtn = () => {
  if (selectSmRows.value !== null) {
    const deleteRows = selectSmRows.value
    // console.log(JSON.parse(JSON.stringify(selectRows))['_rawValue'])
    ElMessageBox.confirm(
      selectSmRows.value.length > 1 ? '确认删除编号' + deleteRows[0].stateeeventid + '...等共' + selectSmRows.value.length + '行除草状态事件吗?' : '确认删除编号' + deleteRows[0].stateeventid + '的除草状态事件?',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then((action, instance, done) => {
      if (action === 'confirm') {
        let rows1 = selectSmRows.value; //checkedDetail为表格多选选中的数组
        rows1.forEach((rows1, index) => {
          stateEventSmData.value.forEach((v, i) => {
            if (rows1.stateeventid === v.stateeventid) {
              stateEventSmData.value.splice(i, 1);
              deleteSm(rows1.stateeventid);
            }
          });

        });
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      }
    })
  }
}
const handleDeleteTmBtn = () => {
  if (selectTmRows.value !== null) {
    const deleteRows = selectTmRows.value
    // console.log(JSON.parse(JSON.stringify(selectRows))['_rawValue'])
    ElMessageBox.confirm(
      selectTmRows.value.length > 1 ? '确认删除编号' + deleteRows[0].timeeventid + '...等共' + selectTmRows.value.length + '行除草时间事件吗?' : '确认删除编号' + deleteRows[0].timeeventid + '的除草时间事件?',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then((action, instance, done) => {
      if (action === 'confirm') {
        let rows1 = selectTmRows.value; //checkedDetail为表格多选选中的数组
        rows1.forEach((rows1, index) => {
          timeEventTmData.value.forEach((v, i) => {
            if (rows1.timeeventid === v.timeeventid) {
              timeEventTmData.value.splice(i, 1);
              deleteTm(rows1.timeeventid);
            }
          });

        });
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      }
    })
  }
}
//aaattttii
const addTiRow = async () => {
  let result1 = await getMaxTiIdService()
  tiAddState.value = true
  let row = {}
  row.cropCalendarid = cropcalendarData.value.cropCalendarid
  row.timeeventid = result1.data + 1
  row.date = ''
  row.irrigationamount = ''
  timeEventIrriData.value.push(row)
  // tiTable.value.setCurrentRow()
  nextTick(() => {
    tiTable.value.setCurrentRow(row)
    tiRowClick(row, null, null)
  })
}
const tnAddState = ref(false)
const addTnRow = async () => {
  let result1 = await getMaxTnIdService()
  tnAddState.value = true
  let row = {}
  row.cropCalendarid = cropcalendarData.value.cropCalendarid
  row.timeeventid = result1.data + 1
  row.date = ''
  row.namount = ''
  row.pamount = ''
  row.kamount = ''
  row.nrecovery = ''
  row.precovery = ''
  row.krecovery = ''
  timeEventTnData.value.push(row)
  // tiTable.value.setCurrentRow()
  nextTick(() => {
    tnTable.value.setCurrentRow(row)
    tnRowClick(row, null, null)
  })
}
const tmAddState = ref(false)
const addTmRow = async () => {
  let result1 = await getMaxTmIdService()
  tmAddState.value = true
  let row = {}
  row.cropCalendarid = cropcalendarData.value.cropCalendarid
  row.timeeventid = result1.data + 1
  row.date = ''
  row.biomassRemaining = ''
  timeEventTmData.value.push(row)
  // tiTable.value.setCurrentRow()
  nextTick(() => {
    tmTable.value.setCurrentRow(row)
    tmRowClick(row, null, null)
  })
}
//aaasssii
const deleteTreenode = async (node, xdata) => {
  if (node.level == 1) {
    ElMessageBox.confirm(
      '确认删除农事计划' + node.data.managename + '吗？其中包括它的所有时间、状态事件',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(async () => {
        //从前端先删除
        let xxxdata = data.value
        let parent = node.parent
        let children = parent.data.children || parent.data
        let xindex

        //1.先删除后端的生态类型
        try {
          //1.先删除后端的生态类型
          let result = await deleteArgoService(node.data.mid)
          let result1 = await getArgoService({ flag: 0 })
          for (let i = 0; i < result1.data.length; i++) {
            result1.data[i].id = result1.data[i].mid
            result1.data[i].label = result1.data[i].managename
          }
          data.value = result1.data
          data.value = cloneDeep(data.value)
          treeExpandData.value = []
          nextTick(() => {
            currentNodekeys.value = result1.data[0].id
            let xnode = {}
            xnode.data = result1.data[0]
            xnode.level = 1
            xnode.parent = null
            treeNodeClick(null, xnode, null, null)

          })

        }
        catch {

        }
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      })
      .catch(() => {

      })
  } else if (node.level == 2) {
    ElMessageBox.confirm(
      '确认删除农事日志' + node.data.label + '吗？其中包括它的所有时间、状态事件',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(async () => {
        //从前端先删除
        let xxxdata = data.value
        let parent = node.parent
        let children = parent.data.children || parent.data
        let xindex

        //1.先删除后端的生态类型
        try {
          //1.先删除后端的生态类型
          let result = await deleteCropcalendarService(node.data.cropCalendarid)
          let result1 = await getArgoService({ flag: 0 })
          let xnid = 0
          for (let i = 0; i < result1.data.length; i++) {
            result1.data[i].id = result1.data[i].mid
            if (result1.data[i].id == parent.data.mid) {
              xnid = i
            }
            result1.data[i].label = result1.data[i].managename
          }
          data.value = result1.data
          data.value = cloneDeep(data.value)
          treeExpandData.value = [parent.data.mid]
          nextTick(() => {
            currentNodekeys.value = result1.data[xnid].id
            let xnode = {}
            xnode.data = result1.data[0]
            xnode.level = 1
            xnode.parent = null
            treeNodeClick(null, xnode, null, null)

          })

        }
        catch {

        }
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      })
      .catch(() => {

      })
  }
}
const siAddState = ref(false)
const addSiRow = async () => {
  let result1 = await getMaxSiIdService()
  siAddState.value = true
  let row = {}
  row.cropCalendarid = cropcalendarData.value.cropCalendarid
  row.stateeventid = result1.data + 1
  row.eventState = ''
  row.zeroCondition = ''
  row.statenum = ''
  row.irrigationAmount = ''
  stateEventIrriData.value.push(row)
  // tiTable.value.setCurrentRow()
  nextTick(() => {
    siTable.value.setCurrentRow(row)
    siRowClick(row, null, null)
  })
}
const snAddState = ref(false)
const addSnRow = async () => {
  let result1 = await getMaxSnIdService()
  snAddState.value = true
  let row = {}
  row.cropCalendarid = cropcalendarData.value.cropCalendarid
  row.stateeventid = result1.data + 1
  row.eventState = ''
  row.zeroCondition = ''
  row.statenum = ''
  row.namount = ''
  row.pamount = ''
  row.kamount = ''
  row.nrecovery = ''
  row.precovery = ''
  row.krecovery = ''
  stateEventSnData.value.push(row)
  // tiTable.value.setCurrentRow()
  nextTick(() => {
    snTable.value.setCurrentRow(row)
    snRowClick(row, null, null)
  })
}
const smAddState = ref(false)
const addSmRow = async () => {
  let result1 = await getMaxSmIdService()
  smAddState.value = true
  let row = {}
  row.cropCalendarid = cropcalendarData.value.cropCalendarid
  row.stateeventid = result1.data + 1
  row.eventState = ''
  row.zeroCondition = ''
  row.statenum = ''
  row.biomassRemaining = ''
  stateEventSmData.value.push(row)
  // tiTable.value.setCurrentRow()
  nextTick(() => {
    smTable.value.setCurrentRow(row)
    smRowClick(row, null, null)
  })
}
//验证
const validateAmountInput = (val) => {
  if (val == '' || val == null || val == undefined) {
    ElMessage({
      message: '灌溉量不能为空',
      type: 'error',
      offset: window.screen.height / 3.5
    })
  }
}

const validateNpkamountInput = (val) => {
  if (val == '' || val == null || val == undefined) {
    ElMessage({
      message: '施肥量不能为空',
      type: 'error',
      offset: window.screen.height / 3.5
    })
  }
}
const validateStateInput = (val) => {
  if (val == '' || val == null || val == undefined) {
    ElMessage({
      message: '状态值不能为空',
      type: 'error',
      offset: window.screen.height / 3.5
    })
  }
}
const validateDateInput1 = (val) => {
  if (val == '' || val == null || val == undefined) {
    ElMessage({
      message: '日期不能为空',
      type: 'error',
      offset: window.screen.height / 3.5
    })
  }
}
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
const addArgo = async () => {
  isAddEdit.value = true
  argoEdit.value = false
  // 获取编码
  let result0 = await getMaxArgoIDService()
  argoData.value = {
    mid: result0.data + 1,
    flag: 0,
    managename: "",
    userid: userInfoStore.info.userId,
    createtime: formatDate(new Date()),
    areacode: '',
    lon: '',
    lat: '',
    id: ''
  }

}
</script>

<style lang="scss">
.mTreepanel {
  height: 92vh;
  border-right: 2px solid #e6e6e6b2;

  .el-tree {
    height: 95%;
    --el-tree-node-hover-bg-color: #ffebce;
    margin: 0px;
    overflow: auto;
  }
}

.calendarForm {

  padding-top: 10px;
  padding-right: 5px;
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

.argoTableClass {
  border-right: 0;

  .el-table__header {
    th {
      padding: 0 !important;
      height: 30px;
      line-height: 30px;
      // background-color: #5e8dff;
      color: '#606266';
      font-weight: 500;
    }
  }

  //行高
  td {
    padding: 0 !important;
    height: 32px;
    line-height: 32px;
    font-size: 13.5px;

  }

  .el-table__body tr.current-row>td {
    background-color: #e9b15e !important;
    color: #ffffff;
  }

  .el-table__body tr.current-row {
    .el-input__wrapper {
      background-color: transparent;
      box-shadow: 0 0 0 0;
      width: 100%;
    }

    .el-input__inner {
      font-family: 'Times New Roman', Times, serif;
      font-size: 13.5px;
      color: #ffffff;
    }

    .el-input__prefix-inner>:first-child,
    .el-input__prefix-inner>:first-child.el-input__icon {
      color: #ffffff;
    }
  }
}

.argomTabClass {
  .el-tabs__content {
    padding: 0 !important;
  }
}

.argomCardClass {
  border-radius: 0;
  height: 58vh;

  .el-card__body {
    padding: 0;
    height: 80%;
  }

  .el-card__header {
    height: 30px;
  }

  .el-card__footer {
    height: 40px;
    padding: 5px;
  }
}

.rowEditItem {
  .el-input__wrapper {
    background-color: transparent;
    box-shadow: 0 0 0 0;
    width: 100%;
  }

  .el-input__inner {
    font-family: 'Times New Roman', Times, serif;
    font-size: 13.5px;
    color: #ffffff;
  }

  ::placeholder {
    color: #ece1c0;
    font-size: 12px;
  }
}

.xrowEditItem {
  .el-input__wrapper {
    background-color: transparent;
    box-shadow: 0 0 0 0;
    width: 100%;
    padding-left: 10px;
  }

  .el-input__inner {
    font-family: 'Times New Roman', Times, serif;
    font-size: 13.5px;
    text-align: center;
    color: #ffffff;
  }

  .el-select__wrapper {
    background-color: transparent;
    box-shadow: 0 0 0 0;
    width: 100%;
    padding: 0;
  }

  .el-select__inner {
    font-family: 'Times New Roman', Times, serif;
    font-size: 13.5px;
    text-align: center;
    color: #ffffff;
  }

  ::placeholder {
    color: #ece1c0;
    font-size: 12px;
  }

  .el-select__selected-item.el-select__placeholder {
    color: white;
  }

  .el-select__caret {
    color: white;
  }
}

.el-date-table th {
  color: #ffffff;
}

.el-date-table td.current:not(.disabled) .el-date-table-cell__text {
  background-color: #009238;
}
</style>
