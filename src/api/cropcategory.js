//导入request.js请求工具
import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token.js'
import { toRaw } from '@vue/reactivity'
//按照分类查询作物
//查询所有数据
export const cropDataBycategoryService = (params) => {
  // const tokenStore = useTokenStore();
  //在pinia中定义的响应式数据,都不需要.value
  return request.get('/cropinfo/getCropBycategory',{params:params})
  // return request.get('/cropinfo/cropcategorylist')
}
//查询作物分类列表
export const cropCategoryListService = (params) => {
    // const tokenStore = useTokenStore();
    //在pinia中定义的响应式数据,都不需要.value
    return request.get('/cropinfo/cropcategorylist', { params: params })
    // return request.get('/cropinfo/cropcategorylist')
}
//查询所有数据
export const cropAllDataService = () => {
  // const tokenStore = useTokenStore();
  //在pinia中定义的响应式数据,都不需要.value
  return request.get('/cropinfo/cropcategoryalllist')
  // return request.get('/cropinfo/cropcategorylist')
}
//查询所有数据
export const cropEcotypeDataService = (params) => {
  // const tokenStore = useTokenStore();
  //在pinia中定义的响应式数据,都不需要.value
  return request.get('/cropinfo/getEcotypeList',{ params: params })
  // return request.get('/cropinfo/cropcategorylist')
}

export const cropVarietyDataService = (params) => {
  // const tokenStore = useTokenStore();
  //在pinia中定义的响应式数据,都不需要.value
  return request.get('/cropinfo/getCropVarietyList',{ params: params })
  // return request.get('/cropinfo/cropcategorylist')
}
//删除行
export const deletecropCategoryService = (id) => {
    const params = new URLSearchParams()
    params.append("id", id);
    return request.post('/cropinfo/deletecategory', params)
    // return request.get('/cropinfo/cropcategorylist')
}

//新增作物时，自动生成编码
export const autoCropIDService = (category) => {
    const params = new URLSearchParams()
    params.append("category", category);
    return request.get('/cropinfo/getNewID', { params: params }) //get请求必须写 {} post请求不用写
}
//自动生成生态类型编码
export const autoGenericidService = (params) => {
  return request.get('/cropinfo/getNewGenericID', { params: params }) //get请求必须写 {} post请求不用写
}

export const autoEcotypeIDService = (cropid) => {
  const params = new URLSearchParams()
  params.append("cropid", cropid);
  return request.get('/cropinfo/getNewEcotypeID', { params: params }) //get请求必须写 {} post请求不用写
}
export const autoVarietyIDService = (ecotype,id) => {

  const params = new URLSearchParams()
  params.append("ecotype", ecotype);
  params.append("ecotypeid", id);
  console.log("cd", ecotype,id)
  return request.get('/cropinfo/getNewVarietyID', { params: params }) //get请求必须写 {} post请求不用写
}
//科属联动
export const autoGenusListService = (family) => {
    const params = new URLSearchParams()
    params.append("family", family);
    return request.get('/cropinfo/getGenusList', { params: params })
}

//上传图片
export const uploadSampleImgService = (fileObj,id) => {
    //FormData 对象
    const form = new FormData();
    // 文件对象,key是后台接受的参数名称
    form.append("file", fileObj);
    form.append("id", id);
    console.log("222222222222",id)
    return request.post('/upload', form)
}

//新增农作物
export const addService = (cropForm) => {
    cropForm.id=Number(cropForm.id) //变为整数
    cropForm.imgNum = cropForm.imgNum !== '' ? Number(cropForm.imgNum) : 0;
    return request.post('/cropinfo/addcategory', cropForm) //get请求必须写 {} post请求不用写
}
//获取新增行的定位
export const getselectRowService = (rowid) =>{
    rowid=Number(rowid)
    const params = new URLSearchParams()
    params.append("id", rowid);
    return request.get('/cropinfo/getRowNum', { params: params })
}

//更改农作物数据
export const  updateService = (cropForm) =>{
    cropForm.id=Number(cropForm.id) //变为整数
    if (cropForm.imgNum=='') cropForm.imgNum=0
    else cropForm.imgNum=Number(cropForm.imgNum)//注意传实体类的时候不需要用params去传，前后端保持一致
    return request.post('/cropinfo/updatecategory', cropForm) //get请求必须写 {} post请求不用写
}

//过滤功能
export const categoryFilterService = (value,flag)=>{
  // if (flag==1){//所属分类 过滤
  const params = new URLSearchParams()
    params.append("flag", flag)
    params.append("value", value);
    return request.get('/cropinfo/categoryfilter', { params: params })

  // }

}

//模糊查询功能
export const searchFilterService = (params) =>{
  return request.get('/cropinfo/getSearchFilterList', { params: params })
}
//获取通用型参数
export const getGenerictypeService = (params) =>{
  return request.get('/cropinfo/getGenerictypeData', { params: params })
}

export const getVarietydataService = (params) =>{
  return request.get('/cropinfo/getVarietyData', { params: params })
}

//新增生态类型
export const addEcotypeService = (ecotypeData) => {
  ecotypeData.ecotypeid=Number(ecotypeData.ecotypeid) //变为整数
  return request.post('/cropinfo/addEcotype', ecotypeData) //get请求必须写 {} post请求不用写
}

export const updateEcotypeService=(ecotypeData)=>{
  ecotypeData.ecotypeid=Number(ecotypeData.ecotypeid) //变为整数
  return request.post('/cropinfo/updateEcotype', ecotypeData) //get请求必须写 {} post请求不用写
}
export const updateVarietyService=(varietyData)=>{
  varietyData.varietyid=Number(varietyData.varietyid) //变为整数
  console.log("cccc",varietyData)
  return request.post('/cropinfo/updateVariety', varietyData) //get请求必须写 {} post请求不用写
}
export const updateGenericTypeService=(genericData)=>{

  return request.post('/cropinfo/updateGenericType', genericData) //get请求必须写 {} post请求不用写
}
//新增品种类型
export const addVarietyService = (varietyData) => {
  varietyData.varietyid=Number(varietyData.varietyid) //变为整数
  return request.post('/cropinfo/addVariety', varietyData) //get请求必须写 {} post请求不用写
}

export const deleteEcotyeService = (ecotypeid) => {
  ecotypeid=Number(ecotypeid) //变为整数
  const params = new URLSearchParams()
  params.append("ecotypeid", ecotypeid);
  return request.post('/cropinfo/deleteEcotype', params) //get请求必须写 {} post请求不用写
}

export const deleteVarietyService = (varietyid) => {
  varietyid=Number(varietyid) //变为整数
  return request.post('/cropinfo/deleteVariety', {varietyid:varietyid}) //get请求必须写 {} post请求不用写
}
//新增通用类型
export const addGenericTypeService = (genericData) => {
  // genericData.varietyid=Number(varietyData.varietyid) //变为整数
  return request.post('/cropinfo/addGenericType', genericData) //get请求必须写 {} post请求不用写
}
export const deleteGenericService = (genericid) => {
  genericid=genericid.toString()
  return request.post('/cropinfo/deleteGenericType', {genericid:genericid}) //get请求必须写 {} post请求不用写
}
