<template>
  <div>
    <el-row>
      <el-col :span="7">
        <div class="treePanel">
          <div
            style="background-color:aliceblue;margin-top:-5px;margin-left:-5px;border-bottom:2px solid #e6e6e6b2; font-size:13px;line-height:43px;height:43px;text-align: center;">
            <el-text><el-icon>
                <HelpFilled />
              </el-icon>土壤类型维护</el-text>
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

                <span v-if="node.level == 1" style="color:rgb(0, 77, 165);">
                  <el-icon @click="appendNode(node, data)" style=" margin-right:3px;">
                    <CirclePlus />
                  </el-icon>
                </span>
                <span v-if="node.level == 2" style="color:#c45656;">
                  <el-icon @click="appendNode(node, data)" style=" margin-right:3px;">
                    <CirclePlus />
                  </el-icon>
                  <el-icon @click="deleteTreenode(node, data)">
                    <Delete />
                  </el-icon>
                </span>
                <span v-if="node.level == 3" style="color:#c45656;">
                  <el-icon @click="deleteTreenode(node, data)">
                    <Delete />
                  </el-icon>
                </span>
              </span>
            </template>
          </el-tree>
        </div>
        <el-dialog :show-close="false" class="myDialog" :visible.sync="dialogVisible" align-center
          v-model="dialogVisible" width="30%">
          <!-- header部分 -->
          <template #header> <!-- vue3 这里不能使用slot  要用# -->
            <div style="padding-left:10px;" class="dialog-title-name"><el-icon
                style="position:relative;top:2.5px;margin-right:3px;">
                <InfoFilled />
              </el-icon><span style="vertical-align:top;">{{ dialogTitle }}</span></div>
            <div style="padding-right:10px;"><el-icon @click="dialogCloseBtn">
                <Close />
              </el-icon></div>
          </template>
          <!-- 主体部分 -->
          <!-- 注意 为了实现表单验证，这个el-form里面的双向数据绑定不能用v-model,尽量后面都打冒号，否则容易出问题要用：model -->
          <el-form ref="dialogForm" :show-message="false" :rules="rules" class="dialog-form" @submit.native.prevent=""
            :model="Form1" label-position="right">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="编码">
                  <el-input disabled v-model="Form1.id" />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="类型名称">
                  <el-input v-model="Form1.soilType" />
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>

          <template #footer>
            <span class="dialog-footer">
              <el-button size='small' @click="dialogCloseBtn">取消</el-button>
              <el-button size='small' type="primary" @click="dialogSaveBtn1">保存</el-button>
            </span>
          </template>
        </el-dialog>
        <el-dialog :show-close="false" class="myDialog" :visible.sync="dialogVisible1" align-center
          v-model="dialogVisible1" width="30%">
          <!-- header部分 -->
          <template #header> <!-- vue3 这里不能使用slot  要用# -->
            <div style="padding-left:10px;" class="dialog-title-name"><el-icon
                style="position:relative;top:2.5px;margin-right:3px;">
                <InfoFilled />
              </el-icon><span style="vertical-align:top;">{{ dialogTitle1 }}</span></div>
            <div style="padding-right:10px;"><el-icon @click="dialogCloseBtn1">
                <Close />
              </el-icon></div>
          </template>
          <!-- 主体部分 -->
          <!-- 注意 为了实现表单验证，这个el-form里面的双向数据绑定不能用v-model,尽量后面都打冒号，否则容易出问题要用：model -->
          <el-form ref="dialogForm1" :show-message="false" :rules="rules" class="dialog-form" @submit.native.prevent=""
            :model="Form2" label-position="right">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="英文名称">
                  <el-input v-model="Form2.value" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="类型代码">
                  <el-input v-model="Form2.symbol" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="类型名称">
                  <el-input v-model="Form2.chineseValue" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <template #footer>
            <span class="dialog-footer">
              <el-button size='small' @click="dialogCloseBtn">取消</el-button>
              <el-button size='small' type="primary" @click="dialogSaveBtn1">保存</el-button>
            </span>
          </template>
        </el-dialog>
      </el-col>
      <el-col :span="17">
        <div
          style="width:100%;background-color:aliceblue;color:black;margin-top:-5px;margin-left:-5px;border-bottom:2px solid #e6e6e6b2; font-size:13px;line-height:50px;height:43px;text-align: center;">
          <el-text>土壤类型分布图</el-text>
        </div>

        <div>
          <img src="../assets/soil.png" style="width:100%;height:550px;" />
          <div style="position:absolute;bottom:40px;right:30px;"><img style="width:110px;"
              src="../assets/legendsoil.png" />
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
import { deleteSoilGService, deleteSoilGDetailService, deleteSoilFaoService, addFaoDetailDataService, autoSoilGidService, addSoilGenricData, autoSoilGDetailidService, addSoilGenricDetailData, addSoilFaoDataService } from '@/api/admin.js'
import { soilFao90DataService, soilGenericDataDeatilService, soilGenericDataService } from '@/api/soilcrop.js'
import {
  Check
} from '@element-plus/icons-vue'
//表单数据
const dialogTitle = ref('')
const dialogTitle1 = ref('')
const dialogVisible = ref(false)
const dialogVisible1 = ref(false)
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
const Form1 = ref({ id: '', soilType: '' })
const Form2 = ref({ value: '', symbol: '', chineseValue: '' })
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
const editState = ref('edit')
const openDialog = (title, state) => {
  dialogTitle.value = title
  dialogVisible.value = true
  if (state == 'add') {
    editState.value = 'add'

  }
  else editState.value = 'edit'
};
const openDialog1 = (title, state) => {
  dialogTitle1.value = title
  dialogVisible1.value = true
  if (state == 'add') {
    editState.value = 'add'

  }
  else editState.value = 'edit'
};
//（一）和树有关的函数
//1.获取树的数据
const getTreeData = async () => {
  //期待的数据样式
  // [{id:'0',label:'level1',children:[
  //   {id:'01',label:'level2',children:[]}
  // ]}] 注意：id是el-tree中的node-key对应的字段 一定要有
  //这里从数据库中获取数据，可以用存储过程 也可以逐级获取，以下是我的代码，可以参考  我的层级是全部作物-大类-作物-生态类型-品种
  let data0 = [{ id: 'r0', value: "", label: "按照中国土壤数据库", level: 1, children: [] }, { id: 'r1', value: "按照FAO 90土壤分类体系", label: "按照FAO 90土壤分类体系", level: 1, children: [] }]
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
  treeExpandData.value.push(data.value[0].id) //默认展开第一个
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

}
const dialogSaveBtn1 = async () => {
  if (appendState.value == 0) {
    let result = await addSoilGenricData(Form1.value)
    let xdata = cloneDeep(Form1.value)
    xdata.label = xdata.id + xdata.soilType
    xdata.level = 2
    // console.log(treeRef.value.getNode(0))
    treeRef.value.append(xdata, 'r0')
    nextTick(() => {
      treeRef.value.setCurrentKey(xdata.id)
    })
  } else if (appendState.value == 2) {
    let result = await addSoilGenricDetailData(Form1.value, parentnodeid.value)
    let xdata = cloneDeep(Form1.value)
    xdata.label = xdata.id + xdata.soilType
    xdata.level = 3
    // console.log(treeRef.value.getNode(0))
    treeRef.value.append(xdata, parentnodeid.value)
    nextTick(() => {
      treeRef.value.setCurrentKey(xdata.id)
    })
  } else if (appendState.value == 1) {
    let result = await addSoilFaoDataService(Form2.value)
    let xdata = cloneDeep(Form2.value)
    xdata.label = xdata.chineseValue
    xdata.level = 2
    xdata.id = xdata.symbol
    // console.log(treeRef.value.getNode(0))
    treeRef.value.append(xdata, 'r1')
    nextTick(() => {
      treeRef.value.setCurrentKey(xdata.id)
    })
  } else if (appendState.value == 3) {
    let result = await addFaoDetailDataService(Form2.value)
    let xdata = cloneDeep(Form2.value)
    xdata.label = xdata.chineseValue
    xdata.level = 3
    xdata.id = xdata.symbol
    // console.log(treeRef.value.getNode(0))
    treeRef.value.append(xdata, parentnodeid.value)
    nextTick(() => {
      treeRef.value.setCurrentKey(xdata.id)
    })
  }

  dialogVisible.value = false
  dialogVisible1.value = false
  appendState.value = ''
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
const parentnodeid = ref('')



//3.新增节点
const appendState = ref('')
const appendNode = async (node, data) => {

  if (node.level == 1) {
    if (node.data.id == 'r0') {
      appendState.value = 0
      openDialog('新增一级分类-按照中国土壤数据库', 'add')
      // 自动生成编码
      let result = await autoSoilGidService()
      Form1.value.id = result.data
    } else {
      appendState.value = 1
      openDialog1('新增一级分类-按照FAO 90土壤分类体系', 'add')
    }

  }
  if (node.level == 2) {
    if (node.parent.data.id == 'r0') {
      appendState.value = 2
      openDialog('新增二级分类-按照中国土壤数据库', 'add')
      // 自动生成编码
      // console.log(node.parent.data.id)
      parentnodeid.value = node.data.id
      let result = await autoSoilGDetailidService({ id: node.data.id })
      Form1.value.id = node.data.id + '' + result.data
    } else {
      appendState.value = 3
      parentnodeid.value = node.data.symbol
      Form2.value.symbol = node.data.id + '_xx'
      openDialog1('新增二级分类-按照FAO 90土壤分类体系', 'add')
    }

  }
}
//4.删除节点
const deleteTreenode = async (node, data) => {
  if (node.level == 2) {
    if (node.parent.data.id == 'r0') {
      ElMessageBox.confirm(
        '确认土壤数据库分类体系中的' + node.data.label + '及其子类吗？',
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
            let result = await deleteSoilGService({ id: node.data.id })

            if (node.data.children) {
              let vdata = node.data.children
              for (let i = 0; i < vdata.length; i++) {
                let result1 = await deleteSoilGDetailService(vdata[i].data.detailid)
              }
            }
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
    } else {
      ElMessageBox.confirm(
        '确认FAO 90土壤分类体系中的二级类' + node.data.label + '吗？',
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
            let result = await deleteSoilFaoService({ code: node.data.code })


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
    }

    //从前端先删除
  }
  if (node.level == 3) {
    if (node.parent.parent.data.id == 'r0') {
      ElMessageBox.confirm(
        '确认土壤数据库分类体系中的' + node.data.label + '吗？',
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
          try {
            let result = await deleteSoilGDetailService({ id: node.data.detailId })

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
    } else {
      ElMessageBox.confirm(
        '确认FAO 90土壤分类体系中的二级类' + node.data.label + '吗？',
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
            let result = await deleteSoilFaoService({ code: node.data.code })


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
    }

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
