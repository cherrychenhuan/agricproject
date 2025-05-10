import request from '@/utils/request.js'

export const provinceListService = () => {
  // const tokenStore = useTokenStore();
  //在pinia中定义的响应式数据,都不需要.value
  return request.get('/area/provincelist')
  // return request.get('/cropinfo/cropcategorylist')
}

export const areaListService = (params) => {
  // const tokenStore = useTokenStore();
  //在pinia中定义的响应式数据,都不需要.value
  console.log("area",params)
  return request.get('/area/arealist',{ params: params })
  // return request.get('/cropinfo/cropcategorylist')
}

export const getLocationService = (val,flag) =>{
  console.log("val",val)
  val=val.replace(' ','')
  let params={code:val,flag:flag}
  return request.get('/area/getlocation',{ params: params })

}
