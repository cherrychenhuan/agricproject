<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight" style="padding-left:5px;margin-top:5px;">
      <el-breadcrumb-item :to="{ path: '/commpany' }">知识与讨论</el-breadcrumb-item>
      <el-breadcrumb-item>{{ flag == 0 ? '讨论与资讯' : '科普知识' }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ data.tittle }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="15">
        <div style="margin-top:20px;height:85vh;overflow:auto;">
          <div
            style="color:#009237;font-weight:600;font-size:25px;padding-left:10px;border-bottom:1px solid #dedfe0;height:60px;line-height:60px;">
            <p>{{ data.tittle }}</p>
          </div>
          <div style="color:#909399;font-size:12px;padding-left:5px;height:20px;line-height:20px;">
            发布时间：{{ data.createTime }}&nbsp;发布者：{{ data.username }}
          </div>

          <div
            style="color:#606266;font-size:14px;padding-left:20px;line-height:30px;white-space:pre-wrap;margin-top:30px;">
            <img :src="flag == 0 ? getImage(data.topicId) : getImage1(data.id)" style="width:100%;" /><br />
            {{ data.content }}

          </div>
          <div v-if="flag == 0"
            style="font-size:15px;color:#009237;line-height:30px;height:30px;margin-left:10px;margin-top:20px;border-bottom:2px solid #95d475;">
            <span>评论({{ commentList.length }})</span>

          </div>
          <div v-if="flag == 0" style="margin-top:10px;">
            <el-row>
              <el-col :span="2"> <el-avatar :size="26" style="margin-left:5px;"
                  :src="userInfoStore.info.avatarurl" /></el-col>
              <el-col :span="18"> <el-input v-model="commentText" :autosize="{ minRows: 1, maxRows: 3 }" type="textarea"
                  placeholder="发表一下你的看法吧" /></el-col>

            </el-row>
            <el-row>
              <el-col :span="18"></el-col>
              <el-col :span="2"><el-button @click="addComment" :disabled="commentText == ''"
                  style="margin-top:5px;margin-left:9px;" type="primary" size="small">发表</el-button></el-col></el-row>
          </div>
          <div v-if="flag == 0">
            <div v-for="item in commentList">
              <el-row>
                <el-col :span="2"> <el-avatar :size="35" style="margin-left:5px;"
                    :src="'http://localhost:8080/res/' + item.avatarurl" /></el-col>
                <el-col :span="18">
                  <span style="color:#009237;font-size:13px;">{{ item.username }}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2"></el-col>
                <el-col :span="18">
                  <div style="font-size:12px;margin-top:-10px;color:#303133;">{{ item.content }}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2"></el-col>
                <el-col :span="18">
                  <div
                    style="color:#909399;font-size:11px;margin-top:10px;padding-left:0px;height:15px;line-height:15px;">
                    发布于 {{ data.createTime }}
                  </div>
                  <el-divider style="margin-bottom:10px;margin-top:5px;" />
                </el-col>

              </el-row>

            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div style="padding:10px;padding-left:50px;margin-top:30px;">
          <img src="../../assets/广告1.jpg" style="width:90%;" />
          <img src="../../assets/广告2.jpg" style="width:90%;" />
          <img src="../../assets/广告3.jpg" style="width:90%;" />
        </div>

      </el-col>
    </el-row>

  </div>
</template>
<script setup>
import { UserInfoStore } from '@/stores/userInfo.js'
import { ref } from 'vue'
import { getCommentListService, addCommentService } from '@/api/company.js'
import { ArrowRight } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
const userInfoStore = UserInfoStore();
const commentText = ref('')
const commentList = ref([])
const router = useRouter()
const route = useRoute()
const data = ref({})
const flag = ref(0)
const getData = () => {
  data.value = route.query
  flag.value = route.query.flag
}
getData()
const getImage = (id) => {
  return new URL('/src/assets/topic/' + id + '.jpg', import.meta.url).href
}
const getImage1 = (id) => {
  // new URL('/src/assets/knowledge/' + id + '.jpg', import.meta.url).href)
  return new URL('/src/assets/knowledge/' + id + '.png', import.meta.url).href
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
//发表评论
const addComment = async () => {
  let params = {
    userid: userInfoStore.info.userId,
    topicid: data.value.topicId,
    content: commentText.value,
    commenttime: formatDate(new Date())
  }
  let result = await addCommentService(params)
  commentText.value = ''
  ElMessage.success('已发布')
  getCommentList()
}
//获取评论列表
const getCommentList = async () => {
  let result = await getCommentListService({ id: data.value.topicId })
  commentList.value = result.data
}
getCommentList()
</script>
