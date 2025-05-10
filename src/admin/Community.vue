<template>
  <div>
    <el-tabs type="border-card" style="margin-left:-5px;margin-top:-5px;" @tab-change="changeTab">
      <el-tab-pane label="讨论资讯" style="border-bottom:0;">
        <TopicVue></TopicVue>
      </el-tab-pane>
      <el-tab-pane label="科普知识">
        <Knowledge></Knowledge>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import TopicVue from '@/admin/TopicVue.vue'
import Knowledge from '@/admin/Knowledge.vue'
import Profit from '@/admin/Profit.vue'
</script>
<style lang="scss"></style>
