<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div
          style="border-bottom:3px solid #e6e6e6b2;font-size:15px;font-family:'楷体' ;padding-left:10px;background-color:aliceblue;height:40px;line-height:40px;">
          <el-text style="font-size:15px;font-family:'楷体';">
            <el-icon>
              <Place />
            </el-icon>{{ location.province.name }}{{ location.city.name }}{{ location.county ? location.county.name : ''
            }}
          </el-text>
          <el-text><span style="margin-left:10px;">{{ location.lat <= 32 ? '秦岭淮河以南' : '秦岭淮河以北' }}</span>
                <span style="margin-left:5px;">选取作物：</span>
                <el-tag style="margin:0 5px 3px 0;" v-for="item in crops" :key="item" type="danger">
            {{ item.name }}
          </el-tag>

          </el-text>
        </div>
      </el-col>
    </el-row>
    <div class="projectClass">

    </div>
  </div>
</template>
<script setup>
import cloneDeep from 'lodash/cloneDeep'
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { cropAllDataService } from "@/api/cropcategory.js"
import { getRecommendProjectService, getRecommendIndexService } from "@/api/recommend.js"
import * as echarts from 'echarts';
const props = defineProps({
  location: {
    type: Object,
    required: true
  },
  checkedCrops: {
    type: Object,
    required: true
  },
  yearRange: {
    type: Array,
    required: true
  },
})
const location = props.location
const crops = props.checkedCrops
const yearRange = props.yearRange
const getRecommendProject = async () => {
  // console.log(location)
  // let result=await getRecommendProjectService({ lon: location.lon, lat: location.lat, areacode: location.code, cropid: crops[i].id, year:(new Date().getFullYear()-1).toString() })
  let data = ",19.0,102.0,10.0,10.0,14.0,67.0,20.0,23.0,16.0,24.0,23.0,23.0,20.0,88.0,90.0,88.0,0.38,1.01,1.51,20.0,24.0,14.0,20.0,19.0,21.0,14.0,27.0,14.0,0.0,10.0&,4106.55"
  // let data=result.data
  let arr1 = data.split('&')[0].split(',')
  let str2 = data.split('&')[1]
  // for(let i=1;i<arr1.length;i++){
  //   if(i/30==0)
  // }

}
getRecommendProject()
</script>
<style lang="scss">
.projectClass {
  width: 100%;
  height: 85vh;
  background-image: url('@/assets/bg_2.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
