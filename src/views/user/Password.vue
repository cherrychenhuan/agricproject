<template>
  <div>
    <!-- 头像部分 -->
    <el-row>
      <el-col :span="3">
        <div class="block" style="border-radius:25px;">
          <el-avatar style="margin-left:10px;margin-top:10px;width: 100px; height: 100px" :src="getImg('default')"
            :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :initial-index="4" fit="cover" />
        </div>
      </el-col>
      <el-col :span="4">
        <div style="margin-top:35px;color:#529b2e;font-size:16px;font-weight:600;">{{ userInfo.username }}</div>
        <div style="margin-top:10px;color:#73767a;font-size:12px;font-weight:400;">注册时间:{{
        userInfo.registerTime.split('T')[0] }}</div>
      </el-col>
    </el-row>
    <el-row>
      <div style="margin-top:5px;border:1px solid #EBEEF5;height:73.1vh;width:100%;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/user/account' }">账号设置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user/account' }"></el-breadcrumb-item>
        </el-breadcrumb>
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
import { updateUserInfoService, userInfoService } from '@/api/user.js'
const genderList = [
  { id: 'Female', name: '女' },
  { id: 'Male', name: '男' },
  { id: 'Other', name: '保密' }
]
// const props = {
//   expandTrigger: 'hover',
// }

const baseEdit1 = ref(false)
const areaList = ref([])
const baseEdit2 = ref(false)
const baseEdit3 = ref(false)
const baseEdit4 = ref(false)
const baseEdit5 = ref(false)
const baseEdit6 = ref(false)
const baseEdit7 = ref(false)
const userInfo = ref({
  "userId": "19816893357",
  "username": "樱桃小丸子",
  "password": "814444127604540e1fba1e28ea85b181",
  "email": null,
  "phone": "19816893357",
  "registerTime": "2024-01-16T06:13:08.000+00:00",
  "gender": null,
  "age": 0,
  "userType": "管理员",
  "selfintroduction": null,
  "address": null
})
const userInfoStore = UserInfoStore();
//获取图片
const getImg = (name) => {
  const path = `/src/assets/${name}.png`
  let src = new URL(path, import.meta.url).href
  return src
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
const getUserInfo = async () => {
  console.log(userInfoStore.info.userid)
  let result = await userInfoService(userInfoStore.info.userid)
  userInfo.value = result.data
  console.log(result.data)
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
  userInfo.value.address = userInfo.value.address[0] + userInfo.value.address[1]
  // console.log("userInfo", userInfo.value)
  //存到数据库
  let result = await updateUserInfoService(userInfo.value)
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
</script>
<style lang="scss"></style>
