import { createRouter, createWebHistory } from 'vue-router'
//导入组件
import { useElMenuActiveStore } from '@/stores/elMenuActiveStore'
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'
import Growmodeldata from '@/views/grow/ModelData.vue'
import Growrealdata from '@/views/grow/RealData.vue'
import LayoutAdminVue from '@/views/LayoutAdmin.vue'
import Cropcategory from '@/views/cropinfo/Cropcategory.vue'
import Cropparam from '@/views/cropinfo/Cropparam.vue'
import TreeInfo from '@/views/cropinfo/TreeInfo.vue'
import ArcGisMap from '@/components/ArcGisMap.vue'
import Homepage from '@/views/homepage/Homepage.vue'
import Recommend from '@/views/recommend/Recommend.vue'
import Cropcalendar from '@/views/argomanagement/CropCalendar.vue'
import Historydata from '@/views/weather/Historydata.vue'
import Realtimedata from '@/views/weather/Realtimedata.vue'
import Landmanage from '@/views/landandsoil/Landmanage.vue'
import Soiltype from '@/views/landandsoil/Soiltype.vue'
import Profile from '@/views/user/Profile.vue'
import History from '@/views/user/History.vue'
import Account from '@/views/user/Account.vue'
import Verifyinfo from '@/views/user/Verifyinfo.vue'
import Commpany from '@/views/commpany/Commpany.vue'
import RecommendArgo from '@/views/argomanagement/RecommendArgo.vue'
import AdminUser from '@/admin/User.vue'
import AdminVerifyID from '@/admin/VerifyID.vue'
import AdminVerifyCompany from '@/admin/VerifyCompany.vue'
import AdminHwsd from '@/admin/Hwsd.vue'
import AdminSoiltype from '@/admin/SoilType.vue'
import AdminMarket from '@/admin/Market.vue'
import AdminCommunity from '@/admin/Community.vue'
import Detailinfo from '@/views/commpany/Detailinfo.vue'
//定义路由关系
const routes = [
    { path: '/login', component: LoginVue, },
    {
        component: LayoutVue,
        path:'/',
        name:'Home',
        redirect:'/home',
        children:[
            {path:'/cropinfo/cropcategory',component: Cropcategory},
            {path:'/cropinfo/treeinfo',component: TreeInfo},
            {path:'/cropinfo/cropparam',component: Cropparam},
            {path:'/grow/modeldata',component: Growmodeldata},
            {path:'/grow/realdata',component: Growrealdata},
            {path:'/recommend',component: Recommend,name:'Recommend'},
            {path:'/argomanagement/plan',component: Cropcalendar,name:'Cropcalendar'},
            {path:'/argomanagement/recommendplan',component: RecommendArgo,name:'RecommendArgo'},
            {path:'/weather/historydata',component: Historydata,name:'Historydata'},
            {path:'/weather/realtimedata',component: Realtimedata,name:'Realtimedata'},
            {path:'/landsoil/land',component: Landmanage,name:'Landmanage'},
            {path:'/landsoil/soil',component: Soiltype,name:'Soiltype'},
            {path:'/home',component: ()=>import ('@/views/homepage/Homepage.vue')},
            {path:'/user/profile',component: Profile},
            {path:'/user/account',component: Account},
            {path:'/user/auth',component: Verifyinfo},
            {path:'/user/history',component: History},
            {path:'/commpany',component: Commpany},
            {path:'/commpany/detailinnfo',component:Detailinfo}
        ],
        props: true
    },
    {
      component: LayoutAdminVue,
      path:'/admin',
      name:'Admin',
      redirect:'/admin/user',
      children:[
          {path:'/admin/user',component: AdminUser},
          {path:'/admin/verifyid',component: AdminVerifyID},
          {path:'/admin/verifycompany',component: AdminVerifyCompany},
          {path:'/admin/soil/hwsd',component: AdminHwsd},
          {path:'/admin/soil/soiltype',component: AdminSoiltype},
          {path:'/admin/market',component: AdminMarket},
          {path:'/admin/community',component: AdminCommunity}
      ],
      props: true
  }
]
//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
router.beforeEach((to, from, next) => {
  // el-menu 高亮
  useElMenuActiveStore().elMenuActive = to.path
  // ...
  next()
})
//导出路由
export default router
