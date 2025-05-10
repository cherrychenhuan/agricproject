<template>
  <div>
    <div class="block text-center">
      <el-carousel height="150px">
        <el-carousel-item>
          <img style="width:100%;height:150px;" class="small justify-center" src="../../assets/广告1.jpg" />

          <!-- <h3 text="2xl">{{ item }}</h3> -->
        </el-carousel-item>
        <el-carousel-item>
          <img style="width:100%;height:150px;" class="small justify-center" src="../../assets/广告2.jpg" />

        </el-carousel-item>
        <el-carousel-item>
          <img style="width:100%;height:150px;" class="small justify-center" src="../../assets/广告3.jpg" />

        </el-carousel-item>
      </el-carousel>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="讨论&资讯" name="first">
        <div style="height:64vh;overflow:auto;">
          <div v-for="(item, index) in topicDataList"
            style="vertical-align:center;font-size:14px;font-weight:500;padding:10px; border-bottom:1px solid #e9e9eb; width:700px;">
            <el-row><el-avatar :size="20" :src="'http://localhost:8080/res/' + item.avatarurl" />&nbsp;<span>{{
              item.username != null ? item.username : '默认用户' }}</span><span
                style="margin-left:5px;font-size:12px;margin-top:2px;">{{ item.createTime }}</span></el-row>
            <el-row style="padding-top:10px;">
              <el-col :span="5">
                <img :src="getImage(item.topicId)" style="width:90%;height:117px;" />
              </el-col>
              <el-col :span="19">
                <div style="height:100px;line-height:20px;">
                  <p style="font-size:18px;font-weight:600;color:#009237;">{{ item.tittle }}</p>
                  <div class="xxbox"
                    style="text-overflow: ellipsis;overflow: hidden;margin-top:10px;height:60px;-webkit-line-clamp: 3;-webkit-box-orient: vertical;display: -webkit-box;">
                    {{ item.content }}
                  </div>
                </div>
                <div style="font-size:12px;">
                  <el-button type="warning" link size="small" @click="addCollect(item, index, 0)"><el-icon
                      v-if="item.collect == false">
                      <Star />
                    </el-icon><el-icon v-else>
                      <StarFilled />
                    </el-icon>收藏</el-button>
                  <el-button type="danger" link size="small"><el-icon>
                      <ChatDotSquare />
                    </el-icon>{{ item.commentlen }}</el-button>
                  <el-button type="primary" link size="small" @click="getDetailInfo(item)">查看详情</el-button>
                </div>

              </el-col>

            </el-row>
          </div>

        </div>
        <div style="position:absolute;top:50px;right:40px;">
          <el-button type="success" style="width:250px;" @click="postTopic"><el-icon>
              <Plus />
            </el-icon>我也发一发</el-button>
          <el-card style="max-width: 250px;padding:0;" shadow="never" class="companyCard">
            <template #header>
              <div class="card-header" style="height:25px;line-height:25px;">
                <span style="font-size:15px;">热门文章</span>
              </div>
            </template>
            <div style="margin-top:5px;font-size:12px;color:#73767a;font-weight:500;padding-bottom:5px;"
              v-for="(xitem, index) in hotTopicList">
              <el-link @click="getDetailInfo(xitem)">
                <div
                  style="text-align:center;color:white;margin-right:5px;margin-left:5px;background-color:#009237;width:20px;height:20px;line-height:20px;">
                  {{
                    index + 1
                  }}</div> {{
                    xitem.tittle }}
              </el-link>
            </div>
          </el-card>
        </div>
        <el-dialog :show-close="false" class="myDialog" :visible.sync="dialogVisible" align-center
          v-model="dialogVisible" width="50%">
          <!-- header部分 -->

          <template #header> <!-- vue3 这里不能使用slot  要用# -->
            <div style="padding-left:10px;" class="dialog-title-name"><el-icon
                style="position:relative;top:2.5px;margin-right:3px;">
                <InfoFilled />
              </el-icon><span style="vertical-align:top;">发布帖子</span></div>
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
                      :show-file-list="false" :http-request="uploadSectionFile" action="#" :multiple="false"
                      accept=".jpg,.png,.jpeg" :on-change="changeAvatar">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:100px;height:100px;" />
                      <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                      </el-icon>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
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
                    <el-input v-model="newTopic.content" :rows="10" type="textarea" placeholder="Please input" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogCloseBtn" size="default">取消</el-button>
              <el-button type="primary" @click="addTopic" size="default">发布</el-button>
            </span>
          </template>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="科普知识" name="second">
        <div style="height:64vh;overflow:auto;">
          <div v-for="(item, index) in knowledgeList"
            style="vertical-align:center;font-size:14px;font-weight:500;padding:10px; border-bottom:1px solid #e9e9eb; width:700px;">
            <el-row><el-avatar :size="20" />&nbsp;<span>{{ item.editor }}</span><span
                style="margin-left:5px;font-size:12px;margin-top:2px;">{{ formatDate(item.createtime) }}</span></el-row>
            <el-row style="padding-top:10px;">
              <el-col :span="5">
                <img :src="getImage1(item.id)" style="width:90%;height:117px;" />
              </el-col>
              <el-col :span="19">
                <div style="height:100px;line-height:20px;">
                  <p style="font-size:18px;font-weight:600;color:#009237;">{{ item.tittle }}</p>
                  <div class="xxbox"
                    style="text-overflow: ellipsis;overflow: hidden;margin-top:10px;height:60px;-webkit-line-clamp: 3;-webkit-box-orient: vertical;display: -webkit-box;">
                    {{ item.content }}
                  </div>
                </div>
                <div style="font-size:12px;">
                  <el-button type="warning" link size="small" @click="addCollect(item, index, 1)"><el-icon
                      v-if="item.collect == false">
                      <Star />
                    </el-icon><el-icon v-else>
                      <StarFilled />
                    </el-icon>收藏</el-button>
                  <el-button type="primary" link size="small" @click="getDetailInfo1(item)">查看详情</el-button>
                </div>
              </el-col>
            </el-row>
          </div>

        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import cloneDeep from 'lodash/cloneDeep'
import { ref, toRaw, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getTopicDataListService } from '@/api/company.js'
import { QuillEditor } from '@vueup/vue-quill'
import { deleteCollectService, addCollectService, getifCollectService, getCommentListService, addTopicService, uploadTopicImgService, getKnowledgeListService } from '@/api/company.js'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { UserInfoStore } from '@/stores/userInfo.js'
const userInfoStore = UserInfoStore();
const imageUrl = ref('')
const newTopic = ref({
  tittle: '',
  content: ''
})
const activeName = ref('first')
const topicDataList = ref([])
const knowledgeList = ref([])
const myQuillEditor = ref('')
const content = ref('')
const iscollect = ref(false)
const dialogVisible = ref(false)
const router = useRouter()
const route = useRoute()
const props = defineProps(['value'])
const hotTopicList = ref([])
const getCommentList = async (id) => {
  let result = await getCommentListService({ id: id })
  // commentList.value = result.data
  return result.data.length
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
//添加收藏
const addCollect = async (item, index, type) => {
  if (item.collect == false) {
    let result = await addCollectService({ userid: userInfoStore.info.userId, postid: item.topicId, type: type, collecttime: formatDate(new Date()) })

  }
  else {
    let result = await deleteCollectService({ userid: userInfoStore.info.userId, postid: item.topicId, type: type })

  }
  if (type == 0) topicDataList.value[index].collect = !topicDataList.value[index].collect
  else knowledgeList.value[index].collect = !knowledgeList.value[index].collect
}

const uploadSectionFile = async (params) => {
  //file就是当前添加的文件
  // console.log("xxxxxxxxxxxxxxxx", file)
  var fileObj = params.file;
  // fileList.value.append(fileObj)
  let fileArr = fileObj.name.split('.');


  // console.log("file",name)
  //把当前新增的ID加上
  // console.log("newid", newId.value)

  var id = topicDataList.value[0].topicId + 1
  let name = id + '.jpg';
  // console.log("cropForm.value.id", cropForm.value.id)
  let result = await uploadTopicImgService(fileObj, name);
  alert(1)
}
const addTopic = async () => {
  newTopic.value.creatorId = userInfoStore.info.userId
  newTopic.value.createTime = formatDate(new Date())
  let result = await addTopicService(newTopic.value)
  await getTopicData()
  dialogVisible.value = false
}
const getTopicData = async () => {
  let xhdata = []
  let result = await getTopicDataListService()
  for (let i = 0; i < result.data.length; i++) {
    result.data[i].commentlen = await getCommentList(result.data[i].topicId)
    let result1 = await getifCollectService({ userid: userInfoStore.info.userId, postid: result.data[i].topicId, type: 0 })
    if (result1.data.length == 0) result.data[i].collect = false
    else {
      result.data[i].collect = true
    }
  }
  xhdata = cloneDeep(result.data)
  topicDataList.value = cloneDeep(result.data)
  xhdata.sort(function (a, b) {
    return b.commentlen - a.commentlen; // 按照分数从高到低排序
  })
  hotTopicList.value = cloneDeep(xhdata.slice(0, 5))
}
const getKnowledgeList = async () => {
  let result = await getKnowledgeListService()

  for (let i = 0; i < result.data.length; i++) {

    let result1 = await getifCollectService({ userid: userInfoStore.info.userId, postid: result.data[i].id, type: 1 })
    if (result1.data.length == 0) result.data[i].collect = false
    else {
      result.data[i].collect = true
    }
  }
  knowledgeList.value = result.data

}

getKnowledgeList()
getTopicData()
const getImage = (id) => {
  return new URL('/src/assets/topic/' + id + '.jpg', import.meta.url).href
}
const getImage1 = (id) => {
  // new URL('/src/assets/knowledge/' + id + '.jpg', import.meta.url).href)
  return new URL('/src/assets/knowledge/' + id + '.png', import.meta.url).href
}
const postTopic = () => {
  dialogVisible.value = true
}
const getDetailInfo = (item) => {
  console.log("sd", item)
  item.flag = 0
  router.push({ path: '/commpany/detailinnfo', query: item, })
}
const getDetailInfo1 = (item) => {
  console.log("sd", item)
  item.flag = 1
  router.push({ path: '/commpany/detailinnfo', query: item })
}
const imgHandler = (state) => {
  if (state) {
    fileBtn.value.click()
  }
}
// 抛出更改内容，此处避免出错直接使用文档提供的getHTML方法
const setValue = () => {
  const text = toRaw(myQuillEditor.value).getHTML()
}
const handleUpload = (e) => {
  const files = Array.prototype.slice.call(e.target.files)
  // console.log(files, "files")
  if (!files) {
    return
  }
  const formdata = new FormData()
  formdata.append('file', files[0])
  backsite.uploadFile(formdata)  // 此处使用服务端提供上传接口
    .then(res => {
      if (res.data.url) {
        const quill = toRaw(myQuillEditor.value).getQuill()
        const length = quill.getSelection().index
        quill.insertEmbed(length, 'image', res.data.url)
        quill.setSelection(length + 1)
      }
    })
}

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
</script>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}

:deep(.ql-editor) {
  min-height: 180px;
}

:deep(.ql-formats) {
  height: 21px;
  line-height: 21px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.companyCard {
  .el-card__body {
    padding: 0;
  }
}
</style>
