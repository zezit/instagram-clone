<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LeftNav from "./components/Nav.vue"
import TopNav from "./components/TopNav.vue"

</script>

<template>
  <VCard>
    <VLayout>
      <LeftNav />
      <TopNav />

      <VMain style="min-height: 300px;"></VMain>

    </VLayout>
  </VCard>
</template>

<style scoped></style>
