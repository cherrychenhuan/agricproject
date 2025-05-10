<template>
  <div>
    <el-row>
      <el-col :span="7">
        <div class="treePanel">
          <div
            style="color:black;margin-top:-5px;margin-left:-5px;border-bottom:2px solid #e6e6e6b2; font-size:13px;line-height:50px;height:43px;text-align: center;">
            <el-text>农作物品种</el-text>
          </div>
          <el-tree ref="treeRef" @node-contextmenu="nodeContextmenu" :expand-on-click-node="false" :accordion="true"
            :current-node-key="currentNodekeys" highlight-current="true" :props="{ class: customNodeClass }"
            :data="data" @node-click="treeNodeClick" node-key="id" :default-expanded-keys="treeExpandData">
            <template #default="{ node, data }">
              <span class="custom-tree-node"
                style="flex:1;padding-right:10px;display: flex; align-items: center;justify-content: space-between;">
                <span style="margin-left:2px;">
                  <el-text>
                    <el-icon v-if="node.expanded === false && node.isLeaf === false" size="small"
                      style="color:darkolivegreen">
                      <Folder />
                    </el-icon>
                    <el-icon v-if="node.expanded === true" style="color:darkolivegreen">
                      <FolderOpened />
                    </el-icon>
                    <el-icon v-if="node.isLeaf === true">
                      <Tickets />
                    </el-icon>
                    &nbsp;
                    <span class="labelName" :id="'node' + node.data.id" v-if="node.level == 2"
                      style="margin-top:-5px; font-size: 13px;color:rgb(58, 107, 47);">
                      {{ node.label }}
                    </span>
                    <span class="labelName" :id="'node' + node.data.id" v-else
                      style="margin-top:-5px; font-size: 13px;">
                      {{ node.label }}
                    </span>
                  </el-text>
                </span>
                <span v-if="node.level == 4" style="color:rgb(33, 165, 0);">
                  <el-icon @click="appendNode(node, data)" style="margin-right:3px;">
                    <CirclePlus />
                  </el-icon>
                  <el-icon style="margin-right:3px;">
                    <Edit />
                  </el-icon>
                  <el-icon @click="deleteTreenode(node, data)">
                    <Delete />
                  </el-icon>
                </span>
                <span v-if="node.level == 5" style="color:rgb(0, 77, 165);">
                  <el-icon style="margin-right:3px;">
                    <Edit />
                  </el-icon>
                  <el-icon @click="deleteTreenode(node, data)">
                    <Delete />
                  </el-icon>
                </span>
                <span v-if="node.level == 3" style="color:#c45656;">
                  <el-icon @click="appendNode(node, data)" style=" margin-right:3px;">
                    <CirclePlus />
                  </el-icon>
                  <el-icon style="margin-right:3px;">
                    <Edit />
                  </el-icon>
                  <el-icon @click="deleteTreenode(node, data)">
                    <Delete />
                  </el-icon>
                </span>
              </span>
            </template>

          </el-tree>
        </div>
      </el-col>
      <el-col :span="17">
        <el-tabs @tab-remove="removeTab" v-model="paneactiveName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane :closable="false" key="tab0" label="全部作物" name="tab0">
            <!-- <RouterView/> -->
            <Cropcategorychild @fatherMethod="getCropvarietyData" @addMethod="addCropNode"></Cropcategorychild>
          </el-tab-pane>
          <el-tab-pane closable v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
            <template #>
              <!-- <div v-if="item.name === 'tab0'">
                <RouterView></RouterView>
                <Cropcategory></Cropcategory>
              </div> -->
              <div v-if="item.type === 'genericTab'" ref="tab1" style="padding:0;height:90vh;">
                <div
                  style="border-bottom: 1px solid #e6e6e6b2; font-size:14px; padding-left:10px;font-weight:400;width:110%;line-height:30px;height:30px;background-color: #e6e6e6b2;margin:-5px -10px 0 -5px;">
                  <el-text><el-icon>
                      <Memo />
                    </el-icon>通用参数说明</el-text>
                </div>
                <el-table :row-style="{ height: '20px' }" :data="tableData" border
                  style="text-align:center;width: 100%;font-weight: 400;margin-top:10px;">
                  <el-table-column align="center" prop="name" label="参数名称" width="150" />
                  <el-table-column align="center" prop="description" label="参数说明" />
                </el-table>
                <div
                  style="border-bottom: 1px solid #e6e6e6b2;border-top: 1px solid #e6e6e6b2;font-size:14px; padding-left:10px;font-weight:400;width:110%;line-height:30px;height:30px;background-color: #e6e6e6b2;margin:10px -10px 0 -5px;">
                  <el-text><el-icon>
                      <Operation />
                    </el-icon>参数明细&nbsp;<el-button type="danger" link
                      style="font-size:12px;">参数填写格式?</el-button></el-text>
                  <div style="position:absolute;right:10px;top:165px;">
                    <el-button @click="addGenericType" type="success" size="small"><el-icon>
                        <Plus />
                      </el-icon>新增</el-button>
                  </div>
                </div>
                <div style="height:55vh;overflow: auto;">
                  <div style="font-size:12px;">
                    <el-form class="cropmaindataForm">
                      <el-row style="margin-top:10px;">
                        <el-col :span="5">
                          <el-image style="border:3px solid #efefef;border-radius:15px;width: 126px; height: 126px"
                            :src="imgurl" fit="fill">

                            <template #error>
                              <div class="image-slot">
                                <el-icon>
                                  <Picture />
                                </el-icon>
                              </div>
                            </template> </el-image>
                        </el-col>
                        <el-col :span="12">
                          <el-row>
                            <el-col :span="24">
                              <el-form-item label="作物分类：">
                                {{ cropcategoryData.category }}
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="24">
                              <el-form-item label="作物ID:">
                                {{ cropcategoryData.cropid }}
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="24">
                              <el-form-item label="作物名称：">
                                {{ cropcategoryData.cropname }}
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </el-col>

                      </el-row>
                    </el-form>
                  </div>
                  <el-collapse v-model="GenericactiveNames" style="margin-top:5px;">
                    <el-collapse-item v-for="(item, index) in genericData" :name="item.genericType">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">
                            <el-icon @click="deleteOneGenericform(index)" style="color:red;">
                              <Delete />
                            </el-icon>
                            通用型
                            {{ item.genericType }}</el-text></span>
                      </template>
                      <el-form :ref="el => addgenericFormRef(index, el)" :disabled="gdisabled[index].isD" :model="item"
                        :rules="genericRules" class="genericForm" label-width="120px" label-position="left">
                        <el-row>
                          <el-col :span="13">
                            <el-form-item prop="co2Efftb0" label-width="150px" label="CO2EFFTB: CO₂(PPM)">
                              <el-input v-model="item.co2Efftb0" placeholder="" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="11">
                            <el-form-item prop="co2Efftb1" label-width="80px" label="倍增因子 ">
                              <el-input v-model="item.co2Efftb1" placeholder="" />
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="13">
                            <el-form-item prop="co2Tratb0" label-width="150px" label="CO2TRATB: CO₂(PPM)">
                              <el-input v-model="item.co2Tratb0" placeholder="" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="11">
                            <el-form-item prop="co2Tratb1" label-width="80px" label="倍增因子 ">
                              <el-input v-model="item.co2Tratb1" placeholder="" />
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="13">
                            <el-form-item prop="co2Amaxtb0" label-width="170px" label="CO2AMAXTB: CO₂(PPM)">
                              <el-input v-model="item.co2Amaxtb0" placeholder="" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="11">
                            <el-form-item prop="co2Amaxtb1" label-width="80px" label="倍增因子 ">
                              <el-input v-model="item.co2Amaxtb1" placeholder="" />
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-form>
                      <div style="float:right;">
                        <el-button @click="saveOneGenericform(index)" type="danger" link size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneGenericform(index)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneGenericform(index)" :disabled="gdisabled[index].isclearD"
                          type="warning" link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                        <el-button @click="deleteOneGenericform(index)" type="danger" link size="small"><el-icon>
                            <Delete />
                          </el-icon>删除</el-button>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
                <!-- 弹窗1 新增generic -->
                <el-dialog :show-close="false" class="myDialog" :visible.sync="dialogVisible" align-center
                  v-model="dialogVisible" width="50%">
                  <!-- header部分 -->

                  <template #header> <!-- vue3 这里不能使用slot  要用# -->
                    <div style="padding-left:10px;" class="dialog-title-name"><el-icon
                        style="position:relative;top:2.5px;margin-right:3px;">
                        <InfoFilled />
                      </el-icon><span style="vertical-align:top;">新增通用型</span></div>
                    <div style="padding-right:10px;"><el-icon @click="dialogCloseBtn">
                        <Close />
                      </el-icon></div>
                  </template>
                  <!-- 主体部分 -->
                  <!-- 注意 为了实现表单验证，这个el-form里面的双向数据绑定不能用v-model,尽量后面都打冒号，否则容易出问题要用：model -->
                  <el-form ref="addDialogForm" :show-message="false" :rules="genericRules" class="dialog-form"
                    @submit.native.prevent="" :model="newgenericData" :label-position="left">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item :label-position="left" label-width="100px" label="作物分类：">
                          <el-select @change="changeGenericCategory" v-model="addGenericCategory" class="m-2"
                            placeholder="选择分类">
                            <el-option v-for="item in categoryname" :key="item.key" :label="item.label"
                              :value="item.key" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item :label-position="left" label-width="100px" label="作物名称：">
                          <el-select @change="changeGenericCrop" v-model="newgenericData.cropId">
                            <el-option v-for="(item, index) in gcropnameList" :key="item.id" :label="item.cropname"
                              :value="item.id" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>

                      <el-col :span="12">
                        <el-form-item :label-position="left" label-width="100px" label="通用型代码：">
                          <el-input :disabled="true" v-model="newgenericData.genericId" placeholder="" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item :label-position="left" label-width="100px" label="通用型名称：">
                          <el-input v-model="newgenericData.genericType" placeholder="" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item :label-position="left" prop="co2Efftb0" label="CO2EFFTB: CO₂(PPM)">
                          <el-input v-model="newgenericfuncdata.co2Efftb0" placeholder="" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item :label-position="left" prop="co2Efftb1" label-width="80px" label="倍增因子 ">
                          <el-input v-model="newgenericfuncdata.co2Efftb1" placeholder="" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item prop="co2Tratb0" label="CO2TRATB: CO₂(PPM)">
                          <el-input v-model="newgenericfuncdata.co2Tratb0" placeholder="" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item prop="co2Tratb1" label-width="80px" label="倍增因子 ">
                          <el-input v-model="newgenericfuncdata.co2Tratb1" placeholder="" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item prop="co2Amaxtb0" label="CO2AMAXTB: CO₂(PPM)">
                          <el-input v-model="newgenericfuncdata.co2Amaxtb0" placeholder="" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item prop="co2Amaxtb1" label-width="80px" label="倍增因子 ">
                          <el-input v-model="newgenericfuncdata.co2Amaxtb1" placeholder="" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>

                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="addDialogCloseBtn" size="default">取消</el-button>
                      <el-button type="primary" @click="saveGenericType" size="default">保存</el-button>
                    </span>
                  </template>
                </el-dialog>
              </div>
              <div v-if="item.type === 'ecotypeTab'" ref="tab2" style="padding-left:10px;height:90vh;">
                <div
                  style="font-size:14px; padding:5px 10px 5px 10px;font-weight:400;width:110%;line-height:30px;height:30px;background-color: #e6e6e6b2;margin:-5px -10px 0 -15px;">
                  <div style="float:left;width:77%;"><el-text><el-icon>
                        <Memo />
                      </el-icon>生态类型主要参数</el-text>
                  </div>
                  <div style="margin-bottom:30px;">
                    <el-button :disabled="saveEcotypebtn" @click="saveEcotype" style="width:50px;" size="small"
                      type="success"><el-icon>
                        <DocumentChecked />
                      </el-icon>保存</el-button>
                    <el-button @click="addEcotype" style="width:50px;" size="small" type="info"><el-icon>
                        <Plus />
                      </el-icon>新增</el-button>
                  </div>
                </div>
                <el-form ref="ecotypeallForm" :rules="allrules" class="ecotypeForm" :model="ecotypeData"
                  label-position="left" label-width="150px"
                  style="margin-top:0;font-weight: 400;height:82vh;overflow: auto;">
                  <el-row style="margin-top:15px;">
                    <el-col :span="8">
                      <el-form-item label-width="120px" prop="cropname" label="所属分类：">
                        <el-select @change="changeCategory" :disabled="mainDisabled" v-model="ecotypeCropcategory"
                          class="m-2" placeholder="选择分类">
                          <el-option v-for="item in categoryname" :key="item.key" :label="item.label"
                            :value="item.key" />
                        </el-select>
                      </el-form-item></el-col>
                    <el-col :span="8">
                      <el-form-item label-width="120px" prop="cropname" label="所属作物：">
                        <el-select @change="changeCrop" :disabled="mainDisabled" v-model="ecotypeData.cropid">
                          <el-option v-for="(item, index) in cropnameList" :key="item.id" :label="item.cropname"
                            :value="item.id" />
                        </el-select>
                      </el-form-item></el-col>
                    <el-col :span="8">
                      <el-form-item label-width="130px" prop="ecotypeid" label="生态类型编码：">
                        <el-input :disabled="idDisabled" v-model="ecotypeData.ecotypeid" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12"><el-form-item label-width="120px" label="所属通用型：">
                        <el-select @change="changeGengeric" :disabled="mainDisabled" v-model="ecotypeData.parent">
                          <el-option v-for="item in genericList" :key="item.genericId" :label="item.genericType"
                            :value="item.genericId" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label-width="130px" prop="ecotype" label="生态类型名称：">
                        <el-input :disabled="mainDisabled" v-model="ecotypeData.ecotype" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-collapse v-model="activeNames" style="height:100%;overflow: auto;margin-top:0px;">
                    <!-- fffff -->
                    <el-collapse-item name="1">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">1-萌发期 <el-icon style="font-size:14px;"
                              v-show="successIcon[0].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item prop="tbasem" label="萌发临界温度(低):">
                            <el-input type="number" :disabled="isDisabled[0].isD" v-model="ecotypeData.tbasem"
                              placeholder="">

                              <template #suffix>
                                ℃
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="teffmx" label="萌发临界温度(高):">
                            <el-input :disabled="isDisabled[0].isD" type="number" v-model="ecotypeData.teffmx"
                              placeholder="">

                              <template #suffix>
                                ℃
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="tsumem" label="播种到出苗的积温:"><el-input type="number"
                              :disabled="isDisabled[0].isD" v-model="ecotypeData.tsumem" placeholder="">

                              <template #suffix>
                                d·℃
                              </template></el-input></el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;">
                        <el-button @click="saveOneEcotypeform(1)" type="danger" link size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(1)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(1)" :disabled="isDisabled[0].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="2">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">2-物候发育 <el-icon style="font-size:14px;"
                              v-show="successIcon[1].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item prop="idsl" label="花前发育因素:">
                            <!-- <el-input :disabled="isDisabled[1].isD" v-model="ecotypeData.idsl" placeholder="" /> -->
                            <el-select :disabled="isDisabled[1].isD" v-model="ecotypeData.idsl" placeholder="">
                              <el-option v-for="(  item, index  ) in idslList.options  " :key="item.id"
                                :label="item.name" :value="item.id" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="dlo" label="最佳日照时间:"><el-input type="number" :disabled="isDisabled[1].isD"
                              v-model="ecotypeData.dlo" placeholder="">

                              <template #suffix>
                                小时
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="dlc" label="临界日长(下限):"><el-input type="number"
                              :disabled="isDisabled[1].isD" v-model="ecotypeData.dlc" placeholder="">

                              <template #suffix>
                                小时
                              </template></el-input></el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item prop="tsum1" label="出苗-开花-积温:">
                            <el-input type="number" :disabled="isDisabled[1].isD" v-model="ecotypeData.tsum1"
                              placeholder="">

                              <template #suffix>
                                d·℃
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="tsum2" label="开花-成熟-积温:">
                            <el-input type="number" :disabled="isDisabled[1].isD" v-model="ecotypeData.tsum2"
                              placeholder="">

                              <template #suffix>
                                d·℃
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="dvsi" label="初始生长阶段:"><el-input :disabled="isDisabled[1].isD"
                              type="number" v-model="ecotypeData.dvsi" placeholder="" /></el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item prop="dvsend" label="收成时生长阶段:">
                            <el-input type="number" :disabled="isDisabled[1].isD" v-model="ecotypeData.dvsend"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="vernbase" label="基本春化要求:"><el-input :disabled="isDisabled[1].isD"
                              type="number" v-model="ecotypeData.vernbase" placeholder="">

                              <template #suffix>
                                天
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="vernsat" label="饱和春化要求:"><el-input :disabled="isDisabled[1].isD"
                              type="number" v-model="ecotypeData.vernsat" placeholder="">

                              <template #suffix>
                                天
                              </template></el-input></el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item prop="verndvs" label="关闭春化的关键DVS:">
                            <el-input type="number" :disabled="isDisabled[1].isD" v-model="ecotypeData.verndvs"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="5">
                          <el-form-item label-width="160px" label="春化的温度响应函数:">
                            <!-- <el-input :disabled="isDisabled[1].isD" v-model="ecotypeData.vernrtb" placeholder="" /> -->
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item label-width="80px" prop="vernrtb_x" label="温度(℃)">
                            <el-input :disabled="isDisabled[1].isD" v-model="ecotypefuncData.vernrtb_x"
                              placeholder="" />

                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label-width="80px" prop="vernrtb_y" label="春化速率">
                            <el-input :disabled="isDisabled[1].isD" v-model="ecotypefuncData.vernrtb_y"
                              placeholder="" />
                          </el-form-item>
                        </el-col>

                      </el-row>
                      <el-row>

                        <el-col :span="5">
                          <el-form-item label-width="160px" label="日均温度增加量总和:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item label-width="80px" label="温度(℃)" prop="dtsmtb_x">
                            <el-input :disabled="isDisabled[1].isD" v-model="ecotypefuncData.dtsmtb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item prop="dtsmtb_x" label-width="180px" label="日均温度增加量总和(℃)">
                            <el-input :disabled="isDisabled[1].isD" v-model="ecotypefuncData.dtsmtb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;width:100%;">
                        <div style="float:left;width:78%;padding-left:10px;font-size:12px;color:rgb(0, 0, 0);">
                          <span>注意函数的自变量、因变量的填写格式为: 1,2,0.3 【数字之间用半角逗号隔开】</span>
                        </div>

                        <el-button @click="saveOneEcotypeform(2)" type="danger" link size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button type="primary" @click="editOneEcotypeform(2)" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(2)" :disabled="isDisabled[1].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="3">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">3-初始状态<el-icon style="font-size:15px;"
                              v-show="successIcon[2].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item prop="tdwi" label-width="130px" label="作物初始总干重:">
                            <el-input type="number" :disabled="isDisabled[2].isD" v-model="ecotypeData.tdwi"
                              placeholder="">

                              <template #suffix>
                                千克/公顷
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item prop="rgrlai" label-width="140px" label="LAI最大相对增加:"><el-input type="number"
                              :disabled="isDisabled[2].isD" v-model="ecotypeData.rgrlai" placeholder="">

                              <template #suffix>
                                /天
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <div style="float:right;"><el-button type="danger" @click="saveOneEcotypeform(3)" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(3)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(3)" :disabled="isDisabled[2].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="4">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">4-作物绿色部分面积<el-icon style="font-size:15px;"
                              v-show="successIcon[3].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>

                      <el-row>
                        <el-col :span="6">
                          <el-form-item label-width="190px" label="特定叶面积-DVS的函数关系:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="slatb_x" label-width="40px" label="DVS">
                            <el-input :disabled="isDisabled[3].isD" v-model="ecotypefuncData.slatb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item prop="slatb_y" label-width="150px" label="叶面积(公顷/千克)">
                            <el-input :disabled="isDisabled[3].isD" v-model="ecotypefuncData.slatb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label-width="190px" label="特定茎面积-DVS的函数关系:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="slatb_x" label-width="40px" label="DVS">
                            <el-input :disabled="isDisabled[3].isD" v-model="ecotypefuncData.ssatb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item prop="slatb_y" label-width="150px" label="叶面积(公顷/千克)">
                            <el-input :disabled="isDisabled[3].isD" v-model="ecotypefuncData.ssatb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <!-- 222 -->
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item prop="spa" label-width="120px" label="特定豆荚面积:">
                            <el-input type="number" :disabled="isDisabled[3].isD" v-model="ecotypeData.spa"
                              placeholder="">

                              <template #suffix>
                                公顷/千克
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="span" label-width="135px" label="35°C下叶片寿命:">
                            <el-input type="number" :disabled="isDisabled[3].isD" v-model="ecotypeData.span"
                              placeholder="">

                              <template #suffix>
                                天
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="tbase" label-width="158px" label="叶片老化的下限温度:">
                            <el-input type="number" :disabled="isDisabled[3].isD" v-model="ecotypeData.tbase"
                              placeholder="">

                              <template #suffix>
                                °C
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <div style="float:right;width:100%;">
                        <div style="float:left;width:78%;padding-left:10px;font-size:12px;color:rgb(54, 54, 54);">
                          <span>注意函数的自变量、因变量的填写格式为: 1,2,0.3 【数字之间用半角逗号隔开】</span>
                        </div>
                        <el-button @click="saveOneEcotypeform(4)" type="danger" link size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(4)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(4)" :disabled="isDisabled[3].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="5">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">5-二氧化碳同化<el-icon style="font-size:15px;"
                              v-show="successIcon[4].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <!-- 1 -->
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label-width="300px" label="作为DVS函数的漫射可见光的消光系数:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="kdiftb_x" label-width="40px" label="DVS">
                            <el-input :disabled="isDisabled[4].isD" v-model="ecotypefuncData.kdiftb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="kdiftb_y" label-width="100px" label="消光系数">
                            <el-input :disabled="isDisabled[4].isD" v-model="ecotypefuncData.kdiftb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <!-- 222 -->
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label-width="290px" label="平均日温(非日温)对AMAX的影响系数:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="tmpftb_x" label-width="80px" label="温度(℃)">
                            <el-input :disabled="isDisabled[4].isD" v-model="ecotypefuncData.tmpftb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="tmpftb_y" label-width="100px" label="影响系数">
                            <el-input :disabled="isDisabled[4].isD" v-model="ecotypefuncData.tmpftb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <!-- 222 -->
                      </el-row>

                      <el-row>
                        <el-col :span="8">
                          <el-form-item label-width="290px" label="总同化率随最低气温降低而降低的系数:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="tmnftb_x" label-width="80px" label="温度(℃)">
                            <el-input :disabled="isDisabled[4].isD" v-model="ecotypefuncData.tmnftb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="tmnftb_y" label-width="100px" label="影响系数">
                            <el-input :disabled="isDisabled[4].isD" v-model="ecotypefuncData.tmnftb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <!-- 222 -->
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label-width="230px" label="测量AMAX和EFF时的二氧化碳水平:">
                            <el-input type="number" :disabled="isDisabled[4].isD" v-model="ecotypeData.refco2L"
                              placeholder="">

                              <template #suffix>
                                PPM
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label-width="310px" label="作为日平均温度函数的叶片初始光利用效率:">
                          </el-form-item>
                        </el-col>
                        <!-- 222 -->
                      </el-row>
                      <el-row>
                        <el-col :span="10">
                          <el-form-item prop="efftb_x" label-width="100px" label="温度(℃)">
                            <el-input :disabled="isDisabled[4].isD" v-model="ecotypefuncData.efftb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="14">
                          <el-form-item prop="efftb_y" label-width="250px" label="利用效率(千克/公顷/小时/m²/焦耳)">
                            <el-input :disabled="isDisabled[4].isD" v-model="ecotypefuncData.efftb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <!-- 222 -->
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label-width="290px" label="最大叶片CO2同化速率与DVS的函数关系:">
                          </el-form-item>
                        </el-col>
                        <!-- 222 -->
                      </el-row>
                      <el-row>
                        <el-col :span="10">
                          <el-form-item prop="amaxtb_x" label-width="40px" label="DVS">
                            <el-input :disabled="isDisabled[4].isD" v-model="ecotypefuncData.amaxtb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="14">
                          <el-form-item prop="amaxtb_y" label-width="200px" label="同化速率(千克/公顷/小时)">
                            <el-input :disabled="isDisabled[4].isD" v-model="ecotypefuncData.amaxtb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <!-- 222 -->
                      </el-row>
                      <div style="float:right;width:100%;">
                        <div style="float:left;width:78%;padding-left:10px;font-size:12px;color:rgb(54, 54, 54);">
                          <span>注意函数的自变量、因变量的填写格式为: 1,2,0.3 【数字之间用半角逗号隔开】</span>
                        </div>
                        <el-button @click="saveOneEcotypeform(5)" type="danger" link size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(5)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(5)" :disabled="isDisabled[4].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="6">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">6-同化物的转化效率<el-icon style="font-size:15px;"
                              v-show="successIcon[5].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="11">
                          <el-form-item prop="cvl" label-width="220px" label="转化为叶子的效率(质量比):">
                            <el-input type="number" :disabled="isDisabled[5].isD" v-model="ecotypeData.cvl"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="13">
                          <el-form-item prop="cvo" label-width="240px" label="转化为储存器官的效率(质量比):">
                            <el-input type="number" :disabled="isDisabled[5].isD" v-model="ecotypeData.cvo"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="11">
                          <el-form-item prop="cvr" label-width="220px" label="转化为根的效率(质量比):">
                            <el-input type="number" :disabled="isDisabled[5].isD" v-model="ecotypeData.cvr"
                              placeholder="" /></el-form-item>
                        </el-col>
                        <el-col :span="13">
                          <el-form-item prop="cvs" label-width="240px" label="转化为茎的效率(质量比):">
                            <el-input type="number" :disabled="isDisabled[5].isD" v-model="ecotypeData.cvs"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;"><el-button @click="saveOneEcotypeform(6)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(6)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(6)" :disabled="isDisabled[5].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="7">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">7-呼吸作用<el-icon style="font-size:15px;"
                              v-show="successIcon[6].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="14">
                          <el-form-item prop="q10" label-width="270px" label="每升高10摄氏度,呼吸速率的相对增加:">
                            <el-input type="number" :disabled="isDisabled[6].isD" v-model="ecotypeData.q10"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label-width="220px" label="作为DVS函数的衰老降低系数:">

                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="rfsetb_x" label-width="60px" label="DVS:">
                            <el-input :disabled="isDisabled[6].isD" v-model="ecotypefuncData.rfsetb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item prop="rfsetb_y" label-width="140px" label="衰老降低系数:">
                            <el-input :disabled="isDisabled[6].isD" v-model="ecotypefuncData.rfsetb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="11">
                          <el-form-item prop="rml" label-width="170px" label="叶片相对维持呼吸速率:">
                            <el-input type="number" :disabled="isDisabled[6].isD" v-model="ecotypeData.rml"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="13">
                          <el-form-item prop="rmo" label-width="210px" label="贮藏器官的相对维持呼吸率:">
                            <el-input type="number" :disabled="isDisabled[6].isD" v-model="ecotypeData.rmo"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="11">
                          <el-form-item prop="rmr" label-width="170px" label="根的相对维持呼吸率:">
                            <el-input type="number" :disabled="isDisabled[6].isD" v-model="ecotypeData.rmr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="13">
                          <el-form-item prop="rms" label-width="210px" label="茎的相对维持呼吸率:">
                            <el-input type="number" :disabled="isDisabled[6].isD" v-model="ecotypeData.rms"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;width:100%;">
                        <div style="float:left;width:78%;padding-left:10px;font-size:12px;color:rgb(54, 54, 54);">
                          <span>注意函数的自变量、因变量的填写格式为: 1,2,0.3 【数字之间用半角逗号隔开】</span>
                        </div><el-button @click="saveOneEcotypeform(7)" type="danger" link size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(7)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(7)" :disabled="isDisabled[6].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="8">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">8-细胞分化<el-icon style="font-size:15px;"
                              v-show="successIcon[7].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label-width="250px" label="根的总干物质分数作为DVS的函数:">
                            <!-- <el-input :disabled="isDisabled[7].isD" v-model="ecotypeData.frtb" placeholder="" /> -->
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item prop="frtb_x" label-width="40px" label="DVS">
                            <el-input :disabled="isDisabled[7].isD" v-model="ecotypefuncData.frtb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="frtb_y" label-width="130px" label="总干物质(质量比)">
                            <el-input :disabled="isDisabled[7].isD" v-model="ecotypefuncData.frtb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label-width="250px" label="叶片总干物质的比例与DVS的函数关系:">
                            <!-- <el-input :disabled="isDisabled[7].isD" v-model="ecotypeData.flt" placeholder="" /> -->
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item prop="fltb_x" label-width="40px" label="DVS">
                            <el-input :disabled="isDisabled[7].isD" v-model="ecotypefuncData.fltb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="fltb_y" label-width="130px" label="总干物质(质量比)">
                            <el-input :disabled="isDisabled[7].isD" v-model="ecotypefuncData.fltb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label-width="250px" label="茎的总干物质含量与DVS的函数关系:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item prop="fstb_x" label-width="40px" label="DVS">
                            <el-input :disabled="isDisabled[7].isD" v-model="ecotypefuncData.fstb_x"
                              placeholder="" /></el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="fstb_y" label-width="130px" label="总干物质(质量比)">
                            <el-input :disabled="isDisabled[7].isD" v-model="ecotypefuncData.fstb_y"
                              placeholder="" /></el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label-width="250px" label="贮藏器官总千物分与DVS的函数关系:">

                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item prop="fotb_x" label-width="40px" label="DVS">
                            <el-input :disabled="isDisabled[7].isD" v-model="ecotypefuncData.fotb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="fotb_y" label-width="130px" label="总干物质(质量比)">
                            <el-input :disabled="isDisabled[7].isD" v-model="ecotypefuncData.fotb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;"><el-button @click="saveOneEcotypeform(8)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(8)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(8)" :disabled="isDisabled[7].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="9">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">9-死亡率<el-icon style="font-size:15px;"
                              v-show="successIcon[8].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label-width="250px" label="水分胁迫导致的叶片最大相对死亡率:">
                            <el-input type="number" :disabled="isDisabled[8].isD" v-model="ecotypeData.perdl"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="7">
                          <el-form-item label-width="230px" label="茎的相对死亡率与DVS的函数关系:">

                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="rdrrtb_x" label-width="50px" label="DVS">
                            <el-input :disabled="isDisabled[8].isD" v-model="ecotypefuncData.rdrrtb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="rdrrtb_y" label-width="100px" label="相对死亡率">
                            <el-input :disabled="isDisabled[8].isD" v-model="ecotypefuncData.rdrrtb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>

                        <el-col :span="7">
                          <el-form-item label-width="230px" label="根的相对死亡率与DVS的函数关系:">

                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="rdrstb_x" label-width="50px" label="DVS">
                            <el-input :disabled="isDisabled[8].isD" v-model="ecotypefuncData.rdrstb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="rdrstb_y" label-width="100px" label="相对死亡率">
                            <el-input :disabled="isDisabled[8].isD" v-model="ecotypefuncData.rdrstb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;"><el-button @click="saveOneEcotypeform(9)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(9)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(9)" :disabled="isDisabled[8].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="10">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">10-水的利用<el-icon style="font-size:15px;"
                              v-show="successIcon[9].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label-width="180px" label="土壤水分损耗作物群编号:">
                            <el-input type="number" :disabled="isDisabled[9].isD" v-model="ecotypeData.depnr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label-width="180px" label="蒸腾速率校正因子:">
                            <el-input type="number" :disabled="isDisabled[9].isD" v-model="ecotypeData.cfet"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>

                        <el-col :span="12">
                          <el-form-item label-width="180px" label="根部空气导管是否存在:">

                            <el-select :disabled="isDisabled[9].isD" v-model="ecotypeData.iairdu" placeholder="">
                              <el-option key="0" label="否" :value="0" />
                              <el-option key="1" label="是" :value="1" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label-width="180px" label="氧胁迫效应是否启用:">
                            <el-select :disabled="isDisabled[9].isD" v-model="ecotypeData.iox" placeholder="">
                              <el-option key="0" label="否" :value="0" />
                              <el-option key="1" label="是" :value="1" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;"><el-button @click="saveOneEcotypeform(10)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(10)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(10)" :disabled="isDisabled[9].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="11">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">11-根深<el-icon style="font-size:15px;"
                              v-show="successIcon[10].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label-width="80px" label="初始根深:">
                            <el-input type="number" :disabled="isDisabled[10].isD" v-model="ecotypeData.rdi"
                              placeholder="">

                              <template #suffix>
                                cm
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label-width="180px" label="扎根深度的最大日增加量:">
                            <el-input type="number" :disabled="isDisabled[10].isD" v-model="ecotypeData.rri"
                              placeholder="">

                              <template #suffix>
                                cm/天
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label-width="110px" label="最大扎根深度:">
                            <el-input type="number" :disabled="isDisabled[10].isD" v-model="ecotypeData.rdmcr"
                              placeholder="">

                              <template #suffix>
                                cm
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <div style="float:right;"><el-button @click="saveOneEcotypeform(11)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(11)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(11)" :disabled="isDisabled[10].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="12">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">12-不同器官中的最大-临界和残余氮/磷/钾浓度<el-icon
                              style="font-size:15px;" v-show="successIcon[11].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>

                      <!-- N -->
                      <el-row>
                        <el-col :span="7">
                          <el-form-item label-width="290px" label="叶片中最大N浓度与发育阶段的关系:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="nmaxlvTb_x" label-width="55px" label="DVS">
                            <el-input :disabled="isDisabled[11].isD" v-model="ecotypefuncData.nmaxlvTb_x"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="nmaxlvTb_y" label-width="55px" label="浓度">
                            <el-input :disabled="isDisabled[11].isD" v-model="ecotypefuncData.nmaxlvTb_y"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <!-- P -->
                      <el-row>
                        <el-col :span="7">
                          <el-form-item label-width="290px" label="叶片中最大P浓度与发育阶段的关系:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="pmaxlvTb_x" label-width="55px" label="DVS">
                            <el-input :disabled="isDisabled[11].isD" v-model="ecotypefuncData.pmaxlvTb_x"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="pmaxlvTb_y" label-width="55px" label="浓度">
                            <el-input :disabled="isDisabled[11].isD" v-model="ecotypefuncData.pmaxlvTb_y"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <!-- P -->
                      <el-row>
                        <el-col :span="7">
                          <el-form-item label-width="290px" label="叶片中最大K浓度与发育阶段的关系:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="kmaxlvTb_x" label-width="55px" label="DVS">
                            <el-input :disabled="isDisabled[11].isD" v-model="ecotypefuncData.kmaxlvTb_x"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="kmaxlvTb_y" label-width="55px" label="浓度">
                            <el-input :disabled="isDisabled[11].isD" v-model="ecotypefuncData.kmaxlvTb_y"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="14">
                          <el-form-item label-width="290px" label="临界N/P/K浓度占最大N/P/K浓度的百分比 N:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.ncritFr"
                              placeholder="" /></el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label-width="20px" label="P:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.pcritFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label-width="20px" label="K:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.kcritFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="14">
                          <el-form-item label-width="350px" label="根中最大N/P/K浓度占叶中最大N/P/K浓度的百分比 N:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.nmaxrtFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label-width="20px" label="P:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.pmaxrtFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label-width="20px" label="K:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.kmaxrtFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="14">
                          <el-form-item label-width="350px" label="茎中最大N/P/K浓度占叶中最大N/P/K浓度的百分比 N:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.nmaxstFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label-width="20px" label="P:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.pmaxstFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label-width="20px" label="K:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.kmaxstFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="14">
                          <el-form-item label-width="200px" label="贮藏器官中最大N/P/K浓度 N:"><el-input type="number"
                              :disabled="isDisabled[11].isD" v-model="ecotypeData.nmaxso"
                              placeholder="" /></el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label-width="20px" label="P:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.pmaxso"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label-width="20px" label="K:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.kmaxso"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="14">
                          <el-form-item label-width="180px" label="叶片中的残余N/P/K含量 N:"><el-input type="number"
                              v-model="ecotypeData.nresidlv" :disabled="isDisabled[11].isD"
                              placeholder="" /></el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label-width="20px" label="P:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.presidlv"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label-width="20px" label="K:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.kresidlv"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="14">
                          <el-form-item label-width="180px" label="茎中的残余N/P/K含量 N:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.nresidst"
                              placeholder="" /></el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label-width="20px" label="P:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.presidst"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label-width="20px" label="K:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.kresidst"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="14">
                          <el-form-item label-width="180px" label="根中的残余N/P/K含量 N:"><el-input
                              v-model="ecotypeData.nresidrt" type="number" :disabled="isDisabled[11].isD"
                              placeholder="" /></el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label-width="20px" label="P:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.presidrt"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label-width="20px" label="K:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.kresidrt"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="14">
                          <el-form-item label-width="240px" label="N/P/K转移到贮藏器官的时间系数 N:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.tcnt"
                              placeholder="" /></el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label-width="20px" label="P:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.tcpt"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label-width="20px" label="K:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.tckt"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="14">
                          <el-form-item label-width="220px" label="作物通过生物面N吸收N的比例 N:">
                            <el-input type="number" :disabled="isDisabled[11].isD" v-model="ecotypeData.nfixFr"
                              placeholder="" /></el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;"><el-button @click="saveOneEcotypeform(12)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(12)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(12)" :disabled="isDisabled[11].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="13">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">13-与氮/磷/钾吸收和转运相关的DVS<el-icon
                              style="font-size:15px;" v-show="successIcon[12].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="10">
                          <el-form-item label-width="230px" label="作物不再吸收氮/磷/钾的发育阶段:">
                            <el-input type="number" :disabled="isDisabled[12].isD" v-model="ecotypeData.dvsNpkStop"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="14">
                          <el-form-item label-width="300px" label="作物开始发生氮/磷/钾向储存器官转运的阶段:">
                            <el-input type="number" :disabled="isDisabled[12].isD" v-model="ecotypeData.dvsNpkTransl"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;"><el-button @click="saveOneEcotypeform(13)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(13)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(13)" :disabled="isDisabled[12].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="14">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">14-氮/磷/钾胁迫对过程的影响<el-icon
                              style="font-size:15px;" v-show="successIcon[13].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label-width="435px" label="由于养分NPK胁迫导致叶面积指数增加减少的系数(在幼苗阶段):">
                            <el-input type="number" :disabled="isDisabled[13].isD" v-model="ecotypeData.nlaiNpk"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label-width="240px" label="养分NPK胁迫对比叶面积的影响系数:">
                            <el-input type="number" :disabled="isDisabled[13].isD" v-model="ecotypeData.nslaNpk"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label-width="240px" label="养分N胁迫对叶片分配的影响系数:">
                            <el-input type="number" :disabled="isDisabled[13].isD" v-model="ecotypeData.npart"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label-width="405px" label="由于养分NPK胁迫而导致总CO2同化速率减少的系数:">
                            <el-input type="number" :disabled="isDisabled[13].isD" v-model="ecotypeData.nlueNpk"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label-width="300px" label="根部NPK转运占总NPK从叶片和茎部转运的比例:">
                            <el-input type="number" :disabled="isDisabled[13].isD" v-model="ecotypeData.npkTranslrtFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label-width="310px" label="由于养分NPK胁迫导致的叶片最大相对死亡速率:">
                            <el-input type="number" :disabled="isDisabled[13].isD" v-model="ecotypeData.rdrlvNpk"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;"><el-button @click="saveOneEcotypeform(14)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(14)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(14)" :disabled="isDisabled[13].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="15">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">15-最大氮/磷/钾吸收速率<el-icon style="font-size:15px;"
                              v-show="successIcon[14].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="10">
                          <el-form-item label-width="180px" label="每日最大N/P/K吸收速率 N:">
                            <el-input type="number" :disabled="isDisabled[14].isD" v-model="ecotypeData.rnuptakemax"
                              placeholder="">

                              <template #suffix>
                                kg/公顷/天
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item label-width="20px" label="P:">
                            <el-input type="number" :disabled="isDisabled[14].isD" v-model="ecotypeData.rpuptakemax"
                              placeholder="">

                              <template #suffix>
                                kg/公顷/天
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item label-width="20px" label="K:">
                            <el-input type="number" :disabled="isDisabled[14].isD" v-model="ecotypeData.rkuptakemax"
                              placeholder="">

                              <template #suffix>
                                kg/公顷/天
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;"><el-button @click="saveOneEcotypeform(15)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(15)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(15)" :disabled="isDisabled[14].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>

                  </el-collapse>
                </el-form>
              </div>
              <div v-if="item.type === 'varietyTab'" ref="tab3" style="padding-left:10px;height:90vh;">
                <div
                  style="font-size:14px; padding:5px 10px 5px 10px;font-weight:400;width:110%;line-height:30px;height:30px;background-color: #e6e6e6b2;margin:-5px -10px 0 -15px;">
                  <div style="float:left;width:77%;"><el-text><el-icon>
                        <Memo />
                      </el-icon>品种特殊参数 <span style="font-size:12px;color:red;">注：深绿色字段表明该品种对应字段存在特殊值</span></el-text>
                  </div>
                  <div style="margin-bottom:30px;">
                    <el-button :disabled="saveVarietybtn" @click="saveVariety" style="width:50px;" size="small"
                      type="success"><el-icon>
                        <DocumentChecked />
                      </el-icon>保存</el-button>
                    <el-button @click="addVariety" style="width:50px;" size="small" type="info"><el-icon>
                        <Plus />
                      </el-icon>新增</el-button>
                  </div>
                </div>
                <el-form ref="varietyallForm" :rules="vallrules" class="ecotypeForm" :model="varietyData"
                  label-position="left" label-width="150px"
                  style="margin-top:0;font-weight: 400;height:76vh;overflow: auto;">
                  <el-row style="margin-top:15px;">
                    <el-col :span="8">
                      <el-form-item label-width="100px" prop="cropname" label="所属分类：">
                        <el-select @change="changeCategory" :disabled="vmainDisabled" v-model="varietyCropcategory"
                          class="m-2" placeholder="选择分类">
                          <el-option v-for="item in categoryname" :key="item.key" :label="item.label"
                            :value="item.key" />
                        </el-select>
                      </el-form-item></el-col>
                    <el-col :span="8">
                      <el-form-item label-width="100px" prop="cropname" label="所属作物：">
                        <el-select @change="changeCrop" :disabled="vmainDisabled" v-model="varietyData.cropid"
                          clearable>
                          <el-option v-for="(item, index) in vcropnameList" :key="item.id" :label="item.cropname"
                            :value="item.id" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="100px" prop="parent" label="生态类型：">
                        <el-select @change="changeEcotype" :disabled="vmainDisabled" v-model="varietyData.parent">
                          <el-option v-for="(item, index) in ecotypeList" :key="item.ecotypeid" :label="item.ecotype"
                            :value="item.ecotype" />
                        </el-select>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label-width="100px" label="品种编码：">
                        <el-input :disabled="vidDisabled" v-model="varietyData.varietyid" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12"><el-form-item label-width="100px" prop="parent" label="品种名称：">
                        <el-input v-model="varietyData.variety" />
                      </el-form-item></el-col>

                  </el-row>
                  <el-collapse v-model="vactiveNames" style="height:95%;overflow: auto;margin-top:5px;">
                    <!-- fffff -->

                    <el-collapse-item name="1">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">1-萌发期 <el-icon style="font-size:14px;"
                              v-show="successIcon[0].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.tbasem }" prop="tbasem" label="萌发临界温度(低):">
                            <el-input type="number" :disabled="vdisabled[0].isD" v-model="varietyData.tbasem"
                              placeholder="">

                              <template #suffix>
                                ℃
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.teffmx }" prop="teffmx" label="萌发临界温度(高):">
                            <el-input :disabled="vdisabled[0].isD" type="number" v-model="varietyData.teffmx"
                              placeholder="">

                              <template #suffix>
                                ℃
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.tsumem }" prop="tsumem"
                            label="播种到出苗的积温:"><el-input type="number" :disabled="vdisabled[0].isD"
                              v-model="varietyData.tsumem" placeholder="">

                              <template #suffix>
                                d·℃
                              </template></el-input></el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;">
                        <el-button @click="saveOneEcotypeform(-1)" type="danger" link size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(-1)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(-1)" :disabled="vdisabled[0].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="2">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">2-物候发育 <el-icon style="font-size:14px;"
                              v-show="successIcon[1].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.idsl }" prop="idsl" label="花前发育因素:">
                            <!-- <el-input :disabled="vdisabled[1].isD" v-model="varietyData.idsl" placeholder="" /> -->
                            <el-select :disabled="vdisabled[1].isD" v-model="varietyData.idsl" placeholder="">
                              <el-option v-for="(  item, index  ) in idslList.options  " :key="item.id"
                                :label="item.name" :value="item.id" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.dlo }" prop="dlo" label="最佳日照时间:"><el-input
                              type="number" :disabled="vdisabled[1].isD" v-model="varietyData.dlo" placeholder="">

                              <template #suffix>
                                小时
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.dlc }" prop="dlc"
                            label="临界日长(下限):"><el-input type="number" :disabled="vdisabled[1].isD"
                              v-model="varietyData.dlc" placeholder="">

                              <template #suffix>
                                小时
                              </template></el-input></el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.tsum1 }" prop="tsum1" label="出苗-开花-积温:">
                            <el-input :disabled="vdisabled[1].isD" type="number" v-model="varietyData.tsum1"
                              placeholder="">

                              <template #suffix>
                                d·℃
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.tsum2 }" prop="tsum2" label="开花-成熟-积温:">
                            <el-input type="number" :disabled="vdisabled[1].isD" v-model="varietyData.tsum2"
                              placeholder="">

                              <template #suffix>
                                d·℃
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.dvsi }" prop="dvsi"
                            label="初始生长阶段:"><el-input type="number" :disabled="vdisabled[1].isD"
                              v-model="varietyData.dvsi" placeholder="" /></el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.dvsend }" prop="dvsend" label="收成时生长阶段:">
                            <el-input type="number" :disabled="vdisabled[1].isD" v-model="varietyData.dvsend"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.vernbase }" prop="vernbase"
                            label="基本春化要求:"><el-input type="number" :disabled="vdisabled[1].isD"
                              v-model="varietyData.vernbase" placeholder="">

                              <template #suffix>
                                天
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.vernsat }" prop="vernsat"
                            label="饱和春化要求:"><el-input type="number" :disabled="vdisabled[1].isD"
                              v-model="varietyData.vernsat" placeholder="">

                              <template #suffix>
                                天
                              </template></el-input></el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.verndvs }" prop="verndvs"
                            label="关闭春化的关键DVS:">
                            <el-input type="number" :disabled="vdisabled[1].isD" v-model="varietyData.verndvs"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.vernrtb }" label-width="160px"
                            label="春化的温度响应函数:">
                            <!-- <el-input :disabled="vdisabled[1].isD" v-model="varietyData.vernrtb" placeholder="" /> -->
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item label-width="80px" prop="vernrtb_x" label="温度(℃)">
                            <el-input :disabled="vdisabled[1].isD" v-model="varietyfuncData.vernrtb_x" placeholder="" />

                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label-width="80px" prop="vernrtb_y" label="春化速率">
                            <el-input :disabled="vdisabled[1].isD" v-model="varietyfuncData.vernrtb_y" placeholder="" />
                          </el-form-item>
                        </el-col>

                      </el-row>
                      <el-row>

                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.dtsmtb }" label-width="160px"
                            label="日均温度增加量总和:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item label-width="80px" label="温度(℃)" prop="dtsmtb_x">
                            <el-input :disabled="vdisabled[1].isD" v-model="varietyfuncData.dtsmtb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item prop="dtsmtb_x" label-width="180px" label="日均温度增加量总和(℃)">
                            <el-input :disabled="vdisabled[1].isD" v-model="varietyfuncData.dtsmtb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;width:100%;">
                        <div style="float:left;width:78%;padding-left:10px;font-size:12px;color:rgb(54, 54, 54);">
                          <span>注意函数的自变量、因变量的填写格式为: 1,2,0.3 【数字之间用半角逗号隔开】</span>
                        </div>

                        <el-button @click="saveOneEcotypeform(-2)" type="danger" link size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button type="primary" @click="editOneEcotypeform(-2)" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(-2)" :disabled="vdisabled[1].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="3">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">3-初始状态<el-icon style="font-size:15px;"
                              v-show="successIcon[2].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item :class="{ 'specialclass': isSpecial.tdwi }" prop="tdwi" label-width="130px"
                            label="作物初始总干重:">
                            <el-input type="number" :disabled="vdisabled[2].isD" v-model="varietyData.tdwi"
                              placeholder="">

                              <template #suffix>
                                千克/公顷
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item :class="{ 'specialclass': isSpecial.rgrlai }" prop="rgrlai" label-width="140px"
                            label="LAI最大相对增加:"><el-input type="number" :disabled="vdisabled[2].isD"
                              v-model="varietyData.rgrlai" placeholder="">

                              <template #suffix>
                                /天
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <div style="float:right;"><el-button type="danger" @click="saveOneEcotypeform(-3)" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(-3)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(-3)" :disabled="vdisabled[2].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="4">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">4-作物绿色部分面积<el-icon style="font-size:15px;"
                              v-show="successIcon[3].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>

                      <el-row>
                        <el-col :span="6">
                          <el-form-item :class="{ 'specialclass': isSpecial.slatb }" label-width="190px"
                            label="特定叶面积-DVS的函数关系:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="slatb_x" label-width="40px" label="DVS">
                            <el-input :disabled="vdisabled[3].isD" v-model="varietyfuncData.slatb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item prop="slatb_y" label-width="150px" label="叶面积(公顷/千克)">
                            <el-input :disabled="vdisabled[3].isD" v-model="varietyfuncData.slatb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item :class="{ 'specialclass': isSpecial.ssatb }" label-width="190px"
                            label="特定茎面积-DVS的函数关系:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="slatb_x" label-width="40px" label="DVS">
                            <el-input :disabled="vdisabled[3].isD" v-model="varietyfuncData.ssatb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item prop="slatb_y" label-width="150px" label="叶面积(公顷/千克)">
                            <el-input :disabled="vdisabled[3].isD" v-model="varietyfuncData.ssatb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <!-- 222 -->
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.spa }" prop="spa" label-width="120px"
                            label="特定豆荚面积:">
                            <el-input type="number" :disabled="vdisabled[3].isD" v-model="varietyData.spa"
                              placeholder="">

                              <template #suffix>
                                公顷/千克
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.span }" prop="span" label-width="135px"
                            label="35°C下叶片寿命:">
                            <el-input type="number" :disabled="vdisabled[3].isD" v-model="varietyData.span"
                              placeholder="">

                              <template #suffix>
                                天
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.tbase }" prop="tbase" label-width="158px"
                            label="叶片老化的下限温度:">
                            <el-input type="number" :disabled="vdisabled[3].isD" v-model="varietyData.tbase"
                              placeholder="">

                              <template #suffix>
                                °C
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <div style="float:right;width:100%;">
                        <div style="float:left;width:78%;padding-left:10px;font-size:12px;color:rgb(54, 54, 54);">
                          <span>注意函数的自变量、因变量的填写格式为: 1,2,0.3 【数字之间用半角逗号隔开】</span>
                        </div>
                        <el-button @click="saveOneEcotypeform(-4)" type="danger" link size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(-4)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(-4)" :disabled="vdisabled[3].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="5">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">5-二氧化碳同化<el-icon style="font-size:15px;"
                              v-show="successIcon[4].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <!-- 1 -->
                      <el-row>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.kdiftb }" label-width="300px"
                            label="作为DVS函数的漫射可见光的消光系数:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="kdiftb_x" label-width="40px" label="DVS">
                            <el-input :disabled="vdisabled[4].isD" v-model="varietyfuncData.kdiftb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="kdiftb_y" label-width="100px" label="消光系数">
                            <el-input :disabled="vdisabled[4].isD" v-model="varietyfuncData.kdiftb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <!-- 222 -->
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.tmpftb }" label-width="290px"
                            label="平均日温(非日温)对AMAX的影响系数:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="tmpftb_x" label-width="80px" label="温度(℃)">
                            <el-input :disabled="vdisabled[4].isD" v-model="varietyfuncData.tmpftb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="tmpftb_y" label-width="100px" label="影响系数">
                            <el-input :disabled="vdisabled[4].isD" v-model="varietyfuncData.tmpftb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <!-- 222 -->
                      </el-row>

                      <el-row>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.tmnftb }" label-width="290px"
                            label="总同化率随最低气温降低而降低的系数:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="tmnftb_x" label-width="80px" label="温度(℃)">
                            <el-input :disabled="vdisabled[4].isD" v-model="varietyfuncData.tmnftb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="tmnftb_y" label-width="100px" label="影响系数">
                            <el-input :disabled="vdisabled[4].isD" v-model="varietyfuncData.tmnftb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <!-- 222 -->
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item :class="{ 'specialclass': isSpecial.refco2L }" label-width="230px"
                            label="测量AMAX和EFF时的二氧化碳水平:">
                            <el-input type="number" :disabled="vdisabled[4].isD" v-model="varietyData.refco2L"
                              placeholder="">

                              <template #suffix>
                                PPM
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.efftb }" label-width="310px"
                            label="作为日平均温度函数的叶片初始光利用效率:">
                          </el-form-item>
                        </el-col>
                        <!-- 222 -->
                      </el-row>
                      <el-row>
                        <el-col :span="10">
                          <el-form-item prop="efftb_x" label-width="100px" label="温度(℃)">
                            <el-input :disabled="vdisabled[4].isD" v-model="varietyfuncData.efftb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="14">
                          <el-form-item prop="efftb_y" label-width="250px" label="利用效率(千克/公顷/小时/m²/焦耳)">
                            <el-input :disabled="vdisabled[4].isD" v-model="varietyfuncData.efftb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <!-- 222 -->
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.amaxtb }" label-width="290px"
                            label="最大叶片CO2同化速率与DVS的函数关系:">
                          </el-form-item>
                        </el-col>
                        <!-- 222 -->
                      </el-row>
                      <el-row>
                        <el-col :span="10">
                          <el-form-item prop="amaxtb_x" label-width="40px" label="DVS">
                            <el-input :disabled="vdisabled[4].isD" v-model="varietyfuncData.amaxtb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="14">
                          <el-form-item prop="amaxtb_y" label-width="200px" label="同化速率(千克/公顷/小时)">
                            <el-input :disabled="vdisabled[4].isD" v-model="varietyfuncData.amaxtb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <!-- 222 -->
                      </el-row>
                      <div style="float:right;width:100%;">
                        <div style="float:left;width:78%;padding-left:10px;font-size:12px;color:rgb(54, 54, 54);">
                          <span>注意函数的自变量、因变量的填写格式为: 1,2,0.3 【数字之间用半角逗号隔开】</span>
                        </div>
                        <el-button @click="saveOneEcotypeform(-5)" type="danger" link size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(-5)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(-5)" :disabled="vdisabled[4].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="6">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">6-同化物的转化效率<el-icon style="font-size:15px;"
                              v-show="successIcon[5].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="11">
                          <el-form-item :class="{ 'specialclass': isSpecial.cvl }" prop="cvl" label-width="220px"
                            label="转化为叶子的效率(质量比):">
                            <el-input type="number" :disabled="vdisabled[5].isD" v-model="varietyData.cvl"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="13">
                          <el-form-item :class="{ 'specialclass': isSpecial.cvo }" prop="cvo" label-width="240px"
                            label="转化为储存器官的效率(质量比):">
                            <el-input type="number" :disabled="vdisabled[5].isD" v-model="varietyData.cvo"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="11">
                          <el-form-item :class="{ 'specialclass': isSpecial.cvr }" prop="cvr" label-width="220px"
                            label="转化为根的效率(质量比):">
                            <el-input type="number" :disabled="vdisabled[5].isD" v-model="varietyData.cvr"
                              placeholder="" /></el-form-item>
                        </el-col>
                        <el-col :span="13">
                          <el-form-item :class="{ 'specialclass': isSpecial.cvs }" prop="cvs" label-width="240px"
                            label="转化为茎的效率(质量比):">
                            <el-input type="number" :disabled="vdisabled[5].isD" v-model="varietyData.cvs"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;"><el-button @click="saveOneEcotypeform(-6)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(-6)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(-6)" :disabled="vdisabled[5].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="7">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">7-呼吸作用<el-icon style="font-size:15px;"
                              v-show="successIcon[6].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="14">
                          <el-form-item :class="{ 'specialclass': isSpecial.q10 }" prop="q10" label-width="270px"
                            label="每升高10摄氏度,呼吸速率的相对增加:">
                            <el-input :disabled="vdisabled[6].isD" v-model="varietyData.q10" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item :class="{ 'specialclass': isSpecial.rfsetb }" label-width="220px"
                            label="作为DVS函数的衰老降低系数:">

                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="rfsetb_x" label-width="60px" label="DVS:">
                            <el-input :disabled="vdisabled[6].isD" v-model="varietyfuncData.rfsetb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item prop="rfsetb_y" label-width="140px" label="衰老降低系数:">
                            <el-input :disabled="vdisabled[6].isD" v-model="varietyfuncData.rfsetb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="11">
                          <el-form-item :class="{ 'specialclass': isSpecial.rml }" prop="rml" label-width="170px"
                            type="number" label="叶片相对维持呼吸速率:">
                            <el-input :disabled="vdisabled[6].isD" v-model="varietyData.rml" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="13">
                          <el-form-item :class="{ 'specialclass': isSpecial.rmo }" prop="rmo" label-width="210px"
                            label="贮藏器官的相对维持呼吸率:">
                            <el-input type="number" :disabled="vdisabled[6].isD" v-model="varietyData.rmo"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="11">
                          <el-form-item :class="{ 'specialclass': isSpecial.rmr }" prop="rmr" label-width="170px"
                            label="根的相对维持呼吸率:">
                            <el-input type="number" :disabled="vdisabled[6].isD" v-model="varietyData.rmr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="13">
                          <el-form-item :class="{ 'specialclass': isSpecial.rms }" prop="rms" label-width="210px"
                            label="茎的相对维持呼吸率:">
                            <el-input type="number" :disabled="vdisabled[6].isD" v-model="varietyData.rms"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;width:100%;">
                        <div style="float:left;width:78%;padding-left:10px;font-size:12px;color:rgb(54, 54, 54);">
                          <span>注意函数的自变量、因变量的填写格式为: 1,2,0.3 【数字之间用半角逗号隔开】</span>
                        </div><el-button @click="saveOneEcotypeform(-7)" type="danger" link size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(-7)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(-7)" :disabled="vdisabled[6].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="8">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">8-细胞分化<el-icon style="font-size:15px;"
                              v-show="successIcon[7].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.frtb }" label-width="250px"
                            label="根的总干物质分数作为DVS的函数:">
                            <!-- <el-input :disabled="vdisabled[7].isD" v-model="varietyData.frtb" placeholder="" /> -->
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item prop="frtb_x" label-width="40px" label="DVS">
                            <el-input :disabled="vdisabled[7].isD" v-model="varietyfuncData.frtb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="frtb_y" label-width="130px" label="总干物质(质量比)">
                            <el-input :disabled="vdisabled[7].isD" v-model="varietyfuncData.frtb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.fltb }" label-width="250px"
                            label="叶片总干物质的比例与DVS的函数关系:">
                            <!-- <el-input :disabled="vdisabled[7].isD" v-model="varietyData.flt" placeholder="" /> -->
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item prop="fltb_x" label-width="40px" label="DVS">
                            <el-input :disabled="vdisabled[7].isD" v-model="varietyfuncData.fltb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="fltb_y" label-width="130px" label="总干物质(质量比)">
                            <el-input :disabled="vdisabled[7].isD" v-model="varietyfuncData.fltb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.fstb }" label-width="250px"
                            label="茎的总干物质含量与DVS的函数关系:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item prop="fstb_x" label-width="40px" label="DVS">
                            <el-input :disabled="vdisabled[7].isD" v-model="varietyfuncData.fstb_x"
                              placeholder="" /></el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="fstb_y" label-width="130px" label="总干物质(质量比)">
                            <el-input :disabled="vdisabled[7].isD" v-model="varietyfuncData.fstb_y"
                              placeholder="" /></el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item :class="{ 'specialclass': isSpecial.fotb }" label-width="250px"
                            label="贮藏器官总千物分与DVS的函数关系:">

                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item prop="fotb_x" label-width="40px" label="DVS">
                            <el-input :disabled="vdisabled[7].isD" v-model="varietyfuncData.fotb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="fotb_y" label-width="130px" label="总干物质(质量比)">
                            <el-input :disabled="vdisabled[7].isD" v-model="varietyfuncData.fotb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;"><el-button @click="saveOneEcotypeform(-8)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(-8)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(-8)" :disabled="vdisabled[7].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="9">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">9-死亡率<el-icon style="font-size:15px;"
                              v-show="successIcon[8].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item :class="{ 'specialclass': isSpecial.perdl }" label-width="250px"
                            label="水分胁迫导致的叶片最大相对死亡率:">
                            <el-input type="number" :disabled="vdisabled[8].isD" v-model="varietyData.perdl"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="7">
                          <el-form-item :class="{ 'specialclass': isSpecial.rdrrtb }" label-width="230px"
                            label="茎的相对死亡率与DVS的函数关系:">

                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="rdrrtb_x" label-width="50px" label="DVS">
                            <el-input :disabled="vdisabled[8].isD" v-model="varietyfuncData.rdrrtb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="rdrrtb_y" label-width="100px" label="相对死亡率">
                            <el-input :disabled="vdisabled[8].isD" v-model="varietyfuncData.rdrrtb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>

                        <el-col :span="7">
                          <el-form-item :class="{ 'specialclass': isSpecial.rdrstb }" label-width="230px"
                            label="根的相对死亡率与DVS的函数关系:">

                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="rdrstb_x" label-width="50px" label="DVS">
                            <el-input :disabled="vdisabled[8].isD" v-model="varietyfuncData.rdrstb_x" placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="rdrstb_y" label-width="100px" label="相对死亡率">
                            <el-input :disabled="vdisabled[8].isD" v-model="varietyfuncData.rdrstb_y" placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;"><el-button @click="saveOneEcotypeform(-9)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(-9)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(-9)" :disabled="vdisabled[8].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="10">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">10-水的利用<el-icon style="font-size:15px;"
                              v-show="successIcon[9].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item :class="{ 'specialclass': isSpecial.depnr }" label-width="180px"
                            label="土壤水分损耗作物群编号:">
                            <el-input type="number" :disabled="vdisabled[9].isD" v-model="varietyData.depnr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item :class="{ 'specialclass': isSpecial.cfet }" label-width="180px"
                            label="蒸腾速率校正因子:">
                            <el-input type="number" :disabled="vdisabled[9].isD" v-model="varietyData.cfet"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>

                        <el-col :span="12">
                          <el-form-item :class="{ 'specialclass': isSpecial.iairdu }" label-width="180px"
                            label="根部空气导管是否存在:">

                            <el-select :disabled="vdisabled[9].isD" v-model="varietyData.iairdu" placeholder="">
                              <el-option key="0" label="否" :value="0" />
                              <el-option key="1" label="是" :value="1" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item :class="{ 'specialclass': isSpecial.iox }" label-width="180px"
                            label="氧胁迫效应是否启用:">
                            <el-select :disabled="vdisabled[9].isD" v-model="varietyData.iox" placeholder="">
                              <el-option key="0" label="否" :value="0" />
                              <el-option key="1" label="是" :value="1" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;"><el-button @click="saveOneEcotypeform(-10)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(-10)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(-10)" :disabled="vdisabled[9].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="11">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">11-根深<el-icon style="font-size:15px;"
                              v-show="successIcon[10].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item :class="{ 'specialclass': isSpecial.rdi }" label-width="80px" label="初始根深:">
                            <el-input type="number" :disabled="vdisabled[10].isD" v-model="varietyData.rdi"
                              placeholder="">

                              <template #suffix>
                                cm
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item :class="{ 'specialclass': isSpecial.rri }" label-width="180px"
                            label="扎根深度的最大日增加量:">
                            <el-input type="number" :disabled="vdisabled[10].isD" v-model="varietyData.rri"
                              placeholder="">

                              <template #suffix>
                                cm/天
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item :class="{ 'specialclass': isSpecial.rdmcr }" label-width="110px"
                            label="最大扎根深度:">
                            <el-input type="number" :disabled="vdisabled[10].isD" v-model="varietyData.rdmcr"
                              placeholder="">

                              <template #suffix>
                                cm
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <div style="float:right;"><el-button @click="saveOneEcotypeform(-11)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(-11)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(-11)" :disabled="vdisabled[10].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="12">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">12-不同器官中的最大-临界和残余氮/磷/钾浓度<el-icon
                              style="font-size:15px;" v-show="successIcon[11].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>

                      <!-- N -->
                      <el-row>
                        <el-col :span="7">
                          <el-form-item :class="{ 'specialclass': isSpecial.nmaxlvTb }" label-width="290px"
                            label="叶片中最大N浓度与发育阶段的关系:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="nmaxlvTb_x" label-width="55px" label="DVS">
                            <el-input :disabled="vdisabled[11].isD" v-model="varietyfuncData.nmaxlvTb_x"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="nmaxlvTb_y" label-width="55px" label="浓度">
                            <el-input :disabled="vdisabled[11].isD" v-model="varietyfuncData.nmaxlvTb_y"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <!-- P -->
                      <el-row>
                        <el-col :span="7">
                          <el-form-item :class="{ 'specialclass': isSpecial.pmaxlvTb }" label-width="290px"
                            label="叶片中最大P浓度与发育阶段的关系:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="pmaxlvTb_x" label-width="55px" label="DVS">
                            <el-input :disabled="vdisabled[11].isD" v-model="varietyfuncData.pmaxlvTb_x"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="pmaxlvTb_y" label-width="55px" label="浓度">
                            <el-input :disabled="vdisabled[11].isD" v-model="varietyfuncData.pmaxlvTb_y"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <!-- P -->
                      <el-row>
                        <el-col :span="7">
                          <el-form-item :class="{ 'specialclass': isSpecial.kmaxlvTb }" label-width="290px"
                            label="叶片中最大K浓度与发育阶段的关系:">
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="kmaxlvTb_x" label-width="55px" label="DVS">
                            <el-input :disabled="vdisabled[11].isD" v-model="varietyfuncData.kmaxlvTb_x"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item prop="kmaxlvTb_y" label-width="55px" label="浓度">
                            <el-input :disabled="vdisabled[11].isD" v-model="varietyfuncData.kmaxlvTb_y"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="14">
                          <el-form-item :class="{ 'specialclass': isSpecial.ncritFr }" label-width="290px"
                            label="临界N/P/K浓度占最大N/P/K浓度的百分比 N:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.ncritFr"
                              placeholder="" /></el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.pcritFr }" label-width="20px" label="P:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.pcritFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.kcritFr }" label-width="20px" label="K:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.kcritFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="14">
                          <el-form-item :class="{ 'specialclass': isSpecial.nmaxrtFr }" label-width="350px"
                            label="根中最大N/P/K浓度占叶中最大N/P/K浓度的百分比 N:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.nmaxrtFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.pmaxrtFr }" label-width="20px" label="P:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.pmaxrtFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.kmaxrtFr }" label-width="20px" label="K:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.kmaxrtFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="14">
                          <el-form-item :class="{ 'specialclass': isSpecial.nmaxstFr }" label-width="350px"
                            label="茎中最大N/P/K浓度占叶中最大N/P/K浓度的百分比 N:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.nmaxstFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.pmaxstFr }" label-width="20px" label="P:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.pmaxstFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.kmaxstFr }" label-width="20px" label="K:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.kmaxstFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="14">
                          <el-form-item :class="{ 'specialclass': isSpecial.nmaxso }" label-width="200px"
                            label="贮藏器官中最大N/P/K浓度 N:"><el-input type="number" :disabled="vdisabled[11].isD"
                              v-model="varietyData.nmaxso" placeholder="" /></el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.pmaxso }" label-width="20px" label="P:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.pmaxso"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.kmaxso }" label-width="20px" label="K:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.kmaxso"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="14">
                          <el-form-item :class="{ 'specialclass': isSpecial.nresidlv }" label-width="180px"
                            label="叶片中的残余N/P/K含量 N:"><el-input type="number" v-model="varietyData.nresidlv"
                              :disabled="vdisabled[11].isD" placeholder="" /></el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.presidlv }" label-width="20px" label="P:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.presidlv"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.kresidlv }" label-width="20px" label="K:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.kresidlv"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="14">
                          <el-form-item :class="{ 'specialclass': isSpecial.nresidst }" label-width="180px"
                            label="茎中的残余N/P/K含量 N:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.nresidst"
                              placeholder="" /></el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.presidst }" label-width="20px" label="P:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.presidst"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.kresidst }" label-width="20px" label="K:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.kresidst"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="14">
                          <el-form-item :class="{ 'specialclass': isSpecial.nresidrt }" label-width="180px"
                            label="根中的残余N/P/K含量 N:"><el-input v-model="varietyData.nresidrt" type="number"
                              :disabled="vdisabled[11].isD" placeholder="" /></el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.presidrt }" label-width="20px" label="P:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.presidrt"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.kresidrt }" label-width="20px" label="K:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.kresidrt"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="14">
                          <el-form-item :class="{ 'specialclass': isSpecial.tcnt }" label-width="240px"
                            label="N/P/K转移到贮藏器官的时间系数 N:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.tcnt"
                              placeholder="" /></el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.tcpt }" label-width="20px" label="P:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.tcpt"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item :class="{ 'specialclass': isSpecial.tckt }" label-width="20px" label="K:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.tckt"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="14">
                          <el-form-item :class="{ 'specialclass': isSpecial.nfixFr }" label-width="220px"
                            label="作物通过生物面N吸收N的比例 N:">
                            <el-input type="number" :disabled="vdisabled[11].isD" v-model="varietyData.nfixFr"
                              placeholder="" /></el-form-item>
                        </el-col>
                        <!-- <el-col :span="5">
            <el-form-item label="P:">
              <el-input v-model="varietyData.pfixFr" placeholder="" />
            </el-form-item>
          </el-col> -->
                        <!-- <el-col :span="5">
            <el-form-item label="K:">
              <el-input v-model="varietyData.kfixFr" placeholder="" />
            </el-form-item>
          </el-col> -->
                      </el-row>
                      <div style="float:right;"><el-button @click="saveOneEcotypeform(-12)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(-12)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(-12)" :disabled="vdisabled[11].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="13">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">13-与氮/磷/钾吸收和转运相关的DVS<el-icon
                              style="font-size:15px;" v-show="successIcon[12].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="10">
                          <el-form-item :class="{ 'specialclass': isSpecial.dvsNpkStop }" label-width="230px"
                            label="作物不再吸收氮/磷/钾的发育阶段:">
                            <el-input type="number" :disabled="vdisabled[12].isD" v-model="varietyData.dvsNpkStop"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="14">
                          <el-form-item :class="{ 'specialclass': isSpecial.dvsNpkTransl }" label-width="300px"
                            label="作物开始发生氮/磷/钾向储存器官转运的阶段:">
                            <el-input type="number" :disabled="vdisabled[12].isD" v-model="varietyData.dvsNpkTransl"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;"><el-button @click="saveOneEcotypeform(-13)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(-13)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(-13)" :disabled="vdisabled[12].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="14">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">14-氮/磷/钾胁迫对过程的影响<el-icon
                              style="font-size:15px;" v-show="successIcon[13].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item :class="{ 'specialclass': isSpecial.nlaiNpk }" label-width="435px"
                            label="由于养分NPK胁迫导致叶面积指数增加减少的系数(在幼苗阶段):">
                            <el-input type="number" :disabled="vdisabled[13].isD" v-model="varietyData.nlaiNpk"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item :class="{ 'specialclass': isSpecial.nslaNpk }" label-width="240px"
                            label="养分NPK胁迫对比叶面积的影响系数:">
                            <el-input type="number" :disabled="vdisabled[13].isD" v-model="varietyData.nslaNpk"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item :class="{ 'specialclass': isSpecial.npart }" label-width="240px"
                            label="养分N胁迫对叶片分配的影响系数:">
                            <el-input type="number" :disabled="vdisabled[13].isD" v-model="varietyData.npart"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item :class="{ 'specialclass': isSpecial.nlueNpk }" label-width="405px"
                            label="由于养分NPK胁迫而导致总CO2同化速率减少的系数:">
                            <el-input type="number" :disabled="vdisabled[13].isD" v-model="varietyData.nlueNpk"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item :class="{ 'specialclass': isSpecial.npkTranslrtFr }" label-width="300px"
                            label="根部NPK转运占总NPK从叶片和茎部转运的比例:">
                            <el-input type="number" :disabled="vdisabled[13].isD" v-model="varietyData.npkTranslrtFr"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item :class="{ 'specialclass': isSpecial.rdrlvNpk }" label-width="310px"
                            label="由于养分NPK胁迫导致的叶片最大相对死亡速率:">
                            <el-input type="number" :disabled="vdisabled[13].isD" v-model="varietyData.rdrlvNpk"
                              placeholder="" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;"><el-button @click="saveOneEcotypeform(-14)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(-14)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(-14)" :disabled="vdisabled[13].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item name="15">

                      <template #title>
                        <span><el-text style="padding:0;font-size:13px;">15-最大氮/磷/钾吸收速率<el-icon style="font-size:15px;"
                              v-show="successIcon[14].isS">
                              <CircleCheckFilled />
                            </el-icon></el-text></span>
                      </template>
                      <el-row>
                        <el-col :span="10">
                          <el-form-item :class="{ 'specialclass': isSpecial.rnuptakemax }" label-width="180px"
                            label="每日最大N/P/K吸收速率 N:">
                            <el-input type="number" :disabled="vdisabled[14].isD" v-model="varietyData.rnuptakemax"
                              placeholder="">

                              <template #suffix>
                                kg/公顷/天
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item :class="{ 'specialclass': isSpecial.rpuptakemax }" label-width="20px"
                            label="P:">
                            <el-input type="number" :disabled="vdisabled[14].isD" v-model="varietyData.rpuptakemax"
                              placeholder="">

                              <template #suffix>
                                kg/公顷/天
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item :class="{ 'specialclass': isSpecial.rkuptakemax }" label-width="20px"
                            label="K:">
                            <el-input type="number" :disabled="vdisabled[14].isD" v-model="varietyData.rkuptakemax"
                              placeholder="">

                              <template #suffix>
                                kg/公顷/天
                              </template></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div style="float:right;"><el-button @click="saveOneEcotypeform(-15)" type="danger" link
                          size="small"><el-icon>
                            <DocumentChecked />
                          </el-icon>保存</el-button>
                        <el-button @click="editOneEcotypeform(-15)" type="primary" link size="small"><el-icon>
                            <Edit />
                          </el-icon>编辑</el-button>
                        <el-button @click="clearOneEcotypeform(-15)" :disabled="vdisabled[14].isclearD" type="warning"
                          link size="small"><el-icon>
                            <Delete />
                          </el-icon>清空</el-button>
                      </div>
                    </el-collapse-item>

                  </el-collapse>
                </el-form>
              </div>
            </template>

          </el-tab-pane>
        </el-tabs>

      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import scrollIntoView from 'smooth-scroll-into-view-if-needed'
import Cropcategorychild from '@/views/cropinfo/Cropcategorychild.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteGenericService, updateGenericTypeService, addGenericTypeService, autoGenericidService, deleteVarietyService, deleteEcotyeService, updateVarietyService, addVarietyService, autoVarietyIDService, updateEcotypeService, addEcotypeService, autoEcotypeIDService, cropDataBycategoryService, getGenerictypeService, cropVarietyDataService, cropEcotypeDataService, cropAllDataService, searchFilterService, updateService, getselectRowService, addService, cropCategoryListService, deletecropCategoryService, autoCropIDService, autoGenusListService, uploadSampleImgService } from "@/api/cropcategory.js"
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import { toRaw } from '@vue/reactivity'
import { Edit, Delete, Plus, Upload, Search } from '@element-plus/icons-vue'
import { genFileId } from 'element-plus'
import cloneDeep from 'lodash/cloneDeep'
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
import {
  Check
} from '@element-plus/icons-vue'

//默认选中第一个选项卡
const paneactiveName = ref('')
const editableTabs = ref([])
const showTreeMenu = ref(false)
const tab1 = ref(null)
const tab2 = ref(null)
const tab3 = ref(null)
const ecotypeCropcategory = ref('')
const varietyCropcategory = ref('')
const addGenericCategory = ref('')
const genericList = ref([])
const ecotypeState = ref('edit')
const varietyState = ref('edit')
const dialogVisible = ref(false)
const addDialogForm = ref(null)
const xaddvariety_ecotype = ref({}) //新增品种的时候的生态类型参数
const idslList = ref({
  options: [
    { id: 0, name: '温度' },
    { id: 1, name: '日照' },
    { id: 2, name: '春化' }]
})
const categoryname = ref([
  { key: 1, value: "粮食作物", label: "粮食作物" },
  { key: 2, value: "油料作物", label: "油料作物" },
  { key: 3, value: "纤维作物", label: "纤维作物" },
  { key: 4, value: "糖料作物", label: "糖料作物" },
  { key: 5, value: "嗜好作物", label: "嗜好作物" }
])
const removeTab = (targetName) => {
  const tabs = editableTabs.value
  let activeName = paneactiveName.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }
  paneactiveName.value = activeName
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
}
const cropnameList = ref([])
const vcropnameList = ref([])
const gcropnameList = ref([])
const ecotypeList = ref([])
//主要参数不可编辑
//生态类型
const mainDisabled = ref(true)
const idDisabled = ref(true)
//品种
const vmainDisabled = ref(true)
const vidDisabled = ref(true)
/////uuuu
const ecotypefuncData = ref({
  vernrtb_x: '',
  vernrtb_y: '',
  dtsmtb_x: '',
  dtsmtb_y: '',
  slatb_x: '',
  slatb_y: '',
  ssatb_x: '',
  ssatb_y: '',
  kdiftb_x: '',
  kdiftb_y: '',
  efftb_x: '',
  efftb_y: '',
  amaxtb_x: '',
  amaxtb_y: '',
  tmpftb_x: '',
  tmpftb_y: '',
  tmnftb_x: '',
  tmnftb_y: '',
  rfsetb_x: '',
  rfsetb_y: '',
  rdrrtb_x: '',
  rdrrtb_y: '',
  rdrstb_x: '',
  rdrstb_y: '',
  nmaxlvTb_x: '',
  nmaxlvTb_y: '',
  pmaxlvTb_x: '',
  pmaxlvTb_y: '',
  kmaxlvTb_x: '',
  kmaxlvTb_y: '',
  frtb_x: '',
  frtb_y: '',
  fltb_x: '',
  fltb_y: '',
  fstb_x: '',
  fstb_y: '',
  fotb_x: '',
  fotb_y: ''
})
const varietyfuncData = ref({
  vernrtb_x: '',
  vernrtb_y: '',
  dtsmtb_x: '',
  dtsmtb_y: '',
  slatb_x: '',
  slatb_y: '',
  ssatb_x: '',
  ssatb_y: '',
  kdiftb_x: '',
  kdiftb_y: '',
  efftb_x: '',
  efftb_y: '',
  amaxtb_x: '',
  amaxtb_y: '',
  tmpftb_x: '',
  tmpftb_y: '',
  tmnftb_x: '',
  tmnftb_y: '',
  rfsetb_x: '',
  rfsetb_y: '',
  rdrrtb_x: '',
  rdrrtb_y: '',
  rdrstb_x: '',
  rdrstb_y: '',
  nmaxlvTb_x: '',
  nmaxlvTb_y: '',
  pmaxlvTb_x: '',
  pmaxlvTb_y: '',
  kmaxlvTb_x: '',
  kmaxlvTb_y: '',

  frtb_x: '',
  frtb_y: '',
  fltb_x: '',
  fltb_y: '',
  fstb_x: '',
  fstb_y: '',
  fotb_x: '',
  fotb_y: ''
})
const appendVarietyState = ref(0)
const appendEcotypeState = ref(0)
const varietyallForm = ref(null)
const ecotypeallForm = ref(null)
const tableData = ref([
  { name: 'CO2EFFTB', description: '通用型genericC3/C4EFF的倍增因子，以说明CO2浓度的增加' },
  { name: 'CO2TRATB', description: '通用型genericC3/C4考虑CO2浓度增加的最大蒸腾速率TRAMX的倍增因子' },
  { name: 'CO2AMAXTB', description: '通用型genericC3/C4AMAX的倍增因子，以说明CO2浓度的增加' },
])

//生态类型参数表单
const ecotypeData = ref(
  {
    ecotypeid: 50101,
    cropid: 501,
    cropname: '烟草',
    ecotype: 'tobacco',
    parent: 'GenericC3',
    tbasem: 0,
    teffmx: 0,
    tsumem: 0,
    idsl: idslList.value.options[0],
    dlo: 1,
    dlc: 0,
    tsum1: 1948,
    tsum2: 1948,
    dtsmtb: '[0.0, 0.0, 30.0, 30.0, 40.0, 0.0]',
    dvsi: 0,
    dvsend: 2,
    vernbase: 14,
    vernsat: 70,
    verndvs: 0.3,
    vernrtb: '[-8.0, 0.0, -4.0, 0.0, 3.0, 1.0, 10.0, 1.0, 17.0, 0.0, 20.0, 0.0]',
    tdwi: 65,
    rgrlai: 0.05,
    slatb: '[0.0, 0.002, 2.0, 0.0008]',
    spa: 0,
    ssatb: '[0.0, 0.0, 2.0, 0.0]',
    span: 45,
    tbase: 0,
    kdiftb: '[0.0, 0.6, 2.0, 0.6]',
    efftb: '[0.0, 0.83, 40.0, 0.83]',
    amaxtb: '[0.0, 25.0, 2.0, 25.0]',
    refco2L: 360,
    tmpftb: '[0.0, 0.0, 10.0, 0.8, 20.0, 0.9, 35.0, 1.0, 45.0, 1.0, 51.0, 0.0]',
    tmnftb: '[0.0, 0.0, 3.0, 1.0]',
    cvl: 0.72,
    cvo: 0.73,
    cvr: 0.72,
    cvs: 0.69,
    q10: 2,
    rml: 0.03,
    rmo: 0.01,
    rmr: 0.01,
    rms: 0.015,
    rfsetb: '[0.0, 1.0, 2.0, 1.0]',
    frtb: '[0.0, 0.2, 0.25, 0.25, 1.5, 0.15, 2.0, 0.25]',
    fltb: '[0.0, 0.7, 0.3, 0.85, 0.45, 0.85, 1.0, 0.4, 2.0, 0.4]',
    fstb: '[0.0, 0.3, 0.3, 0.15, 0.45, 0.15, 1.0, 0.6, 2.0, 0.32]',
    fotb: '[0.0, 0.0, 1.0, 0.0, 2.0, 0.28]',
    perdl: 0.03,
    rdrrtb: '[0.0, 0.0, 1.5, 0.0, 1.51, 0.02, 2.0, 0.02]',
    rdrstb: '[0.0, 0.0, 1.5, 0.0, 1.51, 0.02, 2.0, 0.02]',
    cfet: 1,
    depnr: 4.5,
    iairdu: 0,
    iox: 0,
    rdi: 10,
    rri: 1.2,
    rdmcr: 70,
    nmaxlvTb: '[0.0, 0.06, 0.4, 0.05, 0.7, 0.045, 1.0, 0.04, 2.0, 0.04, 2.1, 0.04]',
    nmaxrtFr: 0.5,
    nmaxstFr: 0.5,
    nmaxso: 0.0168,
    ncritFr: 1,
    nresidlv: 0.014,
    nresidst: 0.007,
    nresidrt: 0.007,
    tcnt: 10,
    nfixFr: 0,
    pmaxlvTb: '[0.0, 0.0078, 0.4, 0.0065, 0.7, 0.0059, 1.0, 0.0052, 2.0, 0.0052, 2.1, 0.0052]',
    pmaxrtFr: 0.5,
    pmaxstFr: 0.5,
    pmaxso: 0.0024,
    pcritFr: 1,
    presidlv: 0.002,
    presidst: 0.001,
    presidrt: 0.001,
    tcpt: 10,
    kmaxlvTb: '[0.0, 0.071, 0.4, 0.059, 0.7, 0.053, 1.0, 0.048, 2.0, 0.048, 2.1, 0.048]',
    kmaxrtFr: 0.5,
    kmaxstFr: 0.5,
    kmaxso: 0.0152,
    kcritFr: 1,
    kresidlv: 0.0127,
    kresidst: 0.0063,
    kresidrt: 0.0063,
    tckt: 10,
    dvsNpkStop: 1.3,
    dvsNpkTransl: 0.8,
    nlaiNpk: 1,
    nslaNpk: 0.5,
    npart: 1,
    nlueNpk: 1.1,
    npkTranslrtFr: 0.5,
    rdrlvNpk: 0.05,
    rnuptakemax: 7.2,
    rpuptakemax: 0.8,
    rkuptakemax: 7.4,
    label: '生态类型tobacco'

  })

//更新的品种字段特殊样式
const isSpecial = ref({
  tbasem: false,
  teffmx: false,
  tsumem: false,
  idsl: false,
  dlo: false,
  dlc: false,
  tsum1: false,
  tsum2: false,
  dtsmtb: false,
  dvsi: false,
  dvsend: false,
  vernbase: false,
  vernsat: false,
  verndvs: false,
  vernrtb: false,
  tdwi: false,
  rgrlai: false,
  slatb: false,
  spa: false,
  ssatb: false,
  span: false,
  tbase: false,
  kdiftb: false,
  efftb: false,
  amaxtb: false,
  refco2L: false,
  tmpftb: false,
  tmnftb: false,
  cvl: false,
  cvo: false,
  cvr: false,
  cvs: false,
  q10: false,
  rml: false,
  rmo: false,
  rmr: false,
  rms: false,
  rfsetb: false,
  frtb: false,
  fltb: false,
  fstb: false,
  fotb: false,
  perdl: false,
  rdrrtb: false,
  rdrstb: false,
  cfet: false,
  depnr: false,
  iairdu: false,
  iox: false,
  rdi: false,
  rri: false,
  rdmcr: false,
  nmaxlvTb: false,
  nmaxrtFr: false,
  nmaxstFr: false,
  nmaxso: false,
  ncritFr: false,
  nresidlv: false,
  nresidst: false,
  nresidrt: false,
  tcnt: false,
  nfixFr: false,
  pmaxlvTb: false,
  pmaxrtFr: false,
  pmaxstFr: false,
  pmaxso: false,
  pcritFr: false,
  presidlv: false,
  presidst: false,
  presidrt: false,
  tcpt: false,
  kmaxlvTb: false,
  kmaxrtFr: false,
  kmaxstFr: false,
  kmaxso: false,
  kcritFr: false,
  kresidlv: false,
  kresidst: false,
  kresidrt: false,
  tckt: false,
  dvsNpkStop: false,
  dvsNpkTransl: false,
  nlaiNpk: false,
  nslaNpk: false,
  npart: false,
  nlueNpk: false,
  npkTranslrtFr: false,
  rdrlvNpk: false,
  rnuptakemax: false,
  rpuptakemax: false,
  rkuptakemax: false,
  label: false,
  level: false,
  id: false
})
const saveEcotypebtn = ref(true)
const saveVarietybtn = ref(false)
const imgurl = ref(new URL('/src/assets/crop_categorysampleimgs/x.png', import.meta.url).href)
const activeNames = ref(['1'])//活动面板
const vactiveNames = ref(['1'])//活动面板
const GenericactiveNames = ref([])
const customNodeClass = (data, node) => {
  if (data.level === 1) {
    return 'levelFirst'
  } else if (data.level === 2) {
    return 'levelSecond'
  } else {
    return 'levelThird'
  }
}
const treeRef = ref(null)
//树的操作tttttttttree
const treeExpandData = ref([]) //默认展开节点
const currentNodekeys = ref(101)
//树的数据
const data = ref([])
//获取数据
const getCropvarietyData = async () => {
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
        result2 = await cropEcotypeDataService({ cropid: data2[i].id })
        // result2.data
        for (let j = 0; j < result2.data.length; j++) {
          result2.data[j].label = '生态类型' + result2.data[j].ecotype
          result2.data[j].id = result2.data[j].ecotypeid
          result2.data[j].level = 4
          //获取第三层
          result3 = await cropVarietyDataService({ ecotype: result2.data[j].ecotype })
          for (let jj = 0; jj < result3.data.length; jj++) {
            result3.data[jj].label = '品种' + result3.data[jj].variety
            result3.data[jj].level = 5
            result3.data[jj].id = result3.data[jj].varietyid
          }
          result2.data[j].children = result3.data

        }
        data2[i].children = result2.data
        data1[xx].children.push(data2[i])
      }

    }
  }
  data0[0].children = data1
  data.value = data0
  console.log("data", data.value)
  treeExpandData.value.push(data.value[0].id) //默认展开第一个
  let node = { level: 1 }
  nextTick(treeRef.value.setCurrentKey(data.value[0].id))
  treeNodeClick(null, node, null, null);

}
const InitTree = () => {
  getCropvarietyData()
  console.log("xxxx", data.value)
}
InitTree()

const defaultProps = {
  children: 'children',
  label: 'label',
}
const cropcategoryData = ref({
  categoryid: '',
  cropid: '',
  category: '',
  cropname: ''
})
const genericfuncdata = ref({

})
const newgenericfuncdata = ref({
  co2Efftb0: "",
  co2Efftb1: "",
  co2Tratb0: "",
  co2Tratb1: "",
  co2Amaxtb0: "",
  co2Amaxtb1: ""
})
//点击树 渲染数据ncnc
//通用参数部分的数据绑定
const getGenericFundata = (key, data) => {
  let mmlist = data[key].replace('[', '').replace(']', '').replace(' ', '').replace('"', '').split(',')
  let xx = ''
  let yy = ''
  for (let j = 1; j <= mmlist.length; j++) {
    if ((j % 2) == 0) {
      if (j == 2) yy += mmlist[j - 1]
      else yy += ',' + mmlist[j - 1]
    } else {
      if (j == 1) xx += mmlist[j - 1]
      else xx += ',' + mmlist[j - 1]
    }
  }
  return [xx, yy]
}
////ccccccaaaa
const addCropNode = (cropdata) => {
  console.log("cropdata", cropdata)
  let categoryid
  for (let i = 0; i < categoryname.value.length; i++) {
    if (categoryname.value[i].value == cropdata.category) categoryid = categoryname.value[i].key
  }
  cropdata.label = cropdata.id + cropdata.cropname
  cropdata.level = 3
  treeRef.value.append(cropdata, categoryid)  //这个不需要了
  //树形结构定位xxxxe
  treeExpandData.value = [0] //展开第一层节点OK
  treeExpandData.value = [0, categoryid]
  // currentNodekeys.value = ecotypeData.value.ecotypeid
  // currentNodekeys.value = cloneDeep(currentNodekeys.value)
  treeRef.value.setCurrentKey(cropdata.id)
}
const genericData = ref([])
const newgenericData = ref({
  cropId: '',
  cropName: "",
  genericId: "",
  genericType: "Generic3",
  co2Efftb: "",
  co2Tratb: "",
  co2Amaxtb: ""
})
const varietyData = ref({})
const gdisabled = ref([])
const genericFormRefs = ref([]);
const addgenericFormRef = (index, el) => {
  genericFormRefs.value[index] = el;
}

const treeNodeClick = async (treeobj, node, treenode, event) => {
  // alert(node.id)
  saveEcotypebtn.value = false
  let isflag = 0
  let flag2 = 0
  if (node.level == 1) {
    paneactiveName.value = 'tab0'
  }
  //点击生态类型所在层
  if (node.level == 4) {
    isflag = 0
    let mtab = []
    for (let mm = 0; mm < editableTabs.value.length; mm++) {
      if (editableTabs.value[mm].type != 'ecotypeTab') mtab.push(editableTabs.value[mm])
      if (editableTabs.value[mm].name == node.data.ecotype) isflag = 1
    }
    ///hhhhhhhhhhh
    editableTabs.value = mtab
    if (appendVarietyState.value == 0) {
      editableTabs.value.push({ title: node.data.label, name: node.data.ecotype, type: 'ecotypeTab' })
      paneactiveName.value = node.data.ecotype
    }
    appendVarietyState.value = 0
    activeNames.value = ["1"]
    for (let i = 0; i < isDisabled.value.length; i++) {
      isDisabled.value[i].isD = true/////77777777
      isDisabled.value[i].isclearD = true
    }
    // paneactiveName.value = 'tab2'
    ecotypeData.value = node.data
    ecotypeCropcategory.value = Number(ecotypeData.value.cropid.toString().slice(0, 1))
    //处理数据一些函数的数据
    let ecotypefuncKeys0 = Object.keys(ecotypefuncData.value)
    let ecotypefuncKeys = []
    for (let m = 0; m < ecotypefuncKeys0.length; m++) {
      if ((m % 2) === 0) {
        ecotypefuncKeys.push(ecotypefuncKeys0[m].split('_')[0]) //所有的函数字段
      }
    }
    //遍历函数字段
    for (let n = 0; n < ecotypefuncKeys.length; n++) {
      let fkey = ecotypefuncKeys[n]
      let ecotypeData0 = ecotypeData.value[fkey]
      let x1 = ''
      let y1 = ''
      if (ecotypeData0 != '' && ecotypeData0 != undefined) {
        let ecotypeData1 = ecotypeData0.replace('[', '').replace(']', '').replace(' ', '').replace('"', '')
        let array1 = ecotypeData1.split(',')
        for (let i = 1; i <= array1.length; i++) {
          if ((i % 2) === 0) {
            if (i == 2) y1 = y1 + array1[i - 1]
            else y1 = y1 + ',' + array1[i - 1]
          }
          else {
            if (i == 1) x1 = x1 + array1[i - 1]
            else x1 = x1 + ',' + array1[i - 1]
          }
        }
        ecotypefuncData.value[fkey + '_x'] = x1
        ecotypefuncData.value[fkey + '_y'] = y1
      }
    }

  }
  //点击第二层作物
  if (node.level == 3) {
    isflag = 0
    let mtab = []
    for (let mm = 0; mm < editableTabs.value.length; mm++) {
      if (editableTabs.value[mm].type != 'genericTab') mtab.push(editableTabs.value[mm])
      if (editableTabs.value[mm].name == node.data.label) isflag = 1
    }
    ///hhhhhhhhhhh
    editableTabs.value = mtab
    if (appendEcotypeState.value == 0) {
      editableTabs.value.push({ title: node.data.label, name: node.data.cropname, type: 'genericTab' })
      paneactiveName.value = node.data.cropname
    }
    appendEcotypeState.value = 0

    cropcategoryData.value.categoryid = parseInt(node.data.id.toString().substring(0, 1))
    cropcategoryData.value.cropid = node.data.id
    cropcategoryData.value.category = node.data.category
    cropcategoryData.value.cropname = node.data.cropname
    let newurl = new URL('/src/assets/crop_categorysampleimgs/' + node.data.id + '_0.png', import.meta.url).href
    imgurl.value = newurl

    //开始渲染数据
    let result = await getGenerictypeService({ cropid: node.data.id })
    genericData.value = result.data
    //处理函数数据

    for (let i = 0; i < genericData.value.length; i++) {
      let xgenericdata = genericData.value[i]
      //co2Efftb
      genericData.value[i].co2Efftb0 = getGenericFundata('co2Efftb', xgenericdata)[0]
      genericData.value[i].co2Efftb1 = getGenericFundata('co2Efftb', xgenericdata)[1]
      genericData.value[i].co2Tratb0 = getGenericFundata('co2Tratb', xgenericdata)[0]
      genericData.value[i].co2Tratb1 = getGenericFundata('co2Tratb', xgenericdata)[1]
      genericData.value[i].co2Amaxtb0 = getGenericFundata('co2Amaxtb', xgenericdata)[0]
      genericData.value[i].co2Amaxtb1 = getGenericFundata('co2Amaxtb', xgenericdata)[1]
    }

    //处理
    gdisabled.value = []
    for (let ym = 0; ym < genericData.value.length; ym++) {
      gdisabled.value.push({ isD: false, isclearD: false })
    }
    GenericactiveNames.value = []
    GenericactiveNames.value.push(genericData.value[0].genericType)
  }
  //点击品种层4444444
  if (node.level == 5) {

    isflag = 0
    let mtab = []
    console.log("xxxxxxxxxxxxx",editableTabs.value)
    for (let mm = 0; mm < editableTabs.value.length; mm++) {
      if (editableTabs.value[mm].type != 'varietyTab') mtab.push(editableTabs.value[mm])
      // if (editableTabs.value[mm].name == node.data.label) isflag = 1
    }
    editableTabs.value = mtab
    editableTabs.value.push({ title: node.data.label, name: node.data.label, type: 'varietyTab' })
    nextTick(()=>{
  paneactiveName.value = node.data.label
    })
    for (let i = 0; i < vdisabled.value.length; i++) {
      vdisabled.value[i].isD = true/////77777777
      vdisabled.value[i].isclearD = true
    }
    vactiveNames.value = []
    // treeNodeClick(null, node.parent.parent)
    // treeNodeClick(null, node.parent) //模拟点击父节点
    let xlist = [[6, 8], [9, 20], [21, 22], [23, 27], [28, 33], [34, 37], [38, 43], [44, 47], [48, 50], [51, 54], [55, 57], [58, 85], [86, 87], [88, 93], [94, 96]]
    isSpecial.value = {
      tbasem: false,
      teffmx: false,
      tsumem: false,
      idsl: false,
      dlo: false,
      dlc: false,
      tsum1: false,
      tsum2: false,
      dtsmtb: false,
      dvsi: false,
      dvsend: false,
      vernbase: false,
      vernsat: false,
      verndvs: false,
      vernrtb: false,
      tdwi: false,
      rgrlai: false,
      slatb: false,
      spa: false,
      ssatb: false,
      span: false,
      tbase: false,
      kdiftb: false,
      efftb: false,
      amaxtb: false,
      refco2L: false,
      tmpftb: false,
      tmnftb: false,
      cvl: false,
      cvo: false,
      cvr: false,
      cvs: false,
      q10: false,
      rml: false,
      rmo: false,
      rmr: false,
      rms: false,
      rfsetb: false,
      frtb: false,
      fltb: false,
      fstb: false,
      fotb: false,
      perdl: false,
      rdrrtb: false,
      rdrstb: false,
      cfet: false,
      depnr: false,
      iairdu: false,
      iox: false,
      rdi: false,
      rri: false,
      rdmcr: false,
      nmaxlvTb: false,
      nmaxrtFr: false,
      nmaxstFr: false,
      nmaxso: false,
      ncritFr: false,
      nresidlv: false,
      nresidst: false,
      nresidrt: false,
      tcnt: false,
      nfixFr: false,
      pmaxlvTb: false,
      pmaxrtFr: false,
      pmaxstFr: false,
      pmaxso: false,
      pcritFr: false,
      presidlv: false,
      presidst: false,
      presidrt: false,
      tcpt: false,
      kmaxlvTb: false,
      kmaxrtFr: false,
      kmaxstFr: false,
      kmaxso: false,
      kcritFr: false,
      kresidlv: false,
      kresidst: false,
      kresidrt: false,
      tckt: false,
      dvsNpkStop: false,
      dvsNpkTransl: false,
      nlaiNpk: false,
      nslaNpk: false,
      npart: false,
      nlueNpk: false,
      npkTranslrtFr: false,
      rdrlvNpk: false,
      rnuptakemax: false,
      rpuptakemax: false,
      rkuptakemax: false,
      label: false,
      level: false,
      id: false
    }
    // let result = await getGenerictypeService({ cropid: node.data.id })
    // genericData.value = result.data
    if (node.parent) {
      let ecotypedata = node.parent.data
      let keys = [
        "varietyid",
        "cropid",
        "cropname",
        "variety",
        "parent",
        "tbasem",
        "teffmx",
        "tsumem",
        "idsl",
        "dlo",
        "dlc",
        "tsum1",
        "tsum2",
        "dtsmtb",
        "dvsi",
        "dvsend",
        "vernbase",
        "vernsat",
        "verndvs",
        "vernrtb",
        "tdwi",
        "rgrlai",
        "slatb",
        "spa",
        "ssatb",
        "span",
        "tbase",
        "kdiftb",
        "efftb",
        "amaxtb",
        "refco2L",
        "tmpftb",
        "tmnftb",
        "cvl",
        "cvo",
        "cvr",
        "cvs",
        "q10",
        "rml",
        "rmo",
        "rmr",
        "rms",
        "rfsetb",
        "frtb",
        "fltb",
        "fstb",
        "fotb",
        "perdl",
        "rdrrtb",
        "rdrstb",
        "cfet",
        "depnr",
        "iairdu",
        "iox",
        "rdi",
        "rri",
        "rdmcr",
        "nmaxlvTb",
        "nmaxrtFr",
        "nmaxstFr",
        "nmaxso",
        "ncritFr",
        "nresidlv",
        "nresidst",
        "nresidrt",
        "tcnt",
        "nfixFr",
        "pmaxlvTb",
        "pmaxrtFr",
        "pmaxstFr",
        "pmaxso",
        "pcritFr",
        "presidlv",
        "presidst",
        "presidrt",
        "tcpt",
        "kmaxlvTb",
        "kmaxrtFr",
        "kmaxstFr",
        "kmaxso",
        "kcritFr",
        "kresidlv",
        "kresidst",
        "kresidrt",
        "tckt",
        "dvsNpkStop",
        "dvsNpkTransl",
        "nlaiNpk",
        "nslaNpk",
        "npart",
        "nlueNpk",
        "npkTranslrtFr",
        "rdrlvNpk",
        "rnuptakemax",
        "rpuptakemax",
        "rkuptakemax",
        "label",
        "level",
        "id"
      ]
      //kkkkkkkk
      let ecotypefuncKeys0 = Object.keys(ecotypefuncData.value)
      let ecotypefuncKeys = []
      for (let m = 0; m < ecotypefuncKeys0.length; m++) {
        if ((m % 2) === 0) {
          ecotypefuncKeys.push(ecotypefuncKeys0[m].split('_')[0]) //所有的函数字段
        }
      }
      for (let i = 0; i < keys.length; i++) {
        let xkey = keys[i]
        if (ecotypefuncKeys.indexOf(xkey) !== -1) {///如果这是一个函数
          if (node.data[xkey].replace(' ', '') == ecotypedata[xkey].replace(' ', '') || node.data[xkey] == 0 || node.data[xkey] == undefined || node.data[xkey] == null || node.data[xkey] == '') {
            //这个时候说明没有更新值
            varietyfuncData.value[xkey + '_x'] = ecotypefuncData.value[xkey + '_x']
            varietyfuncData.value[xkey + '_y'] = ecotypefuncData.value[xkey + '_y']
          } else {
            //这个时候有更新值 需要设计一下label颜色
            for (let xx = 0; xx < xlist.length; xx++) {
              if ((i + 1 >= xlist[xx][0]) && (i + 1 <= xlist[xx][1])) vactiveNames.value.push(xx.toString())
            }
            isSpecial.value[xkey] = true
            let xxx = node.data[xkey].replace('[', '').replace(']', '').replace(' ', '').replace('"', '').split(',')
            let y1 = ''
            let x1 = ''
            for (let j = 1; j <= xxx.length; j++) {
              if ((j % 2) === 0) {
                if (j == 2) y1 = y1 + xxx[j - 1]
                else y1 = y1 + ',' + xxx[j - 1]
              }
              else {
                if (j == 1) x1 = x1 + xxx[j - 1]
                else x1 = x1 + ',' + xxx[j - 1]
              }
            }
            varietyfuncData.value[xkey + '_x'] = x1
            varietyfuncData.value[xkey + '_y'] = y1
          }
        } else {///如果不是函数
          if (node.data[xkey] == ecotypedata[xkey] || node.data[xkey] == 0 || node.data[xkey] == undefined || node.data[xkey] == null || node.data[xkey] == '') {
            //这个时候说明没有更新值
            varietyData.value[xkey] = ecotypedata[xkey]
          }
          else {
            //这个时候有更新值 需要设计一下label颜色
            for (let xx = 0; xx < xlist.length; xx++) {
              if ((i + 1 >= xlist[xx][0]) && (i + 1 <= xlist[xx][1])) vactiveNames.value.push((xx + 1).toString())
            }
            isSpecial.value[xkey] = true
            varietyData.value[xkey] = node.data[xkey]
          }
        }

      }
      varietyData.value.varietyid = node.data.varietyid
      varietyData.value.cropid = node.data.cropid
      varietyData.value.cropname = node.data.cropname
      varietyData.value.variety = node.data.variety
      varietyData.value.parent = node.data.parent
      // console.log("node", node.parent.parent.parent.data)
      varietyCropcategory.value = node.parent.parent.parent.data.id
      //开始渲染数据
    }

  }
}

//双击事件
const treeNodeDoubleClick = (event) => {
  // const targetNode = event.target.closest('.labelName');
  let targetNode = event.target
  let s = targetNode.outerHTML.split('<span class="labelName" style="margin-top: -5px; font-size: 13px; color: rgb(58, 107, 47);">')[1].split('</span>')[0]
  console.log(parseInt(s))
}
//关闭所有节点
const closeAllNodes = () => {
  const closeChildren = (children) => {
    children.forEach((child) => {
      child.expanded = false;
      if (child.children) {
        closeChildren(child.children);
      }
    });
  }
  for (let i = 0; i < data.value.length; i++) {
    data.value[i].expanded = false;
    if (data.value[i].children) {
      closeChildren(data.value[i].children);
    }
  }
}
const deleteOneGenericform = async (index) => {
  ElMessageBox.confirm(
    '确认删除' + genericData.value[index].cropName + '下的通用型' + genericData.value[index].genericType + '吗？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async (action, instance, done) => {
    if (action === 'confirm') {
      //

      //从后端删除
      let result = await deleteGenericService(genericData.value[index].genericId)
      if (result.code === 0) {
        //先从前端删除
        genericData.value.splice(index, 1)
        ElMessage.success('删除成功')
      }
      else ElMessage.success('删除失败')
    } else ElMessage.success('删除失败')

  })
}
///sggggg
const saveOneGenericform = async (index) => {

  genericFormRefs.value[index].validate(async (valid) => {
    if (valid) {
      // 校验成功
      // 在数据库中保存
      // let result = await updateGenericTypeService(genericData.value[index])
      // let index = activeNames.value.indexOf(num.toString());
      let fkeys = Object.keys(newgenericfuncdata.value)
      //开始处理data
      // console.log("genericData", genericData.value[index])
      let xxdata = {}
      let mkeys = Object.keys(genericData.value[index])
      for (let m = 0; m < mkeys.length; m++) {
        xxdata[mkeys[m]] = genericData.value[index][mkeys[m]]
      }

      for (let i = 0; i < fkeys.length - 1; i += 2) {

        let x = xxdata[fkeys[i]].replace(' ', '').split(',')
        let y = xxdata[fkeys[i + 1]].replace(' ', '').split(',')

        let len = x.length
        let mm = '['
        if (x.length >= y.length) len = y.length
        for (let j = 0; j < len - 1; j++) {
          mm += x[j] + ','
          mm += y[j] + ','
        }
        mm += x[len - 1] + ','
        mm += y[len - 1] + ']'

        let ekey = fkeys[i].substring(0, fkeys[i].length - 1);
        xxdata[ekey] = mm

      }
      nextTick(async () => {
        try {
          // console.log("111", xxdata.co2Efftb)


          let xupdateGdata = JSON.parse(JSON.stringify(xxdata))
          delete xupdateGdata.co2Efftb0
          delete xupdateGdata.co2Efftb1
          delete xupdateGdata.co2Amaxtb0
          delete xupdateGdata.co2Amaxtb1
          delete xupdateGdata.co2Tratb0
          delete xupdateGdata.co2Tratb1
          console.log("222", xupdateGdata)

          let result = await updateGenericTypeService(xupdateGdata)
          if (result.code == 0) {
            // ElMessage.success('保存成功')
            genericData.value[index] = xxdata
            genericData.value = JSON.parse(JSON.stringify(genericData.value))
          }
        } catch {
          ElMessage.success('更改失败')
        }

      })


      // if (index !== -1) {
      //   // 在数据中移除该折叠面的名称
      //   activeNames.value.splice(index, 1);
      // }

      gdisabled.value[index].isD = true;
      gdisabled.value[index].isclearD = false;
    }
    else {
      ElMessage.error('请检查输入格式是否有误且必填项不能为空')
    }
  })
}
const editOneGenericform = (index) => {
  gdisabled.value[index].isD = false;
  gdisabled.value[index].isclearD = false;
}
const clearOneGenericform = (index) => {
  genericData.value[index].co2Efftb0 = ""
  genericData.value[index].co2Efftb1 = ''
  genericData.value[index].co2Tratb0 = ''
  genericData.value[index].co2Tratb1 = ''
  genericData.value[index].co2Amaxtb0 = ''
  genericData.value[index].co2Amaxtb1 = ''
  genericData.value = cloneDeep(genericData.value); //就是这样深拷贝了才可以删除
  console.log(genericData.value[index])
  genericFormRefs.value[index].resetFields()
  // setTimeout(() => { genericForm.value.clearValidate(xkeys[i]) }, 0) //清除指定的验证

}
const isDisabled = ref([
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false }
])
const vdisabled = ref([
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false },
  { isD: false, isclearD: false }
])
const successIcon = ref([
  { isS: false },
  { isS: false },
  { isS: false },
  { isS: false },
  { isS: false },
  { isS: false },
  { isS: false },
  { isS: false },
  { isS: false },
  { isS: false },
  { isS: false },
  { isS: false },
  { isS: false },
  { isS: false },
  { isS: false }
])
const checkFunc = (value, callback, xflag) => {
  let flag = 0
  // if ((value === '' || value === undefined) && xflag !== 0) callback(new Error('不能为空'))
  if (1) {
    let x = value.split(',')
    let xxnum = 0
    var numRe = new RegExp("^[0-9]+\.{0,1}[0-9]{0,2}$")
    for (let i = 0; i < x.length; i++) {
      // console.log(x[i], isNaN(Number(x[i])))
      if (isNaN(Number(x[i])) && x[i] !== '') {
        flag = 1
        break
      }
    }
    if (flag === 0) {
      callback()
    } else {
      callback(new Error('格式错误'))
    }
  }
}
const checkFunc_vernrtb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.vernrtb_x
  checkFunc(value, callback)
}
const checkFunc_vernrtb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.vernrtb_y
  checkFunc(value, callback)
}
const checkFunc_dtsmtb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.dtsmtb_x
  checkFunc(value, callback, 0)
}
const checkFunc_dtsmtb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.dtsmtb_y
  checkFunc(value, callback, 0)
}
const checkFunc_slatb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.slatb_x
  checkFunc(value, callback, 0)
}
const checkFunc_slatb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.slatb_y
  checkFunc(value, callback, 0)
}
const checkFunc_ssatb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.ssatb_x
  checkFunc(value, callback, 0)
}
const checkFunc_ssatb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.ssatb_y
  checkFunc(value, callback, 0)
}
///55555
const checkFunc_efftb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.efftb_x
  checkFunc(value, callback)
}
const checkFunc_efftb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.efftb_y
  checkFunc(value, callback)
}

const checkFunc_amaxtb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.amaxtb_x
  checkFunc(value, callback)
}
const checkFunc_amaxtb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.amaxtb_y
  checkFunc(value, callback)
}

const checkFunc_tmpftb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.tmpftb_x
  checkFunc(value, callback)
}
const checkFunc_tmpftb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.tmpftb_y
  checkFunc(value, callback)
}

const checkFunc_tmnftb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.tmnftb_x
  checkFunc(value, callback)
}
const checkFunc_tmnftb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.tmnftb_y
  checkFunc(value, callback)
}

const checkFunc_kdiftb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.kdiftb_x
  checkFunc(value, callback)
}
const checkFunc_kdiftb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.kdiftb_y
  checkFunc(value, callback)
}

const checkFunc_rfsetb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.rfsetb_x
  checkFunc(value, callback)
}
const checkFunc_rfsetb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.rfsetb_y
  checkFunc(value, callback)
}

const checkFunc_rdrrtb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.rdrrtb_x
  checkFunc(value, callback, 0)
}
const checkFunc_rdrrtb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.rdrrtb_y
  checkFunc(value, callback, 0)
}

const checkFunc_rdrstb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.rdrstb_x
  checkFunc(value, callback, 0)
}
const checkFunc_rdrstb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.rdrstb_y
  checkFunc(value, callback, 0)
}


const checkFunc_kmaxlvTb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.kmaxlvTb_y
  checkFunc(value, callback, 0)
}
const checkFunc_kmaxlvTb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.kmaxlvTb_x
  checkFunc(value, callback, 0)
}

const checkFunc_pmaxlvTb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.pmaxlvTb_y
  checkFunc(value, callback, 0)
}
const checkFunc_pmaxlvTb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.pmaxlvTb_x
  checkFunc(value, callback, 0)
}

const checkFunc_nmaxlvTb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.nmaxlvTb_x
  checkFunc(value, callback, 0)
}
const checkFunc_nmaxlvTb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.nmaxlvTb_y
  checkFunc(value, callback, 0)
}

const checkFunc_frtb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.frtb_x
  checkFunc(value, callback, 0)
}
const checkFunc_frtb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.frtb_y
  checkFunc(value, callback, 0)
}
const checkFunc_fltb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.fltb_x
  checkFunc(value, callback, 0)
}
const checkFunc_fltb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.fltb_y
  checkFunc(value, callback, 0)
}

const checkFunc_fstb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.fstb_x
  checkFunc(value, callback, 0)
}
const checkFunc_fstb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.fstb_y
  checkFunc(value, callback, 0)
}
const checkFunc_fotb_x = (rule, value, callback) => {
  value = ecotypefuncData.value.fotb_x
  checkFunc(value, callback, 0)
}
const checkFunc_fotb_y = (rule, value, callback) => {
  value = ecotypefuncData.value.fotb_y
  checkFunc(value, callback, 0)
}
///gggenerictype
const checkFunc_co2Efftb0 = (rule, value, callback) => {
  if (value == undefined) value = newgenericfuncdata.value.co2Efftb0
  checkFunc(value, callback)
}
const checkFunc_co2Efftb1 = (rule, value, callback) => {
  if (value == undefined) value = newgenericfuncdata.value.co2Efftb1
  checkFunc(value, callback)
}
const checkFunc_co2Tratb0 = (rule, value, callback) => {
  if (value == undefined) value = newgenericfuncdata.value.co2Tratb0
  checkFunc(value, callback)
}
const checkFunc_co2Tratb1 = (rule, value, callback) => {
  if (value == undefined) value = newgenericfuncdata.value.co2Tratb1
  checkFunc(value, callback)
}
const checkFunc_co2Amaxtb0 = (rule, value, callback) => {
  if (value == undefined) value = newgenericfuncdata.value.co2Amaxtb0
  checkFunc(value, callback)
}
const checkFunc_co2Amaxtb1 = (rule, value, callback) => {
  if (value == undefined) value = newgenericfuncdata.value.co2Amaxtb1
  checkFunc(value, callback)
}
///rrrrrr
const genericRules = ref({
  co2Efftb0: [{ required: true, validator: checkFunc_co2Efftb0, trigger: 'blur' }],
  co2Efftb1: [{ required: true, validator: checkFunc_co2Efftb1, trigger: 'blur' }],
  co2Tratb0: [{ required: true, validator: checkFunc_co2Tratb0, trigger: 'blur' }],
  co2Tratb1: [{ required: true, validator: checkFunc_co2Tratb1, trigger: 'blur' }],
  co2Amaxtb0: [{ required: true, validator: checkFunc_co2Amaxtb0, trigger: 'blur' }],

  co2Amaxtb1: [{ required: true, validator: checkFunc_co2Amaxtb1, trigger: 'blur' }]


})
const allrules = ref({
  ecotypeid: [{ required: true, message: '不能为空', trigger: 'blur' }],
  ecotype: [{ required: true, message: '不能为空', trigger: 'blur' }],
  cropname: [{ required: true, message: '不能为空', trigger: 'blur' }],
  //11

  tbasem: [{ required: true, message: '不能为空', trigger: 'blur' }],
  teffmx: [{ required: true, message: '不能为空', trigger: 'blur' }],
  tsumem: [{ required: true, message: '不能为空', trigger: 'blur' }],
  idsl: [{ required: true, message: '不能为空', trigger: 'blur' }],
  dlo: [{ required: true, message: '不能为空', trigger: 'blur' }],
  dlc: [{ required: true, message: '不能为空', trigger: 'blur' }],
  tsum1: [{ required: true, message: '不能为空', trigger: 'blur' }],
  tsum2: [{ required: true, message: '不能为空', trigger: 'blur' }],
  dtsmtb_x: [{ validator: checkFunc_dtsmtb_x, trigger: 'blur' }],
  dtsmtb_y: [{ validator: checkFunc_dtsmtb_y, trigger: 'blur' }],
  dvsi: [{ required: true, message: '不能为空', trigger: 'blur' }],
  dvsend: [{ required: true, message: '不能为空', trigger: 'blur' }],
  vernbase: [{ required: true, message: '不能为空', trigger: 'blur' }],
  vernsat: [{ required: true, message: '不能为空', trigger: 'blur' }],
  verndvs: [{ required: true, message: '不能为空', trigger: 'blur' }],
  vernrtb_x: [{ validator: checkFunc_vernrtb_x, trigger: 'blur' }],
  vernrtb_y: [{ validator: checkFunc_vernrtb_y, trigger: 'blur' }],
  //3
  tdwi: [{ required: true, message: '不能为空', trigger: 'blur' }],
  rgrlai: [{ required: true, message: '不能为空', trigger: 'blur' }],
  //4
  slatb_x: [{ validator: checkFunc_slatb_x, trigger: 'blur' }],
  slatb_y: [{ validator: checkFunc_slatb_y, trigger: 'blur' }],
  ssatb_x: [{ validator: checkFunc_ssatb_x, trigger: 'blur' }],
  ssatb_y: [{ validator: checkFunc_ssatb_y, trigger: 'blur' }],
  spa: [{ required: true, message: '不能为空', trigger: 'blur' }],
  span: [{ required: true, message: '不能为空', trigger: 'blur' }],
  tbase: [{ required: true, message: '不能为空', trigger: 'blur' }],
  //5
  kdiftb_x: [{ validator: checkFunc_kdiftb_x, trigger: 'blur' }],
  kdiftb_y: [{ validator: checkFunc_kdiftb_y, trigger: 'blur' }],
  efftb_x: [{ validator: checkFunc_efftb_x, trigger: 'blur' }],
  efftb_y: [{ validator: checkFunc_efftb_y, trigger: 'blur' }],
  amaxtb_x: [{ validator: checkFunc_amaxtb_x, trigger: 'blur' }],
  amaxtb_y: [{ validator: checkFunc_amaxtb_y, trigger: 'blur' }],
  tmpftb_x: [{ validator: checkFunc_tmpftb_x, trigger: 'blur' }],
  tmpftb_y: [{ validator: checkFunc_tmpftb_y, trigger: 'blur' }],
  tmnftb_x: [{ validator: checkFunc_tmnftb_x, trigger: 'blur' }],
  tmnftb_y: [{ validator: checkFunc_tmnftb_y, trigger: 'blur' }],
  //6
  cvl: [{ required: true, message: '不能为空', trigger: 'blur' }],
  cvo: [{ required: true, message: '不能为空', trigger: 'blur' }],
  cvr: [{ required: true, message: '不能为空', trigger: 'blur' }],
  cvs: [{ required: true, message: '不能为空', trigger: 'blur' }],
  //7
  q10: [{ required: true, message: '不能为空', trigger: 'blur' }],
  rfsetb_x: [{ validator: checkFunc_rfsetb_x, trigger: 'blur' }],
  rfsetb_y: [{ validator: checkFunc_rfsetb_y, trigger: 'blur' }],
  rml: [{ required: true, message: '不能为空', trigger: 'blur' }],
  rmo: [{ required: true, message: '不能为空', trigger: 'blur' }],
  rmr: [{ required: true, message: '不能为空', trigger: 'blur' }],
  rms: [{ required: true, message: '不能为空', trigger: 'blur' }],
  //8
  frtb_x: [{ validator: checkFunc_frtb_x, trigger: 'blur' }],
  frtb_y: [{ validator: checkFunc_frtb_y, trigger: 'blur' }],
  fltb_x: [{ validator: checkFunc_fltb_x, trigger: 'blur' }],
  fltb_y: [{ validator: checkFunc_fltb_y, trigger: 'blur' }],
  fstb_x: [{ validator: checkFunc_fstb_x, trigger: 'blur' }],
  fstb_y: [{ validator: checkFunc_fstb_y, trigger: 'blur' }],
  fotb_x: [{ validator: checkFunc_fotb_x, trigger: 'blur' }],
  fotb_y: [{ validator: checkFunc_fotb_y, trigger: 'blur' }],


  rdrrtb_x: [{ validator: checkFunc_rdrrtb_x, trigger: 'blur' }],
  rdrrtb_y: [{ validator: checkFunc_rdrrtb_y, trigger: 'blur' }],
  rdrstb_x: [{ validator: checkFunc_rdrstb_x, trigger: 'blur' }],
  rdrstb_y: [{ validator: checkFunc_rdrstb_y, trigger: 'blur' }],

  nmaxlvTb_x: [{ validator: checkFunc_nmaxlvTb_x, trigger: 'blur' }],
  nmaxlvTb_y: [{ validator: checkFunc_nmaxlvTb_y, trigger: 'blur' }],
  pmaxlvTb_x: [{ validator: checkFunc_pmaxlvTb_x, trigger: 'blur' }],
  pmaxlvTb_y: [{ validator: checkFunc_pmaxlvTb_y, trigger: 'blur' }],
  kmaxlvTb_x: [{ validator: checkFunc_kmaxlvTb_x, trigger: 'blur' }],
  kmaxlvTb_y: [{ validator: checkFunc_kmaxlvTb_y, trigger: 'blur' }]

})
const vallrules = ref({
  ecotypeid: [{ required: true, message: '不能为空', trigger: 'blur' }],
  ecotype: [{ required: true, message: '不能为空', trigger: 'blur' }],
  cropname: [{ required: true, message: '不能为空', trigger: 'blur' }],
  //11


  dtsmtb_x: [{ validator: checkFunc_dtsmtb_x, trigger: 'blur' }],
  dtsmtb_y: [{ validator: checkFunc_dtsmtb_y, trigger: 'blur' }],
  vernrtb_x: [{ validator: checkFunc_vernrtb_x, trigger: 'blur' }],
  vernrtb_y: [{ validator: checkFunc_vernrtb_y, trigger: 'blur' }],
  //3

  //4
  slatb_x: [{ validator: checkFunc_slatb_x, trigger: 'blur' }],
  slatb_y: [{ validator: checkFunc_slatb_y, trigger: 'blur' }],
  ssatb_x: [{ validator: checkFunc_ssatb_x, trigger: 'blur' }],
  ssatb_y: [{ validator: checkFunc_ssatb_y, trigger: 'blur' }],

  //5
  kdiftb_x: [{ validator: checkFunc_kdiftb_x, trigger: 'blur' }],
  kdiftb_y: [{ validator: checkFunc_kdiftb_y, trigger: 'blur' }],
  efftb_x: [{ validator: checkFunc_efftb_x, trigger: 'blur' }],
  efftb_y: [{ validator: checkFunc_efftb_y, trigger: 'blur' }],
  amaxtb_x: [{ validator: checkFunc_amaxtb_x, trigger: 'blur' }],
  amaxtb_y: [{ validator: checkFunc_amaxtb_y, trigger: 'blur' }],
  tmpftb_x: [{ validator: checkFunc_tmpftb_x, trigger: 'blur' }],
  tmpftb_y: [{ validator: checkFunc_tmpftb_y, trigger: 'blur' }],
  tmnftb_x: [{ validator: checkFunc_tmnftb_x, trigger: 'blur' }],
  tmnftb_y: [{ validator: checkFunc_tmnftb_y, trigger: 'blur' }],
  //6

  //7
  rfsetb_x: [{ validator: checkFunc_rfsetb_x, trigger: 'blur' }],
  rfsetb_y: [{ validator: checkFunc_rfsetb_y, trigger: 'blur' }],

  //8
  frtb_x: [{ validator: checkFunc_frtb_x, trigger: 'blur' }],
  frtb_y: [{ validator: checkFunc_frtb_y, trigger: 'blur' }],
  fltb_x: [{ validator: checkFunc_fltb_x, trigger: 'blur' }],
  fltb_y: [{ validator: checkFunc_fltb_y, trigger: 'blur' }],
  fstb_x: [{ validator: checkFunc_fstb_x, trigger: 'blur' }],
  fstb_y: [{ validator: checkFunc_fstb_y, trigger: 'blur' }],
  fotb_x: [{ validator: checkFunc_fotb_x, trigger: 'blur' }],
  fotb_y: [{ validator: checkFunc_fotb_y, trigger: 'blur' }],


  rdrrtb_x: [{ validator: checkFunc_rdrrtb_x, trigger: 'blur' }],
  rdrrtb_y: [{ validator: checkFunc_rdrrtb_y, trigger: 'blur' }],
  rdrstb_x: [{ validator: checkFunc_rdrstb_x, trigger: 'blur' }],
  rdrstb_y: [{ validator: checkFunc_rdrstb_y, trigger: 'blur' }],

  nmaxlvTb_x: [{ validator: checkFunc_nmaxlvTb_x, trigger: 'blur' }],
  nmaxlvTb_y: [{ validator: checkFunc_nmaxlvTb_y, trigger: 'blur' }],
  pmaxlvTb_x: [{ validator: checkFunc_pmaxlvTb_x, trigger: 'blur' }],
  pmaxlvTb_y: [{ validator: checkFunc_pmaxlvTb_y, trigger: 'blur' }],
  kmaxlvTb_x: [{ validator: checkFunc_kmaxlvTb_x, trigger: 'blur' }],
  kmaxlvTb_y: [{ validator: checkFunc_kmaxlvTb_y, trigger: 'blur' }]

})
//挨个保存表单ssssss
const saveOneEcotypeform = (num) => {
  if (num < 0) {
    num = -num
    vdisabled.value[num - 1].isD = true
    // successIcon.value[num - 1].isS = true
    vdisabled.value[num - 1].isclearD = true
  } else {
    isDisabled.value[num - 1].isD = true
    // successIcon.value[num - 1].isS = true
    isDisabled.value[num - 1].isclearD = true
  }
  let index = activeNames.value.indexOf(num.toString());
  if (index !== -1) {
    // 在数据中移除该折叠面的名称
    activeNames.value.splice(index, 1);
  }
  // console.log("activeNames", activeNames.value)
  // allForm.value.validate(async (valid) => {
  //   console.log("valid", valid)
  //   if (valid) {
  //     // 校验成功
  //     let index = activeNames.value.indexOf(num.toString());

  //     if (index !== -1) {
  //       // 在数据中移除该折叠面的名称
  //       activeNames.value.splice(index, 1);
  //     }
  //   }
  //   else {
  //     ElMessage.error('请检查输入格式是否有误且必填项不能为空')
  //   }
  // })
  //保存后关闭改部分

}
const editOneEcotypeform = (num) => {
  if (num < 0) {
    num = -num
    vdisabled.value[num - 1].isD = false
    // successIcon.value[num - 1].isS = false
    vdisabled.value[num - 1].isclearD = false
  } else {
    isDisabled.value[num - 1].isD = false
    // successIcon.value[num - 1].isS = false
    isDisabled.value[num - 1].isclearD = false
  }
}

///cccccc
const clearOneEcotypeform = (num) => {
  if (num < 0) {
    num = -num
    let xlist = [[6, 8], [9, 20], [21, 22], [23, 27], [28, 33], [34, 37], [38, 43], [44, 47], [48, 50], [51, 54], [55, 57], [58, 85], [86, 87], [88, 93], [94, 96]]
    let xkeys = Object.keys(ecotypeData.value)
    let xxlist = xlist[num - 1]
    let ecotypefuncKeys0 = Object.keys(ecotypefuncData.value)

    let ecotypefuncKeys = []
    for (let m = 0; m < ecotypefuncKeys0.length; m++) {
      if ((m % 2) === 0) {
        ecotypefuncKeys.push(ecotypefuncKeys0[m].split('_')[0]) //所有的函数字段
      }
    }
    for (let i = xxlist[0] - 1; i < xxlist[1]; i++) {
      if (ecotypefuncKeys.indexOf(xkeys[i]) !== -1) {
        let keyx = xkeys[i] + '_x'
        let keyy = xkeys[i] + '_y'
        varietyfuncData.value[keyx] = ''
        varietyfuncData.value[keyy] = ''
        setTimeout(() => {
          varietyallForm.value.clearValidate(keyx)
          varietyallForm.value.clearValidate(keyy)
        }, 0) //清除指定的验证
      }
      else {

        varietyData.value[xkeys[i]] = ''
        setTimeout(() => { varietyallForm.value.clearValidate(xkeys[i]) }, 0) //清除指定的验证
      }
    }
  } else {
    // let funcList=[]
    let xlist = [[6, 8], [9, 20], [21, 22], [23, 27], [28, 33], [34, 37], [38, 43], [44, 47], [48, 50], [51, 54], [55, 57], [58, 85], [86, 87], [88, 93], [94, 96]]
    let xkeys = Object.keys(ecotypeData.value)
    let xxlist = xlist[num - 1]
    let ecotypefuncKeys0 = Object.keys(ecotypefuncData.value)

    let ecotypefuncKeys = []
    for (let m = 0; m < ecotypefuncKeys0.length; m++) {
      if ((m % 2) === 0) {
        ecotypefuncKeys.push(ecotypefuncKeys0[m].split('_')[0]) //所有的函数字段
      }
    }
    for (let i = xxlist[0] - 1; i < xxlist[1]; i++) {
      if (ecotypefuncKeys.indexOf(xkeys[i]) !== -1) {
        let keyx = xkeys[i] + '_x'
        let keyy = xkeys[i] + '_y'
        ecotypefuncData.value[keyx] = ''
        ecotypefuncData.value[keyy] = ''
        setTimeout(() => {
          ecotypeallForm.value.clearValidate(keyx)
          ecotypeallForm.value.clearValidate(keyy)
        }, 0) //清除指定的验证
      }
      else {
        ecotypeData.value[xkeys[i]] = ''
        setTimeout(() => { ecotypeallForm.value.clearValidate(xkeys[i]) }, 0) //清除指定的验证
      }
    }
  }
}
const deleteTreenode = async (node, data) => {

  // data.value = [...data.value]
  if (node.level == 4) {//生态类型层
    ElMessageBox.confirm(
      '确认删除生态类型' + node.data.ecotype + '吗？其相应的作物品种也将被删除！',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(async () => {
        //确认删除
        let parent = node.parent
        let children = parent.data.children || parent.data
        let index = children.findIndex((d) => d.id === data.id)
        children.splice(index, 1)
        //1.先删除后端的生态类型
        try {
          let result = await deleteEcotyeService(node.data.ecotypeid)
          if (node.data.children) {
            let vdata = node.data.children
            for (let i = 0; i < vdata.length; i++) {
              let result1 = await deleteVarietyService(vdata[i].varietyid)
            }
          }
          // if(result.code==0) E
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
    //从前端先删除
  }
  if (node.level == 5) {//品种层
    ElMessageBox.confirm(
      '确认删除作物品种' + node.data.variety + '吗？',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(async () => {
        //从前端先删除
        let parent = node.parent
        let children = parent.data.children || parent.data
        let index = children.findIndex((d) => d.id === data.id)
        children.splice(index, 1)

        //1.先删除后端的生态类型
        try {
          //1.先删除后端的生态类型
          let result = await deleteVarietyService(node.data.varietyid)
          // if(result.code==0) E
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
const changeGenericCrop = async (val) => {
  let result = await autoGenericidService({ id: val })
  newgenericData.value.genericId = val + 'G' + result.data
  for (let i = 0; i < gcropnameList.value.length; i++) {
    if (gcropnameList.value[i].id == val) newgenericData.value.cropName = gcropnameList.value[i].cropname
  }
  // ecotypeList.value = result.data
  // if (ecotypeList.value[0]) {
  //   varietyData.value.parent = ecotypeList.value[0].ecotype
  //   changeEcotype(ecotypeList.value[0].ecotype)
  // } else {
  //   varietyData.value.parent = ''
  //   varietyData.value.varietyid = ''
  // }
  // for (let i = 0; i < cropnameList.value.length; i++) {
  //   if (cropnameList.value[i].id == val) varietyData.value.cropname = cropnameList.value[i].cropname
  // }
}
//点击作物，自动生成生态类型代码
const changeCrop = async (val) => {
  // console.log("101001", varietyData.value.cropname)
  if (varietyState.value == 'add') {
    let result = await cropEcotypeDataService({ cropid: val })
    ecotypeList.value = result.data
    // if (ecotypeList.value[0]) {
    //   varietyData.value.parent = ecotypeList.value[0].ecotype
    //   changeEcotype(ecotypeList.value[0].ecotype)
    // } else {
    //   varietyData.value.parent = ''
    //   varietyData.value.varietyid = ''
    // }
    // for (let i = 0; i < cropnameList.value.length; i++) {
    //   if (cropnameList.value[i].id == val) varietyData.value.cropname = cropnameList.value[i].cropname
    // }

    ////未完待续
    // ecotypeData.value.ecotypeid = result.data
    // let result2 = await getGenerictypeService({ cropid: val.id })
    // genericList.value = result2.data
    // if (genericList.value[0] != undefined) ecotypeData.value.parent = genericList.value[0].gengericId
    // else ecotypeData.value.parent = ''
    // ecotypeData.value.cropid = val.id
    // ecotypeData.value.cropname = val.cropname

  }
  if (ecotypeState.value == 'add') {
    let result = await autoEcotypeIDService(val)
    ecotypeData.value.ecotypeid = result.data
    let result2 = await getGenerictypeService({ cropid: val })
    genericList.value = result2.data
    if (genericList.value[0] != undefined) ecotypeData.value.parent = genericList.value[0].gengericId
    else ecotypeData.value.parent = ''
    ecotypeData.value.cropid = val
    for (let i = 0; i < vcropnameList.value.length; i++) {
      if (vcropnameList.value[i].id == val) ecotypeData.value.cropname = vcropnameList.value[i].cropname
    }

  }

}
//作物分类和作物联动xxxxxx
const changeCategory = async (val) => {
  let params = { category: categoryname.value[val - 1].label }
  let result = await cropDataBycategoryService(params)
  if (varietyState.value == 'add') {
    vcropnameList.value = result.data
    // varietyData.value.cropname = vcropnameList.value[0].cropname
  }
  if (ecotypeState.value == 'add') {
    cropnameList.value = result.data
    // ecotypeData.value.cropname = cropnameList.value[0].cropname
  }


}
//作物分类和作物联动xxxxxx
const changeGenericCategory = async (val) => {
  let params = { category: categoryname.value[val - 1].label }
  let result = await cropDataBycategoryService(params)
  gcropnameList.value = result.data
  newgenericData.value.cropId = gcropnameList.value[0].id

  changeGenericCrop(result.data[0].id)

  // console.log("cropnameList", cropnameList.value)
}


//aaaappppp
const appendNode = (node, data) => {
  let isflag
  appendVarietyState.value = 0
  appendEcotypeState.value = 0
  if (node.level == 3) {
    appendEcotypeState.value = 1
    isflag = 0
    let mtab = []
    for (let mm = 0; mm < editableTabs.value.length; mm++) {
      if (editableTabs.value[mm].type != 'ecotypeTab') mtab.push(editableTabs.value[mm])
      // if(editableTabs.value[mm].name==node.data.ecotype) isflag=1
    }
    editableTabs.value = mtab
    if (isflag == 0) editableTabs.value.push({ title: node.data.cropname + '-新增生态类型', name: '新增生态类型', type: 'ecotypeTab' })
    paneactiveName.value = '新增生态类型'
    addEcotype(node.parent.data.id, node.data.id, node.data.cropname)
  }
  if (node.level == 4) {
    appendVarietyState.value = 1
    isflag = 0
    let mtab = []
    for (let mm = 0; mm < editableTabs.value.length; mm++) {
      if (editableTabs.value[mm].type != 'varietyTab') mtab.push(editableTabs.value[mm])
      // if(editableTabs.value[mm].name==node.data.ecotype) isflag=1
    }
    editableTabs.value = mtab
    if (isflag == 0) editableTabs.value.push({ title: node.data.ecotype + '-新增品种', name: '新增品种', type: 'varietyTab' })
    paneactiveName.value = '新增品种'
    nextTick(() => { addVariety(node.parent.parent.data.id, node.data.cropid, node.data.cropname, node.data.ecotype) })
  }
}
const addEcotype = (categoryid, cropid, cropname) => {
  isDisabled.value = [
    { isD: false, isclearD: false },
    { isD: false, isclearD: false },
    { isD: false, isclearD: false },
    { isD: false, isclearD: false },
    { isD: false, isclearD: false },
    { isD: false, isclearD: false },
    { isD: false, isclearD: false },
    { isD: false, isclearD: false },
    { isD: false, isclearD: false },
    { isD: false, isclearD: false },
    { isD: false, isclearD: false },
    { isD: false, isclearD: false },
    { isD: false, isclearD: false },
    { isD: false, isclearD: false },
    { isD: false, isclearD: false }
  ]
  ecotypeState.value = 'add'
  //先清空
  saveEcotypebtn.value = false
  // treeRef.value.store._getAllNodes().forEach(v => v.expanded = false);
  nextTick(() => {
    // ecotypeallForm.value.resetFields()
    let xkeys = Object.keys(ecotypeData.value)
    for (let i = 0; i < xkeys.length; i++) {
      ecotypeData.value[xkeys[i]] = ''
    }
    // treeRef.value.setCurrentKey() //取消当前选中节点
    mainDisabled.value = false
    ecotypeCropcategory.value = categoryid
    changeCategory(ecotypeCropcategory.value)
    ecotypeData.value.cropname = cropname
    ecotypeData.value.cropid = cropid
    changeCrop(ecotypeData.value.cropid)
  })

}
//在处理品种时
const changeEcotype = async (val) => {
  let eid = 0
  // await nextTick()
  console.log(ecotypeList.value, val)
  for (let i = 0; i < ecotypeList.value.length; i++) {

    if (ecotypeList.value[i].ecotype === val.toString()) {

      eid = ecotypeList.value[i].ecotypeid
      xaddvariety_ecotype.value = ecotypeList.value[i]

    }
  }
  let result = await autoVarietyIDService(val, eid)

  varietyData.value.varietyid = result.data
  varietyData.value.ecotypeid = eid
  // let ecotypekeys = ['tbasem', 'teffmx', 'tsumem', 'idsl', 'dlo', 'dlc', 'tsum1', 'tsum2', 'dtsmtb', 'dvsi', 'dvsend', 'vernbase', 'vernsat', 'verndvs', 'vernrtb', 'tdwi', 'rgrlai', 'slatb', 'spa', 'ssatb', 'span', 'tbase', 'kdiftb', 'efftb', 'amaxtb', 'refco2L', 'tmpftb', 'tmnftb', 'cvl', 'cvo', 'cvr', 'cvs', 'q10', 'rml', 'rmo', 'rmr', 'rms', 'rfsetb', 'frtb', 'fltb', 'fstb', 'fotb', 'perdl', 'rdrrtb', 'rdrstb', 'cfet', 'depnr', 'iairdu', 'iox', 'rdi', 'rri', 'rdmcr', 'nmaxlvTb', 'nmaxrtFr', 'nmaxstFr', 'nmaxso', 'ncritFr', 'nresidlv', 'nresidst', 'nresidrt', 'tcnt', 'nfixFr', 'pmaxlvTb', 'pmaxrtFr', 'pmaxstFr', 'pmaxso', 'pcritFr', 'presidlv', 'presidst', 'presidrt', 'tcpt', 'kmaxlvTb', 'kmaxrtFr', 'kmaxstFr', 'kmaxso', 'kcritFr', 'kresidlv', 'kresidst', 'kresidrt', 'tckt', 'dvsNpkStop', 'dvsNpkTransl', 'nlaiNpk', 'nslaNpk', 'npart', 'nlueNpk', 'npkTranslrtFr', 'rdrlvNpk', 'rnuptakemax', 'rpuptakemax', 'rkuptakemax']
  // for (let j = 0; j < ecotypekeys.length; j++) {
  //   varietyData.value[ecotypekeys[j]] = xaddvariety_ecotype.value[ecotypekeys[j]]
  // }
  ///3333333333
  //处理函数
  //模拟点击父节点
  // let enode = treeRef.value.getNode(eid)
  // treeNodeClick(null, enode)
  // paneactiveName.value = 'third'


}
//新增品种 aaaaaavvvvvv
const addVariety = (categoryid, cropid, cropname, ecotype) => {
  console.log("xxxxx8", categoryid, cropid, cropname, ecotype)
  // paneactiveName.value = 'tab3'
  isSpecial.value = {
    tbasem: false,
    teffmx: false,
    tsumem: false,
    idsl: false,
    dlo: false,
    dlc: false,
    tsum1: false,
    tsum2: false,
    dtsmtb: false,
    dvsi: false,
    dvsend: false,
    vernbase: false,
    vernsat: false,
    verndvs: false,
    vernrtb: false,
    tdwi: false,
    rgrlai: false,
    slatb: false,
    spa: false,
    ssatb: false,
    span: false,
    tbase: false,
    kdiftb: false,
    efftb: false,
    amaxtb: false,
    refco2L: false,
    tmpftb: false,
    tmnftb: false,
    cvl: false,
    cvo: false,
    cvr: false,
    cvs: false,
    q10: false,
    rml: false,
    rmo: false,
    rmr: false,
    rms: false,
    rfsetb: false,
    frtb: false,
    fltb: false,
    fstb: false,
    fotb: false,
    perdl: false,
    rdrrtb: false,
    rdrstb: false,
    cfet: false,
    depnr: false,
    iairdu: false,
    iox: false,
    rdi: false,
    rri: false,
    rdmcr: false,
    nmaxlvTb: false,
    nmaxrtFr: false,
    nmaxstFr: false,
    nmaxso: false,
    ncritFr: false,
    nresidlv: false,
    nresidst: false,
    nresidrt: false,
    tcnt: false,
    nfixFr: false,
    pmaxlvTb: false,
    pmaxrtFr: false,
    pmaxstFr: false,
    pmaxso: false,
    pcritFr: false,
    presidlv: false,
    presidst: false,
    presidrt: false,
    tcpt: false,
    kmaxlvTb: false,
    kmaxrtFr: false,
    kmaxstFr: false,
    kmaxso: false,
    kcritFr: false,
    kresidlv: false,
    kresidst: false,
    kresidrt: false,
    tckt: false,
    dvsNpkStop: false,
    dvsNpkTransl: false,
    nlaiNpk: false,
    nslaNpk: false,
    npart: false,
    nlueNpk: false,
    npkTranslrtFr: false,
    rdrlvNpk: false,
    rnuptakemax: false,
    rpuptakemax: false,
    rkuptakemax: false,
    label: false,
    level: false,
    id: false
  }
  vactiveNames.value = []
  varietyState.value = 'add'
  //先清空
  ecotypeList.value = []

  varietyData.value.varietyid = ''
  // closeAllNodes()//不成功不知道为什么
  saveVarietybtn.value = false
  // treeRef.value.store._getAllNodes().forEach(v => v.expanded = false);
  nextTick(async () => {
    varietyallForm.value[0].resetFields()
    let xkeys = Object.keys(ecotypeData.value)
    for (let i = 0; i < xkeys.length; i++) {
      varietyData.value[xkeys[i]] = ''
    }
    // treeRef.value.setCurrentKey() //取消当前选中节点
    vmainDisabled.value = false
    varietyCropcategory.value = categoryid
    // changeCategory(varietyCropcategory.value)
    varietyData.value.cropname = cropname
    varietyData.value.cropid = cropid
    varietyData.value.parent = ecotype
    changeCategory(varietyCropcategory.value)
    nextTick(() => { changeCrop(cropid) })
    console.log("xxx6", ecotypeList.value)
    //更改编码
    let result2 = await cropEcotypeDataService({ cropid: cropid })
    let eid = 0
    let elist2 = result2.data
    for (let i = 0; i < elist2.length; i++) {

      if (elist2[i].ecotype === ecotype) {

        eid = elist2[i].ecotypeid
        xaddvariety_ecotype.value = elist2[i]

      }
    }
    let result3 = await autoVarietyIDService(ecotype, eid)

    varietyData.value.varietyid = result3.data
    varietyData.value.ecotypeid = eid
    // varietyData.value.parent = ecotype
  })

}


//保存生态类型ssseee
const saveEcotype = async (val) => {
  let ecotypekeys = ['ecotypeid', 'cropid', 'cropname', 'ecotype', 'parent', 'tbasem', 'teffmx', 'tsumem', 'idsl', 'dlo', 'dlc', 'tsum1', 'tsum2', 'dtsmtb', 'dvsi', 'dvsend', 'vernbase', 'vernsat', 'verndvs', 'vernrtb', 'tdwi', 'rgrlai', 'slatb', 'spa', 'ssatb', 'span', 'tbase', 'kdiftb', 'efftb', 'amaxtb', 'refco2L', 'tmpftb', 'tmnftb', 'cvl', 'cvo', 'cvr', 'cvs', 'q10', 'rml', 'rmo', 'rmr', 'rms', 'rfsetb', 'frtb', 'fltb', 'fstb', 'fotb', 'perdl', 'rdrrtb', 'rdrstb', 'cfet', 'depnr', 'iairdu', 'iox', 'rdi', 'rri', 'rdmcr', 'nmaxlvTb', 'nmaxrtFr', 'nmaxstFr', 'nmaxso', 'ncritFr', 'nresidlv', 'nresidst', 'nresidrt', 'tcnt', 'nfixFr', 'pmaxlvTb', 'pmaxrtFr', 'pmaxstFr', 'pmaxso', 'pcritFr', 'presidlv', 'presidst', 'presidrt', 'tcpt', 'kmaxlvTb', 'kmaxrtFr', 'kmaxstFr', 'kmaxso', 'kcritFr', 'kresidlv', 'kresidst', 'kresidrt', 'tckt', 'dvsNpkStop', 'dvsNpkTransl', 'nlaiNpk', 'nslaNpk', 'npart', 'nlueNpk', 'npkTranslrtFr', 'rdrlvNpk', 'rnuptakemax', 'rpuptakemax', 'rkuptakemax']
  let copyEcotypeData = {}
  let fkeys = Object.keys(ecotypefuncData.value)
  for (let i = 0; i < fkeys.length - 1; i += 2) {
    let x = ecotypefuncData.value[fkeys[i]].replace(' ', '').split(',')
    let y = ecotypefuncData.value[fkeys[i + 1]].replace(' ', '').split(',')
    let len = x.length
    let mm = '['
    if (x.length >= y.length) len = y.length
    for (let j = 0; j < len - 1; j++) {
      mm += x[j] + ','
      mm += y[j] + ','
    }
    mm += x[len - 1] + ','
    mm += y[len - 1] + ']'
    let ekey = fkeys[i].split('_')[0]
    ecotypeData.value[ekey] = mm
  }
  //这里这么处理是因为这里的ecotypeData存在一些包括"_x、y"的字段，可能会使得保存出错
  for (let q = 0; q < ecotypekeys.length; q++) {
    copyEcotypeData[ecotypekeys[q]] = ecotypeData.value[ecotypekeys[q]]
  }
  ecotypeData.value = cloneDeep(copyEcotypeData)
  //存入数据库
  //现在要检查验证
  ecotypeallForm.value[0].validate(async (valid) => {
    if (valid) {
      try {
        if (ecotypeState.value == 'add') {
          let result = await addEcotypeService(ecotypeData.value);
          if (result.code == 0) {
            ElMessage.success('保存成功')
            activeNames.value = [] //关闭所有的参数分格
            //向树中增加节点
            ecotypeData.value.label = '生态类型' + ecotypeData.value.ecotype
            ecotypeData.value.id = ecotypeData.value.ecotypeid //必须要设置ID
            let clonedNodeData = JSON.parse(JSON.stringify(ecotypeData.value));//一定要深拷贝！！
            let pid = cloneDeep(ecotypeData.value.cropid)
            console.log("ecotype---------------")
            treeRef.value.append(clonedNodeData, pid)
            //树形结构定位xxxxe
            // treeExpandData.value = [ecotypeCropcategory.value] //展开第一层节点OK
            treeExpandData.value = [ecotypeData.value.cropid]
            currentNodekeys.value = ecotypeData.value.ecotypeid
            currentNodekeys.value = cloneDeep(currentNodekeys.value)
            treeRef.value.setCurrentKey(ecotypeData.value.ecotypeid, true)
            let position = document.getElementById('node' + ecotypeData.value.ecotypeid)
            saveEcotypebtn.value = true


          }
          mainDisabled.value = true
          for (let i = 1; i <= 15; i++) {
            saveOneEcotypeform(i)
          }
          ecotypeState.value = 'edit'

        }
        //如果是更改
        if (ecotypeState.value == 'edit') {
          let result = await updateEcotypeService(ecotypeData.value);
          if (result.code == 0) {
            // ElMessage.success('更新成功')
            let xnewdata = cloneDeep(ecotypeData.value)
            let xnode = treeRef.value.getNode(ecotypeData.value.ecotypeid)
            // let xchildren = xnode.children
            // let xparent = xnode.parent
            // xnewdata.label = xnewdata.ecotype
            // xnewdata.id = xnewdata.ecotypeid
            // xnewdata.children = xchildren
            // xnewdata.parent = xparent
            // let xecotypeData = ecotypeData.value
            //xecotypeData.level = 2
            //xecotypeData.id = Number(xecotypeData.ecotypeid)
            //xecotypeData.ecotypeid = Number(xecotypeData.ecotypeid)
            //xecotypeData.label = xecotypeData.ecotype
            //console.log(xecotypeData)
            //treeRef.value.append(xecotypeData, ecotypeData.value.cropid)
            activeNames.value = [] //关闭所有的参数分格
            //向树中增加节点
            //树形结构定位xxxxe
            mainDisabled.value = true
            for (let i = 1; i <= 15; i++) {
              saveOneEcotypeform(i)
            }

            ecotypeState.value = 'edit'
          }
        }
        for (let i = 0; i < isDisabled.value.length; i++) {
          isDisabled.value[i].isD = true/////77777777
          isDisabled.value[i].isclearD = true
        }
      } catch {

      }
    } else {
      ElMessage.error('验证错误')
    }
  })
}
///更新data
const upDateTreeData =  (xdata, level, flag) => {
  if (level == 5) {
    let xnew = treeRef.value.getNode(xdata.varietyid)
    let childrennodes = cloneDeep(xnew.parent.data.children)//更新的节点所在层的所有的兄弟节点
    let xchildren = [] //放置更新的节点以及它所有的兄弟节点
    for (let i = 0; i < childrennodes.length; i++) { //遍历所有的兄弟节点，找到被更改的节点。所有兄弟节点放在xchildren中
      if (childrennodes[i].varietyid == xdata.varietyid) { //判断是否是更新节点，如果是，则更改数据
        console.log(childrennodes[i], xdata)
        xdata.level = 5
        xdata.label = '品种' + xdata.variety
        xdata.id = xdata.varietyid
        let m = cloneDeep(xdata)
        childrennodes[i] = m
        // m.children = childrennodes[i].children
        // xchildren.push(m)
      }
      // else {
      //   xchildren.push(childrennodes[i])
      // }
    }

    for (let i = 0; i < data.value[0].children.length; i++) {
      console.log(data.value[0].children)
      if (data.value[0].children[i].id == xnew.parent.parent.parent.data.id) {
        let xxchildren = data.value[0].children[i].children

        let jj = 0
        for (jj = 0; jj < xxchildren.length; jj++) {
          if (xxchildren[jj].id == xnew.parent.parent.data.id) {
            // console.log(data.value[0].children[i].children[jj].children, xchildren)
            let xxxchildren = data.value[0].children[i].children[jj].children
            let jjj = 0
            // data.value[0].children[i].children[jj].children = cloneDeep(xchildren)
            for (jjj = 0; jjj < xxxchildren.length; jjj++) {
              if (xxxchildren[jjj].id == xnew.parent.data.id) {
                // console.log(data.value[0].children[i].children[j].children, xchildren)
                data.value[0].children[i].children[jj].children[jjj].children = cloneDeep(childrennodes)
                nextTick(() => {
                  treeRef.value.setCurrentKey(xdata.varietyid, true)
                })
              }
            }

          }
        }

      }
    }
    for (let i = 0; i < vdisabled.value.length; i++) {
      vdisabled.value[i].isD = true/////77777777
      vdisabled.value[i].isclearD = true
    }
    //data.value[0].children[0].children[2]
    // let parentnode = xnew.parent
    // let ecotypeID = parentnode.data.ecotypeid
    // let cropID = parentnode.data.cropid
    // let varietyID = xdata.varietyid
    // let level1 = parseInt(cropID.toString().substring(0, 1))
    // let level2 = 0
    // let level3 = 0
    // let level4 = 0
    // let leveldata1 = data.value[level1 - 1].children
    // for (let l1 = 0; l1 < leveldata1.length; l1++) {
    //   if (leveldata1[l1].id == cropID) level2 = l1
    // }
    // let leveldata2 = data.value[level1 - 1].children[level2].children
    // for (let l2 = 0; l2 < leveldata2.length; l2++) {
    //   if (leveldata2[l2].id == ecotypeID) level3 = l2
    // }
    // let leveldata3 = data.value[level1 - 1].children[level2].children[level3].children
    // for (let l3 = 0; l3 < leveldata3.length; l3++) {
    //   if (leveldata3[l3].varietyid == varietyID) level4 = l3
    // }
    // let leveldata4 = data.value[level1 - 1].children[level2].children[level3].children[level4]
    // let addVarietyData = cloneDeep(xdata)
    // addVarietyData.label = '品种' + xdata.variety
    // addVarietyData.id = xdata.varietyid
    // data.value[level1 - 1].children[level2].children[level3].children[level4] = addVarietyData
    // data.value = cloneDeep(data.value)
    // treeRef.value.updateKeyChildren(xdata.varietyid, addVarietyData)
    // treeExpandData.value = [ecotypeID]
    // currentNodekeys.value = xdata.varietyid
    // currentNodekeys.value = cloneDeep(currentNodekeys.value)
    // treeRef.value.setCurrentKey(xdata.varietyid, true)
    // let ynode = treeRef.value.getNode(xdata.varietyid)
    // ynode.data = addVarietyData
    // treeNodeClick(null, ynode)


  }


}
//保存品种类型sssvvvv
const saveVariety = async (val) => {
  let eeid = varietyData.value.ecotypeid//保存生态类型id
  let varietykeys = ['varietyid', 'cropid', 'cropname', 'variety', 'parent', 'tbasem', 'teffmx', 'tsumem', 'idsl', 'dlo', 'dlc', 'tsum1', 'tsum2', 'dtsmtb', 'dvsi', 'dvsend', 'vernbase', 'vernsat', 'verndvs', 'vernrtb', 'tdwi', 'rgrlai', 'slatb', 'spa', 'ssatb', 'span', 'tbase', 'kdiftb', 'efftb', 'amaxtb', 'refco2L', 'tmpftb', 'tmnftb', 'cvl', 'cvo', 'cvr', 'cvs', 'q10', 'rml', 'rmo', 'rmr', 'rms', 'rfsetb', 'frtb', 'fltb', 'fstb', 'fotb', 'perdl', 'rdrrtb', 'rdrstb', 'cfet', 'depnr', 'iairdu', 'iox', 'rdi', 'rri', 'rdmcr', 'nmaxlvTb', 'nmaxrtFr', 'nmaxstFr', 'nmaxso', 'ncritFr', 'nresidlv', 'nresidst', 'nresidrt', 'tcnt', 'nfixFr', 'pmaxlvTb', 'pmaxrtFr', 'pmaxstFr', 'pmaxso', 'pcritFr', 'presidlv', 'presidst', 'presidrt', 'tcpt', 'kmaxlvTb', 'kmaxrtFr', 'kmaxstFr', 'kmaxso', 'kcritFr', 'kresidlv', 'kresidst', 'kresidrt', 'tckt', 'dvsNpkStop', 'dvsNpkTransl', 'nlaiNpk', 'nslaNpk', 'npart', 'nlueNpk', 'npkTranslrtFr', 'rdrlvNpk', 'rnuptakemax', 'rpuptakemax', 'rkuptakemax']
  let copyVarietyData = {}
  //处理函数
  let fkeys = Object.keys(varietyfuncData.value)
  for (let i = 0; i < fkeys.length - 1; i += 2) {
    let x = varietyfuncData.value[fkeys[i]].replace(' ', '').split(',')
    let y = varietyfuncData.value[fkeys[i + 1]].replace(' ', '').split(',')
    let len = x.length
    let mm = '['
    if (x.length >= y.length) len = y.length
    for (let j = 0; j < len - 1; j++) {
      mm += x[j] + ','
      mm += y[j] + ','
    }
    mm += x[len - 1] + ','
    mm += y[len - 1] + ']'
    if (mm == "[,]") mm = ''
    let vkey = fkeys[i].split('_')[0]
    mm = mm.replace(" ", "")
    varietyData.value[vkey] = mm
  }
  //这里这么处理是因为这里的ecotypeData存在一些包括"_x、y"的字段，可能会使得保存出错
  for (let q = 0; q < varietykeys.length; q++) {
    copyVarietyData[varietykeys[q]] = varietyData.value[varietykeys[q]]
  }
  varietyData.value = cloneDeep(copyVarietyData)
  //存入数据库
  //现在要检查验证
  varietyallForm.value[0].validate(async (valid) => {
    if (valid) {
      try {
        if (varietyState.value == 'add') {
          varietyData.value.level = 5
          let result = await addVarietyService(varietyData.value);
          if (result.code == 0) {
            ElMessage.success('保存成功')
            vactiveNames.value = [] //关闭所有的参数分格
            //向树中增加节点
            varietyData.value.label = '品种' + varietyData.value.variety
            varietyData.value.id = varietyData.value.varietyid //必须要设置ID
            let clonedNodeData = JSON.parse(JSON.stringify(varietyData.value));//一定要深拷贝！！
            // let pNode = treeRef.value.getNode(eeid)
            // 将克隆后的对象添加到树节点中
            // pNode.children.push(clonedNodeData);

            treeRef.value.append(clonedNodeData, eeid)
            nextTick(() => {
              // alert(1)
              treeRef.value.setCurrentKey(clonedNodeData.id)
            })
            console.log("tree----------", data.value)
            console.log("eeid----------", eeid)
          }
          vmainDisabled.value = true
          for (let i = 1; i <= 15; i++) {
            saveOneEcotypeform(i)
          }
          varietyState.value = 'edit'
          //append节点以后 不用重新定位了
          // upDateTreeData(varietyData.value, 4,1)
          //保存后模拟nodeclick


          saveVarietybtn.value = false
          varietyState.value = 'edit'
          for (let i = 0; i < isDisabled.value.length; i++) {
            isDisabled.value[i].isD = true/////77777777
            isDisabled.value[i].isclearD = true
          }
        }
        //如果是更改
        else if (varietyState.value == 'edit') {
          console.log("varietyData", varietyData.value)
          let result = await updateVarietyService(varietyData.value);
          if (result.code == 0) {
            ElMessage.success('更新成功')
            vactiveNames.value = [] //关闭所有的参数分格
            //向树中增加节点
            //更改data
            varietyData.value.cropid = parseInt(varietyData.value.varietyid.toString().substring(0, 3))
            upDateTreeData(cloneDeep(varietyData.value), 5, 0)
            varietyState.value = 'edit'
          }
        }
      } catch {

      }
    } else {
      ElMessage.error('验证错误')
    }
  })
}

//新增通用型 aaaaaggggg
const addGenericType = () => {
  dialogVisible.value = true
  //默认一些
  newgenericfuncdata.value = {
    co2Efftb0: "",
    co2Efftb1: "",
    co2Tratb0: "",
    co2Tratb1: "",
    co2Amaxtb0: "",
    co2Amaxtb1: ""
  }
  newgenericData.value = {
    cropId: '',
    cropName: "",
    genericId: "",
    genericType: "",
    co2Efftb: "",
    co2Tratb: "",
    co2Amaxtb: ""
  }
  addDialogForm.value = cloneDeep(addDialogForm.value)
  if (addDialogForm.value) addDialogForm.value.clearValidate()
  addGenericCategory.value = cropcategoryData.value.categoryid
  changeGenericCategory(addGenericCategory.value)
  newgenericData.value.cropId = cropcategoryData.value.cropid
  // console.log("newgenericData", newgenericData.value)
  changeGenericCrop(cropcategoryData.value.cropid)
  // newgenericData.value.genericType = ''

}
//
const addDialogCloseBtn = () => {
  dialogVisible.value = false
}
//保存通用型 sssssgggg
const saveGenericType = async () => {
  //验证表单
  addDialogForm.value.validate(async (valid) => {
    if (valid) {
      let fkeys = Object.keys(newgenericfuncdata.value)
      //开始处理data
      for (let i = 0; i < fkeys.length - 1; i += 2) {
        let x = newgenericfuncdata.value[fkeys[i]].replace(' ', '').split(',')
        let y = newgenericfuncdata.value[fkeys[i + 1]].replace(' ', '').split(',')
        let len = x.length
        let mm = '['
        if (x.length >= y.length) len = y.length
        for (let j = 0; j < len - 1; j++) {
          mm += x[j] + ','
          mm += y[j] + ','
        }
        mm += x[len - 1] + ','
        mm += y[len - 1] + ']'
        let ekey = fkeys[i].substring(0, fkeys[i].length - 1);
        newgenericData.value[ekey] = mm
      }
      //存入数据库
      try {
        let result = await addGenericTypeService(newgenericData.value)
        if (result.code == 0) {
          ElMessage.success('保存成功')
          if (addGenericCategory.value == cropcategoryData.value.categoryid) {
            //这个时候直接加到数据里面
            gdisabled.value.push({ isD: false, isclearD: false })
            gdisabled.value = cloneDeep(gdisabled.value)
            let newxdata = cloneDeep(newgenericData.value)
            newxdata.co2Efftb0 = getGenericFundata('co2Efftb', newgenericData.value)[0]
            newxdata.co2Efftb1 = getGenericFundata('co2Efftb', newgenericData.value)[1]
            newxdata.co2Tratb0 = getGenericFundata('co2Tratb', newgenericData.value)[0]
            newxdata.co2Tratb1 = getGenericFundata('co2Tratb', newgenericData.value)[1]
            newxdata.co2Amaxtb0 = getGenericFundata('co2Amaxtb', newgenericData.value)[0]
            newxdata.co2Amaxtb1 = getGenericFundata('co2Amaxtb', newgenericData.value)[1]
            nextTick(() => {
              genericData.value.push(newxdata)
            })
            dialogVisible.value = false
            GenericactiveNames.value = []
            GenericactiveNames.value.push(newxdata.genericType)
          }
        }

      } catch {
        ElMessage.error('新增失败')
      }
    } else {
      ElMessage.error('请检查函数填写是否正确')
    }
  })
}
</script>

<style lang="scss">
.specialclass .el-form-item__label {
  color: #007a16;
  font-weight: 800;

}

.treePanel {

  height: 92vh;
  border-right: 3px solid #e6e6e6b2;
  // background-color: #F6F6F6;
  margin-bottom: -5px;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;

  .el-icon {
    font-size: 30px;
  }
}

.el-tree {
  height: 100%;
  --el-tree-node-hover-bg-color: #ffebce;
  margin: 0px;
  overflow-y: auto;
}

.el-form-item {
  margin-right: 5px;
  margin-left: 5px;
}

.levelSecond .el-tree-node__content {
  color: #0051ff;

}

input[type="number"] {
  -moz-appearance: textfield;
}

td {
  padding: 0 !important;
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  text-align: center;
  font-family: 'Times New Roman';
}

.cropmaindataForm .el-form-item__label {
  font-family: '楷体';
  font-weight: 400;
  font-size: 14px;
}

.genericForm .el-form-item__label {
  font-family: '楷体', 'Times New Roman';
  font-weight: 400;
  font-size: 14px;
}

.ecotypeForm {
  margin-top: 10px;
}

.ecotypeForm .el-form-item__label {
  font-family: '楷体';
  font-weight: 400;
  font-size: 14px;
}

.el-popover.el-popper {
  font-size: 12px;
}

.el-popover__title {
  font-size: 14px;
  color: #009237;
  margin-bottom: 6px;
}

th {
  padding: 0 !important;
  font-weight: 400;
  // color: #009237
  background-color: #009237;
}

.el-tabs__content {
  padding: 0px !important;
}

.el-collapse-item .is-active.el-collapse-item__header .el-text {
  color: #009237;
  font-weight: 500;
}

.el-collapse-item__header {
  padding-left: 10px;
}

.el-tree {
  --el-tree-node-hover-bg-color: white;
}

//选择器样式
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
  background-color: #fccb80;
}

.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__label {
  color: #fff;
  /* 字体颜色 */
}

.dialog-form {
  .el-row {
    font-size: 13px;
    margin-bottom: 2px;
  }

  // .el-input {
  //   // font-size:12px;//
  //   width: 220px;
  // }

  .el-form-item {
    margin-bottom: 10px;
  }

  .el-form-item__label {
    /* display: inline-block必须要有，不然布局出问题，之前我看别人都加在伪类中，我试了没效果 */
    display: inline-block;
    text-align: right;
    font-weight: 400;
    font-size: 13px;
    //  text-align-last: justify;
  }

  .el-select {
    // --el-select-width: 220px;
    font-family: '楷体';
    font-weight: 400;

    .el-input .el-input__inner {
      font-family: '楷体';
      font-weight: 400;
    }

  }

}

.el-collapse-item .el-collapse-item__content {
  padding: 0;
}

.textMenu {
  position: absolute;
  top: 0;
  left: 0;
}

.levelSecond {
  // margin-left: -10px;
}

.levelFirst {
  margin-left: 0px;
}
</style>
