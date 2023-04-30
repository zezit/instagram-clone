<script setup lang='ts'>
import { ref } from "vue"
import LoginModal from "./LoginModal.vue"

import { userCredentials } from "../stores/userCred"

const userLog = userCredentials()

const showModal = ref<boolean>()

defineProps<{
    rail: boolean
}>()

const closeWindow = () => {
    showModal.value = false
    userLog.toggleDialog()
}

const redirectUser = (): void => {
    if (userLog.user) {
        userLog.user = null
    } else {
        showModal.value = true
    }
}

</script>

<template>
    <div class="log-out">
        <v-btn :prepend-icon="userLog.user ? 'mdi-logout' : 'mdi-login'" variant="tonal" color="black" rounded="xl"
            @click="redirectUser()">
            {{ !rail ? userLog.user ? 'Logout' : 'Login' : '' }}
        </v-btn>

        <v-dialog v-model="showModal" persistent width="1024">
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ userLog.newUser ? 'Signup' : 'Login' }}</span>
                </v-card-title>

                <v-card-text>
                    <LoginModal @close="closeWindow" />
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn variant="tonal" color="black" rounded="xl" @click="closeWindow">
                        Close
                    </v-btn>
                    <v-btn variant="tonal" color="black" rounded="xl" @click="closeWindow">
                        {{ userLog.newUser ? 'SignUp' : 'LogIn' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<style scoped></style>
