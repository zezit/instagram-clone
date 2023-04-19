<script setup lang="ts">
import { ref } from 'vue'

const search = ref("")

const searchUser = (): void => {
    if (!search.value) return

    alert(search.value)
}

const color = "primary"

</script>

<template>
    <VAppBar class="container flex-align-center" density="compact">
        <VTextField v-model.trim="search" class="shrink mx-2" variant="solo" label="Search" clearable single-line dense filled
            hide-details prepend-inner-icon="mdi-magnify" @click:prepend-inner="searchUser" @keypress.enter="searchUser"
            v-slot:prepend rounded="xl">
        </VTextField>

        <template class="flex-align-center buttons" v-slot:append>
            <v-btn class="flex-align-center" icon="mdi-bell-outline" variant="text"></v-btn>
            <v-btn class="flex-align-center" icon="mdi-send-variant-outline" variant="text"></v-btn>
            <v-btn class="flex-align-center" prepend-icon="mdi-progress-upload" variant="tonal" rounded="xl">Upload Image</v-btn>
        </template>
    </VAppBar>
</template>

<style scoped>
.flex-align-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.buttons {
    display: flex;
    align-items: right;
    justify-content: space-evenly;
}

.container {
    justify-content: space-between !important;
    margin: 0;
    padding: 0;
    flex-wrap: nowrap;
    padding: 10px 60px;
}

.mx-2 {
    max-width: 500px;
    height: 60px;
}
</style>