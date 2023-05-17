<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { userCredentials } from './stores/userCred'

const userLog = userCredentials()
const { getUser } = userLog

onMounted(() => {
  getUser()
})

</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="route">
      <component :is="Component"></component>
    </Transition>
  </RouterView>
</template>

<style scoped>
body {
  background-color: #fff;
  height: 100vh;
  width: 100vw;
}

.route-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.route-enter-active {
  transition: all 0.2s ease;
}
</style>