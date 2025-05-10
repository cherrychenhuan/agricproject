<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div
          style="background-color:aliceblue;padding-left:10px;font-size:14px;height:30px;line-height:30px;font-weight:600;color:#009237;">
          <div style="float:left;"><el-text style="font-weight:600;color:#009237;"><el-icon>
                <Connection />
              </el-icon>讨论与资讯列表</el-text>
          </div>
          <div style="float:right;margin-right:5px;">
            <el-button size="small" type="primary" @click="addTopic">新增</el-button>
            <el-button size="small" type="danger" @click="handleDeleteBtn">删除</el-button>
          </div>
        </div>
        <el-table id="profuctTable" style="margin-top:0;height:76vh;" @select="setSelectRows1" :row-key="getRowKey"
          :key="isUpdate" ref="profuctTableRef" v-loading="loading" border stripe class="categorytableList"
          :data="productList" :row-style="{ height: 0 + 'px' }" highlight-current-row @row-dblclick="rowlineEditBtn"
          :header-cell-style="{ color: '#595959' }" @row-click="clickProductRow">
          <el-table-column type="selection" width="40" />
          <el-table-column align="center" fixed prop="topicId" label="编号" width="60" />
          <el-table-column align="center" prop="creatorId" label="用户ID" width="120" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="username" label="用户名" width="120" />
          <el-table-column align="center" prop="createTime" :show-overflow-tooltip="true" label="创建时间" width="120" />
          <el-table-column align="center" prop="tittle" :show-overflow-tooltip="true" label="标题" width="100" />
          <el-table-column align="center" prop="content" :show-overflow-tooltip="true" label="内容" width="120" />
          <el-table-column fixed="right" :show-overflow-tooltip="true" align="center" label="操作" width="90">
            <template #default="scope">
              <el-button @click="rowlineEditBtn1(scope.row)" size="small" type="round" :icon="Edit" circle />
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
            </el-icon>评论列表</el-text>
        </div>
        <el-table id="profuctTable" style="margin-top:0;height:35vh;" @select="setSelectRows" :row-key="getRowKey"
          :key="isUpdate" ref="commentTableRef" v-loading="loading" border stripe class="categorytableList"
          :data="commentList" :row-style="{ height: 0 + 'px' }" highlight-current-row @row-dblclick="rowlineEditBtn"
          :header-cell-style="{ color: '#595959' }" @row-click="clickCommentRow">
          <el-table-column type="selection" width="40" />
          <el-table-column align="center" prop="commentid" label="评论ID" width="70" />
          <el-table-column align="center" prop="topicid" label="文章ID" width="70" />
          <el-table-column align="center" prop="userid" label="用户ID" width="120" />
          <el-table-column align="center" :show-overflow-tooltip="true" prop="username" label="用户名" width="120" />
          <el-table-column align="center" prop="commenttime" :show-overflow-tooltip="true" label="评论时间" width="140" />

          <el-table-column align="center" prop="content" :show-overflow-tooltip="true" label="内容" width="120" />
          <el-table-column fixed="right" :show-overflow-tooltip="true" align="center" label="操作" width="90">
            <template #default="scope">
              <el-button @click="rowlineDeleteBtn2(scope.row)" size="small" type="round" :icon="Delete" circle />
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页条 -->
        <el-pagination class="xxxclass" v-model:current-page="pageNumComment" v-model:page-size="pageSizeComment"
          :page-sizes="[8, 10, 13, 14, 15, 16, 17, 20]" small layout="total, sizes, prev, pager, next, jumper"
          background="black" :total="totalcomment" @size-change="onSizeChange2" @current-change="onCurrentChange2"
          style="margin-left:5px;margin-top:5px; margin-right:10px;margin-bottom:5px; justify-content: flex-end" />
        <div
          style="background-color:aliceblue;padding-left:10px;font-size:14px;height:30px;line-height:30px;font-weight:600;color:#009237;border-bottom:1px solid #f4f4f5;">
          <el-text style="font-weight:600;color:#009237;"><el-icon>
              <ChatLineSquare />
            </el-icon>评论信息</el-text>
        </div>
        <el-form ref="productForm" :show-message="false" :rules="rules" class="dialog-form" @submit.native.prevent=""
          :model="commentData" label-width="90px" label-position="left" style="margin-top:10px;" :disabled="isCanEdit">
          <el-row>
            <el-col :span="12">
              <el-form-item label="评论ID:" style="margin-left:0;">
                <el-input disabled v-model="commentData.commentid" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文章ID:" style="margin-left:0;">
                <el-input disabled v-model="commentData.topicid" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户ID:" style="margin-left:0;">
                <el-input disabled v-model="commentData.userid" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户名:" style="margin-left:0;">
                <el-select :disabled="commentEditState == 'edit'" v-model="commentData.userid">
                  <el-option v-for="(item, index) in userList" :key="index" :value="item.userId"
                    :label="item.username" />
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="'评论时间:'">
                <el-date-picker format="YYYY-MM-DD HH:mm:ss" id="datePicker" type="datetime" placeholder="选择时间"
                  v-model="commentData.commenttime" />

              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="'内容:'">
                <el-input v-model="commentData.content" :autosize="{ minRows: 1, maxRows: 3 }" type="textarea"
                  placeholder="输入内容" />
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <div style="position:absolute;right:10px;bottom:10px;">
          <el-button size="small" type="primary" @click="addComment">新增</el-button>
          <el-button size="small" type="warning" @click="isCanEdit = false">编辑</el-button>
          <el-button size="small" type="danger" @click="saveComment">保存</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
  <el-dialog :show-close="false" class="myDialog" :visible.sync="dialogVisible" align-center v-model="dialogVisible"
    width="50%">
    <!-- header部分 -->

    <template #header> <!-- vue3 这里不能使用slot  要用# -->
      <div style="padding-left:10px;" class="dialog-title-name"><el-icon
          style="position:relative;top:2.5px;margin-right:3px;">
          <InfoFilled />
        </el-icon><span style="vertical-align:top;">新增帖子</span></div>
      <div style="padding-right:10px;"><el-icon @click="dialogCloseBtn">
          <Close />
        </el-icon></div>
    </template>
    <!-- 主体部分 -->
    <!-- 注意 为了实现表单验证，这个el-form里面的双向数据绑定不能用v-model,尽量后面都打冒号，否则容易出问题要用：model -->
    <div>
      <el-form label-width="100px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="首页图片">
              <el-upload class="avatar-uploader" style="width:100px;height:100px;display: block;"
                :show-file-list="false" :http-request="uploadSectionFile" action="#" :multiple="false" accept=".jpg"
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
          <el-col :span="10">
            <el-form-item label="发布用户">
              <el-select v-model="newTopic.creatorId">
                <el-option v-for="(item, index) in userList" :key="index" :value="item.userId" :label="item.username" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="发布时间">
              <el-date-picker v-model="newTopic.createTime" type="datetime" placeholder="选择时间"
                format="YYYY-MM-DD HH:mm:ss" date-format="MMM DD, YYYY" time-format="HH:mm" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row></el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="标题">
              <el-input v-model="newTopic.tittle" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="内容">
              <el-input v-model="newTopic.content" :rows="10" type="textarea" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogCloseBtn" size="default">取消</el-button>
        <el-button type="success" @click="saveTopic" size="default">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
//调用后台接口，完成调用
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { getCommentListService, addCommentService } from '@/api/company.js'
import { getTopicDataService } from '@/api/admin.js'
import { deleteCollectService, addCollectService, getifCollectService, getxCommentListService, addTopicService, uploadTopicImgService, getKnowledgeListService } from '@/api/company.js'

import { deleteCommentService, updateCommentService, deleteTopicService, filterProductInfoService, deleteProductInfoService, updateTopicService, addProductDataService, updateProductDataService, getNewProductService } from '@/api/admin.js'
import { getLocationService, provinceListService, areaListService } from '@/api/area.js'
import { Edit, Delete, Plus, Upload, Search } from '@element-plus/icons-vue'
import { UserInfoStore } from '@/stores/userInfo.js'
import { userListService, userAllDataService } from '@/api/admin.js'

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
const commentTime = ref('')
const isCanEdit = ref(true)
const userInfoStore = UserInfoStore();
//删除行toolbar
const deleteTopic = async (id) => {
  try {
    let result = await deleteTopicService({ topicid: id });
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
const totalcomment = ref(0)
const pageNumComment = ref(1)
const pageSizeComment = ref(14)
const productForm = ref('')
const productData = ref({
  "topicId": 20,
  "tittle": "新增一篇文章-陈欢",
  "creatorId": "15027219612",
  "username": "用户小欢欢",
  "avatarurl": "15027219612.jpeg",
  "createTime": "2024-04-21 14:44:00",
  "content": "新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢"
})
const editState1 = ref('edit')
const profuctTableRef = ref('')
const commentTableRef = ref('')
const provinceList = ref([])
const commentList = ref([
  {
    "commentid": 17,
    "userid": "19816893357",
    "username": "樱桃欢欢",
    "avatarurl": "19816893357.png",
    "topicid": 18,
    "content": "hhhh",
    "commenttime": "2024-04-19 23:09:14"
  }
])
const commentData = ref({
  "commentid": '',
  "userid": "",
  "username": "",
  "avatarurl": "",
  "topicid": '',
  "content": "",
  "commenttime": ""
})
const selectRows1 = ref()
const selectRows2 = ref()
const topicEditState = ref('edit')
const commentEditState = ref('edit')
const cropList = ref([])
const yearList = ref([])
const idtime1 = ref('')
const idtime2 = ref('')
const idtime3 = ref('')
const idtime4 = ref('')
//表格列表
const productList = ref([
  {
    "topicId": 20,
    "tittle": "新增一篇文章-陈欢",
    "creatorId": "15027219612",
    "username": "用户小欢欢",
    "avatarurl": "15027219612.jpeg",
    "createTime": "2024-04-21 14:44:00",
    "content": "新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢新增一篇文章-陈欢"
  }
])

const uploadSectionFile = async (params) => {
  //file就是当前添加的文件
  var fileObj = params.file;
  let fileArr = fileObj.name.split('.');
  //把当前新增的ID加上
  var id = productList.value[0].topicId + 1
  let name = id + '.jpg';
  let result = await uploadTopicImgService(fileObj, name);
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


const addTopic = () => {
  topicEditState.value = 'add'
  dialogVisible.value = true
}
const addComment = () => {
  commentEditState.value = 'add'
  isCanEdit.value = false
  commentData.value = {
    "commentid": '',
    "userid": "",
    "username": "",
    "avatarurl": "",
    "topicid": productRow.value.topicId,
    "content": "",
    "commenttime": ""
  }
  commentTime.value = ''
  if (commentList.value.length == 0) commentData.value.commentid = 1
  else commentData.value.commentid = commentList.value[0].commentid

}
const saveTopic = async () => {
  newTopic.value.createTime = formatDate(newTopic.value.createTime)
  if (topicEditState.value == 'add') {
    let result = await addTopicService(newTopic.value)
    getProductList(1)
    dialogVisible.value = false
    newTopic.value = {
      tittle: '',
      creatorId: '',
      createTime: '',
      content: ''
    }
    topicEditState.value = 'edit'
  } else {
    console.log("newtopic", newTopic.value)
    let result = await updateTopicService(newTopic.value)
    getProductList(0, newTopic.value)
    dialogVisible.value = false
    newTopic.value = {
      tittle: '',
      creatorId: '',
      createTime: '',
      content: ''
    }
    topicEditState.value = 'edit'

  }
}

const saveComment = async () => {
  commentData.value.commenttime = formatDate(commentData.value.commenttime)

  if (commentEditState.value == 'add') {
    let params = {
      userid: commentData.value.userid,
      topicid: productRow.value.topicId,
      content: commentData.value.content,
      commenttime: commentData.value.commenttime
    }
    console.log("ccomme", params)
    let result = await addCommentService(params)
    ElMessage.success('新增成功')

    topicEditState.value = 'edit'
    let result1 = await getxCommentListService({ id: productData.value.topicId, pageNum: pageNumComment.value, pageSize: pageSizeComment.value })
    commentList.value = result1.data.items
    totalcomment.value = result1.data.total
    isCanEdit.value = true
  } else {
    let params = {
      commentid: commentData.value.commentid,

      content: commentData.value.content,
      commenttime: commentData.value.commenttime
    }
    // console.log("newtopic", newTopic.value)
    let result = await updateCommentService(params)
    let result1 = await getxCommentListService({ id: productData.value.topicId, pageNum: pageNumComment.value, pageSize: pageSizeComment.value })
    commentList.value = result1.data.items
    let itemrow = {}
    for (let i = 0; i < commentList.value.length; i++) {
      if (commentList.value[i].commentid == params.commentid) itemrow = commentList.value[i]
    }
    commentTableRef.value.setCurrentRow(itemrow)
    isCanEdit.value = true
    topicEditState.value = 'edit'

  }
}
const handleDeleteBtn = async () => {
  if (selectRows1.value == null) {
    ElMessage.warning("请选择要删除的行")
  } else {
    const deleteRows = selectRows1.value
    // console.log(JSON.parse(JSON.stringify(selectRows))['_rawValue'])
    ElMessageBox.confirm(
      selectRows1.value.length > 1 ? '确认删除话题' + deleteRows[0].tittle + '，' + deleteRows[1].tittle + '...等共' + selectRows1.value.length + '行吗?' : '确认删除' + deleteRows[0].tittle + '?',
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
            if (rows1.topicId === v.topicId) {
              productList.value.splice(i, 1);
              deleteTopic(rows1.topicId);
            }
          });
          getProductList()
        });
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      }
    })
  }
}
const isUpdate = ref(false)
const filterProductInfo = async () => {
  isFilter.value = true
  let result1 = await filterProductInfoService(filterData1.value, pageNumProduct.value, pageSizeProduct.value)
  productList.value = result1.data.items
  totalproduct.value = result1.data.total
}
const clearFilterInfo = () => {
  pageNumProduct.value = 1
  filterData1.value = {
    cropname: '',
    xyear: '',
    province: ''
  }
  isFilter.value = false
  getProductList(1)
}

const getProductList = async (flag, row) => {
  try {
    let params = {
      pageNum: pageNumProduct.value,
      pageSize: pageSizeProduct.value
    }
    let result = await getTopicDataService(params);
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
          if (productList.value[ii].topicId == row.topicId) itemRow = productList.value[ii]
        }
        profuctTableRef.value.setCurrentRow(itemRow)
      })
    }
  } catch (error) {
    // console.log(result  )
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
  let result = await getxCommentListService({ id: row.topicId, pageNum: pageNumComment.value, pageSize: pageSizeComment.value })
  commentList.value = result.data.items
  totalcomment.value = result.data.total
  if (commentList.value.length > 0) {
    commentTableRef.value.setCurrentRow(commentList.value[0])
    clickCommentRow(commentList.value[0])
  } else {
    commentData.value = {
      "commentid": '',
      "userid": "",
      "username": "",
      "avatarurl": "",
      "topicid": '',
      "content": "",
      "commenttime": ""
    }
    commentTime.value = ''
  }

}
const clickCommentRow = async (row) => {
  commentData.value = cloneDeep(row)
  commentTime.value = commentData.value.commenttime
  // formatDate
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
const onSizeChange2 = async (size) => {
  pageSizeComment.value = size
  let result = await getxCommentListService({ id: productRow.value.topicId, pageNum: pageNumComment.value, pageSize: pageSizeComment.value })
  commentList.value = result.data.items
  totalcomment.value = result.data.total
}
const onCurrentChange2 = async (num) => {
  pageNumComment.value = num
  let result = await getxCommentListService({ id: productRow.value.topicId, pageNum: pageNumComment.value, pageSize: pageSizeComment.value })
  commentList.value = result.data.items
  totalcomment.value = result.data.total
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
const deleteComment = async (id) => {
  try {
    let result = await deleteCommentService({ commentid: id });
    let result1 = await getxCommentListService({ id: productData.value.topicId, pageNum: pageNumComment.value, pageSize: pageSizeComment.value })
    commentList.value = result1.data.items
    totalcomment.value = result1.data.total
  } catch (error) {
    // console.log(result  )
    console.error('捕获到错误：', error);
    // 在这里处理错误，例如重新抛出错误、显示错误消息等
  }
};
//删除行表格操作
const rowlineDeleteBtn1 = async (rowData) => {
  ElMessageBox.confirm(
    '确认删除话题' + rowData.tittle + '吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then((action, instance, done) => {
    if (action === 'confirm') {
      productList.value.forEach((v, i) => {
        if (rowData.topicId === v.topicId) {
          productList.value.splice(i, 1);

          deleteUser(rowData.topicId);
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
const rowlineDeleteBtn2 = async (rowData) => {
  ElMessageBox.confirm(
    '确认删除评论' + rowData.content + '吗?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then((action, instance, done) => {
    if (action === 'confirm') {
      commentList.value.forEach((v, i) => {
        if (rowData.commentid === v.commentid) {
          commentList.value.splice(i, 1);

          deleteComment(rowData.commentid);
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
