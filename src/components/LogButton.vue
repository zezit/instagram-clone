<script setup lang='ts'>
import { ref, reactive } from "vue"
import LoginModal from "./LoginModal.vue"
import { userCredentials, User } from "../stores/userCred"

import { storeToRefs } from "pinia"

const userLog = userCredentials()
const { errorMessage, newUser } = storeToRefs(userLog)

const showModal = ref<boolean>()
const loadingValues = ref<boolean>()

const userCredent = reactive<User>({
    email: "",
    username: "",
    password: "",
    fName: "",
    lName: ""
})

enum Type {
    CLOSE,
    SIGN
}

defineProps<{
    rail: boolean
}>()

const clearInputs = () => {
    userCredent.username = ""
    userCredent.fName = ""
    userCredent.lName = ""
}

const closeWindow = async (type: Type) => {
    errorMessage.value = ""

    if (type === Type.SIGN) {
        if (newUser.value) {
            loadingValues.value = true

            const check = await userLog.handleSignup(userCredent)
            if (!check) {
                loadingValues.value = false
                return
            } else {
                clearInputs()
                newUser.value = false
                loadingValues.value = false
                return
            }
        }

        const user = await userLog.handleLogin(userCredent)

        if (!user) {
            loadingValues.value = false
            return
        } else {
            userLog.toggleDialog()
            showModal.value = false
            loadingValues.value = false
        }
    }

    else {
        clearInputs()
        userLog.toggleDialog()
        showModal.value = false
    }
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

        <v-dialog v-model="showModal" persistent width="1024" :loading="loadingValues">
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ userLog.newUser ? 'Signup' : 'Login' }}</span>
                </v-card-title>

                <v-card-text>
                    <LoginModal @close="closeWindow" :userCredent="userCredent" />
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn variant="tonal" color="black" rounded="xl" @click="closeWindow(Type.CLOSE)">
                        Close
                    </v-btn>
                    <v-btn variant="tonal" color="black" rounded="xl" @click="closeWindow(Type.SIGN)">
                        {{ userLog.newUser ? 'SignUp' : 'LogIn' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<style scoped></style>
