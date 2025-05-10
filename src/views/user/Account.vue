<template>
  <div>
    <!-- 头像部分 -->
    <el-row>
      <el-col :span="3">
        <div class="block" style="border-radius:25px;">
          <el-avatar style="margin-left:10px;margin-top:10px;width: 100px; height: 100px" :zoom-rate="1.2"
            :max-scale="7" :min-scale="0.2" :initial-index="4" fit="cover" :src="userInfoStore.info.avatarurl" />
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
          <el-button @click="sss = 0" link style="margin-top:-2px;">账号设置</el-button><span style="font-weight:500;">
            {{ sss == 1 ? '>重置密码' : ''
            }}{{ sss == 2 ? '>手机设置' : ''
            }}</span>
        </div>
        <div style="margin-top:15px;width:100%;" v-if="sss == 0">
          <el-form label-width="100px" v-model="userInfo">
            <el-row>
              <el-form-item label='账号密码：'>
                <el-row style="width:600px;">
                  <el-col :span="12"><span>**********</span></el-col>
                  <el-col :span="12"><el-button-group style="margin-left:10px;" class="ml-4">
                      <el-button style="font-family:'微软雅黑'" type="primary" link @click="sss = 1">
                        重置密码
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
                  <el-col :span="12"><el-button-group style="margin-left:10px;" class="ml-4">
                      <el-button style="font-family:'微软雅黑'" type="primary" link @click="sss = 2">
                        修改手机
                      </el-button>
                    </el-button-group></el-col>
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
                      <el-button style="font-family:'微软雅黑'" type="primary" link @click="sss = 3">
                        修改邮箱
                      </el-button>
                    </el-button-group></el-col>
                </el-row>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label='账号注销？'>
                <el-row style="width:600px;">
                  <el-col :span="12">
                  </el-col>
                  <el-col :span="12"><el-button-group style="margin-left:10px;" class="ml-4">
                      <el-button style="font-family:'微软雅黑'" type="primary" link @click="sss = 4">
                        立即注销
                      </el-button>
                    </el-button-group></el-col>
                </el-row>
              </el-form-item>
            </el-row>


          </el-form>
        </div>
        <div style="margin-top:15px;width:100%;padding-left:10px;" v-if="sss == 1">
          <el-form :rules="rules">
            <el-row>
              <el-col :span="8">
                <el-form-item prop="password" label='输入新密码：'>
                  <el-input type="password" v-model="resetPassword1" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item prop="repasswordr" label='确认新密码：'>
                  <el-input type="password" v-model="resetPassword2" />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button @click="resetPassword" type="success"
                  :disabled="resetPassword1 == '' || (resetPassword1 != resetPassword2)">确认</el-button>
              </el-col>
            </el-row>

          </el-form>
        </div>
        <div style="margin-top:15px;width:100%;padding-left:10px;" v-if="sss == 2">
          <el-row>
            <el-col :span="6"></el-col>
            <el-col :span="12">
              <div v-if="vvv == 0">
                <div
                  style="padding-left:8px;text-align:left;width:80%;color:#606266;height:30px;line-height:30px;font-size:13px;">
                  验证码将发送到手机{{ userInfo.phone.substring(0, 3) }}****{{ userInfo.phone.slice(-4) }}</div>
                <div
                  style="padding-left:8px;text-align:left;width:80%;color:#909399;height:30px;line-height:30px;font-size:13px;">
                  如果长时间未收到验证码，请检查是否将运营商拉黑</div>
                <el-form label-width="80px">
                  <el-row style="margin-top:15px;">
                    <el-form-item label='填写验证码'>
                      <el-input id="validatecodeInput" class="input-with-select" v-model="validateCode1"
                        @change="checkValidatecode" @input="checkValidatecode">
                        <template #append>

                          <el-link type="success" style="font-family:'微软雅黑';" :underline="false"
                            @click="postValidateKey" :disabled="timeover1">{{
        vbtext1 }}</el-link>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-row>
                  <el-row label=''>
                    <el-form-item>
                      <el-button :disabled="!isValidateOK1" type='success' @click="vvv = 1">下一步</el-button>
                    </el-form-item>
                  </el-row>

                </el-form>
              </div>
              <div v-if="vvv == 1">
                <el-row style="margin-top:15px;">
                  <el-form-item label='输入新手机'>
                    <el-input v-model="resetPhone" />

                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label='填写验证码'>
                    <el-input id="validatecodeInput" class="input-with-select" v-model="validateCode2"
                      @change="checkValidatecode" @input="checkValidatecode">
                      <template #append>

                        <el-link type="success" style="font-family:'微软雅黑';" :underline="false" @click="postValidateKey"
                          :disabled="timeover2">{{
        vbtext2 }}</el-link>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-row>
                <el-row label=''>
                  <el-form-item>
                    <el-button :disabled="!isValidateOK2" type='success' @click="vvv = 2">下一步</el-button>
                  </el-form-item>
                </el-row>
              </div>
              <div v-if="vvv == 2" style="text-align:center;">
                <el-result icon="success" title="成功设置/修改手机" :sub-title="'新手机号为' + resetPhone">
                  <template #extra>
                    <el-button type="danger"
                      @click="{ sss = 0; vvv = 0; isValidateOK2 = true; isValidateOK1 = true; resetPhone = ''; validateCode2 = '', validateCode1 = '' }">完成</el-button>
                  </template>
                </el-result>
              </div>
            </el-col>






            <el-col :span="6"></el-col>
          </el-row>
        </div>
        <div style="margin-top:15px;width:100%;padding-left:10px;" v-if="sss == 3">
          <el-row>
            <el-col :span="6"></el-col>
            <el-col :span="12">
              <div v-if="eee == 0">
                <div
                  style="padding-left:8px;text-align:left;width:80%;color:#606266;height:30px;line-height:30px;font-size:13px;">
                  验证码将发送到手机{{ userInfo.phone.substring(0, 3) }}****{{ userInfo.phone.slice(-4) }}</div>
                <div
                  style="padding-left:8px;text-align:left;width:80%;color:#909399;height:30px;line-height:30px;font-size:13px;">
                  如果长时间未收到验证码，请检查是否将运营商拉黑</div>
                <el-form label-width="80px">
                  <el-row style="margin-top:15px;">
                    <el-form-item label='填写验证码'>
                      <el-input id="validatecodeInput" class="input-with-select" v-model="validateCode3"
                        @change="checkValidatecode" @input="checkValidatecode">
                        <template #append>

                          <el-link type="success" style="font-family:'微软雅黑';" :underline="false"
                            @click="postValidateKey" :disabled="timeover3">{{
        vbtext3 }}</el-link>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-row>
                  <el-row label=''>
                    <el-form-item>
                      <el-button :disabled="!isValidateOK3" type='success' @click="eee = 1">下一步</el-button>
                    </el-form-item>
                  </el-row>

                </el-form>
              </div>
              <div v-if="eee == 1">
                <el-row style="margin-top:15px;">
                  <el-form-item label='输入新邮箱'>
                    <el-input v-model="resetEmail" />

                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label='填写验证码'>
                    <el-input id="validatecodeInput" class="input-with-select" v-model="validateCode2"
                      @change="checkValidatecode1" @input="checkValidatecode1">
                      <template #append>

                        <el-link type="success" style="font-family:'微软雅黑';" :underline="false" @click="postValidateKey1"
                          :disabled="timeover4">{{
        vbtext2 }}</el-link>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-row>
                <el-row label=''>
                  <el-form-item>
                    <el-button :disabled="!isValidateOK4" type='success' @click="eee = 2">下一步</el-button>
                  </el-form-item>
                </el-row>
              </div>
              <div v-if="eee == 2" style="text-align:center;">
                <el-result icon="success" title="成功设置/修改邮箱" :sub-title="'新邮箱为' + resetEmail">
                  <template #extra>
                    <el-button type="danger"
                      @click="{ sss = 0; eee = 0; isValidateOK4 = true; isValidateOK3 = true; resetEmail = ''; validateCode3 = '', validateCode4=''}">完成</el-button>
                  </template>
                </el-result>
              </div>
            </el-col>






            <el-col :span="6"></el-col>
          </el-row>
        </div>
        <div style="margin-top:15px;width:100%;padding-left:10px;" v-if="sss == 4">
          <el-row>
            <el-col :span="6"></el-col>
            <el-col :span="18">
              <div>
                <p style="font-weight:700;">账号注销则视为您主动放弃以下资产和权益，且同意以下规则：</p>
                <div style="line-height:40px;margin-top:10px;">
                  1.账号注销后，您将无法登录、使用账号，且不支持找回任何个人资料。<br />
                  2.该账号将解除与其他产品的绑定或授权关系，且不支持找回。<br />
                  4.将不再支持使用已注销账号的用户ID注册新的账号。<br />
                  5.注销账号并不代表您注销前的账号行为和相关责任得到豁免或减轻。
                </div>

                <el-button style="margin-left:150px;margin-top:20px;" type='danger' round @click="deleteUser">已知悉,确认注销账号
                </el-button>

              </div>
            </el-col>

          </el-row>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { useRouter, useRoute } from 'vue-router';
import { getLocationService, provinceListService, areaListService } from '@/api/area.js'
import { Filter, Check, Edit, Delete, Plus, Upload, Search } from '@element-plus/icons-vue'
import { UserInfoStore } from '@/stores/userInfo.js'
import { ElMessage, genFileId, ElMessageBox } from 'element-plus'
import { uploadAvatarService, updateUserInfoService, deleteUserService, userResetPwdService, checkValidatecodeService, postValidatecodeService, userInfoService } from '@/api/user.js'
const router = useRouter();
const avatarUrl = ref('')
const avatarupLoad = ref(null)
const vvv = ref(0)
const eee = ref(0)
const timeover1 = ref(false)
const timeover2 = ref(false)
const timeover3 = ref(false)
const resetPhone = ref('')
const validateCode1 = ref('')
const validateCode2 = ref('')
const validateCode3 = ref('')
const isValidateOK1 = ref(false)
const isValidateOK2 = ref(false)
const isValidateOK3 = ref(true)
const isValidateOK4 = ref(true)
const vbtext1 = ref('获取验证码')
const vbtext2 = ref('获取验证码')
const vbtext3 = ref('获取验证码')
const route = useRoute();
const genderList = [
  { id: 'Female', name: '女' },
  { id: 'Male', name: '男' },
  { id: 'Other', name: '保密' }
]
const resetPassword1 = ref('')
const resetPassword2 = ref('')
// const props = {
//   expandTrigger: 'hover',
// }
const sss = ref(0)
const baseEdit1 = ref(false)
const areaList = ref([])
const rawName = ref('')
const baseEdit2 = ref(false)
const baseEdit3 = ref(false)
const baseEdit4 = ref(false)
const baseEdit5 = ref(false)
const baseEdit6 = ref(false)
const baseEdit7 = ref(false)
const userInfo = ref({
  "userId": "",
  "username": "",
  "password": "",
  "email": null,
  "phone": "",
  "registerTime": "",
  "gender": null,
  "age": 0,
  "userType": "",
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
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getUserInfo = async () => {
  let result = await userInfoService(userInfoStore.info.userId)
  userInfo.value = result.data
  rawName.value = userInfo.value.avatarurl
  // // 生成随机数
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
//验证验证码
const checkValidatecode = async () => {
  let len
  let phone
  let vcode
  if (sss.value == 2 && vvv.value == 1) {
    len = validateCode2.value.length
    phone = resetPhone.value
    vcode = validateCode2.value

  }
  else if (sss.value == 2 && vvv.value == 0) {
    len = validateCode1.value.length
    phone = userInfo.value.phone
    vcode = validateCode1.value
  }
  else if (sss.value == 3 && eee.value == 0) {
    len = validateCode3.value.length
    phone = userInfo.value.phone
    vcode = validateCode3.value
  }


  if (len >= 5) {
    let result = await checkValidatecodeService(phone, vcode)
    if (result.data == '验证失败') ElMessage.error('验证失败')
    else {
      // callback()
      ElMessage.success('验证通过')
      // alert(vvv)
      if (sss == 3 && eee.value == 0) isValidateOK3.value = true
      else if (sss == 2) {
        if (vvv.value == 0) isValidateOK1.value = true
        if (vvv.value == 1) {
          isValidateOK2.value = true
          userInfo.value.phone = resetPhone.value
          updateUserInfo()
        }
      }

    }
  }
}
const checkPassword = (rule, value, callback) => {
  value = resetPassword1.value
  // value = loginData.value.password
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
const postValidateKey = async () => {
  try {
    let phone
    if (sss.value == 2 && vvv.value == 0) phone = userInfo.value.phone
    else if (sss.value == 2 && vvv.value == 1) phone = resetPhone.value
    else if (sss.value == 3 && eee.value == 0) phone = userInfo.value.phone
    let result = await postValidatecodeService(phone)
    let n1 = 60;
    let n2 = 60;
    let n3 = 60;
    if (sss.value == 2 && vvv.value == 0) {
      vbtext1.value = n1 + "秒后重新获取";
      const timer = setInterval(() => {
        if (n1 === 0) {
          clearInterval(timer);
          timeover1.value = false
          vbtext1.value = "获取验证码";
        } else {
          n1--;
          timeover1.value = true
          vbtext1.value = n1 + "秒后重新获取";
        }
      }, 1000);
    }
    else if (sss.value == 2 && vvv.value == 1) {
      vbtext2.value = n2 + "秒后重新获取";
      const timer = setInterval(() => {
        if (n2 === 0) {
          clearInterval(timer);
          timeover2.value = false
          vbtext2.value = "获取验证码";
        } else {
          n2--;
          timeover2.value = true
          vbtext2.value = n2 + "秒后重新获取";
        }
      }, 1000);
      ElMessage.success('已发送')
    } else if (sss.value == 3 && eee.value == 0) {
      vbtext3.value = n3 + "秒后重新获取";
      const timer = setInterval(() => {
        if (n2 === 0) {
          clearInterval(timer);
          timeover3.value = false
          vbtext3.value = "获取验证码";
        } else {
          n3--;
          timeover3.value = true
          vbtext3.value = n3 + "秒后重新获取";
        }
      }, 1000);
      ElMessage.success('已发送')
    }
  }
  catch {
    ElMessage.success('发送失败')
  }
}
const resetPassword = async () => {
  let result = await userResetPwdService(userInfo.value.phone, resetPassword1.value)
  ElMessage.success('更改成功')
  userInfo.value.password = resetPassword1.value

  // let params={userId:userInfo.value.phone,password:resetPassword1.value}
  userInfoStore.setInfo(userInfo.value)
  router.push({ path: '/login' })
}
//2.checkRepassword 注册时候二次输入密码
//定义再次输入密码的时候的函数
const checkRepassword1 = (rule, value, callback) => {
  value = resetPassword2.value
  if (value === '') {
    callback(new Error('请重新输入密码'))
  } else if (value.toString() != resetPassword1.value) {
    callback(new Error("两次密码输入不一致！"))
  } else {
    callback()
  }
}
//2.checkRepassword 重置时候二次输入密码
//定义再次输入密码的时候的函数
const checkRepassword2 = (rule, value, callback) => {
  value = resetData.value.repassword
  if (value === '') {
    callback(new Error('请重新输入密码'))
  } else if (value.toString() != resetData.value.password) {
    callback(new Error("两次密码输入不一致！"))
  } else {
    isresetP.value = false
    callback()
  }
}
const rules = {

  repasswordr: [{ validator: checkRepassword1, trigger: ['blur', 'change'] } //注册的时候二次输入密码
  ],
  repasswordreset: [{ validator: checkRepassword2, trigger: ['blur', 'change'] } //重置的时候二次输入密码
  ],
  password: [
    { validator: checkPassword, trigger: ['blur', 'change'] }
  ]
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
const deleteUser = async () => {
  ElMessageBox.confirm(
    '是否确认注销?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async (action, instance, done) => {
    if (action === 'confirm') {
      //
      let result = await deleteUserService({ userid: userInfo.value.userId })
      router.push({ path: '/login' })
      ElMessage.warning('账号已注销')
    }

  })
  // let re
}
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
