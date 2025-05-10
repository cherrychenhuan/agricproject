<template>
  <div>
    <el-tabs type="border-card" class="demo-tabs" v-model="verifyTabnames">
      <el-tab-pane name="person" label="个人实名认证" style="height:83vh;">
        <!-- 上传过程 -->
        <div v-if="upload == 0" style="padding:30px;">

          <el-form label-position='top' class="verifyIDForm">

            <el-row>
              <el-col :span="12">
                <el-form-item label="真实姓名">
                  <el-input v-model="realName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号">
                  <el-input v-model="idNumber" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="身份证照">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-upload class="idcard-uploader" :auto-upload="false" :show-file-list="false"
                  :on-success="upLoadIDcard1Success" :on-change="changeUploadFile1">
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
                  <div v-else>
                    <div style="font-weight:500;color: #529b2e;font-size:18px;text-align:center;">上传正面照片</div>
                    <div style="font-weight:500;color: #909399;font-size:14px;text-align:center;">*支持.JPG .JPEG
                      .PNG,不超过2M
                    </div>
                  </div>
                </el-upload>
              </el-col>
              <el-col :span="12">
                <el-upload class="idcard-uploader" :auto-upload="false" :show-file-list="false"
                  :on-success="handleAvatarSuccess" :on-change="changeUploadFile2">
                  <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
                  <div v-else>
                    <div style="font-weight:500;color: #529b2e;font-size:18px;text-align:center;">上传背面照片</div>
                    <div style="font-weight:500;color: #909399;font-size:14px;text-align:center;">*支持.JPG .JPEG
                      .PNG,不超过2M
                    </div>
                  </div>
                </el-upload>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9"></el-col>
              <el-col :span="6">
                <el-row>
                  <el-col :span="12"><el-button style="width:120px;" type="success" plain>取消</el-button></el-col>
                  <el-col :span="12"><el-button
                      :disabled="realName == '' || idNumber == '' || imageUrl1 == '' || imageUrl2 == ''"
                      style="width:120px;" @click="submitFile" type="success">提交</el-button></el-col>
                </el-row>
              </el-col>
              <el-col :span="7"></el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 上传完毕 -->
        <div v-if="upload == 1" style="padding-top:20px;">
          <el-form label-width="90px" class="verifyIDForm">
            <el-row>
              <el-col :span="24">
                <el-form-item label="认证状态">
                  <el-text class="mx-1"
                    style="padding:0;font-size:13px;margin-top:0px;font-weight:500;font-family:'微软雅黑'"
                    type="primary">认证审核中</el-text>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="真实姓名">
                  {{ realName }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="身份证号">
                  {{ idNumber }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="身份证照">
                  <el-upload class="idcard-uploader1" :disabled="true" style="margin-top:25px;">
                    <img src="../../assets/id0.png" class="avatar1" />
                  </el-upload>
                  <div style="position:absolute;top:175px;left:40px;">
                    <div
                      style="font-family:'微软雅黑';color:#606266;line-height:20px;font-weight:500;font-size:13px; text-align:center;">
                      正面照片
                    </div>
                    <div style="font-family:'微软雅黑';line-height:20px;font-weight:500;color: #909399;font-size:11px;">
                      *支持.JPG .JPEG
                      .PNG,不超过2M
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="">
                  <el-upload class="idcard-uploader1" :disabled="true" style="margin-top:25px;">
                    <img src="../../assets/id1.png" class="avatar1" />
                  </el-upload>
                  <div style="position:absolute;top:175px;left:40px;">
                    <div
                      style="font-family:'微软雅黑';color:#606266;line-height:20px;font-weight:500;font-size:13px; text-align:center;">
                      反面照片
                    </div>
                    <div style="font-family:'微软雅黑';line-height:20px;font-weight:500;color: #909399;font-size:11px;">
                      *支持.JPG .JPEG
                      .PNG,不超过2M
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </div>
        <!-- 已审核 -->
        <div v-if="upload == 2" style="padding-top:20px;">
          <el-form label-width="90px" class="verifyIDForm">
            <el-row>
              <el-col :span="24">
                <el-form-item label="认证状态">
                  <el-text class="mx-1"
                    style="padding:0;font-size:13px;margin-top:0px;font-weight:500;font-family:'微软雅黑'"
                    type="success">认证成功</el-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="真实姓名">
                  {{ realName }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="身份证号">
                  {{ idNumber }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="身份证照">
                  <el-upload class="idcard-uploader1" :disabled="true" style="margin-top:25px;">
                    <img src="../../assets/id0.png" class="avatar1" />
                  </el-upload>
                  <div style="position:absolute;top:175px;left:40px;">
                    <div
                      style="font-family:'微软雅黑';color:#606266;line-height:20px;font-weight:500;font-size:13px; text-align:center;">
                      正面照片
                    </div>
                    <div style="font-family:'微软雅黑';line-height:20px;font-weight:500;color: #909399;font-size:11px;">
                      *支持.JPG .JPEG
                      .PNG,不超过2M
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="">
                  <el-upload class="idcard-uploader1" :disabled="true" style="margin-top:25px;">
                    <img src="../../assets/id1.png" class="avatar1" />
                  </el-upload>
                  <div style="position:absolute;top:175px;left:40px;">
                    <div
                      style="font-family:'微软雅黑';color:#606266;line-height:20px;font-weight:500;font-size:13px; text-align:center;">
                      反面照片
                    </div>
                    <div style="font-family:'微软雅黑';line-height:20px;font-weight:500;color: #909399;font-size:11px;">
                      *支持.JPG .JPEG
                      .PNG,不超过2M
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </div>
        <div v-if="upload == 3" style="padding-top:20px;">
          <el-form label-position='top' class="verifyIDForm">
            <el-row>
              <el-col :span="24">
                <el-form-item label="认证状态">
                  <el-text class="mx-1"
                    style="padding:0;font-size:13px;margin-top:0px;font-weight:500;font-family:'微软雅黑'"
                    type="danger">审核不通过 {{ remark }} 请重新认证</el-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="真实姓名">
                  <el-input v-model="realName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号">
                  <el-input v-model="idNumber" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="身份证照">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-upload class="idcard-uploader" :auto-upload="false" :show-file-list="false"
                  :on-success="upLoadIDcard1Success" :on-change="changeUploadFile1">
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
                  <div v-else>
                    <div style="font-weight:500;color: #529b2e;font-size:18px;text-align:center;">上传正面照片</div>
                    <div style="font-weight:500;color: #909399;font-size:14px;text-align:center;">*支持.JPG .JPEG
                      .PNG,不超过2M
                    </div>
                  </div>
                </el-upload>
              </el-col>
              <el-col :span="12">
                <el-upload class="idcard-uploader" :auto-upload="false" :show-file-list="false"
                  :on-success="handleAvatarSuccess" :on-change="changeUploadFile2">
                  <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
                  <div v-else>
                    <div style="font-weight:500;color: #529b2e;font-size:18px;text-align:center;">上传背面照片</div>
                    <div style="font-weight:500;color: #909399;font-size:14px;text-align:center;">*支持.JPG .JPEG
                      .PNG,不超过2M
                    </div>
                  </div>
                </el-upload>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9"></el-col>
              <el-col :span="6">
                <el-row>
                  <el-col :span="12"><el-button style="width:120px;" type="success" plain>取消</el-button></el-col>
                  <el-col :span="12"><el-button
                      :disabled="realName == '' || idNumber == '' || imageUrl1 == '' || imageUrl2 == ''"
                      style="width:120px;" @click="submitFile" type="success">提交</el-button></el-col>
                </el-row>
              </el-col>
              <el-col :span="7"></el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane name="factory" label="企业认证" style="height:83vh;padding:0;overflow:auto;">
        <div style="width:100%;font-size:14px;font-weight:500;">
          <div
            style="font-size:14px;font-weight:500;height:40px;width:100%;background-color:aliceblue;line-height:40px;">
            &nbsp;&nbsp;&nbsp;申请条件</div>
          <el-row>
            <el-col :span="8" style="padding:40px;">
              <div style="background-color:#c6e2ff; padding:10px;height:80px;border-radius:10px;">
                <div style="background-color:#c6e2ff;text-align:left;font-size:15px;font-weight:600;">实名认证</div>
                <br /><br />
                <div v-if="upload == 2" style="background-color: #c6e2ff;text-align:right;color:#303133;">已完成</div>
                <div v-else style="text-align:right;color:#009237;"><el-button @click="verifyTabnames = 'factory'" link
                    style="margin-top:-2px;" type="primary">去完成</el-button></div>

              </div>
            </el-col>
            <el-col :span="8" style="padding:40px;">
              <div style="background-color:#f3d19e; padding:10px;height:80px;border-radius:10px;">
                <div style="background-color: #f3d19e;text-align:left;font-size:15px;font-weight:600;">绑定手机</div>
                <br /><br />
                <div v-if="userInfoStore.info.phone != ''" style="text-align:right;color:#303133;">已完成</div>
                <div v-else style="text-align:right;color:#009237;"><el-button @click="finishPhone" link
                    style="margin-top:-2px;" type="warning">去完成</el-button></div>
              </div>
            </el-col>
            <el-col :span="8" style="padding:40px;">
              <div style="background-color:#fde2e2; padding:10px;height:80px;border-radius:10px;">
                <div style="background-color: #fde2e2;text-align:left;font-size:15px;font-weight:600;">修改昵称</div>
                <br /><br />
                <div v-if="userInfoStore.info.username != '用户' + userInfoStore.info.phone"
                  style="text-align:right;color:#303133;">已完成</div>
                <div v-else style="text-align:right;color:#009237;"><el-button @click="finishUsername" link
                    style="margin-top:-2px;" type="danger">去完成</el-button></div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="width:100%;font-size:14px;font-weight:500;">
          <div
            style="font-size:14px;font-weight:500;height:40px;width:100%;background-color:aliceblue;line-height:40px;">
            &nbsp;&nbsp;&nbsp;认证信息</div>
          <el-form style="padding-top:20px;" label-width="90px"
            :disabled="!(upload == 2 && userInfoStore.info.phone != '' && userInfoStore.info.username != '用户' + userInfoStore.info.phone && vState !== 0)">
            <el-row>
              <el-col :span="12">
                <el-form-item label="认证状态:">
                  <span v-if="vState == -1" style="color:#409EFF;font-family:'微软雅黑';margin-top:0px;">未认证</span>
                  <span v-if="vState == 0" style="color:#E6A23C;font-family:'微软雅黑';margin-top:0px;">审核中</span>
                  <span v-if="vState == 1" style="color:#67C23A;font-family:'微软雅黑';margin-top:0px;">已认证</span>
                  <span v-if="vState == 2" style="color:#F56C6C;font-family:'微软雅黑';margin-top:0px;">审核不通过 {{ remark1 }}
                    请重新认证</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="vState != 1">
              <el-col :span="12">
                <el-form-item label="证明材料:">
                  <el-upload :before-upload="xbeforeUpload" multiple action="#" :multiple="true" limit=3
                    :auto-upload="false" accept=".jpg,.png,.jpeg,.pdf" :on-change="changeUploadFileCompany"
                    :data="paramData" v-model:file-list="companyFiles">
                    <el-button type="primary" size='small'>点击上传</el-button>
                    <template #tip>
                      <div class="el-upload__tip" style="margin-rop:-5px;">
                        支持.jpg .png .pdf格式,最多上传3个附件
                      </div>
                    </template>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top:-10px;">
              <el-col :span="12">
                <el-form-item label="企业名称:">
                  <el-input v-model="companyname" placeholder="输入企业名称" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="运营电话:">
                  <el-input v-model="tellphone" placeholder="输入运营电话" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="主营业务:">
                  <el-input v-model="mainactivity" placeholder="输入主要种植的产品等" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="vState != 1">
              <el-col :span="12">
                <el-form-item label="">
                  <el-button type="danger"
                    :disabled="!(mainactivity != '' && tellphone != '' && companyname != '' && companyFormData.length != 0)"
                    @click="submitCompanyVerify">提交</el-button>
                  <el-button type="danger" plain>取消</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>


        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { UserInfoStore } from '@/stores/userInfo.js'
import { getVerifyCompanyStateService, uploadCompanyFileService, verifyCompanyService, getVerifyIDStateService, uploadIDimgService, verifyIDService } from '@/api/user.js'
const imageUrl1 = ref('')
const vState = ref(-1)
const companyFiles = ref()
const router = useRouter();
const verifyTabnames = ref('person')
const upload = ref(3)
const remark = ref('')
const remark1 = ref('')
const imageUrl2 = ref('')
const realName = ref('')
const idNumber = ref('')
const companyname = ref('')
const tellphone = ref('')
const mainactivity = ref('')
const idFormData = ref({ first: '', second: '' })
const companyFormData = ref([])
const userInfoStore = UserInfoStore();
const upLoadIDcard1Success = (response, uploadFile) => {
  console.log(uploadFile)
  imageUrl1.value = URL.createObjectURL(uploadFile.raw)
}
const getVerifyIDState = async () => {
  //获取实名认证的状态
  let result = await getVerifyIDStateService({ userid: userInfoStore.info.userId })
  if (result.data == null) upload.value = 0
  else {
    let vdata = result.data
    realName.value = vdata.realname
    idNumber.value = vdata.idnumber

    if (vdata.verifystate == '待审核') {

      upload.value = 1
    } else if (vdata.verifystate == '认证成功') {

      upload.value = 2
    } else {
      remark.value = vdata.remark
      upload.value = 3
    }
  }

  //获取企业认证的状态
  let result1 = await getVerifyCompanyStateService({ userid: userInfoStore.info.userId })
  if (result1.data == null) vState.value = -1
  else {
    let vdata1 = result1.data


    if (vdata1.verifystate == '审核中') {
      companyname.value = vdata1.companyname
      tellphone.value = vdata1.tellphone
      mainactivity.value = vdata1.mainactivity
      vState.value = 0
    } else if (vdata1.verifystate == '认证成功') {
      companyname.value = vdata1.companyname
      tellphone.value = vdata1.tellphone
      mainactivity.value = vdata1.mainactivity
      vState.value = 1
    } else {

      remark1.value = vdata1.remark
      vState.value = 2
    }
  }
}
getVerifyIDState()
const beforeUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('图片必须是jpg格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB!')
    return false
  }
  return true
}
const xbeforeUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('文件大小不能超过10MB!')
    return false
  }
  else return true
}
const changeUploadFile1 = async (uploadFile, uploadFiles) => {
  console.log(uploadFile)
  idFormData.value.first = uploadFile.raw
  let rawFile = uploadFile.raw
  if (beforeUpload(rawFile)) {
    imageUrl1.value = URL.createObjectURL(uploadFile.raw)
  }
}
const changeUploadFileCompany = (uploadFile, uploadFiles) => {
  if (!xbeforeUpload(uploadFile.raw)) {
    console.log("companyFiles", companyFiles._value)
    companyFiles._value.splice(0, 1)
    return false;
  }
  else {
    companyFormData.value = uploadFiles
  }
  // companyFormData.value=uploadFiles
  // console.log("xx",uploadFiles)
}
const changeUploadFile2 = async (uploadFile, uploadFiles) => {
  idFormData.value.second = uploadFile.raw
  let rawFile = uploadFile.raw
  if (beforeUpload(rawFile)) {
    imageUrl2.value = URL.createObjectURL(uploadFile.raw)
  }
  //file就是当前添加的文件
  // var fileObj = param.file;
  // // fileList.value.append(fileObj)
  // let fileArr = fileObj.name.split('.');
  // let name = fileArr[0];
  // let fileType = fileArr[1];
  // console.log("1111111111", param)
  // console.log("file",name)
  //把当前新增的ID加上
  // console.log("newid", newId.value)
  // if (editState.value == 'add') var id = newId.value
  // else var id = cropForm.value.id;
  // console.log("cropForm.value.id", cropForm.value.id)
  // let result = await uploadSampleImgService(fileObj, id);
}
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

const submitFile = async () => {
  let userInfo = userInfoStore.info
  let params = {
    userid: userInfo.userId,
    realname: realName.value,
    idnumber: idNumber.value,
    verifytime: new Date().format("yyyy-MM-dd hh:mm:ss"),
    verifystate: '待审核'
  }
  //传正面
  let formData1 = new FormData();
  formData1.append('file', idFormData.value.first);
  formData1.append('userid', userInfo.userId + '正面');
  //上传文件到后端
  let result1 = await uploadIDimgService(formData1)
  //传反面
  let formData2 = new FormData();
  formData2.append('file', idFormData.value.second);
  formData2.append('userid', userInfo.userId + '反面');
  //上传文件到后端
  let result2 = await uploadIDimgService(formData2)
  //保存认证数据
  let result = await verifyIDService({ params: params })
  ElMessage.success('上传成功')
  upload.value = 1
}
const submitCompanyVerify = async () => {
  //先传数据到数据库
  let userInfo = userInfoStore.info
  let params = {
    userid: userInfo.userId,
    companyname: companyname.value,
    tellphone: tellphone.value,
    mainactivity: mainactivity.value,
    verifytime: new Date().format("yyyy-MM-dd hh:mm:ss"),
  }
  let result1 = await verifyCompanyService({ params: params })

  //上传文件
  for (let i = 0; i < companyFormData.value.length; i++) {
    let xfile = companyFormData.value[i].raw
    let xformData = new FormData();
    xformData.append('file', xfile);
    xformData.append('userid', userInfo.userId);
    xformData.append('i', i);
    let xresult = await uploadCompanyFileService(xformData)

  }
  ElMessage.success('申请成功')
  vState.value = 0



}
const finishUsername = () => {
  router.push({ path: '/user/profile' })
}
const finishPhone = () => {
  router.push({ path: '/user/account' })
}
</script>
<style lang="scss">
.idcard-uploader .el-upload {
  margin-top: -15px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 492.2px;
  height: 310.5px;
  transition: var(--el-transition-duration-fast);
}

.idcard-uploader1 .el-upload {
  margin-top: -15px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 256.8px;
  height: 162px;
  transition: var(--el-transition-duration-fast);
}

.avatar1 {
  width: 256.8px;
  height: 162px;
}

.idcard-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.idcard-uploader1 .el-upload:hover {
  border-color: var(--el-color-primary);
}

.verifyIDForm .el-form-item__label {
  font-size: 13px;
  font-weight: 500;
  color: #606266;
}

.el-icon.idcard-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.el-upload-list__item-file-name {
  // overflow:auto;
  font-size: 11px;
}

.el-upload {
  .el-icon .el-icon--document {
    font-size: 11px;
  }

  .el-upload-list {
    margin: 0;
  }
}

.el-upload-list .el-upload-list--text {
  line-height: 20px;
}
</style>
