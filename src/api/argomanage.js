import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token.js'
import { toRaw } from '@vue/reactivity'

export const getArgoService = (params) => {
  // const tokenStore = useTokenStore();
  //在pinia中定义的响应式数据,都不需要.value
  return request.get('/argomanage/argomanagelist', { params: params })
  // return request.get('/cropinfo/cropcategorylist')
}
export const addArgoService=(params)=>{
  return request.get('/argomanage/addArgomanage', { params: params })
}
export const addCropcalendarService=(params)=>{
  return request.get('/argomanage/addCropcalendar', { params: params })
}
export const getCropCalendarService = (params) => {
  // const tokenStore = useTokenStore();
  //在pinia中定义的响应式数据,都不需要.value
  return request.get('/argomanage/CropCalendarList', { params: params })
  // return request.get('/cropinfo/cropcategorylist')
}
//getTimeEvent
export const getTimeEventIrriDataService=(params)=>{
  return request.get('/argomanage/getTimeEventIrriData', { params: params })
}
export const getTimeEventTnDataService=(params)=>{
  return request.get('/argomanage/getTimeEventTnData', { params: params })
}
export const getTimeEventTmDataService=(params)=>{
  return request.get('/argomanage/getTimeEventTmData', { params: params })
}
export const getStateEventIrriDataService=(params)=>{
  return request.get('/argomanage/getStateEventIrriData', { params: params })
}
export const getStateEventSnDataService=(params)=>{
  return request.get('/argomanage/getStateEventSnData', { params: params })
}
export const getStateEventSmDataService=(params)=>{
  return request.get('/argomanage/getStateEventSmData', { params: params })
}
//updateTime
export const updateTimeIrrigateService=(row)=>{
  return request.post('/argomanage/updateTimeIrrigate',row)
}
export const updateTimeTnService=(row)=>{
  return request.post('/argomanage/updateTimeTn',row)
}
export const updateTimeTmService=(row)=>{
  return request.post('/argomanage/updateTimeTm',row)
}
export const updateStateIrrigateService=(row)=>{
  return request.post('/argomanage/updateStateIrrigate',row)
}
export const updateStateSnService=(row)=>{
  return request.post('/argomanage/updateStateSn',row)
}
export const updateStateSmService=(row)=>{
  return request.post('/argomanage/updateStateSm',row)
}
export const getMaxTiIdService=()=>{
  return request.get('/argomanage/getMaxTiId')
}
export const getMaxTnIdService=()=>{
  return request.get('/argomanage/getMaxTnId')
}
export const getMaxTmIdService=()=>{
  return request.get('/argomanage/getMaxTmId')
}
export const getMaxSiIdService=()=>{
  return request.get('/argomanage/getMaxSiId')
}
export const getMaxSnIdService=()=>{
  return request.get('/argomanage/getMaxSnId')
}
export const getMaxSmIdService=()=>{
  return request.get('/argomanage/getMaxSmId')
}
export const addTimeIrrigateService=(row)=>{
  return request.post('/argomanage/addTimeIrrigate',row)
}

export const deleteTiService=(id)=>{
  let params={id:id}
  return request.get('/argomanage/deleteTi',{params:params})
}
export const deleteSiService=(id)=>{
  let params={id:id}
  return request.get('/argomanage/deleteSi',{params:params})
}
export const deleteSnService=(id)=>{
  let params={id:id}
  return request.get('/argomanage/deleteSn',{params:params})
}
export const deleteSmService=(id)=>{
  let params={id:id}
  return request.get('/argomanage/deleteSm',{params:params})
}
export const deleteTnService=(id)=>{
  let params={id:id}
  return request.get('/argomanage/deleteTn',{params:params})
}
export const deleteTmService=(id)=>{
  let params={id:id}
  return request.get('/argomanage/deleteTm',{params:params})
}
// getTimeEventTmDataService, updateTimeTmService, getMaxTmIdService, deleteTmService,
export const updateArgoService=(argoData)=>{
  if(argoData.mid=='自动生成') argoData.mid=-1
  return request.post('/argomanage/updateArgo',argoData)
}
export const getMaxArgoIDService=()=>{
  return request.get('/argomanage/getMaxArgoID')
}
export const deleteArgoService=(mid)=>{
  let params={mid:mid}
  return request.get('/argomanage/deleteArgo',{params:params})
}
export const getMaxCalIdService=(mid)=>{
  let params={mid:mid}
  return request.get('/argomanage/getMaxCalId',{params:params})
}
export const upDateCropCalendarService=(data)=>{
  return request.post('/argomanage/upDateCropCalendar',data)
}
export const deleteCropcalendarService=(id)=>{
  let params={id:id}
  return request.get('/argomanage/deleteCropcalendar',{params:params})
}
