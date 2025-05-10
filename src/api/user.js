//导入request.js请求工具
import request from '@/utils/request.js'
import axios from 'axios';
import { useTokenStore } from '@/stores/token.js'
import { toRaw } from '@vue/reactivity'
//提供调用注册接口的函数
export const userRegisterService = (registerData)=>{
    //借助于UrlSearchParams完成传递
    const params = new URLSearchParams()
    // for(let key in registerData){
    params.append('phone',registerData.userId.toString());
    // }
    params.append("userid",registerData["userId"].toString());
    params.append("password",registerData["password"].toString());

    return request.post('/user/register',params);
}

//提供调用登录接口的函数
export const userLoginService = (loginData)=>{
  loginData.userid=loginData.userId
    const params = new URLSearchParams();
    for(let key in loginData){
        params.append(key,loginData[key])
    }
    return request.post('/user/login',params)
}

//获取用户详细信息
export const userInfoService = (userid)=>{
    const tokenStore = useTokenStore();
    const params = new URLSearchParams();
    // console.log()
    params.append("userid",userid)
    return request.get('/user/userInfo',{params:params}) //这里只能用post不知道为什么
}

//更新用户信息
export const updateUserInfoService = (user,rawName)=>{
  user.avatarurl=rawName
  return request.post('/user/updateUserInfo',user) //这里只能用post不知道为什么
}
//发送验证码
export const postValidatecodeService = (phone)=>{
  const params = new URLSearchParams();

  return request.get(`/user/sendShortmsg?phone=${phone.toString()}`)
}
//核对验证码

export const checkValidatecodeService = (phone,code)=>{
  const params = new URLSearchParams();

  return request.get(`/user/checkMsg?phone=${phone.toString()}&code=${code.toString()}`) //这里只能用post不知道为什么
}
//修改个人信息
export const userInfoUpdateService = (userInfoData)=>{
   return request.put('/user/update',userInfoData)
}
//重置密码
export const userResetPwdService = (phone,pwd)=>{
  return request.post(`/user/resetpwd?phone=${phone.toString()}&password=${pwd.toString()}`)
}
//修改头像
export const userAvatarUpdateService = (avatarUrl)=>{
    const params = new URLSearchParams();
    params.append('avatarUrl',avatarUrl)
    return request.patch('/user/updateAvatar',params)
}

export const deleteUserService=(params)=>{
  return request.get('/user/deleteUser',{params:params})
}

export const verifyIDService=(params)=>{
  return request.get('/user/addVerifyData',params)
}
export const uploadIDimgService=(fromData)=>{
  return request.post('/user/uploadIDimg',fromData,{
    headers: {
        'Content-Type':'multipart/form-data'
    }})
}
export const uploadCompanyFileService=(fromData)=>{
  return request.post('/user/uploadCompanyFiles',fromData,{
    headers: {
        'Content-Type':'multipart/form-data'
    }})
}
export const getVerifyIDStateService=(params)=>{
  return request.get('/user/getVerifyIDState',{params:params})
}
export const getVerifyCompanyStateService=(params)=>{
  return request.get('/user/getVerifyCompanyState',{params:params})
}
export const verifyCompanyService=(params)=>{
  return request.get('/user/addVerifyCompany',params)
}
export const uploadAvatarService=(fromData)=>{
  return request.post('/user/uploadAvatar',fromData,{
    headers: {
        'Content-Type':'multipart/form-data'
    }})
}
// export const getAvatarService=async (params)=>{
//   try {
//     const response = await axios.get('/img/19816893357.png', {
//         responseType: 'blob' // 指定响应类型为blob，以获取图像数据

//     });
//     return response; // 返回图像数据的Blob对象
// } catch (error) {
//     console.error('Error fetching avatar:', error);
//     return null;
// }

// }
export const getAvatarService=async (params)=>{
  let result = await axios.get('/user/getAvatar', {params:params,responseType: 'blob'})
    //         responseType: 'blob' // 指定响应类型为blob，以获取图像数据

    //     });
  return result
  // return request.get('/user/getAvatar',{params:params})

}
export const getRecommendRecordTimeListService=(params)=>{
  return request.get('/user/getRecommendRecordTimeList',{params:params})
}
export const getAddressService=(params)=>{
  return request.get('/user/getAddressBycode',{params:params})
}
export const deleteRecommendRecordService=(params)=>{
  return request.get('/user/deleteRecommendRecord',{params:params})
}
export const deleteRecommendRecordAllService=(params)=>{
  return request.get('/user/deleteRecommendRecordAll',{params:params})
}
