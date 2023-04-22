import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userCredentials = defineStore('userLog', () => {
  const userLogged = ref(false)

  return { userLogged }
})
