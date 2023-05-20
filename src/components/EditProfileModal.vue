<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue";
import { userCredentials } from '../stores/userCred'
import supabase from "../supabase"
import { storeToRefs } from "pinia";

const userLog = userCredentials()
const { geUserPhotos, loadProfilePicture } = userLog
const { user, photos } = storeToRefs(userLog)

const errorMessage = ref<string | null>(null);
const loadingImagesProf = ref<boolean>(false);

const { closeEditModal } = defineProps({
    closeEditModal: Function
});

// on mounted console log
onMounted(async () => {
    loadingImagesProf.value = true
    await geUserPhotos(user.value.username)
    if (photos.value.length === 0) {
        loadingImagesProf.value = false
        closeEditModal()
    }
    loadingImagesProf.value = false
})

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
    closeEditModal()
    errorMessage.value = null
}

const cancelEdit = () => {
    errorMessage.value = null
    closeEditModal()
}

</script>

<template>
    <v-dialog max-width="800px" class="modalContainer">
        <v-card-title class="headline">Choose Photo</v-card-title>
        <v-card-text>
            <v-row justify="center">
                <div v-if="!loadingImagesProf" class="allPhoto">
                    <v-col v-for="photo in photos" :key="photo.url" class="photo-container" justify="center">
                        <v-img
                            :src="`https://djgjxxrclvawttbvoram.supabase.co/storage/v1/object/public/all_photos/${photo.url}`"
                            alt="photo" class="photo-image"></v-img>
                        <div :id="photo.url" class="photo-overlay" @click="choseProfilePic">
                            <v-img :src="photo.url" alt="Photo" class="popup-image"></v-img>
                        </div>
                    </v-col>
                </div>
                <v-col v-else>
                    <v-row justify="center" class="spinner" size="64">
                        <v-progress-circular indeterminate></v-progress-circular>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-text>
            <transition name="error">
                <p v-if="errorMessage" class="errorc">
                    {{ errorMessage }}
                </p>
            </transition>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="cancelEdit">Cancel</v-btn>
        </v-card-actions>
    </v-dialog>
</template>

<style scoped>
.photo-container {
    position: relative;
    margin-bottom: 20px;
    width: 100px;
    height: 100px;
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

.errorc {
    color: red;
    font-weight: 400;
    margin: 0 0 5px 20px;
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

.photo-container:hover .photo-overlay {
    opacity: 0.5;
    cursor: pointer;
}

.photo-container:hover .popup-image {
    opacity: 0.5;
}

/* @media (max-width: 600px) {
    .photo-container {
        margin-bottom: 0;
        width: 100%;
        height: auto;
        padding-bottom: 100%;
    }
}  */

.spiner {
    margin-top: 150px;
}

.allPhotos {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.modalContainer{
    background-color: white;
}
</style>