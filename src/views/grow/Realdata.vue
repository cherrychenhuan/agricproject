<template>
  <div>
    <div
      style="color:black;padding-left:13px;margin-top:-5px;margin-left:-5px;border-bottom:2px solid #e6e6e6b2; font-size:13px;line-height:40px;height:40px;text-align: left;">
      <el-text><el-icon>
          <Calendar />
        </el-icon>农作物数据生长监测</el-text>
    </div>
    <el-form class="calendarForm" style="margin-left:-10px;" label-width="80px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="选择地区">
            <el-cascader width="200px" :value="xarea" v-model="address" :options="areaList" :props="props"
              @change="handleChange" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="选择分类">
            <el-select @change="changeCategory" v-model="cropcategory" placeholder="选择分类">
              <el-option v-for="item in categoryname" :key="item.key" :label="item.label" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="选择作物">
            <el-select @change="changeCrop" v-model="cropid">
              <el-option v-for="(item, index) in cropnameList" :key="item.id" :label="item.cropname" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择年份">
            <el-select v-model="beginYear" @change="getEndYearList"
              style="margin-left:5px; margin-right:5px;width:100px;">
              <el-option v-for="(item, index) in beginYearList" :key="item" :label="item" :value="item" />
            </el-select>
            <span class="demonstration">~</span>
            <el-select v-model="endYear" style=" margin-right:5px;margin-left:5px;width:100px;">
              <el-option v-for="(item, index) in endYearList" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button @click="filterHistoryDatalist" type="success" size='small' :icon="Filter"
            style="height:30px;margin-left:-45px;">查看</el-button>
          <el-button type="primary" size='small' :icon="Setting" style="height:30px;margin-left:5px;"
            @click="ModelHistoryDatalist">模拟</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script setup>
</script>
<style lang="scss"></style>
