<script setup>
import { User, Lock, Iphone, Key } from '@element-plus/icons-vue'
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { userResetPwdService, postValidatecodeService, checkValidatecodeService } from '@/api/user.js'
import { toRaw } from '@vue/reactivity'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import { useTokenStore } from '@/stores/token.js'
import { UserInfoStore } from '@/stores/userInfo.js'
const isLoginOK = ref(true)
const isRegisterOK = ref(true)
const resetP = ref(false)
const resetRP = ref(false)
const tokenStore = useTokenStore();
const userInfoStore = UserInfoStore()
// console.log("xxxxxxx",route.query)
const loginForm = ref(null)
const isresetP = ref(true)
const resetForm = ref(null)
const isResetOK = ref(true)
//控制注册与登录表单的显示， 默认显示登录
const isRegister = ref('login')
const loginuInput = ref(null)
const loginpInput = ref(null)
const isValidateOK = ref(false)
const rightValidateCode = ref('12345')
//定义数据模型
const registerData = ref({
  userId: '',
  repassword: '',
  password: ''
}
)
const loginData = ref()

if (userInfoStore.info) loginData.value = userInfoStore.info
else loginData.value = {
  userId: '',
  repassword: '',
  password: ''
}
// if (userInfoStore.info.userid != '') isLoginOK.value = false
//验证密码是否合法
//1.checkPassword 密码
const checkPassword = (rule, value, callback) => {
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
//2.checkRepassword 注册时候二次输入密码
//定义再次输入密码的时候的函数
const checkRepassword1 = (rule, value, callback) => {
  value = registerData.value.repassword
  if (value === '') {
    callback(new Error('请重新输入密码'))
  } else if (value.toString() != registerData.value.password) {
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

//验证登录手机号是否合法
const checkPhone1 = (rule, value, callback) => {
  value = loginData.value.userId
  const regex = /^1[3456789]\d{9}$/
  if (!regex.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {

    callback()
  }
}
//验证注册手机号是否合法
const checkPhone2 = (rule, value, callback) => {
  value = registerData.value.userId
  const regex = /^1[3456789]\d{9}$/
  if (!regex.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}
//验证验证码手机号是否合法
const checkPhone3 = (rule, value, callback) => {
  value = resetData.value.phone
  const regex = /^1[3456789]\d{9}$/
  if (!regex.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}
const checkValidatecode = async (rule, value, callback) => {
  let len = resetData.value.validatecode.length
  if (len >= 5) {
    let result = await checkValidatecodeService(resetData.value.phone, resetData.value.validatecode)
    if (result.data == '验证失败') callback(new Error('验证失败'))
    else {
      callback()
      ElMessage.success('验证通过')
      isValidateOK.value = true
    }
  }
}
//定义表单校验规则
const rules = {
  phone2: [
    { required: true, validator: checkPhone2, trigger: 'blur' }
  ],
  phone3: [
    { required: true, validator: checkPhone3, trigger: 'blur' }
  ],
  userid: [
    { required: true, validator: checkPhone1, trigger: 'blur' }
  ],
  repasswordr: [{ validator: checkRepassword1, trigger: 'blur' } //注册的时候二次输入密码
  ],
  repasswordreset: [{ validator: checkRepassword2, trigger: 'blur' } //重置的时候二次输入密码
  ],
  password: [
    { validator: checkPassword, trigger: 'blur' }
  ],
  // validatephone: [
  //   { required: true, validator: checkPhonev, trigger: 'blur' }
  // ],
  validatecode: [
    { required: true, validator: checkValidatecode, trigger: 'blur' }
  ]
  // resetrepassword: [{ validator: checkrRepassword, trigger: 'blur' }
  // ],
  // resetpassword: [
  //   { validator: checkrPassword, trigger: 'blur' }
  // ]
}
import { getAvatarService, uploadAvatarService, updateUserInfoService, userInfoService } from '@/api/user.js'
import { userRegisterService, userLoginService } from "@/api/user.js"
// import {useRouter} from 'vue-router'
// const router = useRouter()
//调用后台接口，完成调用
const register = async () => {
  try {
    // alert(1)
    console.log("ccc", registerData.value)
    let result = await userRegisterService(registerData.value)
    console.log(result.data)
    ElMessage.success('注册成功')
    //把得到的token存储到pinia中
    tokenStore.setToken(result.data)
    //跳转到登录
    isRegister.value = 'login'
    loginData.value = {
      userId: registerData.value.userId,
      password: registerData.value.password
    }
    isLoginOK.value = false
  }
  catch (error) {
    if (error.code === 1) {
      if (error.message === '手机号已注册') {
        ElMessage.error('手机号已注册');
        nextTick(() => {
          let elInputComponent = document.querySelector('#registeruInput');
          elInputComponent.focus();
          if (elInputComponent) {
            elInputComponent.focus();
          }
        })
      }
      else {
        // 如果没有 code 属性，认为是服务异常
        ElMessage.error('服务异常');
      }
    }
  }
}
//绑定数据,复用注册表单的数据模型
//表单数据校验
//登录函数

const registerForm = ref(null)

const login = async () => {
  //调用接口,完成登录
  try {
    let result = await userLoginService(loginData.value);
    tokenStore.setToken(result.data)
    ElMessage.success('登录成功')
    // userInfoStore.info = loginData.value
    userInfoStore.setInfo(loginData.value)
    console.log('登录信息', result.data)
    //把得到的token存储到pinia中
    let result1 = await userInfoService(userInfoStore.info.userId)
    let udata = result1.data
    if (udata.userType == '管理员') {
      router.push({
        path: '/admin',
        state: {
          userid: loginData.value.userId
        }
      })
    } else {
      router.push({
        path: '/home',
        state: {
          userid: loginData.value.userId
        }
      })
    }

    isLoginOK.value = true

  }
  catch (error) {
    console.log(error)
    if (error.code === 1) {
      if (error.message === '密码错误') {
        ElMessage.error('密码错误');
        nextTick(() => {
          let elInputComponent = document.querySelector('#loginpInput');
          console.log("elInputComponent", elInputComponent)
          elInputComponent.focus();
          if (elInputComponent) {
            elInputComponent.focus();
          }
        })
      }
      else if (error.message === '账户不存在') {
        ElMessage.error('账户不存在');
        nextTick(() => {
          let elInputComponent = document.querySelector('#loginuInput');
          console.log("elInputComponent", elInputComponent)
          elInputComponent.focus();
          if (elInputComponent) {
            elInputComponent.focus();
          }
        })
      }
    } else {
      // 如果没有 code 属性，认为是服务异常
      ElMessage.error('服务异常');
    }


  }

}
//
const loginU = ref(false)
const loginP = ref(false)
const registerU = ref(false)
const registerP = ref(false)
const registerRP = ref(false)
const logininputuChange = (e) => {
  loginForm.value.validateField('userid', (valid) => {
    if (valid) {
      loginU.value = true
    } else {
      loginU.value = false
    }
    if (loginU.value && loginP.value) isLoginOK.value = false
    else isLoginOK.value = true

  })
}
const logininputpChange = (e) => {
  loginForm.value.validateField('password', (valid) => {
    if (valid) {
      loginP.value = true
    } else {
      loginP.value = false
    }
    if (loginU.value && loginP.value) isLoginOK.value = false
    else isLoginOK.value = true
  })
}
const registerinputuChange = (e) => {
  registerForm.value.validateField('userid', (valid) => {
    if (valid) {
      registerU.value = true
    } else {
      registerU.value = false
    }
    if (registerU.value && registerP.value && registerRP.value) isRegisterOK.value = false
    else isRegisterOK.value = true
  })
}
const registerinputpChange = (e) => {
  registerForm.value.validateField('password', (valid) => {
    if (valid) {
      registerP.value = true
    } else {
      registerP.value = false
    }
    if (registerU.value && registerP.value && registerRP.value) isRegisterOK.value = false
    else isRegisterOK.value = true
  })
}
const registerinputrpChange = (e) => {
  registerForm.value.validateField('repassword', (valid) => {
    if (valid) {
      registerRP.value = true
    } else {
      registerRP.value = false
    }
    if (registerU.value && registerP.value && registerRP.value) isRegisterOK.value = false
    else isRegisterOK.value = true
  })
}
const logininputFocus = (e) => {
  e.currentTarget.select()
}
const registerinputFocus = (e) => {
  e.currentTarget.select()
}
//密码重置
const resetData = ref({
  phone: '',
  validatecode: '',
  password: '',
  repassword: ''
})
const vbtext = ref("获取验证码");
const isReset = ref(false)
const ForgetPassword = () => {
  isReset.value = true
  isRegister.value = '-'
  resetData.value.phone = loginData.value.userId
}
//获取验证码yyyyy
const postValidateKey = async () => {
  try {
    let result = await postValidatecodeService(resetData.value.phone)
    let n = 60;
    vbtext.value = n + "秒后重新获取";
    const timer = setInterval(() => {
      if (n === 0) {
        clearInterval(timer);
        vbtext.value = "获取验证码";
      } else {
        n--;
        vbtext.value = n + "秒后重新获取";
      }
    }, 1000);
    ElMessage.success('已发送')
  }
  catch {
    ElMessage.success('发送失败')
  }
}
const validatecodeChange = () => {
  resetForm.value.validateField('validatecode', (valid) => {
    // if (valid) {
    //   registerRP.value = true
    // } else {
    //   registerRP.value = false
    // }
    // if (registerU.value && registerP.value && registerRP.value) isRegisterOK.value = false
    // else isRegisterOK.value = true
  })
}

const submitResetData = async () => {
  // console.log()
  try {
    let result = await userResetPwdService(resetData.value.phone, resetData.value.password)
    ElMessage.success('重置成功')
    isReset.value = false
    isRegister.value = 'login'
    loginData.value.userId = resetData.value.phone
    loginData.value.password = resetData.value.password
    isLoginOK.value = false
  } catch {
    ElMessage.error('重置失败')
  }


}


</script>

<template>
  <div class="login-body">
    <div class="login-page">
      <el-row>
        <el-col :span="6" :offset="9" class="form">
          <!-- 注册表单 -->
          <div class="login-box">
            <el-form ref="registerForm" size="large" autocomplete="off" v-if="isRegister == 'register'"
              :model="registerData" :rules="rules">
              <el-form-item>
                <h1>农作物智能推荐系统</h1>
              </el-form-item>
              <el-form-item prop="phone2">
                <el-input id="registeruInput" @focus="registerinputFocus" @blur="registerinputuChange"
                  @change="registerinputpChange" @input="registerinputuChange" :prefix-icon="User"
                  placeholder="请输入手机号或邮箱" v-model="registerData.userId" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input id="registerpInput" @focus="registerinputFocus" @blur="registerinputpChange"
                  @change="registerinputpChange" @input="registerinputpChange" :prefix-icon="Lock" type="password"
                  v-model="registerData.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item prop="repasswordr">
                <el-input id="registerpInput" @focus="registerinputFocus" @blur="registerinputrpChange"
                  @change="registerinputrpChange" @input="registerinputrpChange" :prefix-icon="Lock" type="password"
                  placeholder="请再次输入密码" v-model="registerData.repassword"></el-input>
              </el-form-item>
              <!-- 注册按钮 -->
              <el-form-item>
                <el-button :disabled="isRegisterOK" class="button" type="primary" auto-insert-space @click="register">
                  注册
                </el-button>
              </el-form-item>
              <el-form-item class="flex">
                <el-link type="info" :underline="false" @click="isRegister = 'login'">
                  返回
                </el-link>
              </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="loginForm" size="large" autocomplete="off" :model="loginData" :rules="rules"
              v-if="isRegister == 'login'">
              <el-form-item>
                <h1>农作物智能推荐平台</h1>
              </el-form-item>
              <el-form-item prop="userid">
                <el-input v-focus id="loginuInput" @focus="logininputFocus" @blur="logininputuChange"
                  @change="logininputuChange" @input="logininputuChange" :prefix-icon="User" placeholder="请输入手机号或邮箱"
                  v-model="loginData.userId"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input id="loginpInput" @focus="logininputFocus" @blur="logininputpChange"
                  @change="logininputpChange" @input="logininputpChange" name="password" :prefix-icon="Lock"
                  type="password" placeholder="请输入密码" v-model="loginData.password"></el-input>
              </el-form-item>
              <el-form-item class="flex">
                <div class="flex">
                  <el-checkbox>记住我</el-checkbox>
                  <el-link type="primary" :underline="false" @click="ForgetPassword">
                    忘记密码？</el-link>
                </div>
              </el-form-item>
              <!-- 登录按钮 -->
              <el-form-item>
                <el-button :disabled="isLoginOK" class="button" type="primary" auto-insert-space
                  @click="login">登录</el-button>
              </el-form-item>
              <el-form-item>
                <el-button class="button" type="info" auto-insert-space @click="isRegister = 'register'">
                  注册
                </el-button>
              </el-form-item>
            </el-form>
            <el-form ref="resetForm" size="large" autocomplete="off" :model="resetData" :rules="rules"
              v-if="isReset || (isRegister == 'reset')">
              <el-form-item>
                <h1>农作物智能推荐平台</h1>
              </el-form-item>
              <el-form-item prop="phone3">
                <el-input id="validatecodeInput" class="input-with-select" v-model="resetData.phone"
                  :prefix-icon="Iphone" placeholder="手机号">
                  <template #append v-if="!isValidateOK">
                    <el-link type="info" :underline="false" :disabled="vbtext !== '获取验证码'" @click="postValidateKey">{{
                      vbtext }}</el-link>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password" v-if="isValidateOK">
                <el-input v-model="resetData.password" :prefix-icon="Lock" type="password"
                  placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item prop="repasswordreset" v-if="isValidateOK">
                <el-input v-model="resetData.repassword" id="registerpInput" :prefix-icon="Lock" type="password"
                  placeholder="请再次输入密码"></el-input>
              </el-form-item>
              <el-form-item prop="validatecode" v-if="!isValidateOK">
                <el-input v-model="resetData.validatecode" @change="validatecodeChange" @input="validatecodeChange"
                  :prefix-icon="Key" placeholder="验证码" />
                <!-- <template #suffix v-if="">
                    <div><el-text style="color: #529b2e;font-size:14px;"><el-icon>
                          <SuccessFilled />
                        </el-icon>验证通过</el-text></div>
                  </template></el-input> -->
              </el-form-item>
              <!--重置按钮 -->
              <el-form-item v-if="!isValidateOK">
                <el-button class="button" :disabled="isResetOK" type="danger" auto-insert-space>重置密码</el-button>
              </el-form-item>
              <el-form-item v-if="isValidateOK">
                <el-button @click="submitResetData" class="button" :disabled="isresetP" type="danger"
                  auto-insert-space>提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss">
/* 样式 */
.login-body {
  height: 100vh;
  background-color: #3b8d24 0.8;
  background: url('@/assets/login_bg.jpg') repeat;
  margin: 0px;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
}

.input-with-select .el-input-group__append {
  background-color: #ffffff;
  color: #337ecc;
  padding: 0px 5px;
  font-size: 14px;
  border-left: 0;
}

.input-with-select .el-input__wrapper {}

.login-page {
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.login-box {
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
  border: 1px solid #a0a0a0;
  box-shadow: 0 0 25px #7a7a7a;
  border-radius: 15px;
  height: auto;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;

  h1 {
    margin: 0px auto 15px auto;
    text-align: center;
    color: #409EFF;
    font-size: 25px;

    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  .title {
    margin: 0 auto;
  }

  .button {
    width: 100%;
  }

  .flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .el-form-item {
    margin-bottom: 20px;
  }
}
</style>
