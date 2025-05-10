import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useElMenuActiveStore = defineStore('elMenuActive', () => {
  const elMenuActive = ref('')

  return { elMenuActive }
},{persist:true})
