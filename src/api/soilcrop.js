import request from '@/utils/request.js'
export const soilCropDataListService=(params)=>{
  return request.get('/getsoilCropDataList',{ params: params })
}

export const deletecropSoilDataService = (soilid) => {
  const params = new URLSearchParams()
  params.append("soilid", soilid);
  return request.post('/deletesoilcropdata', params)
  // return request.get('/cropinfo/cropcategorylist')
}

export const getSoilcategoryListService=()=>{
  return request.get('/getSoilcategoryList')
}

export const SoilFilterService=(params)=>{
  return request.get('/getSoilFilterList',{params:params})
}
export const soilcropAllDataService=()=>{
  return request.get('/getSoilcropAllData')
}
export const soilGenericDataService=()=>{
  return request.get('/soilGenericData')
}
export const soilGenericDataDeatilService=(params)=>{
  return request.get('/soilGenericDataDetail',{params:params})
}
export const soilFao90DataService=()=>{
  return request.get('/soilFao90Data')
}
