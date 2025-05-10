
import { defineStore } from "pinia";
import {ref} from 'vue'
export const locationStore = defineStore('location',()=>{
  //定义状态的内容

  //1.响应式变量
  const location = ref({})

  //2.定义一个函数,修改token的值
  const setLocation = (newLocation)=>{
    location.value = newLocation
  }

  //3.函数,移除token的值
  const removeLocation = ()=>{
    location.value={}
  }

  return {
    location,setLocation,removeLocation
  }
},{
  persist:true//持久化存储
});
// const pinia = createPinia();
// pinia.use(piniaPluginPersistedstate);
// export default locationStore;
