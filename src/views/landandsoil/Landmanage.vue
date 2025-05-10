<template>
  <div>
    <el-form class="calendarForm" style="margin-left:-10px;" label-width="80px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="选择地区">
            <el-cascader width="200px" :value="area" v-model="address" :options="xareaList" :props="props"
              @change="handleChange" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="土壤类型">
            <el-select @change="changeCategory" v-model="soilcategory" placeholder="选择分类">
              <el-option v-for="item in soilcategoryList" :key="item.code" :label="item.chineseValue"
                :value="item.chineseValue" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-button style="height:32px;margin-left:5px;" @click="FilterSearchBtn" size="small"
          type="primary">查询</el-button>
        <el-button style="height:32px;margin-left:5px;" @click="clearSearchBtn" size="small"
          type="success">清空查询</el-button>
        <!-- <el-input style="height:26px;width: 200px;font-size: small;" v-model="input" placeholder="请输入内容" />
    &nbsp;&nbsp;<el-button size="small" :icon="Search">搜索</el-button> -->
        <!-- 工具栏 -->
        <div class="toolbar" style="top:0px;">
          <el-button style="height:32px;margin-right:5px;margin-left:0px;" plain type="info" size="small"
            @click="openDialog('新增数据')"><el-icon>
              <Plus />
            </el-icon>&nbsp;新增</el-button>
          <el-button style="height:32px;margin-right:5px;margin-left:0px;" @click="handleDeleteBtn" size="small"
            type="warning" plain><el-icon>
              <Delete />
            </el-icon> &nbsp;删除</el-button>
          <el-button plain type="primary" style="height:32px;margin-right:5px;margin-left:0px;" @click="exportBtn()"
            size="small">导出该页</el-button>
          <el-button plain type="success" style="height:32px;margin-right:5px;margin-left:0px;" @click="exportAllBtn()"
            size="small">导出全部</el-button>
        </div>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div
            style="border-bottom:3px solid #e6e6e6b2;font-size:15px;font-family:'楷体' ;padding-left:10px;background-color:#e9e9eb;height:40px;line-height:40px;">
            <el-text style="font-size:15px;font-family:'楷体';">
              <el-icon>
                <Place />
              </el-icon>
              <span>所有数据</span>
              <!-- {{ location.province.name }}{{ location.city.name }}{{ location.county ? location.county.name :
                ''
              }} -->
            </el-text>

          </div>
        </el-col>
      </el-row>
    </el-form>

    <el-table style=" height:71.5vh;" id="cropcategoryTable" @select="setSelectRows" :row-key="getRowKey"
      :key="isUpdate" ref="myTableRef" v-loading="loading" border stripe class="soilcroptableList"
      :data="soilCropDataList" :row-style="{ height: 0 + 'px' }" highlight-current-row @row-dblclick="rowlineEditBtn"
      :header-cell-style="{ color: '#595959' }" @row-click="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column align="center" fixed prop="soilid" label="土壤编码" width="60" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="soilname" label="土壤名称" width="130" />
      <el-table-column align="center" prop="lon" label="经度" width="130" />
      <el-table-column align="center" prop="lat" label="纬度" width="130" />
      <el-table-column align="center" prop="smtabx" label="土壤体积含水量pF_X" width="130" />
      <el-table-column align="center" prop="smtaby" label="土壤体积含水量pF_Y" width="130" />
      <el-table-column align="center" prop="contabx" label="土壤导水率pF_X" width="110" />
      <el-table-column align="center" prop="contaby" label="土壤导水率pF_Y" width="110" />
      <el-table-column align="center" prop="smw" label="凋萎系数(cm³/cm³)" width="85" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="smfcf" label="田间持水量(cm³/cm³)" width="100" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="sm0" label="土壤饱和含水量(cm³/cm³)" width="110" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="crairc" label="临界土壤含氧量(cm³/cm³)"
        width="110" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="k0" label="饱和土壤导水率(cm/day)" width="110" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="sope" label="根层最大入渗速率(cm/day)" width="130" />

      <el-table-column align="center" :show-overflow-tooltip="true" prop="ksub" label="根层以下土壤最大入渗速率(cm/day)"
        width="130" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="spads" label="深苗床第一层表土渗漏参数" width="100" />


      <el-table-column align="center" :show-overflow-tooltip="true" prop="spods" label="深苗床第二层表土渗漏参数" width="100" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="spass" label="浅苗床第一层表土渗漏参数" width="100" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="sposs" label="浅苗床第二层表土渗漏参数" width="100" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="deflim" label="深苗床所需水分亏缺参数" width="100" />
      <el-table-column fixed="right" :show-overflow-tooltip="true" align="center" label="操作" width="100">

        <template #default="scope"> <!-- scoped -->
          <el-button @click="rowlineEditBtn(scope.row)" size="small" type="round" :icon="Edit" circle />
          <el-button @click="rowlineDeleteBtn(scope.row)" size="small" type="round" :icon="Delete" circle />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页条 -->
    <el-pagination class="xxxclass" v-model:current-page="pageNum" v-model:page-size="pageSize"
      :page-sizes="[8, 10, 13, 14, 15, 16, 17, 20]" small layout="total, sizes, prev, pager, next, jumper"
      background="black" :total="total" @size-change="onSizeChange" @current-change="onCurrentChange"
      style="margin-top:5px; justify-content: flex-end" />


    <!-- 弹窗1 新增 -->
    <el-dialog :show-close="false" class="myDialog" :visible.sync="dialogVisible" align-center v-model="dialogVisible"
      width="50%">
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
      <el-form ref="dialogForm" :show-message="false" class="dialog-form" :rules="rules" @submit.native.prevent=""
        :model="soilForm" label-position="right" :disabled="isSoilEdit">
        <el-row style="margin-top:-10px;">
          <el-col :span="12">
            <el-form-item label="选择地区" label-width="">
              <el-cascader v-if="editState == 'add'" @change="changeDialogArea" style="width:100px;" :props="props"
                :value="xarea" v-model="xaddress" :options="xareaList" />
              <el-input v-else :disabled="true" v-model="soilForm.areacode" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经度" label-width="">
              <el-input :disabled="true" v-model="soilForm.lon" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="纬度" label-width="">
              <el-input :disabled="true" v-model="soilForm.lat" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item prop="smtabx" label-width="150px" label="土壤体积含水量pF_X:">
              <el-input placeholder="X:1.2;1.3;..." v-model="soilForm.smtabx" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="smtaby" label="Y">
              <el-input placeholder="Y" v-model="soilForm.smtaby" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item prop="contabx" label-width="150px" label="土壤导水率pF_X:">
              <el-input placeholder="X" v-model="soilForm.contabx" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="contaby" label="Y">
              <el-input placeholder="Y" v-model="soilForm.contaby" />
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item prop="ksub" label-width="185px" :label="'根层以下土壤最大入渗速率:'">
              <el-input type='number' placeholder="" v-model="soilForm.ksub">
                <template #suffix>
                  cm/day
                </template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="smw" label-width="130px" :label="'凋萎系数:'">
              <el-input type='number' placeholder="" v-model="soilForm.smw">
                <template #suffix>
                  cm3/cm3
                </template></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item prop="spads" label-width="185px" :label="'深苗床第一层表土渗漏参数:'">
              <el-input type='number' placeholder="" v-model="soilForm.spads" />
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item prop="sm0" label-width="130px" :label="'土壤饱和含水量:'">
              <el-input type='number' placeholder="" v-model="soilForm.sm0">
                <template #suffix>
                  cm3/cm3
                </template></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item prop="spods" label-width="185px" :label="'深苗床第二层表土渗漏参数:'">
              <el-input type='number' placeholder="" v-model="soilForm.spods" />
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item prop="k0" label-width="130px" :label="'饱和土壤导水率:'">
              <el-input type='number' placeholder="" v-model="soilForm.k0">
                <template #suffix>
                  cm/day
                </template></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item prop="deflim" label-width="185px" :label="'深苗床所需水分亏缺参数:'">
              <el-input type='number' placeholder="" v-model="soilForm.deflim" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="smfcf" label-width="130px" :label="'田间持水量:'">
              <el-input type='number' placeholder="" v-model="soilForm.smfcf">
                <template #suffix>
                  cm3/cm3
                </template></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item prop="spass" label-width="185px" :label="'浅苗床第一层表土渗漏参数:'">
              <el-input type='number' placeholder="" v-model="soilForm.spass" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="crairc" label-width="130px" :label="'临界土壤含氧量:'">
              <el-input type='number' placeholder="" v-model="soilForm.crairc">
                <template #suffix>
                  cm3/cm3
                </template></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item prop="sposs" label-width="185px" :label="'浅苗床第二层表土渗漏参数:'">
              <el-input type='number' placeholder="" v-model="soilForm.sposs" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="sope" label-width="130px" :label="'根层最大入渗速率:'">
              <el-input type='number' placeholder="" v-model="soilForm.sope">
                <template #suffix>
                  cm/day
                </template></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogCloseBtn" size="default">取消</el-button>
          <el-button type="primary" @click="dialogSaveBtn" size="default">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
//调用后台接口，完成调用
import { ElMessage, ElMessageBox } from 'element-plus'
import { soilcropAllDataService, soilCropDataListService, deletecropSoilDataService, getSoilcategoryListService, SoilFilterService } from '@/api/soilcrop.js'
import { updateSoilCropdataService, addSoilCropdataService, getSoilnameService, getSoilcropdataService, getHwsddataService, getClimatedataService } from '@/api/recommend.js'
import { getLocationService, provinceListService, areaListService } from '@/api/area.js'
import { cropAllDataService, searchFilterService, updateService, getselectRowService, addService, cropCategoryListService, deletecropCategoryService, autoCropIDService, autoGenusListService, uploadSampleImgService } from "@/api/cropcategory.js"
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import { toRaw } from '@vue/reactivity'
import { Edit, Delete, Plus, Upload, Search } from '@element-plus/icons-vue'
import { genFileId } from 'element-plus'
// import { defineEmits } from 'vue'
import { locationStore } from '@/stores/location.js'
import cloneDeep from 'lodash/cloneDeep'
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
const areaList = ref([])
const xareaList = ref([])
const area = ref('')
const xarea = ref('')
const address = ref([])
//   import { exportExcel } from "@/utils/exportExcel.js";

//1.表格数据
const myTableRef = ref()
const emit = defineEmits(["fatherMethod", "addMethod"])
const xaddress = ref([])
const isAddorEdit = ref('edit')
const dialogTitle = ref('')
const isSoilEdit = ref(false)
const isSavebtnOK = ref(false)
const isEditbtnOK = ref(false)
const soilcategory = ref('')
const dialogVisible = ref(false)
const soilcategoryList = ref([])
const categoryname = ref([
  { key: 1, value: "粮食作物", label: "粮食作物" },
  { key: 2, value: "油料作物", label: "油料作物" },
  { key: 3, value: "纤维作物", label: "纤维作物" },
  { key: 4, value: "糖料作物", label: "糖料作物" },
  { key: 5, value: "嗜好作物", label: "嗜好作物" }
])
const xareacode = ref('')
const isUpdate = ref(false)
const genusList = ref([
])
const exportBtn = () => {
  //确认框
  ElMessageBox.confirm(
    '是否确认导出当前页数据为data_crop_x.xlsx?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then((action, instance, done) => {
    if (action === 'confirm') {
      //
      const el = document.getElementById('cropcategoryTable');
      console.log(el);
      // 文件名
      const filename = 'data_soil_x.xlsx';
      const wb = XLSX.utils.table_to_book(el, { raw: true });
      const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), filename);
      } catch (e) {
        console.log(e);
      }
      return wbout;

    }

  })

};
const exportAllBtn = async () => {
  //确认框
  ElMessageBox.confirm(
    '是否确认导出所有数据为 土壤数据.xlsx?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async (action, instance, done) => {
    if (action === 'confirm') {
      //
      let result = await soilcropAllDataService()
      let alldata = result.data
      // 生成 Excel 文件
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(alldata);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      // 将 Excel 文件保存为 Blob
      const blob = XLSX.write(wb, {
        bookType: 'xlsx',  // 明确指定 bookType
        bookSST: false,
        type: 'array',     // 明确指定 type
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      // 使用 file-saver 库保存 Blob 为文件
      FileSaver.saveAs(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), '土壤数据.xlsx');
      // return blob

    }
  })


};
//表单数据
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
const props = {
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
  xareaList.value = result.data
}
getProvinceList() //首先调用
//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(16)//每页条数
const getSoilcategoryList = async () => {
  let result = await getSoilcategoryListService()
  soilcategoryList.value = result.data
  // soilcategoryList.value.unshift({chineseValue:"全部",code:''})
  console.log("result.data", result.data)
}
getSoilcategoryList()
//表格列表
const soilCropDataList = ref([
  {
    soilid: 1,
    smw: 1,
    smfcf: 1,
    crairc: 1,
    k0: 1,
    sope: 1,
    "ksub": 1,
    "spads": 1,
    "spods": 1,
    "spass": 1,
    "sposs": 1,
    "deflim": 1,
    "soilname": "1",
    "lon": 1,
    "lat": 1,
    "sm0": 1,
    "smtabx": "1",
    "smtaby": "1",
    "contabx": "1",
    "contaby": "1"
  }
])
const asyncFunction = (data) => {
  return (data)
  // 在这里访问到的是最新的值
};

const callAsyncFunction = () => {
  return asyncFunction(cropForm.value);
};
const getsoilCropDataList = async (flag, row) => {
  try {
    let params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value
    }
    console.log("pppppppppppp", params)
    let result = await soilCropDataListService(params);
    //渲染视图
    console.log("result.data.total", result.data.items)
    total.value = result.data.total;
    soilCropDataList.value = result.data.items;
    if (flag == 0) {

    }
    if (flag == 1) {//代表是新增
      nextTick(() => {
        let rowIndex = 0;
        let itemRow = soilCropDataList.value[soilCropDataList.value.length - 1]
        myTableRef.value.setCurrentRow(itemRow)
      })
    }
  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }
}
getsoilCropDataList()

//过滤选项

const clearSearchBtn = () => {
  address.value = []
  soilcategory.value = ''
  getsoilCropDataList()
}
const changeDialogArea = async (val) => {
  console.log("xxx", val)
  xareacode.value = val[val.length - 1].code
  // 获取经纬度
  let xxcode = xareacode.value.replace(' ', '')
  // 获取经纬度
  let result0 = await getLocationService(xxcode, 1)
  if (result0.data.length == 0) result0 = await getLocationService(xxcode, 2)

  if (result0.data.length == 0) result0 = await getLocationService(xxcode, 3)

  soilForm.value.lon = result0.data[0].lng84
  soilForm.value.lat = result0.data[0].lat84

  //获取土壤名称
  let result1 = await getHwsddataService({ lon: soilForm.value.lon, lat: soilForm.value.lat })
  let soil_fao = result1.data[0].suSym90
  //获取土壤名称
  let result11 = await getSoilnameService({ id: soil_fao })
  soilForm.value.soilname = result11.data[0].chineseValue
}
//搜索功能  模糊查询
const searchInput = ref('')
const searchfilterState = ref(false)
const FilterSearchBtn = async () => {
  searchfilterState.value = true
  console.log("address", address.value)
  try {
    if (address.value.length == 0 && soilcategory.value == '') {
      return false
    } else if (address.value[0] == undefined && soilcategory.value == '') {
      return false
    }
    else if (address.value[0] != undefined) {
      if (address.value.length != 0 && soilcategory.value == '') {
        let areacode = address.value[address.value.length - 1].code.replace(' ', '')
        let params = {
          pageNum: pageNum.value,
          pageSize: pageSize.value,
          areacode: areacode,
          soilcategory: '',
          flag: 0
        }
        let result = await SoilFilterService(params);
        //渲染视图
        total.value = result.data.total;
        soilCropDataList.value = result.data.items;
      }
      else if (address.value.length == 0 && soilcategory.value != '') {
        let xsoilcategory = soilcategory.value
        let params = {
          pageNum: pageNum.value,
          pageSize: pageSize.value,
          areacode: '',
          soilcategory: xsoilcategory,
          flag: 1
        }
        let result = await SoilFilterService(params);
        //渲染视图
        total.value = result.data.total;
        soilCropDataList.value = result.data.items;
      }
      else {
        let areacode = address.value[address.value.length - 1].code.replace(' ', '')
        let xsoilcategory = soilcategory.value
        let params = {
          pageNum: pageNum.value,
          pageSize: pageSize.value,
          areacode: areacode,
          soilcategory: xsoilcategory,
          flag: 2
        }
        let result = await SoilFilterService(params);
        //渲染视图
        total.value = result.data.total;
        soilCropDataList.value = result.data.items;

      }
    }
    else if (address.value[0] == undefined) {
      if (soilcategory.value != '') {
        let xsoilcategory = soilcategory.value
        let params = {
          pageNum: pageNum.value,
          pageSize: pageSize.value,
          areacode: '',
          soilcategory: xsoilcategory,
          flag: 1
        }
        let result = await SoilFilterService(params);
        //渲染视图
        total.value = result.data.total;
        soilCropDataList.value = result.data.items;
      }
    }

  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }

}
//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size
  getsoilCropDataList()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  getsoilCropDataList()
}
//给每行定义一个key 定义了这个才可以和页面数据的自动刷新实现一个合作
const getRowKey = (row) => {
  return row.id;
}
//删除行toolbar
const deletecropSoilData = async (id) => {
  try {
    let result = await deletecropSoilDataService(id);
    getsoilCropDataList(-1) //为避免异步导致更新不及时，直接在此更新
  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }
};
//删除行表格操作
const rowlineDeleteBtn = async (rowData) => {
  ElMessageBox.confirm(
    '确认删除土壤' + rowData.soilid + rowData.soilname + '吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then((action, instance, done) => {
    if (action === 'confirm') {
      soilCropDataList.value.forEach((v, i) => {
        if (rowData.soilid === v.soilid) {
          soilCropDataList.value.splice(i, 1);
          deletecropSoilData(rowData.soilid);
        }
      });
      //getcategoryList()
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    }

  })

}
import { reactive } from 'vue'

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

//关于弹窗
// 定义变量内容
const myDialogRef = ref();

const state = reactive({
  data: [],
  title: '',
  isAdd: false,
  rules: {
    // area: [{ required: true, message: '请选择区域', trigger: 'blur' }],
    // alarmValueName: [{ required: true, message: '请输入告警值名称', trigger: 'blur' }],
    // alarmValue: [{ required: true, message: '请输入告警值', trigger: 'blur' }],
    // alarmValueUnit: [{ required: true, message: '请选择告警值单位', trigger: 'blur' }],
    // alarmText: [{ required: true, message: '请输入告警提示语', trigger: 'blur' }],
  },

  dialog: {
    isShowDialog: false,
    type: '',
    title: '',
    submitTxt: '',
  },

});
const openDialog = (title) => {
  dialogTitle.value = title
  dialogVisible.value = true
  if (title == '新增数据') {
    editState.value = 'add'

  }
  else editState.value = 'edit'
};


///////////////////////////表格事件处理
//定义勾选行
const selectRows = ref()
//定义点击选中行
const clickRow = ref()
//获取选中的单行数据
const handleSelectionChange = (selection) => {
  clickRow.value = selection
}
const setSelectRows = (selection) => {
  selectRows.value = selection //注意 selection是所有的选中行，不是当前勾选的行
}
//增删改按钮的设置
//1.删除按钮
//删除
const handleDeleteBtn = () => {
  if (selectRows.value == null) {
    ElMessage.warning("请选择要删除的行")
  } else {
    const deleteRows = selectRows.value
    // console.log(JSON.parse(JSON.stringify(selectRows))['_rawValue'])
    ElMessageBox.confirm(
      selectRows.value.length > 1 ? '确认删除' + deleteRows[0].soilid + '，' + deleteRows[1].soilid + '...等共' + selectRows.value.length + '行吗?' : '确认删除' + deleteRows[0].soilid + '?',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then((action, instance, done) => {
      if (action === 'confirm') {
        let rows1 = selectRows.value; //checkedDetail为表格多选选中的数组
        rows1.forEach((rows1, index) => {
          soilCropDataList.value.forEach((v, i) => {
            if (rows1.soilid === v.soilid) {
              soilCropDataList.value.splice(i, 1);
              deletecropSoilData(rows1.soilid);
            }
          });
          getsoilCropDataList()
        });
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      }
    })
  }
}

///文件处理
//文件-图片 处理
const uploadRef = ref()
import { useTokenStore } from '@/stores/token.js'
import { isNavigationFailure } from 'vue-router'
const tokenStore = useTokenStore();
const editState = ref('')
const mainImg = ref([])



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
//弹窗中选择器的联动效果
//1.自动生成编码
const changeCategory = async (val) => {
  //得到了分类名称val
  //从数据库获取最大的编码
  let result = await autoCropIDService(val);
  let newID = result.data
  newId.value = newID
  cropForm.value.id = newID
}

//4.addClose 弹窗右上角的X 以及右下角的取消按钮
const dialogForm = ref(null);
const tryeditRow = ref(null);
const dialogCloseBtn = () => {
  // console.log("123456",)
  clearSearchBtn();
  soilCropDataList.value = cloneDeep(soilCropDataList.value);

  myTableRef.value.setCurrentRow(tryeditRow.value)
  dialogForm.value.resetFields(); //通过dom元素 清空弹窗中的表单及其验证 这个好像只能清空验证
  // 手动清空表单数据
  soilForm.value = {}
  dialogVisible.value = false

  // // 手动设置验证状态为未验证
  // Object.keys(dialogForm.value.fields).forEach(key => {
  //   dialogForm.value.fields[key].validateState = '';
  //   dialogForm.value.fields[key].validateMessage = '';
  // });
}
//5.数据保存到数据库
const hasAdd = ref(false)
//保存新增数据
const saveAddData = async (cropform) => {
  let addrow = cloneDeep(cropform) //一定要深拷贝
  let result = await addService(cropform);
  if (result.code === 0) {
    // 设置监听条件
    hasAdd.value = true
    ElMessage.success('保存成功')
    let result1 = await getselectRowService(newId.value);
    pageNum.value = Math.floor((result1.data + 1) / pageSize.value) + 1; //这个必须 给表格加上row-key属性才可以更新
    nextTick(() => {
      emit('addMethod', addrow)
    })
    await getcategoryList(1)

  }
  else ElMessage.error('保存失败')
}
//保存更新数据
const saveUpdateData = async (row) => {
  let result = await updateService(row);
  if (result.code === 0) {
    //只能强制刷新了
    await getcategoryList(0, cropForm.value)
    for (var i = 0; i < cropcategoryList.value.length; i++) {
      let itemRow = cropcategoryList.value[i]
      if (Number(itemRow.id) == Number(cropForm.value.id)) {
        myTableRef.value.setCurrentRow(itemRow)
      }
    }

    // 手动清空表单数据
    cropForm.value = {}
    cultivationtypeList.value = []
    mainImg.value = []
    dialogForm.value.resetFields(); //通过dom元素 清空弹窗中的表单及其验证 这个好像只能清空验证
    dialogVisible.value = false
    // 设置监听条件
    ElMessage.success('数据更改成功')
    emit('fatherMethod')
  }
  else ElMessage.error('数据更改失败')
}
//6.保存按钮
const dialogSaveBtn = async () => {
  //先进行全局验证
  searchInput.value = ''
  dialogForm.value.validate(async (valid) => {
    if (valid) {
      // 校验成功
      //1 处理栽培类型 标签
      // 校验成功
      soilForm.value.areacode = xareacode.value.replace(' ', '')
      if (editState.value === 'add') { //新增
        let result = await addSoilCropdataService(soilForm.value)
        if (result.code === 0) {
          ElMessage.success('保存成功')
          isSoilEdit.value = true //所有表单禁止编辑
          editState.value = 'edit'
          dialogForm.value.resetFields(); //通过dom元素 清空弹窗中的表单及其验证 这个好像只能清空验证
          // 手动清空表单数据
          soilForm.value = {}
          dialogVisible.value = false

          //表中定位
          total.value = total.value + 1
          pageNum.value = Math.floor(total.value / pageSize.value) + 1
          getsoilCropDataList(1)
        }
        else ElMessage.error('保存失败')
      }
      if (editState.value === 'edit') { //更新
        // console.log('更新', soilForm.value)
        let result = await updateSoilCropdataService(soilForm.value)
        if (result.code === 0) {
          ElMessage.success('更新成功')
          isSoilEdit.value = true //所有表单禁止编辑
          for (var i = 0; i < soilCropDataList.value.length; i++) {
            if (Number(soilCropDataList.value[i].soilid) == Number(soilForm.value.soilid)) {
              soilCropDataList.value[i] = soilForm.value
            }
          }
          myTableRef.value.setCurrentRow(soilForm.value)
          soilForm.value = {}
          dialogVisible.value = false
          isSoilEdit.value = false //所有表单禁止编辑
        }
        else ElMessage.error('更新失败')

      }

      hasAdd.value = true
    } else {
      //校验失败
      ElMessage.error('必填项不能为空')
    }
  })
}
//关闭X标签
const handleClose = (tag) => {
  cultivationtypeList.value.splice(cultivationtypeList.value.indexOf(tag), 1)
}
//按钮显示输入框
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    inputRef.value.input.focus();
  })
}
const handleInputConfirm = () => {
  if (inputValue.value) {
    cultivationtypeList.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
//编辑数据
const rowlineEditBtn = (row) => {
  soilCropDataList.value = cloneDeep(soilCropDataList.value);
  tryeditRow.value = cloneDeep(row)
  openDialog('编辑数据')
  let i = 0;
  soilForm.value = row
}

</script>

<style lang="scss">
//此处不能有scoped  scoped表示局部作用域，这里是为了设置dialog的样式

el-table {
  border-width: 10px;
}

el-table-column {
  white-space: nowrap;
  /* 不换行 */
  overflow: hidden;
  /* 隐藏溢出部分 */
  text-overflow: ellipsis;
  /* 使用省略号表示被省略的文本 */
  text-align: center;
}

.toolbar {
  position: absolute;
  top: 0px;
  right: 1px;
}

.myDialog {
  border-radius: 5px;
  height: auto;

  .el-dialog__body {
    padding-bottom: 0px;
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

.soilcroptableList {
  margin-top: 10px;

  .el-table__header {
    th {
      padding: 0 !important;
      height: 30px;
      line-height: 20px;
      // background-color: #DCDFE6;
      color: #303133 !important;
      font-weight: 500;
      font-size: 12px;
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

.el-cascader-menu {
  min-width: 120px;
}

.el-scrollbar .el-cascader-menu {
  min-width: 120px;
}

.tableList {
  margin-top: 10px;
  height: 75vh;

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
    ;
  }

}

el-pagination {
  margin-left: 0;
}

//设置点击某行高亮
.el-table__body tr.current-row>td {
  background-color: #e9b15e !important;
  color: #ffffff;
}

.el-pagination {
  --el-pagination-hover-color: #009238;
  --el-color-primary: #009238;

  // .el-select__wrapper {
  //   width: 200px;
  // }
}

//对话框主体部分表单样式
.dialog-form {
  .el-row {
    font-size: 12px;
    margin-bottom: 2px;
  }

  .el-input {
    // font-size:12px;//
    width: 220px;
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
    --el-select-width: 220px;
    font-family: '楷体';

    .el-input .el-input__inner {
      font-family: '楷体';
    }

  }

}

.el-input .el-input__inner {
  font-family: '楷体'
}

.el-textarea__inner {
  font-family: '楷体'
}

.taginput {
  // 固定宽度
  width: 100px !important;
  font-family: '楷体'
}

.el-tag {
  font-family: '楷体'
}
</style>
