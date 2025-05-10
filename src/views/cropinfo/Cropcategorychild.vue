<template>
  <div>
    <el-row>
      <!-- 搜索框 -->
      <el-input @keyup.enter="searchFilter" style="width: 200px;height:28px;margin-top:5px;" v-model="searchInput"
        placeholder="请输入内容">
        <template #append>
          <el-button @click="searchFilter" type="primary" size="small">
            <el-icon>
              <Search />
            </el-icon>
          </el-button>
        </template>
      </el-input>
      <el-button style="height:28px;margin-left:5px;margin-top:5px;" @click="clearSearchBtn" size="small" plain
        type="success">清空查询</el-button>
      <!-- <el-input style="height:26px;width: 200px;font-size: small;" v-model="input" placeholder="请输入内容" />
    &nbsp;&nbsp;<el-button size="small" :icon="Search">搜索</el-button> -->
      <!-- 工具栏 -->
      <div class="toolbar" style="margin-top:-5px;">
        <el-button style="height:28px;margin-right:5px;margin-left:0px;" plain type="info" size="small"
          @click="openDialog('新增数据')"><el-icon>
            <Plus />
          </el-icon>&nbsp;新增</el-button>
        <el-button style="height:28px;margin-right:5px;margin-left:0px;" @click="handleDeleteBtn" size="small"
          type="warning" plain><el-icon>
            <Delete />
          </el-icon> &nbsp;删除</el-button>
        <el-button plain type="primary" style="height:28px;margin-right:5px;margin-left:0px;" @click="exportBtn()"
          size="small">导出该页</el-button>
        <el-button plain type="success" style="height:28px;margin-right:5px;margin-left:0px;" @click="exportAllBtn()"
          size="small">导出全部</el-button>

      </div>
    </el-row>
    <el-table id="cropcategoryTable" @select="setSelectRows" :row-key="getRowKey" :key="isUpdate" ref="myTableRef"
      v-loading="loading" border stripe class="tableList" :data="cropcategoryList" :row-style="{ height: 0 + 'px' }"
      highlight-current-row @row-dblclick="rowlineEditBtn" :header-cell-style="{ color: '#595959' }"
      @row-click="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column align="center" fixed prop="id" label="编码" width="60" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="cropname" label="作物名称" width="100" />
      <el-table-column align="center" prop="englishname" :show-overflow-tooltip="true" label="英语名称" width="150" />
      <el-table-column align="center" prop="category" label="所属分类" width="120" />
      <el-table-column align="center" prop="family" label="科" width="80" />
      <el-table-column align="center" prop="genus" label="属" width="80" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="phenotype" label="性状" width="100" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="cultivationType" label="栽培类型" width="100" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="distribution" label="分布地区" width="100" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="cropusage" label="用途" width="100" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="remark" label="备注" width="100" />
      <el-table-column align="center" prop="imgNum" label="图片" width="80" />
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
      <el-form ref="dialogForm" :show-message="false" :rules="rules" class="dialog-form" @submit.native.prevent=""
        :model="cropForm" label-width="85px" label-position="right">
        <el-row :gutter="15">
          <el-col :span="8">
            <el-form-item prop="category" label="所属分类:" style="margin-left:0;">
              <el-select @change="changeCategory" v-model="cropForm.category" class="m-2" placeholder="选择分类">
                <el-option v-for="item in categoryname" :key="item.key" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="id" :label="'作物编码:'">
              <el-input disabled placeholder="自动生成" v-model="cropForm.id" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="cropname" :label="'作物名称:'">
              <el-input placeholder="输入名称" v-model="cropForm.cropname" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="8">
            <el-form-item prop="englishname" :label="'英文名称:'">
              <el-input placeholder="输入名称" v-model="cropForm.englishname" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="family" label="科:">
              <el-select @change="changeFamily" v-model="cropForm.family" class="m-2" placeholder="选择科">
                <el-option v-for="item in familyList" :key="item.key" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="genus" label="属:">
              <el-select v-model="cropForm.genus" class="m-3" placeholder="选择属">
                <el-option v-for="item in genusList" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="8">
            <el-form-item :label="'性状:'">
              <el-input placeholder="输入名称" v-model="cropForm.phenotype" />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item :label="'栽培类型:'">
              <el-tag style="margin:0 5px 3px 0;" v-for="tag in cultivationtypeList" :key="tag" class="mx-1" closable
                :disable-transitions="false" @close="handleClose(tag)">
                {{ tag }}
              </el-tag>
              <el-input style="margin:0 5px 3px 0;" v-if="inputVisible" ref="inputRef" v-model="inputValue"
                class="taginput" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
              <el-button style="margin:0 5px 3px 0;" v-else class="button-new-tag ml-1" size="small" @click="showInput">
                + 添加
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="'分布地区:'">
              <el-input :autosize="{ minRows: 1, maxRows: 2 }" type="textarea" placeholder="输入内容"
                v-model="cropForm.distribution" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="'用途:'">
              <el-input :autosize="{ minRows: 1, maxRows: 2 }" type="textarea" placeholder="输入内容"
                v-model="cropForm.cropusage" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="'备注:'">
              <el-input style="width:100%;" type="text" placeholder="输入内容" v-model="cropForm.remark" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="'样图上传:'">
              <el-upload action="#" :http-request="uploadSectionFile" list-type="picture-card" :on-exceed="handleExceed"
                :headers="uploadHeader" :on-remove="handleRemove" :before-upload="beforeUpload"
                :on-success="uploadSuccess" :on-error="uploadError" :on-progress="uploadProgress" ref="cropimgUpload"
                :multiple="true" limit=3 :disabled="disabled" :data="paramData" :on-change="changeUpload"
                v-model:file-list="mainImg" :auto-upload="false" accept=".jpg,.png,.jpeg">
                <el-icon>
                  <Plus />
                </el-icon>

                <template #tip>
                  <div class="el-upload__tip">
                    <span style="color:red;">*</span>&nbsp;仅支持jpg/png/jpeg格式,最多上传3张
                  </div>
                </template>
              </el-upload>
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
import { cropAllDataService, searchFilterService, updateService, getselectRowService, addService, cropCategoryListService, deletecropCategoryService, autoCropIDService, autoGenusListService, uploadSampleImgService } from "@/api/cropcategory.js"
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import { toRaw } from '@vue/reactivity'
import { Edit, Delete, Plus, Upload, Search } from '@element-plus/icons-vue'
import { genFileId } from 'element-plus'
// import { defineEmits } from 'vue'


import cloneDeep from 'lodash/cloneDeep'
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
//   import { exportExcel } from "@/utils/exportExcel.js";

//1.表格数据
const myTableRef = ref()
const emit = defineEmits(["fatherMethod", "addMethod"])
const props = defineProps({
  location: {
    type: Object,
    required: true
  }
})
console.log("props", props.location)
const dialogTitle = ref('')
const dialogVisible = ref(false)
const copycategoryList = ref(null)
const categoryname = ref([
  { key: 1, value: "粮食作物", label: "粮食作物" },
  { key: 2, value: "油料作物", label: "油料作物" },
  { key: 3, value: "纤维作物", label: "纤维作物" },
  { key: 4, value: "糖料作物", label: "糖料作物" },
  { key: 5, value: "嗜好作物", label: "嗜好作物" }
])
const familyList = ref([
  { key: 1, value: "锦葵科", label: "锦葵科" },
  { key: 2, value: "豆科", label: "豆科" },
  { key: 3, value: "藜科", label: "藜科" },
  { key: 4, value: "萝科", label: "萝科" },
  { key: 5, value: "菊科", label: "菊科" },
  { key: 6, value: "荨麻科", label: "荨麻科" },
  { key: 7, value: "茜草科", label: "茜草科" },
  { key: 8, value: "茄科", label: "茄科" },
  { key: 9, value: "芭蕉科", label: "芭蕉科" },
  { key: 10, value: "胡麻科", label: "胡麻科" },
  { key: 11, value: "禾本科", label: "禾本科" },
  { key: 12, value: "石蒜科", label: "石蒜科" },
  { key: 13, value: "椴树科", label: "椴树科" },
  { key: 14, value: "棕榈科", label: "棕榈科" },
  { key: 15, value: "桑科", label: "桑科" },
  { key: 16, value: "旋花科", label: "旋花科" },
  { key: 17, value: "山茶科", label: "山茶科" },
  { key: 18, value: "天南星", label: "天南星" },
  { key: 19, value: "大麻科", label: "大麻科" },
  { key: 20, value: "大戟科", label: "大戟科" },
  { key: 21, value: "十字花科", label: "十字花科" },
  { key: 22, value: "凤梨科", label: "凤梨科" },
  { key: 23, value: "亚麻科", label: "亚麻科" }
])
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
      const filename = 'data_crop_x.xlsx';
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
    '是否确认导出所有数据为 作物分类数据.xlsx?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async (action, instance, done) => {
    if (action === 'confirm') {
      //
      let result = await cropAllDataService()
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
      FileSaver.saveAs(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), '作物分类数据.xlsx');
      // return blob

    }
  })


};
//表单数据
const cropForm = ref(
  {
    id: '',
    cropname: '',
    englishname: '',
    category: '',
    family: '',
    genus: '',
    phenotype: '',
    cultivationType: '',
    distribution: '',
    cropusage: '',
    remark: '',
    imgNum: 0
  }
)
//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(16)//每页条数
const newId = ref(0)

//表格列表
const cropcategoryList = ref([
  {
    id: '1',
    cropname: '1',
    englishname: '1',
    category: '1',
    family: '',
    genus: '',
    phenotype: '',
    cultivationType: '',
    distribution: '',
    cropusage: '',
    imgNum: 0,
    remark: ''
  }
])
const asyncFunction = (data) => {
  return (data)
  // 在这里访问到的是最新的值
};

const callAsyncFunction = () => {
  return asyncFunction(cropForm.value);
};
const getcategoryList = async (flag, row) => {
  try {
    let params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value
    }
    let result = await cropCategoryListService(params);
    //渲染视图
    total.value = result.data.total;
    cropcategoryList.value = result.data.items;
    if (flag == 0) {

    }
    if (flag == 1) {//代表是新增
      nextTick(() => {
        let itemRow = {};
        let rowIndex = 0;
        for (let i = 0; i < cropcategoryList.value.length; i++) {
          let item = cropcategoryList.value[i];
          // console.log("item.id", item.id)
          // 判断查询的数据是否存在，存在则进行定位操作
          if (Number(item.id) == Number(newId.value)) {
            itemRow = item;
            rowIndex = i;
            break;
          }
        }
        myTableRef.value.setCurrentRow(itemRow)
      })
    }
  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }
}
getcategoryList()

//过滤选项
const categoryFilter = (value, row, column) => {
  // let result = await categoryFilterService(value, 1)
  // console.log("1111", result.data)
  const prop = column.property; // 获取列的属性
  console.log("1111", String(row[prop]).toLowerCase().includes(String(value).toLowerCase()))
  return String(row[prop]).toLowerCase().includes(String(value).toLowerCase());
}
const clearSearchBtn = () => {
  searchInput.value = ''
  getcategoryList()
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
    let result = await searchFilterService(params);
    //渲染视图
    total.value = result.data.total;
    cropcategoryList.value = result.data.items;

  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }

}
//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size
  getcategoryList()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  getcategoryList()
}
//给每行定义一个key 定义了这个才可以和页面数据的自动刷新实现一个合作
const getRowKey = (row) => {
  return row.id;
}
//删除行toolbar
const deletecropCategory = async (id) => {
  try {
    let result = await deletecropCategoryService(id);
    getcategoryList(-1) //为避免异步导致更新不及时，直接在此更新
  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }
};
//删除行表格操作
const rowlineDeleteBtn = async (rowData) => {
  ElMessageBox.confirm(
    '确认删除' + rowData.id + rowData.cropname + '吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then((action, instance, done) => {
    if (action === 'confirm') {
      cropcategoryList.value.forEach((v, i) => {
        if (rowData.id === v.id) {
          cropcategoryList.value.splice(i, 1);

          deletecropCategory(rowData.id);
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
      selectRows.value.length > 1 ? '确认删除' + deleteRows[0].id + deleteRows[0].cropname + '，' + deleteRows[1].id + deleteRows[1].cropname + '...等共' + selectRows.value.length + '行吗?' : '确认删除' + deleteRows[0].id + deleteRows[0].cropname + '?',
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
          cropcategoryList.value.forEach((v, i) => {
            if (rows1.id === v.id) {
              cropcategoryList.value.splice(i, 1);
              deletecropCategory(rows1.id);
              emit('fatherMethod')
            }
          });
          getcategoryList()
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
const rules = {
  id: [
    { required: true, trigger: ['blur', 'change'], message: '编码不能为空' }
  ],
  cropname: [
    { required: true, trigger: ['blur', 'change'], message: '名称不能为空' }
  ],
  category: [
    { required: true, trigger: ['blur', 'change'], message: '分类不能为空' }
  ],
  family: [
    { required: true, trigger: ['blur', 'change'], message: '科不能为空' }
  ],
  genus: [
    { required: true, trigger: ['blur', 'change'], message: '属不能为空' }
  ]
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
//2.科属联动
const changeFamily = async (val) => {
  //得到科名
  //从数据库获取该科下面的属列表
  let result = await autoGenusListService(val);
  genusList.value = result.data
  cropForm.value.genus = result.data[0]
}
//3.tag标签处理  栽培类型
const cultivationtypeList = ref([])
const inputVisible = ref(false)
const inputRef = ref(null)
const inputValue = ref('')
//4.addClose 弹窗右上角的X 以及右下角的取消按钮
const dialogForm = ref(null);
const tryeditRow = ref(null);
const dialogCloseBtn = () => {
  // console.log("123456",)
  clearSearchBtn();
  cropcategoryList.value = cloneDeep(copycategoryList.value);

  myTableRef.value.setCurrentRow(tryeditRow.value)
  dialogForm.value.resetFields(); //通过dom元素 清空弹窗中的表单及其验证 这个好像只能清空验证
  // 手动清空表单数据
  cropForm.value = {}
  cultivationtypeList.value = []
  mainImg.value = []
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
const dialogSaveBtn = () => {
  //先进行全局验证
  searchInput.value = ''
  dialogForm.value.validate((valid) => {
    if (valid) {
      // 校验成功
      //1 处理栽培类型 标签
      let xctype_len = cultivationtypeList.value.length
      let xctype = ""
      // if(xctype_len>0){
      for (var i = 0; i < xctype_len; i++) {
        if (i == xctype_len - 1) xctype = xctype + cultivationtypeList.value[i]
        else xctype = xctype + cultivationtypeList.value[i] + ' '
        // }
      }
      imguploadflag.value = true
      cropimgUpload.value.submit()
      cropForm.value.cultivationType = xctype
      cropForm.value.imgNum = mainImg.value.length
      console.log("222", typeof (cropForm.value.imgNum))

      //处理文件
      //调用保存函数
      if (editState.value == 'add') {
        saveAddData(cropForm.value)
        //关闭弹窗
        dialogForm.value.resetFields(); //通过dom元素 清空弹窗中的表单及其验证 这个好像只能清空验证
        // 手动清空表单数据
        cropForm.value = {}
        cultivationtypeList.value = []
        mainImg.value = []
        dialogVisible.value = false
      }
      else {
        saveUpdateData(cropForm.value)
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
  ///2222222 cropcategoryList.value
  copycategoryList.value = cloneDeep(cropcategoryList.value);
  tryeditRow.value = cloneDeep(row)
  openDialog('编辑数据')
  let i = 0;
  mainImg.value = []
  // console.log(row)
  for (i = 0; i < row.imgNum; i++) {
    let name = row.id.toString() + '_' + i.toString() + '.png'
    // 这里直接使用 /src/assets/，避免了对别名的依赖。
    mainImg.value[mainImg.value.length] = { name: name, url: new URL('/src/assets/crop_categorysampleimgs/' + name, import.meta.url).href }
  }
  cropForm.value = row
  // if (cropForm.value.cultivationType != '') {
  cultivationtypeList.value = cropForm.value.cultivationType.split(' ')
  cultivationtypeList.value = cultivationtypeList.value.filter(item => item != '')//把空格移除
  // if()
  // }

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
  top: -10px;
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
