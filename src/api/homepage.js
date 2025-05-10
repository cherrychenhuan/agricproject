import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token.js'
import { toRaw } from '@vue/reactivity'

export const getCropProductAllService=(params)=>{
  return request.get('/home/getCropProductAll',{ params: params })
}
export const getCropProductByProvinceService=(params)=>{
  return request.get('/home/getCropProductByProvince',{ params: params })
}
export const getCropConsumeService=(params)=>{
  return request.get('/home/getCropConsume',{ params: params })
}
export const getPifaPriceService=(params)=>{
  return request.get('/home/getPifaPrice',{ params: params })
}
export const getPifaPriceTrendService=(params)=>{
  return request.get('/home/getPifaPriceTrend',{ params: params })
}
export const getPriceFutureService=(params)=>{
  return request.get('/home/getPriceFuture',{ params: params })
}
export const getCropCostService=(params)=>{
  return request.get('/home/getCropCost',{ params: params })
}
export const getCropCostDataService=(params)=>{
  return request.get('/home/getCropCostData',{ params: params })
}
