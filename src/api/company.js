import request from '@/utils/request.js'

export const getTopicDataListService=()=>{
  return request.get('/company/getTopiclist',)
}

export const getCommentListService=(params)=>{
  return request.get('/company/getCommentList',{params:params})
}
export const addCommentService=(params)=>{
  return request.get('/company/addComment',{params:params})
}
export const addTopicService=(params)=>{
  return request.get('/company/addTopic',{params:params})
}
export const uploadTopicImgService=(fileObj, name)=>{
  const form = new FormData();
  // 文件对象,key是后台接受的参数名称
  form.append("file", fileObj);
  form.append("name", name);
  return request.post('/uploadTopicImg', form)
}
export const getKnowledgeListService=()=>{
  return request.get('/company/getKnowledgeList',)
}
export const getifCollectService=(params)=>{
  return request.get('/company/getifCollect',{params:params})
}
export const addCollectService=(params)=>{
  return request.get('/company/addCollect',{params:params})
}
export const deleteCollectService=(params)=>{
  return request.get('/company/deleteCollect',{params:params})
}
export const getxCommentListService=(params)=>{
  return request.get('/company/getxCommentList',{params:params})
}
