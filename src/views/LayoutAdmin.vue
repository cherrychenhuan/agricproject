<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import { onMounted } from 'vue'
import avatar from '@/assets/default.png'
import { vMiniWeather, vMiniWeatherIcon } from 'vue3-mini-weather'
import { useRouter } from 'vue-router';
import { UserInfoStore } from '@/stores/userInfo.js'
import { userInfoService } from "@/api/user.js"
import { locationStore } from '@/stores/location.js'
import { get } from 'lodash'
import { computed } from '@vue/reactivity'

const route = useRoute()
const userInfoStore = UserInfoStore();
const locationstore = locationStore();
const router = useRouter();
//获取当前日期
const avatarUrl = ref('')
const rawName = ref('')
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;  // 注意月份是从0开始计数的，所以需要加1
const day = currentDate.getDate();
const ndate = year + '年' + month + '月' + day + '日'
import cloneDeep from 'lodash/cloneDeep'
// console.log(year + '-' + month + '-' + day);
//定义侧栏菜单数据
const menuList = [
  { id: 1, name: '首页', path: '' },
  { id: 2, name: '智能推荐', path: '' },
  {
    id: 3,
    name: '农作物分类管理',
    path: '',
    children: [
      { id: '3-1', name: '农作物分类信息', path: '' },
      { id: '3-2', name: '作物参数及品种', path: '' }
    ]

  },
  {
    id: 4, name: '种子分类管理', path: '',
    children: [
      { id: '4-1', name: '种子信息管理', path: '' },
      { id: '4-2', name: '种子采购管理', path: '' },
      { id: '4-3', name: '种子入库管理', path: '' },
      { id: '4-4', name: '种子出库管理', path: '' },
      { id: '4-5', name: '种子收获管理', path: '' },
      { id: '4-6', name: '质量检测管理', path: '' }
    ]
  },
  {
    id: 5, name: '农事管理', path: '',
    children: [
      { id: '5-1', name: '农事日志', path: '' },
      { id: '5-2', name: '施肥记录', path: '' },
      { id: '5-3', name: '灌溉记录', path: '' },
      { id: '5-4', name: '除草记录', path: '' },
      { id: '4-5', name: '收割记录', path: '' }
    ]
  },
  { id: 6, name: '种植过程记录', path: '' },
  {
    id: 7, name: '天气数据管理', path: '',
    children: [
      { id: '7-1', name: '实时天气', path: '' },
      { id: '7-2', name: '气候类型', path: '' },
      { id: '7-3', name: '预测及预警', path: '' },
      { id: '7-4', name: '气候适应性分析', path: '' }
    ]
  },
  { id: 8, name: '收成数据管理', path: '' },
  { id: 9, name: '农业交流社区', path: '' },
  {
    id: 10, name: '地块耕地管理', path: '',
    children: [
      { id: '10-1', name: '土壤类型', path: '' },
      { id: '10-2', name: '土壤分布', path: '' },
      { id: '10-3', name: '农田管理', path: '' }
    ]

  }
]
const menuInfo = ref()

const writeTitle = async (title) => {
  menuInfo.value = title

}
const userInfo = ref({
  userId: "15027219612",
  username: "用户15027219612",
  password: "814444127604540e1fba1e28ea85b181",
  email: null,
  phone: "15027219612",
  registerTime: "2024-04-01T06:08:56.000+00:00",
  gender: null,
  age: 0,
  userType: null,
  selfintroduction: null,
  address: null,
  avatarurl: "15027219612.png"
})
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getUserInfo = async () => {
  let userid = userInfoStore.info.userId
  let result = await userInfoService(userid)
  userInfo.value = result.data
  let xxinfo = cloneDeep(userInfo.value)
  rawName.value = userInfo.value.avatarurl
  // let xurl = 'http://localhost:8080/res/user/avatars/' + result.data.avatarurl
  // xxinfo.avatarurl = xurl
  avatarUrl.value = 'http://localhost:8080/res/' + rawName.value + '?v=' + getRandomInt(1, 100).toString()
  userInfoStore.setInfo(cloneDeep(userInfo.value))
  userInfoStore.info.avatarurl = avatarUrl.value
  userInfoStore.setInfo(xxinfo)
}
getUserInfo()
//天气和城市
const thisCityName = ref()
const thisCity = ref()
const weather = ref({
  cityname: '',
  weather: '',
  temp: ''
})
// 获取天气
const getWeather = (city) => {
  //加载天气查询插件
  AMap.plugin('AMap.Weather', function () {
    //创建天气查询实例
    let weather = new AMap.Weather();
    //执行实时天气信息查询
    weather.getLive(city, function (err, data) {
      console.log(err, data);
      if (data.info == 'OK') {
        console.log(data.weather)
        weather.value.weather = data.weather
        weather.value.temp = data.temperature
      }
    });
  });
}
const getCity = () => {
  let that = this;
  let city = null;
  try {
    AMap.plugin('AMap.CitySearch', function () {
      var citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          thisCityName.value = result.province + ' ' + result.city
          weather.value.cityname = result.city
          locationstore.setLocation(result)//存储当前位置
          thisCity.value = result
          getWeather(result.city)
          console.log(result.city, '城市信息')
        }
      });
    });
  } catch {
    weather.value = {
      cityname: '',
      weather: '',
      temp: ''
    }
  }
}
getCity()
const toProfile1 = () => {

}
//获取用户详细信息

// const getUserinfo = async () => {
//   //registerData是一个响应式对象,如果要获取值,需要.value
//   let result = await userInfoService(route.query.userid)
//   //    console.log("getUserInfo",route.query.userid)
//   userinfo.value = result.data;
//   /* if (result.code === 0) {
//       //成功了
//       alert(result.msg ? result.msg : '注册成功');
//   }else{
//       //失败了
//       alert('注册失败')
//   } */
//   //alert(result.msg ? result.msg : '注册成功');
//   // ElMessage.success(result.msg ? result.msg : '注册成功')
// }
// getUserinfo();
const handleMenuItemClick = (index) => {
  // 处理菜单项点击事件
  if (index === '/recommend') {
    const data = { id: '1' };

    // 编程式导航到带参数的路由
    // router.push({ path: index, query: data });
  }
}
</script>

<template>
  <div>
    <el-container class="adminlayout-container">
      <el-aside width="190px">
        <div style="height:60px;line-height:60px;text-align:center;">
          <img style="padding-left:10px;color:#fff;float:left;" src="../assets/logo.png" height="50px" />
          <span style="margin-left:-35px;font-weight:600;">后台管理系统</span>
        </div>
        <el-menu @select="handleMenuItemClick" active-text-color="#8e8e8e" background-color="#009237" color="#fff"
          router>
          <el-menu-item index="/admin/user">
            <el-icon>
              <HomeFilled />
            </el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-sub-menu>
            <template #title>
              <el-icon>
                <List />
              </el-icon>
              <span>认证管理</span>
            </template>
            <el-menu-item index="/admin/verifyid">
              <el-icon>
                <Menu />
              </el-icon>
              <span>身份认证</span>
            </el-menu-item>
            <el-menu-item index="/admin/verifycompany">
              <el-icon>
                <Menu />
              </el-icon>
              <span>企业认证</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu>
            <template #title>
              <el-icon>
                <List />
              </el-icon>
              <span>土壤数据维护</span>
            </template>
            <el-menu-item index="/admin/soil/hwsd">
              <el-icon>
                <Menu />
              </el-icon>
              <span>土壤HWSD数据</span>
            </el-menu-item>
            <el-menu-item index="/admin/soil/soiltype">
              <el-icon>
                <Menu />
              </el-icon>
              <span>土壤类型</span>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item index='/admin/market'>
            <el-icon>
              <Promotion />
            </el-icon>
            <span>市场数据维护</span>
          </el-menu-item>

          <el-menu-item index='/admin/community'>
            <el-icon>
              <Promotion />
            </el-icon>
            <span>社区数据维护</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="layout-info">
            <span>
              <div style="font-size:12px;"><el-icon :size="20">
                  <Location />
                </el-icon></div>
              <v-mini-weather>
                <template #default="{ weather, icon }">
                  <!--插入图标-->
                  <v-mini-weather-icon :icon="icon"></v-mini-weather-icon>
                  <!--DIY内容-->

                  <div style="vertical-align: center;line-height: 40px;">杭州市钱塘区/多云/29°C</div>
                </template>
              </v-mini-weather>
            </span>
          </div>
          <div style="position:absolute;right:0;">
            <el-dropdown placement="bottom-end">
              <span class="el-dropdown__box">
                <el-icon :size="20">
                  <Message />
                </el-icon>
                <el-icon :size="20">
                  <Bell />
                </el-icon>
                &nbsp;&nbsp;<el-avatar :size="26" :src="'http://localhost:8080/user/avatars/admin1.jpeg'" />
                <div class="username">&nbsp;<span style="color:#303133;">{{ userInfoStore.info.userType
                    }}</span>&nbsp;<span style="color:#303133;">{{
                      userInfoStore.info.username }}</span></div>
                <el-icon :size="20">
                  <CaretBottom />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
                  <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                  <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
                  <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main class="layout-main" style="height:93vh;">
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>


<style lang="scss">
.adminlayout-container {
  overflow-y: hidden;
  // height: 100vh;

  // height: 100%;
  .system-name {
    // background-color: #009237; //#2B2F3A;
    color: #303133;
    height: 6vh;
    width: 189px;
    // border-right: 1px solid #dedede;
    line-height: 30px;

    // margin-bottom:10px;
    justify-content: center;
    vertical-align: center;
    // text-align: center;
    font-weight: 400;
  }

  //隐藏滚动条
  ::-webkit-scrollbar {
    display: none;
  }

  .el-aside {
    background-color: #009237; //#304156;
    // overflow-y:hidden; //隐藏滚动条不管用，这是直接不显示下方
    // height: 100vh;
    color: #dedfe0;

    &__logo {
      height: 120px;
      color: #f4f4f5;
      // background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }

    border-right: 1px solid #e6e6e6b2;

    .el-menu {
      border-right: none;
      // height: 100vh;
      overflow-y: auto;


    }

    .el-menu-item,
    .el-sub-menu__title {
      color: #dedfe0;
      font-size: 13px;
    }

  }

  .el-header {
    height: 6vh;
    background-color: #f0f9eb;
    // background-image: linear-gradient(to right, #0C86D8, #114DB9);
    // background-color: #5c5c5c;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    color: #303133;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #303133;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }

    .layout-info {
      // margin-left: 5px;
      position: absolute;
      top: 12px;
      left: 200px;
      color: #303133;
      vertical-align: center;
      display: inline-block;

      .v-weather {
        padding: 0;
        position: absolute;
        top: -10px;
        left: 20px;
        display: flex;
        width: 300px;
        font-size: 12px;

        .v-mini-weather-icon {
          width: 40px;
          height: 40px;
          margin-right: 3px;
        }
      }
    }
  }

  .el-main {
    background-color: #ffffff;
    border-top: 3px solid #e6e6e6b2;
    height: 100vh;

    ::-webkit-scrollbar {
      display: none;
    }
  }



  // /*修改存放图标和文本的大盒子的样式*/
  // .weather-info {
  //   display: flex;
  //   align-items: center;
  // }

  // /*修改图标样式*/
  // .weather-icon {
  //   width: 40px;
  //   height: 40px;
  //   margin-right: 10px;
  // }

  /*修改文本样式*/
  .weather-text {
    color: #000;
  }

  .username {
    color: #fff;
    font-size: 13px;
  }

  .layout-under {
    height: 92.5vh;

  }

  //设置按钮点击后
  .el-menu-item.is-active {
    background-color: #fff !important;
    color: #009238;
  }

  // .el-menu-item:hover {
  //     background-color: #999999 !important;

  // }
}

.layout-main {
  padding: 5px; //
  // background-color:rgb(207, 225, 234);
}
</style>
