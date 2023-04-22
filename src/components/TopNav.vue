<script setup lang="ts">
import { ref } from 'vue'
import { userCredentials } from "../stores/userCred"
import LogOutButton from './LogOutButton.vue'

const userLog = userCredentials()
const search = ref("")

const searchUser = (): void => {
    if (!search.value) return

    alert(search.value)
}

const color = "primary"
</script>

<template>
    <VAppBar class="container flex-align-center">
        <VTextField v-model.trim="search" class="shrink mx-2" variant="solo" label="Search" clearable single-line dense
            filled hide-details prepend-inner-icon="mdi-magnify" @click:prepend-inner="searchUser"
            @keypress.enter="searchUser" v-slot:prepend rounded="xl" density="compact">
        </VTextField>

        <template class="flex-align-center buttons" v-slot:append>
            <v-btn v-if="userLog.userLogged" class="flex-align-center" icon="mdi-bell-outline" variant="text"></v-btn>
            <v-btn v-if="userLog.userLogged" class="flex-align-center" icon="mdi-send-variant-outline"
                variant="text"></v-btn>
            <v-btn v-if="userLog.userLogged" class="flex-align-center upload-image" prepend-icon="mdi-progress-upload"
                variant="tonal" color="white" rounded="xl">Upload
                Image</v-btn>
            <v-btn v-if="userLog.userLogged" class="flex-align-center prof" icon="mdi-account-circle-outline"
                variant="text"></v-btn>

            <LogOutButton v-else="userLog.userLogged" :rail="false"/>
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
    height: 40px;
}

.prof {
    margin-left: 30px;
}

.upload-image {
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(116, 9, 121, 1) 0%, rgba(251, 3, 66, 1) 100%, rgba(0, 212, 255, 1) 100%);
}
</style>