<template>
  <div>
    <el-tabs type="border-card" style="margin-left:-5px;margin-top:-5px;" @tab-change="changeTab">
      <el-tab-pane label="生产数据" style="border-bottom:0;">
        <ProductInfo></ProductInfo>
      </el-tab-pane>
      <el-tab-pane label="价格数据">
        <PriceInfo></PriceInfo>
      </el-tab-pane>
      <el-tab-pane label="成本效益">

        <Profit></Profit>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import ProductInfo from '@/admin/ProductInfo.vue'
import PriceInfo from '@/admin/PriceInfo.vue'
import Profit from '@/admin/Profit.vue'
</script>
<style lang="scss"></style>
