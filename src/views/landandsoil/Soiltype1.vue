<template>
  <div>
    <el-row>
      <el-col :span="5">
        <div class="treePanel">
          <div
            style="color:black;margin-top:-5px;margin-left:-5px;border-bottom:2px solid #e6e6e6b2; font-size:13px;line-height:50px;height:43px;text-align: center;">
            <el-text>土壤类型查看</el-text>
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
          <el-text>土壤类型分布图</el-text>
        </div>

        <div>
          全部作物
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
import { soilFao90DataService, soilGenericDataDeatilService, soilGenericDataService } from '@/api/soilcrop.js'
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
  let data0 = [{ id: 0, value: "", label: "按照中国土壤数据库", level: 1, children: [] }, { id: 1, value: "按照FAO 90土壤分类体系", label: "按照FAO 90土壤分类体系", level: 1, children: [] }]
  // let data1 = [
  //   { id: 1, value: "粮食作物", label: "粮食作物", level: 2, children: [] },
  //   { id: 2, value: "油料作物", label: "油料作物", level: 2, children: [] },
  //   { id: 3, value: "纤维作物", label: "纤维作物", level: 2, children: [] },
  //   { id: 4, value: "糖料作物", label: "糖料作物", level: 2, children: [] },
  //   { id: 5, value: "嗜好作物", label: "嗜好作物", level: 2, children: [] }
  // ]
  let result1 = await soilGenericDataService()
  let data1 = result1.data
  let result3 = await soilFao90DataService()
  let data3 = []
  console.log(result3.data)
  result3.data.forEach((item, index, arr) => {
    item.id = item.symbol
    item.label = item.chineseValue
    if (item.symbol.length == 2) {
      item.level = 2
      item.children = []
      data3.push(item)
    }
  })
  result3.data.forEach((item, index, arr) => {
    item.id = item.symbol
    item.label = item.chineseValue
    if (item.symbol.length > 2) {
      for (let m = 0; m < data3.length; m++) {
        if (data3[m].id == item.symbol.substring(0, 2)) {
          item.level = 3
          data3[m].children.push(item)
        }
      }
    }
  })
  // let data3 = result3.data

  let result2
  // let result3
  // let data3
  for (let i = 0; i < data1.length; i++) {
    data1[i].label = data1[i].id + data1[i].soilType
    data1[i].level = 2
    result2 = await soilGenericDataDeatilService({ id: data1[i].id })
    let data2 = result2.data
    for (let j = 0; j < data2.length; j++) {
      data2[j].level = 3
      data2[j].pid = data2[j].id
      data2[j].id = data2[j].detailId
      data2[j].label = data2[j].id + data2[j].name
      data2[j].children = []
    }
    console.log(data2)
    data1[i].children = data2
  }
  data0[0].children = data1
  data0[1].children = data3
  data.value = data0
  // console.log("data", data.value)
  // treeExpandData.value.push(data.value[0].id) //默认展开第一个
  // let node = { level: 1 }
  // nextTick(treeRef.value.setCurrentKey(data.value[0].id))
  // treeNodeClick(null, node, null, null);

  // 我们这把数据写死：

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
