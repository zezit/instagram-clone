<script setup lang="ts">
import { userCredentials } from '../stores/userCred'
import { storeToRefs } from "pinia"

import TopNav from "../components/TopNav.vue"

const noPhotoPath: string = "https://static-00.iconduck.com/assets.00/person-icon-473x512-6lsjfavs.png"

const userLog = userCredentials()
const { user, blurBackground } = storeToRefs(userLog)

const geUserFollowers: number = 100
const geUserFollowing: number = 100
const geUserPhotos = [
    {
        id: 1,
        url: "https://picsum.photos/200/200"
    },
    {
        id: 2,
        url: "https://picsum.photos/500/300"
    },
    {
        id: 3,
        url: "https://picsum.photos/200/250"
    },
    {
        id: 4,
        url: "https://picsum.photos/200/350"
    },
    {
        id: 5,
        url: "https://picsum.photos/200/510"
    },
    {
        id: 6,
        url: "https://picsum.photos/200/800"
    },
]

</script>

<template>
    <main :class="{
        'blur-background': blurBackground
    }">
        <VCard>
            <VLayout>
                <TopNav />
                <VMain style="min-height: 100vh;" class="content">
                    <v-container fluid>
                        <v-row align="center">
                            <v-col cols="4" sm="3" md="2">
                                <v-avatar size="150">
                                    <img class="profile-pic" :src="user.profilePicture ? user.profilePicture : noPhotoPath"
                                        alt="Profile Picture" />
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

                        <v-row class="mt-4 photosAll" v-if="geUserPhotos">
                            <v-col v-for="photo in geUserPhotos" :key="photo.id" cols="4" sm="3" md="2">
                                <v-img :src="photo.url" alt="Photo" height="200" width="200" class="pa-2"></v-img>
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

.photosAll {
    padding: 0.5rem !important;
    margin: 0.5rem !important;
    display: grid;
}
</style>