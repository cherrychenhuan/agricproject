<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div
          style="background-color:aliceblue;padding-left:10px;font-size:14px;height:30px;line-height:30px;font-weight:600;color:#009237;">
          <div style="float:left;"><el-text style="font-weight:600;color:#009237;"><el-icon>
                <Connection />
              </el-icon>科普知识列表</el-text>
          </div>
          <div style="float:right;margin-right:5px;">
            <el-button size="small" type="primary" @click="addKnowledge">新增</el-button>
            <el-button size="small" type="danger" @click="handleDeleteBtn">删除</el-button>
          </div>
        </div>
        <el-table id="profuctTable" style="margin-top:0;height:76vh;" @select="setSelectRows1" :row-key="getRowKey"
          :key="isUpdate" ref="profuctTableRef" v-loading="loading" border stripe class="categorytableList"
          :data="productList" :row-style="{ height: 0 + 'px' }" highlight-current-row @row-dblclick="rowlineEditBtn"
          :header-cell-style="{ color: '#595959' }" @row-click="clickProductRow">
          <el-table-column type="selection" width="40" />
          <el-table-column align="center" fixed prop="id" label="编号" width="60" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="editor" label="编辑" width="120" />
          <el-table-column align="center" :show-overflow-tooltip="true" label="创建时间" width="160">
            <template #default="scope">
              {{ formatDate(scope.row.createtime) }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="tittle" :show-overflow-tooltip="true" label="标题" width="100" />
          <el-table-column align="center" prop="content" :show-overflow-tooltip="true" label="内容" width="120" />
          <el-table-column fixed="right" :show-overflow-tooltip="true" align="center" label="操作" width="90">
            <template #default="scope">
              <el-button @click="rowlineDeleteBtn1(scope.row)" size="small" type="round" :icon="Delete" circle />
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页条 -->
        <el-pagination class="xxxclass" v-model:current-page="pageNumProduct" v-model:page-size="pageSizeProduct"
          :page-sizes="[8, 10, 13, 14, 15, 16, 17, 20]" small layout="total, sizes, prev, pager, next, jumper"
          background="black" :total="totalproduct" @size-change="onSizeChange1" @current-change="onCurrentChange1"
          style="margin-left:5px;margin-top:5px; margin-right:10px;margin-bottom:5px; justify-content: flex-end" />
      </el-col>
      <el-col :span="12">
        <div
          style="background-color:aliceblue;padding-left:10px;font-size:14px;height:30px;line-height:30px;font-weight:600;color:#009237;border-bottom:1px solid #f4f4f5;">
          <el-text style="font-weight:600;color:#009237;"><el-icon>
              <ChatLineSquare />
            </el-icon>详细信息</el-text>
        </div>
        <el-form label-width="70px" style="margin-top:20px;">
          <el-row>
            <el-col :span="24">
              <el-form-item label="首页图片">
                <el-upload class="avatar-uploader" style="width:100px;height:100px;display: block;"
                  :show-file-list="false" :http-request="uploadSectionFile" action="#" :multiple="false" accept=".png"
                  :on-change="changeAvatar">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:100px;height:100px;" />
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                  </el-icon>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="编者">
                <el-input :disabled="isCanEdit" v-model="productData.editor" />

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发布时间">
                <el-date-picker :disabled="isCanEdit" v-model="productData.createtime" type="datetime"
                  placeholder="选择时间" format="YYYY-MM-DD HH:mm:ss" date-format="MMM DD, YYYY" time-format="HH:mm" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row></el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="标题">
                <el-input :disabled="isCanEdit" v-model="productData.tittle" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="内容">
                <el-input :disabled="isCanEdit" v-model="productData.content" :rows="12" type="textarea"
                  placeholder="请输入内容" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="position:absolute;right:10px;bottom:10px;">
          <el-button size="small" type="warning" @click="isCanEdit = false">编辑</el-button>
          <el-button size="small" type="danger" @click="saveKnowledge">保存</el-button>
        </div>
      </el-col>
    </el-row>
  </div>

</template>
<script setup>
//调用后台接口，完成调用
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { deleteKnowledgeService, getKnowledgeService, updateKnowledgeService } from '@/api/admin.js'
import { getLocationService, provinceListService, areaListService } from '@/api/area.js'
import { Edit, Delete, Plus, Upload, Search } from '@element-plus/icons-vue'
import { UserInfoStore } from '@/stores/userInfo.js'
import { userListService, userAllDataService, addKnowledgeService, uploadKnowledgeImgService } from '@/api/admin.js'

import { cropAllDataService } from '@/api/cropcategory.js'
const imageUrl = ref('')
const dialogVisible = ref(false)
const userList = ref([])
const newTopic = ref({
  tittle: '',
  creatorId: '',
  createTime: '',
  content: ''
})
const getImage = (id) => {
  return new URL('/src/assets/topic/' + id + '.jpg', import.meta.url).href
}
const getImage1 = (id) => {
  // new URL('/src/assets/knowledge/' + id + '.jpg', import.meta.url).href)
  return new URL('/src/assets/knowledge/' + id + '.png', import.meta.url).href
}
const getUserList = async () => {
  let result = await userAllDataService()
  userList.value = result.data
}
getUserList()
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
// import { defineEmits } from 'vue'
//获取所有作物列表

const isCanEdit = ref(true)
const userInfoStore = UserInfoStore();
//删除行toolbar
const deleteKnowledge = async (id) => {
  try {
    let result = await deleteKnowledgeService({ id: id });
    getProductList(-1) //为避免异步导致更新不及时，直接在此更新
  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }
};
const filterData1 = ref({
  cropname: '',
  xyear: '',
  province: ''
})
const isFilter = ref(false)
const totalproduct = ref(0)
const pageNumProduct = ref(1)
const pageSizeProduct = ref(14)

const pageNumComment = ref(1)
const pageSizeComment = ref(14)
const productForm = ref('')
const productData = ref({
  "id": '',
  "tittle": "",
  "editor": "",
  "createtime": "",
  "content": ''
})
const editState1 = ref('edit')
const profuctTableRef = ref('')
const commentTableRef = ref('')
const provinceList = ref([])

const selectRows1 = ref()
const selectRows2 = ref()
const topicEditState = ref('edit')

const cropList = ref([])
const yearList = ref([])
const idtime1 = ref('')
const idtime2 = ref('')
const idtime3 = ref('')
const idtime4 = ref('')
//表格列表
const productList = ref([
  {
    "id": 20,
    "tittle": "新增一篇文章-陈欢",
    "editor": "15027219612",
    "createtime": "2024-04-21 14:44:00",
    "content": "新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢"
  }
])

const uploadSectionFile = async (params) => {
  //file就是当前添加的文件
  // console.log("xxxxxxxxxxxxxxxx", file)
  var fileObj = params.file;
  // fileList.value.append(fileObj)
  let fileArr = fileObj.name.split('.');
  // console.log("file",name)
  //把当前新增的ID加上
  // console.log("newid", newId.value)
  var id = productList.value[0].id + 1
  let name = id + '.png';
  // console.log("cropForm.value.id", cropForm.value.id)
  let result = await uploadKnowledgeImgService(fileObj, name);
  // alert(1)
}
const getCropList = async () => {
  let result = await cropAllDataService()
  cropList.value = result.data
  for (let i = 2013; i <= 2023; i++) {
    yearList.value.push(i)
  }
}
getCropList()

const changeAvatar = async (uploadFile, uploadFiles) => {
  let formData1 = new FormData();
  // await uploadSectionFile(uploadFile)
  // formData1.append('file', uploadFile.raw);
  // formData1.append('userid', userInfoStore.info.userId);
  // // formData1.append('userid', userInfoStore.info.userId);
  // //上传文件到后端

  // let result1 = await uploadAvatarService(formData1)
  // ElMessage.success('更改成功')
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  // rawName.value = result1.data

  // userInfoStore.info.avatarurl = URL.createObjectURL(uploadFile.raw)
  // await updateUserInfo()
  // avatarupLoad.value.clearFiles()
  // console.log("bbb", userInfoStore.info.avatarurl)
}


const addKnowledge = () => {
  topicEditState.value = 'add'
  imageUrl.value = ''
  isCanEdit.value = false
  productData.value = {
    "id": '',
    "tittle": "",
    "editor": "",
    "createtime": "",
    "content": ''
  }
  if (productList.value.length == 0) productData.value.id = 1
  else productData.value.id = productList.value[0].id + 1
}

const saveKnowledge = async () => {
  // newTopic.value.createTime = formatDate(newTopic.value.createTime)
  if (topicEditState.value == 'add') {
    let params = {
      tittle: productData.value.tittle,
      editor: productData.value.editor,
      createtime: formatDate(productData.value.createtime),
      content: productData.value.content
    }
    let result = await addKnowledgeService(params)
    getProductList(1)
    topicEditState.value = 'edit'
    isCanEdit.value = true
    ElMessage.success('新增成功')
  } else {
    let params = {
      id: productData.value.id,
      tittle: productData.value.tittle,
      editor: productData.value.editor,
      createtime: formatDate(productData.value.createtime),
      content: productData.value.content
    }
    let result = await updateKnowledgeService(params)
    getProductList(0, productData.value)
    // productData.value = {
    //   "id": '',
    //   "tittle": '',
    //   "editor": '',
    //   "createtime": '',
    //   "content": ''
    // }
    isCanEdit.value = true
    topicEditState.value = 'edit'
    ElMessage.success('更新成功')

  }
}


const handleDeleteBtn = async () => {
  if (selectRows1.value == null) {
    ElMessage.warning("请选择要删除的行")
  } else {
    const deleteRows = selectRows1.value
    // console.log(JSON.parse(JSON.stringify(selectRows))['_rawValue'])
    ElMessageBox.confirm(
      selectRows1.value.length > 1 ? '确认删除科普知识' + deleteRows[0].tittle + '，' + deleteRows[1].tittle + '...等共' + selectRows1.value.length + '行吗?' : '确认删除' + deleteRows[0].tittle + '?',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then((action, instance, done) => {
      if (action === 'confirm') {
        let rows1 = selectRows1.value; //checkedDetail为表格多选选中的数组
        rows1.forEach((rows1, index) => {
          productList.value.forEach((v, i) => {
            if (rows1.id === v.id) {
              productList.value.splice(i, 1);
              deleteKnowledge(rows1.id);
            }
          });
          getProductList()
        });
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        profuctTableRef.value.setCurrentRow(productList.value[0])
        clickProductRow(productList.value[0])
      }
    })
  }
}
const isUpdate = ref(false)

const getProductList = async (flag, row) => {
  try {
    let params = {
      pageNum: pageNumProduct.value,
      pageSize: pageSizeProduct.value
    }
    let result = await getKnowledgeService(params);
    console.log("result.data.items", result.data.items)
    //渲染视图
    totalproduct.value = result.data.total;
    productList.value = result.data.items;
    if (flag == 1) {//代表是新增
      nextTick(() => {
        let itemRow = {};
        let rowIndex = 0;
        profuctTableRef.value.setCurrentRow(productList.value[0])
      })
    } else if (flag == 0) {
      nextTick(() => {
        let itemRow = {};
        let rowIndex = 0;
        for (let ii = 0; ii < productList.value.length; ii++) {
          if (productList.value[ii].id == row.id) itemRow = productList.value[ii]
        }
        profuctTableRef.value.setCurrentRow(itemRow)
      })
    }
  } catch (error) {
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }
}
const initPage = async () => {
  await getProductList()
  nextTick(() => {
    profuctTableRef.value.setCurrentRow(productList.value[0])
    clickProductRow(productList.value[0])
  })
}
initPage()
const productRow = ref({})
const clickProductRow = async (row) => {
  productRow.value = row
  productData.value = cloneDeep(row)
  imageUrl.value = getImage1(row.id)

}

//搜索功能  模糊查询
const searchInput = ref('')
const searchfilterState = ref(false)

const onSizeChange1 = (size) => {
  pageSizeProduct.value = size
  if (isFilter.value == false) getProductList()
  else filterProductInfo()
}
const onCurrentChange1 = (num) => {
  pageNumProduct.value = num
  if (isFilter.value == false) getProductList()
  else filterProductInfo()
}

//当前页码发生变化，调用此函数


//给每行定义一个key 定义了这个才可以和页面数据的自动刷新实现一个合作
const getRowKey = (row) => {
  return row.id;
}
//删除行toolbar
const deleteProductInfo = async (rowData) => {
  try {
    let result = await deleteProductInfoService(rowData);
    getProductList(-1) //为避免异步导致更新不及时，直接在此更新
  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }
};

//删除行表格操作
const rowlineDeleteBtn1 = async (rowData) => {
  ElMessageBox.confirm(
    '确认删除科普知识' + rowData.tittle + '吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then((action, instance, done) => {
    if (action === 'confirm') {
      productList.value.forEach((v, i) => {
        if (rowData.id === v.id) {
          productList.value.splice(i, 1);

          deleteKnowledge(rowData.id);
        }
      });
      //getcategoryList()
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      profuctTableRef.value.setCurrentRow(productList.value[0])
      clickProductRow(productList.value[0])
    }

  })

}

import { reactive } from 'vue'

const getProvinceList = async () => {
  let result = await provinceListService()
  for (let i = 0; i < result.data.length; i++) {
    result.data[i].name = result.data[i].name.replace('市', '').replace('省', '').replace('自治区', '').replace('维吾尔', '').replace('壮族', '').replace('回族', '')
    result.data[i].label = result.data[i].name
    result.data[i].value = result.data[i].name
  }
  provinceList.value = result.data
}
getProvinceList() //首先调用
//关于弹窗



//定义点击选中行

//获取选中的单行数据
const setSelectRows1 = (selection) => {
  selectRows1.value = selection //注意 selection是所有的选中行，不是当前勾选的行
}
const setSelectRows = (selection) => {
  selectRows2.value = selection //注意 selection是所有的选中行，不是当前勾选的行
}


const editState = ref('')

const dialogForm = ref(null);
const tryeditRow = ref(null);


//编辑数据
const rowlineEditBtn1 = (row) => {
  dialogVisible.value = true
  topicEditState.value = 'edit'
  // copyuserList.value = cloneDeep(productList.value);
  // tryeditRow.value = cloneDeep(row)
  newTopic.value = row
  imageUrl.value = getImage(row.topicId)
}


</script>
