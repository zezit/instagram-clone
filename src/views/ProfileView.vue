<script setup lang="ts">
import { storeToRefs } from "pinia"

import { userCredentials } from '../stores/userCred'
import supabase from "../supabase"

import TopNav from "../components/TopNav.vue"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const noPhotoPath: string = "https://static-00.iconduck.com/assets.00/person-icon-473x512-6lsjfavs.png"

const userLog = userCredentials()
const { geUserPhotos, loadProfilePicture } = userLog

const { user, blurBackground, photos } = storeToRefs(userLog)
const route = useRoute()

const usernamePage = ref<string | string[] | null>(null)
const loadingImages = ref<boolean>(false)
const loadingImagesProf = ref<boolean>(false)
const showEditOverlay = ref<boolean>(false)
const editModal = ref<boolean>(false)
const errorMessage = ref<string | null>(null)

const geUserFollowers: number = 100
const geUserFollowing: number = 100

onMounted(async () => {
    usernamePage.value = route.params.username
    await loadProfilePicture()
})

const openEditModal = async () => {
    editModal.value = true
    loadingImagesProf.value = true
    await geUserPhotos(user.value.username)
    if (photos.value.length === 0) {
        loadingImagesProf.value = false
        editModal.value = false
    }
    loadingImagesProf.value = false
}

const choseProfilePic = async (e) => {
    loadingImagesProf.value = true

    const { data, error } = await supabase
        .from('users')
        .update({
            profile_pic: e.target.id
        })
        .match({
            username: user.value.username
        })

    if (error) {
        errorMessage.value = error.message
        loadingImagesProf.value = false
        return
    }

    user.value.profilePicture = `https://djgjxxrclvawttbvoram.supabase.co/storage/v1/object/public/all_photos/${e.target.id}`

    loadingImagesProf.value = false
    editModal.value = false
    errorMessage.value = null
}

</script>

<template>
    <main :class="{
        'blur-background': blurBackground
    }">
        <VCard>
            <v-dialog v-model="editModal" max-width="500px">
                <v-card>
                    <v-card-title class="headline">Choose Photo</v-card-title>
                    <v-card-text>
                        <v-row justify="center">
                            <v-col v-if="!loadingImagesProf" v-for="photo in photos" :key="photo.url" cols="6" sm="4" md="3"
                                lg="3" xl="3" class="photo-container" justify="center">
                                <v-img
                                    :src="`https://djgjxxrclvawttbvoram.supabase.co/storage/v1/object/public/all_photos/${photo.url}`"
                                    alt="photo" height="250" width="250" class="photo-image">
                                </v-img>
                                <div :id="photo.url" class="photo-overlay" @click="(e) => choseProfilePic(e)">
                                    <v-img :src="photo.url" alt="Photo" class="popup-image"></v-img>
                                </div>
                            </v-col>
                            <v-col v-else>
                                <v-row justify="center" class="spiner" size="64">
                                    <v-progress-circular indeterminate></v-progress-circular>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-text>
                        <Transition name="error">
                            <p v-if="errorMessage" class="errorc">
                                {{ errorMessage }}
                            </p>
                        </Transition>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="() => {
                            editModal = false
                            errorMessage = null
                        }">Cancel</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <VLayout>
                <TopNav />
                <VMain style="min-height: 100vh;" class="content">
                    <v-container fluid>
                        <v-row align="center">
                            <v-col cols="4" sm="3" md="2">
                                <v-avatar size="150">
                                    <img @mouseover="showEditOverlay = true" class="profile-pic"
                                        :src="user.profilePicture ? user.profilePicture : noPhotoPath"
                                        alt="Profile Picture">
                                    <div class="edit-overlay" v-if="showEditOverlay" @click="openEditModal">
                                        <v-icon class="edit-icon">mdi-pencil</v-icon>
                                    </div>
                                </v-avatar>
                            </v-col>
                            <v-col cols="8" sm="9" md="10" class="userData">
                                <div>
                                    <div class="text-h5">{{ `${user.fName} ${user.lName}` }}</div>
                                    <div> @{{ user.username }}</div>
                                </div>

                                <div class="follow">
                                    <span>{{ geUserFollowers }} followers</span>
                                    <span>{{ geUserFollowing }} following</span>
                                </div>
                            </v-col>
                        </v-row>

                        <v-divider style="margin-top: 30px"></v-divider>

                        <v-row class="mt-4 photosAll" v-if="geUserPhotos(usernamePage)">
                            <v-col v-if="!loadingImages" v-for="photo in photos" :key="photo.url" cols="6" sm="4" md="3"
                                lg="3" xl="3">
                                <div class="photo-container">
                                    <v-img
                                        :src="`https://djgjxxrclvawttbvoram.supabase.co/storage/v1/object/public/all_photos/${photo.url}`"
                                        alt="Photo" class="photo-image"></v-img>
                                    <div class="photo-overlay">
                                        <v-img :src="photo.url" alt="Photo" class="popup-image"></v-img>
                                    </div>
                                </div>
                            </v-col>
                            <v-col v-else class="photo-container" justify="center" cols="6" sm="4" md="3" lg="3" xl="3">
                                <v-row justify="center" class="spiner" size="64">
                                    <v-progress-circular indeterminate></v-progress-circular>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row justify="center" v-else class="mt-4">
                            <v-col cols="12" sm="8" md="6" class="text-center">
                                <p class="text-h5">No photos yet.</p>
                                <p>Share your first photo!</p>
                            </v-col>
                        </v-row>
                    </v-container>
                </VMain>
            </VLayout>
        </VCard>
    </main>
</template>

<style scoped>
.content {
    padding-top: 100px;
    padding-left: 20px;
}

.text-h5 {
    font-size: 1.5rem;
    font-weight: bold;
}

.v-row>.v-col {
    padding: 0.5rem;
}

.follow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 250px;
    width: 100%;
}

.profile-pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.userData {
    width: 100%;
    display: flex;
    gap: 15px;
    align-items: flex-start;
    flex-direction: column;
}

.text-center {
    text-align: center;
}

.photo-container {
    position: relative;
    margin-bottom: 20px;
    width: 200px;
    height: 200px;
}

.photo-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.photo-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.popup-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 90%;
    max-height: 90%;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.photo-container:hover .photo-overlay {
    opacity: 0.5;
    cursor: pointer;
}

.photo-container:hover .popup-image {
    opacity: 0.5;
}

@media (max-width: 600px) {
    .photo-container {
        margin-bottom: 0;
        width: 100%;
        height: auto;
        padding-bottom: 100%;
    }
}

.spiner {
    margin-top: 150px;
}

.edit-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
}

.edit-icon {
    color: white;
    font-size: 24px;
}

.profile-pic:hover+.edit-overlay,
.edit-overlay:hover {
    opacity: 1;
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