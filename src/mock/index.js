import Mock from 'mockjs';
 
Mock.mock('/api/hello', {
  'code': 200,
  'name': 'test helloController', 
});
 
Mock.mock('/api/user/name', 'post', function(param){
  let data = param.body
  return 'hello ' + data
});