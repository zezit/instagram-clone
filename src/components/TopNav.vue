<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { RouteLocationNormalizedLoaded, RouteRecordName, useRoute } from 'vue-router'

import { userCredentials } from "../stores/userCred"
import LogButton from './LogButton.vue'
import router from '../router'
import supabase from '../supabase'

interface FileUpload {
    file: File
    caption: string
}

const userLog = userCredentials()
const { geUserPhotos } = userLog
const { user } = storeToRefs(userLog)
const { toggleDialog } = userLog
const route = useRoute()

const search = ref<string | null>(null)
const isProfilePage = ref<boolean>(false)
const showModal = ref<boolean>(false)
const selectedFile = ref<FileUpload>({
    file: null,
    caption: ''
})
const errorMessage = ref<string | null>(null)
const loadingUpload = ref<boolean>(false)

onMounted(() => {
    verifyPage(route.name)
})

watch(() => route, (value: RouteLocationNormalizedLoaded) => {
    verifyPage(value.name)
})

const verifyPage = (value: RouteRecordName) => {
    if (value === 'profile') {
        isProfilePage.value = true
    } else {
        isProfilePage.value = false
    }
}

const goToHome = (): void => {
    router.push('/')
}

const searchUser = (): void => {
}

const openUploadPhotoModal = () => {
    showModal.value = true;
}

const cancelUpload = () => {
    showModal.value = false;
    selectedFile.value = null;
}

const handlePhotoUpload = (e) => {
    const file = e.target.files[0]

    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        errorMessage.value = 'Please select a valid image to upload (png, jpg, jpeg)'
        selectedFile.value.file = null
        return
    }

    if (file) {
        selectedFile.value.file = file
        return
    }

    selectedFile.value.file = null
}

const uploadPhoto = async () => {
    loadingUpload.value = true

    if (!selectedFile.value.file) {
        errorMessage.value = 'Please select an image to upload'
        loadingUpload.value = false
        return
    }

    const url = `public/${uuid_generate_v4()}`
    const { data, error } = await supabase.storage.from('all_photos').upload(url, selectedFile.value.file)

    if (error) {
        errorMessage.value = error.message
        loadingUpload.value = false
        return
    }

    const { data: userData, error: userError } = await supabase.from('users').select('id').eq('email', user.value.email).single()

    if (userError) {
        errorMessage.value = userError.message
        loadingUpload.value = false
        return
    }

    const { data: photoData, error: photoError } = await supabase.from('photos').insert({
        owner: userData.id,
        url: url,
        caption: selectedFile.value.caption
    })

    if (photoError) {
        errorMessage.value = photoError.message
        loadingUpload.value = false
        return
    }

    geUserPhotos(user.value.username)

    showModal.value = false;
    selectedFile.value.file = null;
    selectedFile.value.caption = '';
    errorMessage.value = null;
    loadingUpload.value = false
}


const uuid_generate_v4 = (): string => {
    const crypto = window.crypto
    const uuid = crypto.getRandomValues(new Uint32Array(4)).join('-')
    return uuid
}
</script>

<template>
    <VAppBar class="container flex-align-center">
        <v-btn icon @click="goToHome" v-if="isProfilePage" class="homeButton">
            <v-icon icon="mdi-instagram" size="x-large" />
        </v-btn>

        <VTextField v-model.trim="search" class="shrink mx-2" variant="solo" label="Search" clearable single-line dense
            filled hide-details prepend-inner-icon="mdi-magnify" @click:prepend-inner="searchUser"
            @keypress.enter="searchUser" v-slot:prepend rounded="xl" density="compact">
        </VTextField>

        <template class="flex-align-center buttons" v-slot:append>
            <v-btn v-if="user" class="flex-align-center" icon="mdi-bell-outline" variant="text"></v-btn>
            <v-btn v-if="user" class="flex-align-center" icon="mdi-send-variant-outline" variant="text"></v-btn>
            <v-btn v-if="user" class="flex-align-center upload-image" prepend-icon="mdi-progress-upload" variant="tonal"
                @click="openUploadPhotoModal" color="white" rounded="xl">Upload
                Image</v-btn>
            <v-btn v-if="user" class="flex-align-center prof" icon="mdi-account-circle-outline" variant="text"></v-btn>

            <LogButton v-else :rail="false" @click="toggleDialog" />
        </template>

        <v-dialog v-model="showModal" max-width="500px">
            <v-card v-if="!loadingUpload">
                <v-card-title class="headline">Upload Photo</v-card-title>
                <v-card-text>
                    <v-file-input place-placeholder="Select Photo" variant="filled" clearable loading="true"
                        accept="image/png, image/jpeg, image/jpg" prepend-icon="mdi-camera" :multiple="false"
                        @change="handlePhotoUpload">
                    </v-file-input>
                </v-card-text>
                <v-card-text>
                    <v-text-field v-model="selectedFile.caption" label="Caption" hide-details="auto"
                        :maxLength="255"></v-text-field>
                </v-card-text>

                <Transition name="error">
                    <p v-if="errorMessage" class="errorc">
                        {{ errorMessage }}
                    </p>
                </Transition>

                <v-card-actions>
                    <v-btn @click="uploadPhoto">Upload</v-btn>
                    <v-btn @click="cancelUpload">Cancel</v-btn>
                </v-card-actions>
            </v-card>

            <v-card v-else>
                <v-card-text>
                    <v-progress-circular indeterminate size="64"></v-progress-circular>
                </v-card-text>
            </v-card>
        </v-dialog>
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

.homeButton {
    margin-right: 60px;
}

.error-enter-active,
.error-leave-active {
    transition: transform 0.3s;
}

.error-enter,
.error-leave-to,
.error-enter-from {
    transform: translateX(-100%);
}

.errorc {
    color: red;
    font-weight: 400;
    margin: 0 0 5px 20px;
}
</style>