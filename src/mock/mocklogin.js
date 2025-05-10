import Mock from 'mockjs';

const StudentData = Mock.mock({});
Mock.mock('/api/user/register', 'post', function(data){
    let user = JSON.parse(data.body)
    user.id = user.userid
    user.score = parseInt(student.score)
    // StudentData.data.push(student)
    const resMsg = {
      'code': 200,
      'msg': '添加成功',
      user
    }
    return resMsg
  });
