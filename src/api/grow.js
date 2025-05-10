import request from '@/utils/request.js'

export const getHistoryGrowDataBycropService=(params)=>{
  return request.get('/grow/getHistoryGrowDataByCrop',{ params: params })
}
export const getAreaInfoService=(params)=>{
  return request.get('/area/getAreaInfo',{ params: params })
}
