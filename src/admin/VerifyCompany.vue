<template>
  <div>
    <el-tabs type="border-card" style="margin-left:-5px;margin-top:-5px;" @tab-change="changeTab">
      <el-tab-pane label="待审核" style="border-bottom:0;">
        <el-form class="calendarForm" style="margin-left:-10px;" label-width="80px">
          <el-row>
            <el-col :span="13">
              <el-form-item label="申请时间">
                <el-date-picker v-model="idtime1" type="datetime" placeholder="" :default-time="defaultTime" />
                <span class="demonstration" style="margin-left:5px;margin-right:5px;"> ~ </span>
                <el-date-picker v-model="idtime2" type="datetime" placeholder="" :default-time="defaultTime" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-button @click="filterVerifyIDData" type="success" size='small' :icon="Filter"
                style="height:30px;margin-left:-25px;">筛选</el-button>
              <el-button type="primary" size='small' :icon="Setting" style="height:30px;margin-left:5px;"
                @click="clearSearchBtn">清空筛选</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table id="cropcategoryTable" style="height:71.7vh;" @select="setSelectRows" :row-key="getRowKey"
          :key="isUpdate" ref="myTableRef" v-loading="loading" border stripe class="categorytableList" :data="dataList1"
          :row-style="{ height: 0 + 'px' }" highlight-current-row @row-dblclick="rowlineEditBtn"
          :header-cell-style="{ color: '#595959' }" @row-click="handleSelectionChange">
          <el-table-column type="selection" width="40" />
          <el-table-column align="center" fixed prop="verifyid" label="编号" width="60" />
          <el-table-column align="center" fixed prop="userid" label="账号" width="120" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="companyname" label="企业名称" width="120" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="tellphone" label="运营电话" width="120" />
          <el-table-column align="center" prop="mainactivity" :show-overflow-tooltip="true" label="主要业务" width="150" />
          <el-table-column align="center" prop="verifytime" :show-overflow-tooltip="true" label="申请认证时间" width="150" />
          <el-table-column align="center" prop="verifystate" label="认证状态" width="120" />
          <el-table-column align="center" prop="examinetime" label="审核时间" width="150" />
          <el-table-column align="center" prop="examineadmin" label="审核人" width="120" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="remark" label="批注" width="150" />


          <el-table-column fixed="right" :show-overflow-tooltip="true" align="center" label="操作" width="100">

            <template #default="scope"> <!-- scoped -->
              <el-button @click="rowlineEditBtn(scope.row)" size="small" type="danger">处理</el-button>
              <!-- <el-button @click="rowlineDeleteBtn(scope.row)" size="small" type="round" :icon="Delete" circle /> -->
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页条 -->
        <el-pagination class="xxxclass" v-model:current-page="pageNum" v-model:page-size="pageSize"
          :page-sizes="[8, 10, 13, 14, 15, 16, 17, 20]" small layout="total, sizes, prev, pager, next, jumper"
          background="black" :total="total" @size-change="onSizeChange" @current-change="onCurrentChange"
          style="margin-top:5px; margin-bottom:5px; justify-content: flex-end" />
        <el-dialog :show-close="false" class="myDialog" :visible.sync="dialogVisible" align-center
          v-model="dialogVisible" width="50%">
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
            :model="dataForm1" label-width="70px" label-position="right">
            <el-row :gutter="15">
              <el-col :span="12">
                <el-form-item label="账号:" style="margin-left:0;">
                  <el-input disabled v-model="dataForm1.userid" />
                </el-form-item>
              </el-col>
              <el-col :span="12">

                <el-form-item :label="'企业名称:'">
                  <el-input disabled placeholder="" v-model="dataForm1.companyname" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :span="12">
                <el-form-item :label="'运营电话:'">
                  <el-input disabled placeholder="" v-model="dataForm1.tellphone" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item :label="'申请时间:'">
                  <el-input disabled placeholder="" v-model="dataForm1.verifytime" />
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="'主营业务:'">
                  <el-input :autosize="{ minRows: 1, maxRows: 3 }" type="textarea" placeholder="输入内容"
                    v-model="dataForm1.mainactivity" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-bottom:15px;">
              <el-form-item :label="'证明材料:'">
                <div class="box-scale">
                  <vue-office-pdf :src="pdfUrls" class="pdf-calss" @rendered="rendered" />
                </div>
              </el-form-item>
            </el-row>

          </el-form>

          <template #footer>
            <span class="dialog-footer">
              <el-button size="small" @click="dialogCloseBtn">取消</el-button>
              <el-button size="small" type="success" @click="passBtn1">通过审核</el-button>
              <el-button size="small" type="danger" @click="failBtn1">不通过审核</el-button>
            </span>
          </template>
        </el-dialog>

      </el-tab-pane>
      <el-tab-pane label="已完成">
        <el-form class="calendarForm" style="margin-left:-10px;" label-width="80px">
          <el-row>
            <el-col :span="13">
              <el-form-item label="审核时间">
                <el-date-picker v-model="idtime3" type="datetime" placeholder="" :default-time="defaultTime" />
                <span class="demonstration" style="margin-left:5px;margin-right:5px;"> ~ </span>
                <el-date-picker v-model="idtime4" type="datetime" placeholder="" :default-time="defaultTime" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-button @click="filterVerifyIDData1" type="success" size='small' :icon="Filter"
                style="height:30px;margin-left:-25px;">筛选</el-button>
              <el-button type="primary" size='small' :icon="Setting" style="height:30px;margin-left:5px;"
                @click="clearSearchBtn1">清空筛选</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table style="height:71.7vh;" id="cropcategoryTable" @select="setSelectRows" :row-key="getRowKey"
          :key="isUpdate" ref="myTableRef" v-loading="loading" border stripe class="categorytableList" :data="dataList2"
          :row-style="{ height: 0 + 'px' }" highlight-current-row @row-dblclick="rowlineEditBtn"
          :header-cell-style="{ color: '#595959' }" @row-click="handleSelectionChange">
          <el-table-column type="selection" width="40" />
          <el-table-column align="center" fixed prop="verifyid" label="编号" width="60" />
          <el-table-column align="center" fixed prop="userid" label="账号" width="120" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="companyname" label="企业名称" width="120" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="tellphone" label="运营电话" width="120" />
          <el-table-column align="center" prop="mainactivity" :show-overflow-tooltip="true" label="主要业务" width="150" />
          <el-table-column align="center" prop="verifytime" :show-overflow-tooltip="true" label="申请认证时间" width="150" />
          <el-table-column align="center" prop="verifystate" label="认证状态" width="120" />
          <el-table-column align="center" prop="examinetime" label="审核时间" width="150" />
          <el-table-column align="center" prop="examineadmin" label="审核人" width="120" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="remark" label="批注" width="150" />


          <el-table-column fixed="right" :show-overflow-tooltip="true" align="center" label="操作" width="100">

            <template #default="scope"> <!-- scoped -->
              <el-button @click="rowlineEditBtn1(scope.row)" size="small" type="danger">撤回</el-button>
              <!-- <el-button @click="rowlineDeleteBtn(scope.row)" size="small" type="round" :icon="Delete" circle /> -->
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页条 -->
        <el-pagination class="xxxclass" v-model:current-page="pageNum1" v-model:page-size="pageSize1"
          :page-sizes="[8, 10, 13, 14, 15, 16, 17, 20]" small layout="total, sizes, prev, pager, next, jumper"
          background="black" :total="total1" @size-change="onSizeChange1" @current-change="onCurrentChange1"
          style="margin-top:5px; justify-content: flex-end" />
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script setup>
//调用后台接口，完成调用
import { ElMessage, ElMessageBox } from 'element-plus'
import { cropAllDataService, searchFilterService, updateService, getselectRowService, addService, cropCategoryListService, autoCropIDService, autoGenusListService, uploadSampleImgService } from "@/api/cropcategory.js"
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import { toRaw } from '@vue/reactivity'
import { filterVerifyCompanyDataService, companyVerifyListService, addUserService, updateUserService, deleteUserService, updateVerifyCompanyService, userFilterService } from '@/api/admin.js'
import { getLocationService, provinceListService, areaListService } from '@/api/area.js'
import { Edit, Delete, Plus, Upload, Search } from '@element-plus/icons-vue'
import { genFileId } from 'element-plus'
import VueOfficePdf from "@vue-office/pdf";
import { UserInfoStore } from '@/stores/userInfo.js'
const pdfUrls = ref('http://localhost:8080/verifycompany/19816893357/19816893357_0.pdf?v=1')
// import { defineEmits } from 'vue'
const userInfoStore = UserInfoStore();
const idtime1 = ref('')
const idtime2 = ref('')
const idtime3 = ref('')
const idtime4 = ref('')
//表格列表
const rendered = () => {
  console.log('ddddddddd');
}
const dataList1 = ref([
  {
    "verifyid": 2,
    "userid": "",
    "companyname": "1",
    "tellphone": "1",
    "mainactivity": "1",
    "verifytime": "2024-03-31T08:06:43.000+00:00",
    "examinetime": null,
    "examineadmin": null,
    "verifystate": "待审核",
    "remark": null
  }
])
//表格列表
const dataList2 = ref([
  {
    "verifyid": 2,
    "userid": "",
    "companyname": "1",
    "tellphone": "1",
    "mainactivity": "1",
    "verifytime": "2024-03-31T08:06:43.000+00:00",
    "examinetime": null,
    "examineadmin": null,
    "verifystate": "待审核",
    "remark": null
  }
])
import cloneDeep from 'lodash/cloneDeep'
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
//   import { exportExcel } from "@/utils/exportExcel.js";
const genderList = [
  { id: 'Female', name: '女' },
  { id: 'Male', name: '男' },
  { id: 'Other', name: '保密' }
]
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const areaList = ref([])
//1.表格数据
const myTableRef = ref()
const emit = defineEmits(["fatherMethod", "addMethod"])
const props = defineProps({
  location: {
    type: Object,
    required: true
  }
})
const dialogTitle = ref('')
const dialogVisible = ref(false)
const copyuserList = ref(null)

const isUpdate = ref(false)
const genusList = ref([
])
//表单数据
const dataForm1 = ref(
  {
    "verifyid": 2,
    "userid": "",
    "companyname": "1",
    "tellphone": "1",
    "mainactivity": "1",
    "verifytime": "2024-03-31T08:06:43.000+00:00",
    "examinetime": null,
    "examineadmin": null,
    "verifystate": "待审核",
    "remark": null
  }
)
const filterVerifyIDData = async () => {
  if (idtime1.value != '' && idtime2.value != '') {
    let result = await filterVerifyCompanyDataService({
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      idtime1: formatDate(idtime1.value),
      idtime2: formatDate(idtime2.value),
      flag: 0
    })
    //渲染视图
    total.value = result.data.total;
    dataList1.value = result.data.items;
  }
}
const filterVerifyIDData1 = async () => {
  if (idtime3.value != '' && idtime4.value != '') {
    let result = await filterVerifyCompanyDataService({
      pageNum: pageNum1.value,
      pageSize: pageSize1.value,
      idtime1: formatDate(idtime3.value),
      idtime2: formatDate(idtime4.value),
      flag: 1
    })
    //渲染视图
    total1.value = result.data.total;
    dataList2.value = result.data.items;
  }
}
const changeTab = () => {
  getVerifyList1()
  getVerifyList2()
}
//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(16)//每页条数
const newId = ref(0)
const pageNum1 = ref(1)//当前页
const total1 = ref(20)//总条数
const pageSize1 = ref(16)//每页条数

const asyncFunction = (data) => {
  return (data)
  // 在这里访问到的是最新的值
};

const callAsyncFunction = () => {
  return asyncFunction(cropForm.value);
};
const getVerifyList1 = async (flag, row) => {
  try {
    let params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      flag: 0
    }
    let result = await companyVerifyListService(params);
    //渲染视图
    total.value = result.data.total;
    dataList1.value = result.data.items;
  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }
}
const getVerifyList2 = async (flag, row) => {
  try {
    let params = {
      pageNum: pageNum1.value,
      pageSize: pageSize1.value,
      flag: 1
    }
    let result = await companyVerifyListService(params);

    //渲染视图
    total1.value = result.data.total;
    dataList2.value = result.data.items;
  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }
}
getVerifyList1()
getVerifyList2()
//过滤选项
const categoryFilter = (value, row, column) => {
  // let result = await categoryFilterService(value, 1)
  // console.log("1111", result.data)
  const prop = column.property; // 获取列的属性
  console.log("1111", String(row[prop]).toLowerCase().includes(String(value).toLowerCase()))
  return String(row[prop]).toLowerCase().includes(String(value).toLowerCase());
}
const clearSearchBtn = () => {
  idtime1.value = ''
  idtime2.value = ''
  getVerifyList1()
}
const clearSearchBtn1 = () => {
  idtime3.value = ''
  idtime4.value = ''
  getVerifyList2()
}
//搜索功能  模糊查询
const searchInput = ref('')
const searchfilterState = ref(false)
const searchFilter = async () => {
  searchfilterState.value = true
  try {
    let params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      value: searchInput.value
    }
    let result = await userFilterService(params);
    //渲染视图
    total.value = result.data.total;
    userList.value = result.data.items;

  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }

}
//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size
  getVerifyList1()
}
const onSizeChange1 = (size) => {
  pageSize1.value = size
  getVerifyList2()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  getVerifyList1()
}
const onCurrentChange1 = (num) => {
  pageNum1.value = num
  getVerifyList2()
}
//给每行定义一个key 定义了这个才可以和页面数据的自动刷新实现一个合作
const getRowKey = (row) => {
  return row.id;
}
//删除行toolbar
const deleteUser = async (id) => {
  try {
    let result = await deleteUserService({ userid: id });
    getuserList(-1) //为避免异步导致更新不及时，直接在此更新
  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }
};
//删除行表格操作
const rowlineDeleteBtn = async (rowData) => {
  ElMessageBox.confirm(
    '确认删除用户' + rowData.username + '吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then((action, instance, done) => {
    if (action === 'confirm') {
      userList.value.forEach((v, i) => {
        if (rowData.userId === v.userId) {
          userList.value.splice(i, 1);

          deleteUser(rowData.userId);
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
const getProvinceList = async () => {
  let result = await provinceListService()
  for (let i = 0; i < result.data.length; i++) {
    result.data[i].label = result.data[i].name
    result.data[i].value = result.data[i].name
  }
  areaList.value = result.data

  // console.log(provinceList.value[0])
  // provinceValue.value = provinceList.value[-1]
  // changeProvince(provinceValue.value)
}
getProvinceList() //首先调用
//关于弹窗
// 定义变量内容
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
  if (title == '新增用户') {
    editState.value = 'add'
    userForm.value.registerTime = formatDate(new Date())


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
      selectRows.value.length > 1 ? '确认删除用户' + deleteRows[0].username + '，' + deleteRows[1].username + '...等共' + selectRows.value.length + '行吗?' : '确认删除' + deleteRows[0].username + '?',
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
          userList.value.forEach((v, i) => {
            if (rows1.userId === v.userId) {
              userList.value.splice(i, 1);
              deleteUser(rows1.userId);
            }
          });
          getuserList()
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
const mainImgList = ref([])
const cropimgUpload = ref(null)
const imguploadflag = ref(false)
//1.文件上传请求
const uploadProgress = (uploadProgressEvent, uploadFile, uploadFiles) => {
  console.log("文件正在上传", uploadFile)
}
const getAreaList = async (val) => {
  // alert(val[0])
  let params = {
    code: val
  }
  let xxx = []
  let result = await areaListService(params)
  for (let i = 0; i < result.data.length; i++) {
    result.data[i].label = result.data[i].name
    result.data[i].value = result.data[i].name
    result.data[i].leaf = true
  }
  return result.data

}

const xprops = {
  lazy: true,
  lazyLoad: async (node, resolve) => {
    console.log("node", node)
    const { level } = node
    // setTimeout(() => {

    let nodes = await getAreaList(node.data.code)

    console.log("xxxx", nodes)
    // Invoke `resolve` callback to return the child nodes data and indicate the loading is finished.
    resolve(nodes)
    // }, 1000)
  },

}
const changeUpload = (uploadFile, uploadFiles) => {
  console.log('uploadFiles', uploadFiles)

  mainImg.value = uploadFiles

  //   console.log( mainImg.value)
  //   //求当前fileList的
  //   // 更改name
  // if(imguploadflag.value==true){
  let i = 0
  mainImgList.value = []
  for (i = 0; i < uploadFiles.length; i++) {
    let item = uploadFiles[i]
    // console.log("item",item.status)
    // 更改图片中的name属性
    if (item.status == 'success') mainImgList.value[mainImgList.value.length] = item //用于处理新增情形
    else if (item.status == 'ready') {
      let f = new File([item.raw], `${cropForm.value.id}_${i}.png`);
      // i=i+1
      f.uid = item.raw.uid; // new File 没有uid属性，会导致组件底层报错，这里手动加上
      mainImgList.value[mainImgList.value.length] = item.raw = f;
    }

  }

  imguploadflag.value = false
  console.log("mainImgList", mainImgList.value)
  // }

  //   mainImg.value = uploadFiles
  //   console.log("mainImg.value",mainImg.value)


  // console.log("changeUpload", mainImg.value)
}
// 使用http-request方法的时候,:on-success,: on-error指令是不会触发的。
const uploadSectionFile = async (param) => {
  //file就是当前添加的文件
  var fileObj = param.file;
  // fileList.value.append(fileObj)
  let fileArr = fileObj.name.split('.');
  let name = fileArr[0];
  let fileType = fileArr[1];
  // console.log("file",name)
  //把当前新增的ID加上
  // console.log("newid", newId.value)
  if (editState.value == 'add') var id = newId.value
  else var id = cropForm.value.id;
  console.log("cropForm.value.id", cropForm.value.id)
  let result = await uploadSampleImgService(fileObj, id);
}
//文件上传以前
const beforeUpload = (file) => { //非自动上传不触发  不生效
  // console.log(file)
  // file.
}
//移除图片
const handleRemove = (uploadFile, uploadFiles) => {
  // alert(1)
  mainImg.value = uploadFiles

}
const checkPhone = (rule, value, callback) => {
  value = userForm.value.userId
  const regex = /^1[3456789]\d{9}$/
  if (!regex.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {

    callback()
  }
}
const checkuserId = (rule, value, callback) => {
  value = userForm.value.userId
  // alert(value)
  const regex = /^1[3456789]\d{9}$/
  if (!regex.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {

    callback()
  }
}
const checkPassword = (rule, value, callback) => {
  value = userForm.value.password
  const regex = /^(?=.*[a-zA-Z])(?=.*\d).+$/
  if (!regex.test(value)) {
    callback(new Error('密码至少包括一个字母和一个数字'))
  } else {
    // alert(value.length)
    if (value.length < 6 || value.length > 12) {
      callback(new Error("密码长度为6-12个字符"))
    } else {
      callback()
    }
  }
}
const emailCheck = (rule, value, callback) => {
  value = userForm.value.email
  var emailPat = /^(.+)@(.+)$/;
  var matchArray = emailStr.match(emailPat);
  if (matchArray == null) {
    callback(new Error('电子邮件地址必须包括 ( @ 和 . )'))
  }
}
const rules = {
  userId: [
    { required: true, trigger: ['blur', 'change'], validator: checkuserId }
  ],
  phone: [
    { required: true, trigger: ['blur', 'change'], validator: checkPhone }
  ],
  password: [
    { required: true, trigger: ['blur', 'change'], validator: checkPassword }
  ],
  username: [
    { required: true, trigger: ['blur', 'change'], message: '用户名不能为空' }
  ],
  email: [
    { trigger: ['blur', 'change'], alidator: emailCheck }
  ]
}

//3.tag标签处理  栽培类型
const cultivationtypeList = ref([])
const inputVisible = ref(false)
const inputRef = ref(null)
const inputValue = ref('')
//4.addClose 弹窗右上角的X 以及右下角的取消按钮
const dialogForm = ref(null);
const tryeditRow = ref(null);
const passBtn1 = async () => {
  //审核通过
  let params = {
    verifyid: dataForm1.value.verifyid,
    examinetime: formatDate(new Date()),
    examineadmin: userInfoStore.info.username,
    verifystate: '认证成功',
    remark: ''
  }
  let result = await updateVerifyCompanyService(params)
  await getVerifyList1()
  ElMessage.success('处理成功')
  dialogVisible.value = false
}
const failBtn1 = async () => {
  ElMessageBox.prompt('请输入审核不通过的原因', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async ({ value }) => {
      //处理value
      let params = {
        verifyid: dataForm1.value.verifyid,
        examinetime: formatDate(new Date()),
        examineadmin: userInfoStore.info.username,
        verifystate: '不通过',
        remark: value
      }
      let result = await updateVerifyCompanyService(params)
      await getVerifyList1()

      dialogVisible.value = false
      ElMessage({
        type: 'success',
        message: `处理成功`,
      })
    })
    .catch(() => {
      // ElMessage({
      //   type: 'info',
      //   message: 'Input canceled',
      // })
    })
}
const dialogCloseBtn = () => {
  // console.log("123456",)
  // clearSearchBtn();
  dataList1.value = cloneDeep(copyuserList.value);

  myTableRef.value.setCurrentRow(tryeditRow.value)
  dialogForm.value.resetFields(); //通过dom元素 清空弹窗中的表单及其验证 这个好像只能清空验证
  // 手动清空表单数据
  dataForm1.value = {}
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

//保存更新数据
const saveUpdateData = async (row) => {
  let result = await updateUserService(row);
  if (result.code === 0) {
    //只能强制刷新了
    await getuserList(0, userForm.value)
    for (var i = 0; i < userList.value.length; i++) {
      let itemRow = userList.value[i]
      if (Number(itemRow.userId) == Number(userForm.value.userId)) {
        myTableRef.value.setCurrentRow(itemRow)
      }
    }

    // 手动清空表单数据
    userForm.value = {}
    dialogForm.value.resetFields(); //通过dom元素 清空弹窗中的表单及其验证 这个好像只能清空验证
    dialogVisible.value = false
    // 设置监听条件
    ElMessage.success('数据更改成功')
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


      //处理文件
      //调用保存函数
      if (editState.value == 'add') {
        console.log(userForm.value)
        let result = await addUserService(userForm.value);

        if (result.code === 0) {
          // 设置监听条件
          console.log("dddd", result.data)
          hasAdd.value = true
          ElMessage.success('保存成功')
          total.value = total.value + 1
          pageNum.value = 1
          await getuserList(1)

          newId.value = result.data.userId
        }
        //关闭弹窗

        dialogForm.value.resetFields(); //通过dom元素 清空弹窗中的表单及其验证 这个好像只能清空验证
        // 手动清空表单数据
        userForm.value = {}
        dialogVisible.value = false
        editState.value == 'edit'
      }
      else {
        saveUpdateData(userForm.value)
        dialogVisible.value = false
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
  openDialog('审核用户企业认证')
  editState.value == 'edit'
  copyuserList.value = cloneDeep(dataList1.value);
  tryeditRow.value = cloneDeep(row)

  let i = 0;
  dataForm1.value = row
}
const rowlineEditBtn1 = async (row) => {
  let params = {
    verifyid: row.verifyid,
    examinetime: null,
    examineadmin: '',
    verifystate: '待审核',
    remark: ''
  }
  let result = await updateVerifyCompanyService(params)
  await getVerifyList2()
  ElMessage.success('已撤回该审核')
}
// //更新
// const updatePagination = () => {
//   const newTotalPages = Math.ceil(cropcategoryList.value.length / pageSize.value); // 计算新的总页数
//   if (newTotalPages !== this.totalPages && this.currentPage > newTotalPages) {
//     this.currentPage = newTotalPages; // 若当前页超出了新的总页数，则自动切换到最后一页
//   }
//   this.totalPages = newTotalPages; // 更新总页数
// }
//图片上传
// const upload = ref<UploadInstance>()

// const handleExceed: UploadProps['onExceed'] = (files) => {
//   upload.value!.clearFiles()
//   const file = files[0] as UploadRawFile
//   file.uid = genFileId()
//   upload.value!.handleStart(file)
// }
</script>
<style lang="scss">
.box-scale {
  width: 100%;
  height: 300px;
  overflow: auto;
}

.pdf-calss {
  padding: 0;
}
</style>
