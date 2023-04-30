<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  <Transition name="route">
    <RouterView />
  </Transition>
</template>

<style scoped>
.route-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.route-enter-active {
  transition: all 0.2s ease;
}
</style>