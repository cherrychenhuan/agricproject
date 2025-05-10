<template>
  <div>
    <el-row>
      <el-col :span="7">
        <div class="treePanel">
          <div
            style="color:black;margin-top:-5px;margin-left:-5px;border-bottom:2px solid #e6e6e6b2; font-size:13px;line-height:50px;height:43px;text-align: center;">
            <el-text>农作物品种</el-text>
          </div>
          <el-tree ref="treeRef" :expand-on-click-node="false" :accordion="true" :current-node-key="currentNodekeys"
            highlight-current="true" :props="{ class: customNodeClass }" :data="data" @node-click="treeNodeClick"
            node-key="id" :default-expanded-keys="treeExpandData">
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
                    <!-- <span class="labelName" :id="'node' + node.data.id" v-if="node.level == 3"
                      style="margin-top:-5px; font-size: 13px;color:rgb(58, 107, 47);">
                      {{ data.ecotype }}
                    </span> -->
                    <span class="labelName" :id="'node' + node.data.id" v-else
                      style="margin-top:-5px; font-size: 13px;">
                      {{ node.label }}
                    </span>
                  </el-text>
                </span>
                <span v-if="node.level == 3" style="color:rgb(33, 165, 0);">
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
                <span v-if="node.level == 4" style="color:rgb(0, 77, 165);">
                  <el-icon style="margin-right:3px;">
                    <Edit />
                  </el-icon>
                  <el-icon @click="deleteTreenode(node, data)">
                    <Delete />
                  </el-icon>
                </span>
                <span v-if="node.level == 2" style="color:#c45656;">
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
                <span v-if="node.level == 1">
                  <el-icon @click="appendNode(node, data)" style=" margin-right:3px;">
                    <CirclePlus />
                  </el-icon>


                </span>
              </span>
            </template>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="17">
        <div
          style="color:black;margin-top:-5px;margin-left:-5px;border-bottom:2px solid #e6e6e6b2; font-size:13px;line-height:50px;height:43px;text-align: center;">
          <el-text>详细信息</el-text>
        </div>
        <!-- 点击level1出现表格的增删改 -->
        <div v-if="infoVisible1">
          全部作物
        </div>
        <!-- 点击level2 -->
        <div v-if="infoVisible2">
          <el-form :disabled="cropDisabled" style="margin-top:10px;" ref="cropForm" :show-message="false"
            class="dialog-form" :model="cropData" label-width="85px" label-position="right">
            <el-row :gutter="15">
              <el-col :span="8">
                <el-form-item label="所属分类:" style="margin-left:0;">
                  <el-select :disabled="appendCropState == 0" @change="changeCategory" v-model="cropData.category"
                    class="m-2" placeholder="选择分类">
                    <el-option v-for="item in categoryname" :key="item.key" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="'作物编码:'">
                  <el-input :disabled="appendCropState == 0" placeholder="自动生成" v-model="cropData.id" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="'作物名称:'">
                  <el-input :disabled="appendCropState == 0" placeholder="输入名称" v-model="cropData.cropname" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :span="8">
                <el-form-item prop="family" label="科:">
                  <el-select @change="changeFamily" v-model="cropData.family" class="m-2" placeholder="选择科">
                    <el-option v-for="item in familyList" :key="item.key" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="genus" label="属:">
                  <el-select v-model="cropData.genus" class="m-3" placeholder="选择属">
                    <el-option v-for="item in genusList" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :span="8">
                <el-form-item :label="'性状:'">
                  <el-input placeholder="输入名称" v-model="cropData.phenotype" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="'分布地区:'">
                  <el-input :autosize="{ minRows: 1, maxRows: 2 }" type="textarea" placeholder="输入内容"
                    v-model="cropData.distribution" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="'用途:'">
                  <el-input :autosize="{ minRows: 1, maxRows: 2 }" type="textarea" placeholder="输入内容"
                    v-model="cropData.usage" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div style="position:absolute;right:10px;bottom:20px;">
            <el-button size="small" type="primary" @click="saveCrop">保存</el-button>
            <el-button size="small" type="success" @click="cropDisabled = false">编辑</el-button>
          </div>
        </div>
        <!-- 点击level3 -->
        <div v-if="infoVisible3">
          <el-form :disabled="ecotypeDisabled" style="margin-top:10px;" ref="ecotypeForm" :show-message="false"
            class="dialog-form" :model="ecotypeData" label-position="right">
            <el-row :gutter="15">
              <el-col :span="7">
                <el-form-item label="所属作物:" style="margin-left:10px;">
                  <el-select :disabled="appendEcotypeState == 0" @change="changeCrop" v-model="ecotypeData.cropname"
                    class="m-2" placeholder="选择分类">
                    <el-option v-for="item in categoryname" :key="item.key" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item :label="'作物ID:'">
                  <el-input :disabled="appendEcotypeState == 0" placeholder="" v-model="ecotypeData.cropid" />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="生态类型名称:" style="margin-left:0;">
                  <el-input :disabled="appendEcotypeState == 0" placeholder="" v-model="ecotypeData.ecotype" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item :label="'生态类型ID:'">
                  <el-input :disabled="appendEcotypeState == 0" placeholder="" v-model="ecotypeData.ecotypeid" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="180px" style="margin-left:10px;" :label="'转化为叶子的效率(质量比):'">
                  <el-input placeholder="" v-model="ecotypeData.cvl" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="200px" :label="'转化为储存器官的效率(质量比):'">
                  <el-input placeholder="" v-model="ecotypeData.cvo" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="180px" style="margin-left:10px;" :label="'转化为根的效率(质量比):'">
                  <el-input placeholder="" v-model="ecotypeData.cvr" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="200px" :label="'转化为茎的效率(质量比):'">
                  <el-input placeholder="" v-model="ecotypeData.cvs" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div style="position:absolute;right:10px;bottom:20px;">
            <el-button size="small" type="primary" @click="saveEcotype">保存</el-button>
            <el-button size="small" type="success" @click="ecotypeDisabled = false">编辑</el-button>
          </div>
        </div>
        <!-- 点击level4 -->
        <div v-if="infoVisible4">
          <el-form :disabled="varietyDisabled" style="margin-top:10px;" ref="ecotypeForm" :show-message="false"
            class="dialog-form" :model="varietyData" label-position="left">
            <el-row>
              <el-col :span="11">
                <el-form-item label-width="90px" label="所属作物:" style="margin-left:10px;">
                  <el-select :disabled="appendVarietyState == 0" @change="changeCrop" v-model="varietyData.cropname"
                    class="m-2" placeholder="选择分类">
                    <el-option v-for="item in categoryname" :key="item.key" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="100px" label="生态类型名称:" style="margin-left:0;">
                  <el-input :disabled="appendVarietyState == 0" placeholder="" v-model="varietyData.ecotype" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label-width="80px" :label="'品种ID:'">
                  <el-input :disabled="appendVarietyState == 0" placeholder="" v-model="varietyData.varietyid" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="100px" :label="'品种名称:'">
                  <el-input placeholder="" v-model="varietyData.variety" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label-width="150px" style="margin-left:10px;" :label="'叶片中的残余N含量:'">
                  <el-input placeholder="" v-model="varietyData.nresidlv" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="150px" :label="'叶片中的残余P含量:'">
                  <el-input placeholder="" v-model="varietyData.presidlv" />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label-width="150px" style="margin-left:10px;" :label="'叶片中的残余K含量:'">
                  <el-input placeholder="" v-model="varietyData.kresidlv" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div style="position:absolute;right:10px;bottom:20px;">
            <el-button size="small" type="primary" @click="saveVariety">保存</el-button>
            <el-button size="small" type="success" @click="varietyDisabled = false">编辑</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>//我用的是setup组合式写法，那么这里一定要写上setup 如果是用的那种选项式的话记得转换一下
import { ElMessage, ElMessageBox } from 'element-plus'
// import { deleteGenericService, updateGenericTypeService, addGenericTypeService, autoGenericidService, deleteVarietyService, deleteEcotyeService, updateVarietyService, addVarietyService, autoVarietyIDService, updateEcotypeService, addEcotypeService, autoEcotypeIDService, cropDataBycategoryService, getGenerictypeService, cropVarietyDataService, cropEcotypeDataService, cropAllDataService, searchFilterService, updateService, getselectRowService, addService, cropCategoryListService, deletecropCategoryService, autoCropIDService, autoGenusListService, uploadSampleImgService } from "@/api/cropcategory.js"
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import { toRaw } from '@vue/reactivity'
import { Edit, Delete, Plus, Upload, Search } from '@element-plus/icons-vue'
import cloneDeep from 'lodash/cloneDeep'
import {
  Check
} from '@element-plus/icons-vue'
//表单数据
const cropData = ref({})
const ecotypeData = ref({})
const varietyData = ref({})
//控制表单中的可编辑（结合实际情况）
const cropDisabled = ref(false)
const ecotypeDisabled = ref(false)
const varietyDisabled = ref(false)
//一、树的数据-这个例子数据少，是一次性加载完所有数据，其他也可以尝试懒加载的方法，后面节点的增删改查是一样的
const treeRef = ref(null)//树的引用
const data = ref([]) //树的数据
const currentNodekeys = ref([]) //默认选中节点
const treeExpandData = ref([])//默认展开节点
const customNodeClass = (data, node) => { //设置不同层级的类 便于设置不同样式
  if (data.level === 1) {
    return 'levelFirst'
  } else if (data.level === 2) {
    return 'levelSecond'
  } else if (data.level === 3) {
    return 'levelThird'
  } else {
    return 'levelFourth'
  }
}
//（一）和树有关的函数
//1.获取树的数据
const getTreeData = async () => {
  //期待的数据样式
  // [{id:'0',label:'level1',children:[
  //   {id:'01',label:'level2',children:[]}
  // ]}] 注意：id是el-tree中的node-key对应的字段 一定要有
  //这里从数据库中获取数据，可以用存储过程 也可以逐级获取，以下是我的代码，可以参考  我的层级是全部作物-大类-作物-生态类型-品种
  // let data0 = [{ id: 0, value: "全部作物", label: "全部作物", level: 1, children: [] }]
  // let data1 = [
  //   { id: 1, value: "粮食作物", label: "粮食作物", level: 2, children: [] },
  //   { id: 2, value: "油料作物", label: "油料作物", level: 2, children: [] },
  //   { id: 3, value: "纤维作物", label: "纤维作物", level: 2, children: [] },
  //   { id: 4, value: "糖料作物", label: "糖料作物", level: 2, children: [] },
  //   { id: 5, value: "嗜好作物", label: "嗜好作物", level: 2, children: [] }
  // ]
  // let result1 = await cropAllDataService()
  // let data2 = result1.data
  // let result2
  // let result3
  // let data3
  // for (let i = 0; i < data2.length; i++) {
  //   data2[i].label = data2[i].id + data2[i].cropname
  //   data2[i].level = 3
  //   for (let xx = 0; xx < data1.length; xx++) {
  //     if (data2[i].category == data1[xx].value) {
  //       data2[i].children = []
  //       result2 = await cropEcotypeDataService({ cropid: data2[i].id })
  //       // result2.data
  //       for (let j = 0; j < result2.data.length; j++) {
  //         result2.data[j].label = '生态类型' + result2.data[j].ecotype
  //         result2.data[j].id = result2.data[j].ecotypeid
  //         result2.data[j].level = 4
  //         //获取第三层
  //         result3 = await cropVarietyDataService({ ecotype: result2.data[j].ecotype })
  //         for (let jj = 0; jj < result3.data.length; jj++) {
  //           result3.data[jj].label = '品种' + result3.data[jj].variety
  //           result3.data[jj].level = 5
  //           result3.data[jj].id = result3.data[jj].varietyid
  //         }
  //         result2.data[j].children = result3.data

  //       }
  //       data2[i].children = result2.data
  //       data1[xx].children.push(data2[i])
  //     }

  //   }
  // }
  // data0[0].children = data1
  // data.value = data0
  // console.log("data", data.value)
  // treeExpandData.value.push(data.value[0].id) //默认展开第一个
  // let node = { level: 1 }
  // nextTick(treeRef.value.setCurrentKey(data.value[0].id))
  // treeNodeClick(null, node, null, null);

  // 我们这把数据写死：
  data.value = [{
    id: 'all',
    value: "全部作物",
    label: "全部作物",
    level: 1,
    children: [
      {
        id: 101,
        cropname: "水稻",
        englishname: "Oryza sativa L.",
        category: "粮食作物",
        family: "禾本科",
        genus: "稻属",
        phenotype: "一年生草本",
        distribution: "秦岭、淮河以南为水稻主产区。籼稻主要分布于华南热带至淮河以南的亚热带低地；粳稻主要分布于南部热带、亚热带的高地、华东太湖流域及华北、西北、东北等温度较低的地区",
        usage: "商品粮。此外，加工后的副产品用途广。米糠可作精饲料，工业上又可酿酒等，医药上可提制健脑磷素等。稻草除作私聊外，还可编织草袋和绳索等",
        label: "101水稻",
        level: 2,
        children: [
          {
            id: 10101, ecotypeid: 10101, cropid: 101, cropname: '水稻', label: 'rice_irri', ecotype: 'rice_irri', cvl: 0.8, cvo: 0.34, cvs: 0.67, cvr: 0.7, level: 3,
            children: [
              { id: 1010101, varietyid: 1010101, cropid: 101, ecotypeid: 10101, cropname: '水稻', variety: 'Rice_HYV_IR8', ecotype: 'rice_irri', label: "品种Rice_HYV_IR8", nresidlv: 1, presidlv: 0.0002, kresidlv: 0.0002 },
              { id: 1010102, varietyid: 1010102, cropid: 101, ecotypeid: 10101, cropname: '水稻', variety: 'Rice_HYV_IR9', ecotype: 'rice_irri', label: "品种Rice_HYV_IR9", nresidlv: 2, presidlv: 0.0002, kresidlv: 0.0002 },
              { id: 1010103, varietyid: 1010103, cropid: 101, ecotypeid: 10101, cropname: '水稻', variety: 'Rice_HYV_IR6', ecotype: 'rice_irri', label: "品种Rice_HYV_IR6", nresidlv: 3, presidlv: 0.0002, kresidlv: 0.0002 }

            ]
          },
          { id: 10102, ecotypeid: 10102, cropid: 101, cropname: '水稻', label: 'rice_euu', ecotype: 'rice_euu', cvl: 0.8, cvo: 0.34, cvs: 0.69, cvr: 0.97, level: 3 },
          { id: 10103, ecotypeid: 10103, cropid: 101, cropname: '水稻', label: 'rice_cyh', ecotype: 'rice_cyh', cvl: 0.3, cvo: 0.54, cvs: 0.67, cvr: 0.6, level: 3 }
        ]
      },
      {
        id: 103,
        cropname: "玉米",
        category: "粮食作物",
        family: "禾本科",
        genus: "玉米属",
        phenotype: "一年生草本",
        distribution: "玉米分布极广，主要集中在华北、东北及西南各省。大致从黑龙江起，沿吉林、辽宁经河北、山东、河南、山西、陕西、四川至云南、贵州、广西等十二个省区，形成一个斜长的玉米生长带",
        usage: "食用。此外，子粒可作精饲料，茎叶和苞叶可做青饲料，茎秆和苞叶和制人造丝、纸张等、穗轴可制究竟、软木塞等",
        label: "103玉米",
        level: 2,
        children: [
          { id: 10301, ecotypeid: 10301, cropid: 103, cropname: '玉米', label: 'maize_s', ecotype: 'maize_s', cvl: 0.8, cvo: 0.34, cvs: 0.67, cvr: 0.7, level: 3 },
          { id: 10302, ecotypeid: 10302, cropid: 103, cropname: '玉米', label: 'maize_rt', ecotype: 'maize_rt', cvl: 0.8, cvo: 0.34, cvs: 0.69, cvr: 0.97, level: 3 },
          { id: 10303, ecotypeid: 10303, cropid: 103, cropname: '玉米', label: 'maize_5', ecotype: 'maize_5', cvl: 0.3, cvo: 0.54, cvs: 0.67, cvr: 0.6, level: 3 }
        ]
      },
      {
        id: 102,
        cropname: "小麦",
        category: "粮食作物",
        family: "禾本科",
        genus: "小麦属",
        phenotype: "一年生草本",
        distribution: "小麦分布遍及全国各地。冬麦集中在华北平原以及苏北、皖北、关中平原等地。春麦集中在长城以北的东北平原、内蒙古、新疆北部、及藏南合股等地。我国小麦以冬麦为主，高产地区有江苏、河南、四川、山东、湖北等省",
        usage: "商品粮。此外，在轻工业中，可作酿造等的原料。麦麸可作精饲料。麦秆可作饲料及编织、造纸等的原料",
        label: "102小麦",
        level: 2,
        children: [
          { id: 10201, ecotypeid: 10201, cropid: 102, cropname: '小麦', label: 'wheat_s', ecotype: 'wheat_s', cvl: 0.8, cvo: 0.34, cvs: 0.67, cvr: 0.7, level: 3 },
          { id: 10202, ecotypeid: 10202, cropid: 102, cropname: '小麦', label: 'wheat_sy', ecotype: 'wheat_sy', cvl: 0.8, cvo: 0.34, cvs: 0.69, cvr: 0.97, level: 3 },
          { id: 10203, ecotypeid: 10203, cropid: 102, cropname: '小麦', label: 'wheat_sd', ecotype: 'wheat_sd', cvl: 0.3, cvo: 0.54, cvs: 0.67, cvr: 0.6, level: 3 }
        ]
      },

    ]

  }]
}
getTreeData() //页面加载时获取
//2.树节点点击事件
// 设置每个部分是否可见
//页面可见性，可以用选项卡形式的（结合实际情况
const infoVisible1 = ref(false)
const infoVisible2 = ref(false)
const infoVisible3 = ref(false)
const infoVisible4 = ref(false)
const treeNodeClick = (treeobj, node, treenode, event) => {
  infoVisible1.value = false
  infoVisible2.value = false
  infoVisible3.value = false
  infoVisible4.value = false
  //点击第一ceng"全部作物" 可以是一个表格 可结合实际情况 此处为空
  if (node.level == 1) {
    if (appendCropState.value == 1) { //因为点击后面的增加按钮时，会与节点的点击事件冲突，故此处添加一个全局变量，判断当前是新增事件还是点击事件
      infoVisible1.value = false
      infoVisible2.value = true
      infoVisible3.value = false
      infoVisible4.value = false
    }
    else infoVisible1.value = true
  }
  //点击"作物"
  if (node.level == 2) {
    if (appendEcotypeState.value == 1) {
      infoVisible1.value = false
      infoVisible2.value = false
      infoVisible3.value = true
      infoVisible4.value = false
    }
    else {
      infoVisible2.value = true
      cropData.value = cloneDeep(node.data) //注意一定要用深拷贝，否则如果表单数据未保存，树中对应数据也更新了
    }
  }
  //点击"生态类型"
  if (node.level == 3) {
    if (appendVarietyState.value == 1) {
      infoVisible1.value = false
      infoVisible2.value = false
      infoVisible3.value = false
      infoVisible4.value = true

    } else {
      infoVisible3.value = true
      ecotypeData.value = cloneDeep(node.data)
    }
  }
  //点击"品种"
  if (node.level == 4) {
    console.log(varietyData.value)
    infoVisible4.value = true
    varietyData.value = cloneDeep(node.data)
    console.log("vvcccss", node)
  }
}
//2.保存树的数据  数据更新后，可以直接在页面中更新，而不是重新刷新数据去后端获取 这个时候本可以用updateKeyChildren方法，但是我怎样都无效，
//于是我采用的方法是：去更改树的绑定数据 data的值 思想与updateKeyChildren一致，
const upDateTreeData = (xdata, level, flag) => {
  let xnew = treeRef.value.getNode(xdata.id)
  let childrennodes = cloneDeep(xnew.parent.data.children)//更新的节点所在层的所有的兄弟节点
  let xchildren = [] //放置更新的节点以及它所有的兄弟节点
  // console.log(childrennodes)
  for (let i = 0; i < childrennodes.length; i++) { //遍历所有的兄弟节点，找到被更改的节点。所有兄弟节点放在xchildren中
    if (childrennodes[i].id == xdata.id) { //判断是否是更新节点，如果是，则更改数据
      let m = cloneDeep(xdata)
      m.children = childrennodes[i].children
      xchildren.push(m)
    }
    else {
      xchildren.push(childrennodes[i])
    }
  }
  //得到了被更改数据的兄弟们xchildren，现在要去找它们的父节点在data中的位置，再更改即可
  if (level == 2) data.value[0].children = cloneDeep(xchildren)
  else if (level == 3) {
    for (let i = 0; i < data.value[0].children.length; i++) {
      if (data.value[0].children[i].id == xnew.parent.data.id) {
        data.value[0].children[i].children = cloneDeep(xchildren)
      }
    }
  }
  else {
    for (let i = 0; i < data.value[0].children.length; i++) {
      if (data.value[0].children[i].id == xnew.parent.parent.data.id) {
        let xxchildren = data.value[0].children[i].children
        let jj = 0
        for (jj = 0; jj < xxchildren.length; jj++)
          if (xxchildren[jj].id == xnew.parent.data.id) {
            // console.log(data.value[0].children[i].children[j].children, xchildren)
            data.value[0].children[i].children[jj].children = cloneDeep(xchildren)
          }
      }
    }
  }
}
const saveCrop = async () => {
  cropDisabled.value = true
  //验证表单代码...
  //需要rules绑定...
  //保存到数据库的处理
  // let result= await saveCropService(cropData.value)
  //数据库保存成功后
  //需要更新节点
  if (appendCropState.value == 0) {
    let cropdata = cloneDeep(cropData.value)
    cropData.value.label = cropData.value.cropname
    cropData.value.label = cropdata.id + cropdata.cropname
    cropData.value.level = 2
    upDateTreeData(cropData.value, 2, 0)
    cropDisabled.value = true
  }
  else {
    //新增crop
    // 数据库操作.....省略
    //同步树更新
    let cropdata = cloneDeep(cropData.value)
    cropdata.label = cropdata.id + cropdata.cropname
    cropdata.level = 2
    // console.log(treeRef.value.getNode(0))
    treeRef.value.append(cropdata, 'all')
    appendCropState.value = 0
  }
  nextTick(() => {
    treeRef.value.setCurrentKey(cropData.value.id)
  })
}
const saveEcotype = async () => {
  //验证表单代码...
  //需要rules绑定...
  ecotypeDisabled.value = true
  if (appendEcotypeState.value == 0) {
    //保存到数据库的处理
    // let result= await saveCropService(cropData.value)
    //数据库保存成功后
    ecotypeDisabled.value = true
    let xecotypeData = ecotypeData.value
    xecotypeData.label = xecotypeData.ecotype
    xecotypeData.id = ecotypeData.value.ecotypeid
    upDateTreeData(xecotypeData, 3, 0)
  } else {
    //新增数据到数据库
    //数据库保存成功后
    ecotypeDisabled.value = true
    let xecotypeData = ecotypeData.value
    xecotypeData.level = 2
    xecotypeData.id = Number(xecotypeData.ecotypeid)
    xecotypeData.ecotypeid = Number(xecotypeData.ecotypeid)
    xecotypeData.label = xecotypeData.ecotype
    console.log(xecotypeData)
    treeRef.value.append(xecotypeData, ecotypeData.value.cropid)
    appendEcotypeState.value = 0
  }
  nextTick(() => {
    treeRef.value.setCurrentKey(ecotypeData.value.id)
  })
}
const saveVariety = async () => {
  varietyDisabled.value = true
  if (appendVarietyState.value == 0) {
    console.log("品种在更新")


    let xvarietyData = cloneDeep(varietyData.value)
    xvarietyData.label = xvarietyData.variety
    // xvarietyData.id = varietyData.value.ecotypeid
    upDateTreeData(xvarietyData, 4, 0)
  } else {
    console.log("品种在增加")
    varietyDisabled.value = true
    let xvarietyData = cloneDeep(varietyData.value)

    xvarietyData.level = 4
    xvarietyData.label = xvarietyData.variety
    xvarietyData.id = Number(xvarietyData.varietyid)
    xvarietyData.ecotypeid = Number(xvarietyData.ecotypeid)
    xvarietyData.varietyid = Number(xvarietyData.varietyid)
    treeRef.value.append(xvarietyData, xvarietyData.ecotypeid)
    appendVarietyState.value = 0
    varietyData.value = cloneDeep(xvarietyData)
  }
  nextTick(() => {
    console.log("varietyData.value", varietyData.value)
    treeRef.value.setCurrentKey(varietyData.value.varietyid)
  })
}
//3.新增节点
const appendCropState = ref(0)
const appendVarietyState = ref(0)
const appendEcotypeState = ref(0)
const appendNode = (node, data) => {
  let isflag
  appendCropState.value = 0
  appendVarietyState.value = 0
  appendEcotypeState.value = 0
  if (node.level == 1) {
    cropDisabled.value = false
    appendCropState.value = 1
    //新增作物的表单处理...
    cropData.value = {
      id: '',
      cropname: "",
      englishname: "",
      category: "",
      family: "",
      genus: "",
      phenotype: "",
      distribution: "",
      usage: ""
    }
    // cropData.value.category=no
    // addEcotype(node.parent.data.id, node.data.id, node.data.cropname)
  }
  if (node.level == 2) {
    ecotypeDisabled.value = false
    appendEcotypeState.value = 1
    ecotypeData.value = { id: '', ecotypeid: '', cropid: '', cropname: '', ecotype: '', cvl: '', cvo: '', cvs: '', cvr: '', level: '' }
    ecotypeData.value.cropid = node.data.id
    ecotypeData.value.cropname = node.data.cropname
    // addEcotype(node.parent.data.id, node.data.id, node.data.cropname)
  }
  if (node.level == 3) {
    varietyDisabled.value = false
    appendVarietyState.value = 1
    console.log("node", node)
    varietyData.value = { id: '', varietyid: '', cropid: node.data.cropid, ecotypeid: node.data.ecotypeid, cropname: node.data.cropname, variety: '', ecotype: node.data.ecotype, nresidlv: '', presidlv: '', kresidlv: '' }
  }
}
//4.删除节点
const deleteTreenode = async (node, data) => {
  if (node.level == 2) {//作物层
    ElMessageBox.confirm(
      '确认删除作物' + node.data.cropname + '吗？其相应的作物生态类型和品种也将被删除！',
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
          // let result = await deleteEcotyeService(node.data.ecotypeid)
          // if (node.data.children) {
          //   let vdata = node.data.children
          //   for (let i = 0; i < vdata.length; i++) {
          //     let result1 = await deleteVarietyService(vdata[i].varietyid)
          //   }
          // }
          // if(result.code==0)
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
  if (node.level == 3) {//生态类型层
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
          // let result = await deleteEcotyeService(node.data.ecotypeid)
          // if (node.data.children) {
          //   let vdata = node.data.children
          //   for (let i = 0; i < vdata.length; i++) {
          //     let result1 = await deleteVarietyService(vdata[i].varietyid)
          //   }
          // }
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
  if (node.level == 4) {//品种层
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
          // let result = await deleteVarietyService(node.data.varietyid)
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
</script>
<!-- 这里代码样式我写的scss  对element-plus的样式更改会有影响，可以去了解一下 -->
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
