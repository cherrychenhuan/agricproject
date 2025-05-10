import request from '@/utils/request.js'

export const getClimatedataService = (params) => {

  return request.get('/recommend/getclimatedata',{ params: params })
}


export const getHwsddataService =(params) =>{
  return request.get('/recommend/gethwsddata',{ params: params })
}
export const getSoilcropdataService =(params) =>{
  return request.get('/recommend/getsoilcropdata',{ params: params })
}

export const getSoilnameService=(params)=>{
  return request.get('/recommend/getsoilname',{ params: params })
}
//新增
export const addSoilCropdataService = (soilForm) => {
  console.log("soilForm",soilForm)
  return request.post('/addsoilcropdata', soilForm) //get请求必须写 {} post请求不用写

}
export const updateSoilCropdataService = (soilForm) => {
  return request.post('/updatesoilcropdata', soilForm) //get请求必须写 {} post请求不用写

}
export const generateHistoryGrowDataService=(params)=>{
  return request.get('/recommend/generateHistoryGrowData',{ params: params })
}
export const getHistoryGrowDataService=(params)=>{
  return request.get('/recommend/getHistoryGrowData',{ params: params })
}
export const getHistoryGrowDataBycropidService=(params)=>{
  return request.get('/recommend/getHistoryGrowDataBycropid',{ params: params })
}
export const getCostDataService=(params)=>{
  return request.get('/recommend/getCostData',{ params: params })
}
export const getCropProductService=(params)=>{
  return request.get('/recommend/getCropProductData',{ params: params })
}
export const getCropProductByProvinceService=(params)=>{
  return request.get('/recommend/getCropProductByProvince',{ params: params })
}
export const getRecommendIndexService=(params)=>{
  return request.get('/recommend/getRecommendIndex',{ params: params })
}
export const getRecommendProjectService=(params)=>{
  return request.get('/recommend/getRecommendProject',{ params: params })
}
export const getRecommendRecordService=(params)=>{
  return request.get('/recommend/getRecommendRecord',{ params: params })
}
export const addRecommendService=(params)=>{
  return request.get('/recommend/addRecommendIndexData',{ params: params })
}
export const addYieldDataService=(params)=>{
  return request.get('/recommend/addYieldData',{ params: params })
}
export const getWeightService=(params)=>{
  return request.get('/recommend/getWeight',{ params: params })
}
