<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import { useElMenuActiveStore } from '@/stores/elMenuActiveStore'
import { onMounted } from 'vue'
import { computed } from '@vue/reactivity'
import avatar from '@/assets/default.png'
import { vMiniWeather, vMiniWeatherIcon } from 'vue3-mini-weather'
import { useRouter } from 'vue-router';
import { UserInfoStore } from '@/stores/userInfo.js'
import { userInfoService } from "@/api/user.js"
import { locationStore } from '@/stores/location.js'
import { get } from 'lodash'
const route = useRoute()
const userInfoStore = UserInfoStore();
const locationstore = locationStore();
const router = useRouter();
const mainMenu = ref(null)
//获取当前日期
const rawName = ref('')
const avatarUrl = ref('')
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;  // 注意月份是从0开始计数的，所以需要加1
const day = currentDate.getDate();
const ndate = year + '年' + month + '月' + day + '日'
import cloneDeep from 'lodash/cloneDeep'
const defautindex = ref("/home")
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
  rawName.value = userInfo.value.avatarurl
  // let xurl = 'http://localhost:8080/res/user/avatars/' + result.data.avatarurl
  // xxinfo.avatarurl = xurl
  avatarUrl.value = 'http://localhost:8080/res/' + rawName.value + '?v=' + getRandomInt(1, 100).toString()
  userInfoStore.setInfo(cloneDeep(userInfo.value))
  userInfoStore.info.avatarurl = avatarUrl.value
}
getUserInfo()
//天气和城市
const thisCityName = ref()
const thisCity = ref()
const weather = ref({
  cityname: '江干',
  weather: '多云',
  temp: '17'
})
// 获取天气
const getWeather = (city) => {
  //加载天气查询插件
  AMap.plugin('AMap.Weather', function () {
    //创建天气查询实例
    let weather = new AMap.Weather();
    //执行实时天气信息查询
    weather.getLive(city, function (err, data) {
      if (data.info == 'OK') {
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
          //位置代码

          locationstore.location.areacode = result.adcode + '000000'
          locationstore.location.province = result.province
          locationstore.location.city = result.city

          thisCity.value = result
          getWeather(result.city)
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
const toProfile = () => {
  // router.push({ path: '/user/profile' })
  // mainMenu.value.open("6")
  // console.log("mainMenu",mainMenu.value)
  defautindex.value = "/user/profile"
}
const toResetPwd = () => {
  router.push({ path: '/user/account' })
  mainMenu.value.open("6")
  // console.log("mainMenu",mainMenu.value)
  defautindex.value = "/user/account"
}
const toLogout = () => {
  router.push({ path: '/login' })
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
defautindex.value = computed(() => {
  return useElMenuActiveStore().elMenuActive
})
</script>

<template>
  <div>
    <el-container class="layout-container">
      <!-- 头部区域 -->
      <el-header>
        <div class="system-name">
          <span>
            <img style="color:#fff;float:left;" src="../assets/logo.png" height="40px" />
            <!-- <el-icon><DataAnalysis /></el-icon> -->
            <div style="font-weight:700;font-size:16px;height:40px;line-height:40px;margin-left: 0px;">农作物智能推荐系统</div>
          </span>
        </div>
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

                <!-- <div style="vertical-align: center;line-height: 40px;">{{ weather.cityname }}/{{ weather.weather }}/{{
                  weather.temp }}°C</div> -->
                <div style="vertical-align: center;line-height: 40px;">杭州市钱塘区/多云/29°C</div>
              </template>
            </v-mini-weather>
          </span>
        </div>
        <div style="margin-right:10px;">
          <el-dropdown placement="bottom-end">
            <span class="el-dropdown__box">
              <el-icon :size="20">
                <Message />
              </el-icon>
              <el-icon :size="20">
                <Bell />
              </el-icon>
              <el-avatar :size="26" style="margin-left:5px;" :src="userInfoStore.info.avatarurl" />
              <div class="username"><span style="color:#fff;margin-left:5px;">{{ userInfoStore.info.userType
                  }}</span><span>{{
                    userInfoStore.info.username }}</span></div>

            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile" :icon="User" @click="toProfile">修改个人资料</el-dropdown-item>
                <el-dropdown-item command="password" @click="toResetPwd" :icon="EditPen">重置密码</el-dropdown-item>
                <el-dropdown-item command="logout" :icon="SwitchButton" @click="toLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container class="layout-under">
        <!-- 左侧菜单 -->
        <el-aside width="190px">
          <el-menu @select="handleMenuItemClick" ref="mainMenu" :default-active="defautindex"
            active-text-color="#8e8e8e" background-color="#F6F6F6" color="#7d7d7d" router>
            <el-menu-item index="/home">
              <el-icon>
                <HomeFilled />
              </el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/recommend" :route="{ name: 'Recommend', params: { state: thisCity } }">
              <el-icon>
                <Promotion />
              </el-icon>
              <span>智能推荐</span>
            </el-menu-item>
            <el-sub-menu>

              <template #title>
                <el-icon>
                  <List />
                </el-icon>
                <span>农作物分类管理</span>
              </template>
              <el-menu-item index="/cropinfo/cropcategory" @click.native="writeTitle('农作物分类信息')">
                <el-icon>
                  <Menu />
                </el-icon>
                <span>农作物分类信息</span>
              </el-menu-item>
              <el-menu-item index="/cropinfo/cropparam" @click.native="writeTitle('作物参数及品种')">
                <el-icon>
                  <Menu />
                </el-icon>
                <span>作物参数及品种</span>
              </el-menu-item>
              <!-- <el-menu-item index="/cropinfo/treeinfo" @click.native="writeTitle('农作物分类信息')">
                <el-icon>
                  <Menu />
                </el-icon>
                <span>分类树</span>
              </el-menu-item> -->
            </el-sub-menu>
            <el-sub-menu index="3">

              <template #title>
                <el-icon>
                  <Management />
                </el-icon>
                <span>农事管理</span>
              </template>
              <el-menu-item index="/argomanagement/plan">
                <el-icon>
                  <Histogram />
                </el-icon>
                <span>农事计划</span>
              </el-menu-item>
              <el-menu-item index="/argomanagement/recommendplan">
                <el-icon>
                  <Crop />
                </el-icon>
                <span>农事推荐记录</span>
              </el-menu-item>
              <!-- <el-menu-item>
                <el-icon>
                  <EditPen />
                </el-icon>
                <span>灌溉记录</span>
              </el-menu-item>
              <el-menu-item>
                <el-icon>
                  <EditPen />
                </el-icon>
                <span>收割记录</span>
              </el-menu-item> -->
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon>
                  <TrendCharts />
                </el-icon>
                <span>生长数据管理</span>
              </template>
              <el-menu-item index="/grow/realdata">
                <el-icon>
                  <Clock />
                </el-icon>
                <span>真实数据</span>
              </el-menu-item>
              <el-menu-item index="/grow/modeldata">
                <el-icon>
                  <Timer />
                </el-icon>
                <span>模拟数据</span>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="5">

              <template #title>
                <el-icon>
                  <UserFilled />
                </el-icon>
                <span>天气数据管理</span>
              </template>
              <el-menu-item index="/weather/historydata">
                <el-icon>
                  <Clock />
                </el-icon>
                <span>历史天气</span>
              </el-menu-item>
              <el-menu-item index="/weather/realtimedata">
                <el-icon>
                  <Timer />
                </el-icon>
                <span>实时天气</span>
              </el-menu-item>

            </el-sub-menu>
            <el-menu-item>
              <el-icon>
                <TrendCharts />
              </el-icon>
              <span>收成数据管理
              </span>
            </el-menu-item>
            <el-menu-item index="/commpany">
              <el-icon>
                <HelpFilled />
              </el-icon>
              <span>知识与讨论
              </span>
            </el-menu-item>
            <el-sub-menu index="7">

              <template #title>
                <el-icon>
                  <Grid />
                </el-icon>
                <span>土壤数据管理</span>
              </template>

              <el-menu-item index="/landsoil/land">
                <el-icon>
                  <EditPen />
                </el-icon>
                <span>土壤参数</span>
              </el-menu-item>
              <el-menu-item index="/landsoil/soil">
                <el-icon>
                  <User />
                </el-icon>
                <span>土壤类型及分布</span>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="6">

              <template #title>
                <el-icon>
                  <UserFilled />
                </el-icon>
                <span>用户中心</span>
              </template>

              <el-menu-item index="/user/profile" :route="{ path: '/user/profile', state: userInfo }">
                <el-icon>
                  <Notebook />
                </el-icon>
                <span>用户资料</span>
              </el-menu-item>
              <el-menu-item index="/user/account">
                <el-icon>
                  <Setting />
                </el-icon>
                <span>账号设置</span>
              </el-menu-item>
              <el-menu-item index="/user/auth">
                <el-icon>
                  <DocumentChecked />
                </el-icon>
                <span>信息认证</span>
              </el-menu-item>
              <el-menu-item index="/user/history">
                <el-icon>
                  <Clock />
                </el-icon>
                <span>我的历史</span>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <!-- 右侧主区域 -->
        <el-main class="layout-main">
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style lang="scss">
.layout-container {
  overflow-y: hidden;
  // height: 100vh;

  // height: 100%;
  .system-name {
    background-color: #009237; //#2B2F3A;
    color: #fff;
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
    background-color: #F6F6F6; //#304156;
    // overflow-y:hidden; //隐藏滚动条不管用，这是直接不显示下方
    // height: 100vh;
    color: #7d7d7d;

    &__logo {
      height: 120px;
      color: #8e8e8e;
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
      color: #606266;
      font-size: 13px;
    }

  }

  .el-header {
    display: flex;
    height: 6vh;
    background-color: #009237;
    // background-image: linear-gradient(to right, #0C86D8, #114DB9);
    // background-color: #5c5c5c;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    color: #fff;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #fff;
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
      // color: #949494;
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
