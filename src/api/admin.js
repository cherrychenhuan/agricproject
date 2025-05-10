import request from '@/utils/request.js'

export const userListService=(params)=>{
  return request.get('/admin/getUserList',{params:params})
}
export const addUserService=(user)=>{
  return request.post('/admin/addUser',user)
}
export const updateUserService = (user)=>{
  return request.post('/user/updateUserInfo',user) //这里只能用post不知道为什么
}
export const deleteUserService=(params)=>{
  return request.get('/user/deleteUser',{params:params})
}
export const userAllDataService=()=>{
  return request.get('/admin/getAllusers')
}
export const userFilterService=(params)=>{
  return request.get('/admin/userFilter',{params:params})
}
export const idVerifyListService=(params)=>{
  return request.get('/admin/getIdVerifyList',{params:params})
}
export const updateVerifyIDDataService=(params)=>{
  return request.get('/admin/updateVerifyIDData',{params:params})
}
export const updateVerifyCompanyService=(params)=>{
  return request.get('/admin/updateVerifyCompany',{params:params})
}
export const filterVerifyIDDataService=(params)=>{
  return request.get('/admin/getFilterVerifyIDData',{params:params})
}
export const companyVerifyListService=(params)=>{
  return request.get('/admin/getCompanyVerifyList',{params:params})
}

export const filterVerifyCompanyDataService=(params)=>{
  return request.get('/admin/getFilterVerifyCompanyData',{params:params})
}
export const hwsdListService=(params)=>{
  return request.get('/admin/getHwsdList',{params:params})
}
export const  updateHwsdService = (cropForm) =>{
  if(cropForm.issoil==false) cropForm.issoil=0
  else cropForm.issoil=1
  return request.post('/admin/updateHwsd', cropForm) //get请求必须写 {} post请求不用写
}
export const deleteHwsdService=(params)=>{
  return request.get('/admin/deleteHwsd',{params:params})
}
export const autoSoilGidService=()=>{
  return request.get('/admin/getAutoSoilGid')

}
export const addSoilGenricData=(params)=>{
  return request.get('/admin/addSoilGenricData',{params:params})
}
export const autoSoilGDetailidService=(params)=>{
  return request.get('/admin/getAutoSoilGDetailid',{params:params})
}
export const addSoilGenricDetailData=(params,pid)=>{
  params.pid=pid
  return request.get('/admin/addSoilGenricDetailData',{params:params})
}
export const addSoilFaoDataService=(params)=>{
  return request.get('/admin/addSoilFaoData',{params:params})
}
export const addFaoDetailDataService=(params)=>{
  return request.get('/admin/addFaoDetailData',{params:params})
}
export const deleteSoilGService=(params)=>{
  return request.get('/admin/deleteSoilGData',{params:params})
}
export const deleteSoilGDetailService=(params)=>{
  return request.get('/admin/deleteSoilGDetailData',{params:params})
}
export const deleteSoilFaoService=(params)=>{
  return request.get('/admin/deleteFaoData',{params:params})
}
//市场数据
export const getProductDataService=(params)=>{
  return request.get('/admin/getProductData',{params:params})
}
export const getProfitDataService=(params)=>{
  return request.get('/admin/getProfitData',{params:params})
}
export const addProductDataService=(cropProductinfo)=>{
  return request.post('/admin/addProductData',cropProductinfo)
}
export const updateProductDataService=(cropProductinfo)=>{
  return request.post('/admin/updateProductData',cropProductinfo)
}
export const getNewProductService=(cropProductinfo)=>{
  return request.post('/admin/getNewProductRow',cropProductinfo)
}
export const deleteProductInfoService=(cropProductinfo)=>{
  return request.post('/admin/deleteProductInfo',cropProductinfo)
}
export const deletePriceInfoService=(cropProductinfo)=>{
  return request.post('/admin/deletePriceInfo',cropProductinfo)
}
export const filterProductInfoService=(params,p1,p2)=>{
  params.pageNum=p1
  params.pageSize=p2
  return request.get('/admin/filterProductInfo',{params:params})
}
export const filterPriceInfoService=(params,p1,p2)=>{
  params.pageNum=p1
  params.pageSize=p2
  return request.get('/admin/filterPriceInfo',{params:params})
}
export const filterProfitInfoService=(params,p1,p2)=>{
  params.pageNum=p1
  params.pageSize=p2
  return request.get('/admin/filterProfitInfo',{params:params})
}
export const getPriceDataService=(params)=>{
  return request.get('/admin/getPriceData',{params:params})
}

export const addPriceDataService=(info)=>{
  return request.post('/admin/addPriceData',info)
}
export const updatePriceDataService=(cropProductinfo)=>{
  return request.post('/admin/updatePriceData',cropProductinfo)
}
export const getNewPriceService=(cropProductinfo)=>{
  return request.post('/admin/getNewPriceRow',cropProductinfo)
}

export const addProfitDataService=(info)=>{
  return request.post('/admin/addProfitData',info)
}
export const updateProfitDataService=(cropProductinfo)=>{
  return request.post('/admin/updateProfitData',cropProductinfo)
}
export const getNewProfitService=(cropProductinfo)=>{
  return request.post('/admin/getNewProfitRow',cropProductinfo)
}
export const deleteProfitInfoService=(cropProductinfo)=>{
  return request.post('/admin/deleteProfitInfo',cropProductinfo)
}

export const getTopicDataService=(params)=>{
  return request.get('/admin/getTopicData',{params:params})
}
export const updateTopicService=(params)=>{
  return request.get('/admin/updateTopic',{params:params})
}
export const deleteTopicService=(params)=>{
  return request.get('/admin/deleteTopic',{params:params})
}
export const updateCommentService=(params)=>{
  return request.get('/admin/updateComment',{params:params})
}
export const updateKnowledgeService=(params)=>{
  return request.get('/admin/updateKnowledge',{params:params})
}
export const deleteCommentService=(params)=>{
  return request.get('/admin/deleteComment',{params:params})
}
export const getKnowledgeService=(params)=>{
  return request.get('/admin/getKnowledgeData',{params:params})
}
export const addKnowledgeService=(params)=>{
  return request.get('/admin/addKnowledge',{params:params})
}
export const uploadKnowledgeImgService=(fileObj, name)=>{
  const form = new FormData();
  // 文件对象,key是后台接受的参数名称
  form.append("file", fileObj);
  form.append("name", name);
  return request.post('/uploadKnowledgeImg', form)
}
export const deleteKnowledgeService=(params)=>{
  return request.get('/admin/deleteKnowledge',{params:params})
}
