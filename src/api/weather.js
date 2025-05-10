import request from '@/utils/request.js'

export const getProvinceDataService = () => {
  // const tokenStore = useTokenStore();
  //在pinia中定义的响应式数据,都不需要.value
  return request.get('/area/provincelist')
  // return request.get('/cropinfo/cropcategorylist')
}

export const getAreaDataService = (pcode,level) => {
  // const tokenStore = useTokenStore();
  //在pinia中定义的响应式数据,都不需要.value
  console.log(pcode,level)
  return request.get(`/area/treearealist?pnode=${pcode.toString()}&level=${level}`)
}
export const getWeatherDataService=(params)=>{
  return request.get('/weather/getWeatherData',{params:params})
}

export const getYearListService=(params)=>{
  return request.get('/weather/getYearList',{params:params})
}
export const FilterWeartherDataService=(params)=>{
  return request.get('/weather/filterWeartherData',{params:params})
}

export const deleteWeatherDataService=(params)=>{
  return request.get('/weather/deleteWeatherData',{params:params})
}

export const getForecastdataService=(params)=>{
  return request.get('/weather/getForecastData',{params:params})
}
