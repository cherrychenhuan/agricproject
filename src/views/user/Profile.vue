<template>
  <div>
    <!-- 头像部分 -->
    <el-row>
      <el-col :span="3">
        <div class="block" style="border-radius:25px;">
          <el-avatar style="margin-left:10px;margin-top:10px;width: 100px; height: 100px" :zoom-rate="1.2"
            :max-scale="7" :min-scale="0.2" :initial-index="4" fit="cover" :src="avatarUrl" />
          <!-- <img :src="getImgURl()" style="margin-left:10px;margin-top:10px;width: 100px; height: 100px" /> -->
        </div>
      </el-col>
      <el-col :span="4">
        <div style="margin-top:15px;color:#529b2e;font-size:16px;font-weight:600;">{{ userInfo.username }}</div>
        <div style="margin-top:10px;color:#73767a;font-size:12px;font-weight:400;">注册时间:{{
          userInfo.registerTime.split('T')[0] }}</div>
        <el-upload ref="avatarupLoad" style="margin-top:15px;" :show-file-list="false" :before-upload="xbeforeUpload"
          action="#" :multiple="false" limit=1 :auto-upload="false" accept=".jpg,.png,.jpeg" :on-change="changeAvatar">
          <el-button type="success" size='small'>更改头像</el-button>

        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <div style="margin-top:5px;border:1px solid #EBEEF5;height:73.1vh;width:100%;">
        <div
          style="background-color:aliceblue;font-size:14px;height:30px;line-height:30px;padding-left:12px;font-weight:600;color:#606266;">
          基本信息</div>
        <div style="margin-top:15px;width:100%;">
          <el-form label-width="100px" v-model="userInfo">
            <el-row>
              <el-form-item label='用户昵称：'>
                <el-row style="width:600px;">
                  <el-col :span="12">
                    <span v-if="!baseEdit1">{{ userInfo.username }}</span>
                    <el-input v-else v-model="userInfo.username" /></el-col>
                  <el-col :span="12"><el-button-group style="margin-left:10px;" class="ml-4">
                      <el-button type="primary" :icon="Edit" round link @click="baseEdit1 = true">
                        编辑
                      </el-button>
                      <el-button type="danger" :icon="Check" round link @click="updateUserInfo">保存
                      </el-button>
                    </el-button-group></el-col>
                </el-row>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label='手机号：'>
                <el-row style="width:600px;">
                  <el-col :span="12">
                    <span v-if="!baseEdit2">{{ userInfo.phone }}</span>
                    <el-input v-else v-model="userInfo.phone" /></el-col>
                </el-row>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label='电子邮箱：'>
                <el-row style="width:600px;">
                  <el-col :span="12">
                    <span v-if="!baseEdit3">{{ userInfo.email }}</span>
                    <el-input v-else v-model="userInfo.email" /></el-col>
                  <el-col :span="12"><el-button-group style="margin-left:10px;" class="ml-4">
                      <el-button type="primary" :icon="Edit" round link @click="baseEdit3 = true">
                        编辑
                      </el-button>
                      <el-button type="danger" :icon="Check" round link @click="updateUserInfo">保存
                      </el-button>
                    </el-button-group></el-col>
                </el-row>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label='性别：'>
                <el-row style="width:600px;">
                  <el-col :span="12">
                    <span v-if="!baseEdit4">{{ userInfo.gender == 'Other' ? '保密' : "" }}{{ userInfo.gender == 'Female' ?
                      '女' : "" }}{{
                        userInfo.gender == 'Male' ? '男' : "" }}</span>
                    <el-select v-else v-model="userInfo.gender">
                      <el-option v-for="(item, index) in genderList" :key="item.id" :label="item.name"
                        :value="item.id" />
                    </el-select>
                  </el-col>
                  <el-col :span="12"><el-button-group style="margin-left:10px;" class="ml-4">
                      <el-button type="primary" :icon="Edit" round link @click="baseEdit4 = true">
                        编辑
                      </el-button>
                      <el-button type="danger" :icon="Check" round link @click="updateUserInfo">保存
                      </el-button>
                    </el-button-group></el-col>
                </el-row>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label='出生日期：'>
                <el-row style="width:600px;">
                  <el-col :span="12">
                    <span v-if="!baseEdit5">{{ userInfo.birthdate }}</span>
                    <el-date-picker v-else v-model="xbirthdate" style="height:25px;width:120px;" placeholder=""
                      :default-value="new Date(2002, 9, 1)" />
                  </el-col>
                  <el-col :span="12"><el-button-group style="margin-left:10px;" class="ml-4">
                      <el-button type="primary" :icon="Edit" round link @click="baseEdit5 = true">
                        编辑
                      </el-button>
                      <el-button type="danger" :icon="Check" round link @click="updateUserInfo">保存
                      </el-button>
                    </el-button-group></el-col>
                </el-row>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label='地区：'>
                <el-row style="width:600px;">
                  <el-col :span="12">
                    <span v-if="!baseEdit6">{{ userInfo.address ? userInfo.address : '无' }}</span>
                    <el-cascader v-else v-model="userInfo.address" :options="areaList" :props="props"
                      @change="handleChange" />
                  </el-col>
                  <el-col :span="12"><el-button-group style="margin-left:10px;" class="ml-4">
                      <el-button type="primary" :icon="Edit" round link @click="baseEdit6 = true">
                        编辑
                      </el-button>
                      <el-button type="danger" :icon="Check" round link @click="updateUserInfo">保存
                      </el-button>
                    </el-button-group></el-col>
                </el-row>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label='个人简介：'>
                <el-row style="width:600px;">
                  <el-col :span="12">
                    <div v-if="!baseEdit7" style="">
                      {{ userInfo.selfintroduction ? userInfo.selfintroduction : '无' }}</div>
                    <el-input v-else v-model="userInfo.selfintroduction" :autosize="{ minRows: 2, maxRows: 4 }"
                      type="textarea" />
                  </el-col>
                  <el-col :span="12"><el-button-group style="margin-left:10px;" class="ml-4">
                      <el-button type="primary" :icon="Edit" round link @click="baseEdit7 = true">
                        编辑
                      </el-button>
                      <el-button type="danger" :icon="Check" round link @click="updateUserInfo">保存
                      </el-button>
                    </el-button-group></el-col>
                </el-row>

              </el-form-item>
            </el-row>

          </el-form>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getLocationService, provinceListService, areaListService } from '@/api/area.js'
import { Filter, Check, Edit, Delete, Plus, Upload, Search } from '@element-plus/icons-vue'
import { UserInfoStore } from '@/stores/userInfo.js'
import { ElMessage, genFileId, ElMessageBox } from 'element-plus'
import cloneDeep from 'lodash/cloneDeep'
import axios from 'axios';
const xbirthdate = ref('')
import { getAvatarService, uploadAvatarService, updateUserInfoService, userInfoService } from '@/api/user.js'
const genderList = [
  { id: 'Female', name: '女' },
  { id: 'Male', name: '男' },
  { id: 'Other', name: '保密' }
]
// const props = {
//   expandTrigger: 'hover',
// }
const formatDate = (dataString) => {
  //dataString是整数，否则要parseInt转换
  var time = new Date(dataString);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
}
const avatarupLoad = ref(null)
const avatarUrl = ref('')
const rawName = ref('')
const baseEdit1 = ref(false)
const areaList = ref([])
const baseEdit2 = ref(false)
const baseEdit3 = ref(false)
const baseEdit4 = ref(false)
const baseEdit5 = ref(false)
const baseEdit6 = ref(false)
const baseEdit7 = ref(false)
const userInfo = ref({
  userId: "",
  username: "",
  password: "",
  email: null,
  phone: "",
  registerTime: "",
  gender: null,
  birthdate: '',
  userType: "管理员",
  selfintroduction: null,
  address: null,
  avatarurl: 'xxx'
})
const userInfoStore = UserInfoStore();
// console.log("vvvvvvvvv",userInfoStore.info)
//获取图片
const getImgURl = async (name) => {

  let src = 'http://localhost:8080/user/avatars/' + name
  return src
}
// getImgURl()
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
const props = {
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
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const arrayBufferToBase64 = (buffer) => {
  var binary = ''
  var bytes = new Uint8Array(buffer)
  var len = bytes.byteLength
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}
const getUserInfo = async () => {
  let result = await userInfoService(userInfoStore.info.userId)
  userInfo.value = result.data
  rawName.value = userInfo.value.avatarurl
  // // 生成随机数
  console.log(rawName.value)
  avatarUrl.value = 'http://localhost:8080/res/' + rawName.value + '?v=' + getRandomInt(1, 100).toString()
  userInfoStore.setInfo(cloneDeep(userInfo.value))
  userInfoStore.info.avatarurl = avatarUrl.value
}
getUserInfo()
const updateUserInfo = async () => {
  baseEdit1.value = false
  baseEdit2.value = false
  baseEdit3.value = false
  baseEdit4.value = false
  baseEdit5.value = false
  baseEdit6.value = false
  baseEdit7.value = false
  if (xbirthdate.value != '') userInfo.value.birthdate = formatDate(xbirthdate.value)
  if (userInfo.value.address != '' && userInfo.value.address != null) userInfo.value.address = userInfo.value.address[0] + userInfo.value.address[1]
  let result = await updateUserInfoService(userInfo.value, rawName.value)
  // let xurl = userInfoStore.info.avatarurl
  // let xxinfo
  // xxinfo = userInfo.value
  // xxinfo.avatarurl = xurl
  avatarupLoad.value.clearFiles()
  // userInfoStore.setInfo(xxinfo)
  // userInfoStore.info = xxinfo
  console.log("updateUserInfo", userInfoStore.info)
  ElMessage.success('保存成功')
}
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
const changeAvatar = async (uploadFile, uploadFiles) => {
  let formData1 = new FormData();
  formData1.append('file', uploadFile.raw);
  formData1.append('userid', userInfoStore.info.userId);
  // formData1.append('userid', userInfoStore.info.userId);
  //上传文件到后端

  let result1 = await uploadAvatarService(formData1)
  ElMessage.success('更改成功')
  avatarUrl.value = URL.createObjectURL(uploadFile.raw)
  rawName.value = result1.data

  userInfoStore.info.avatarurl = URL.createObjectURL(uploadFile.raw)
  await updateUserInfo()
  avatarupLoad.value.clearFiles()
  console.log("bbb", userInfoStore.info.avatarurl)
}
</script>
<style lang="scss"></style>
