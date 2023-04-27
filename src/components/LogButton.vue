<script setup lang='ts'>
import { userCredentials } from "../stores/userCred"

const userLog = userCredentials()

defineProps<{ rail: boolean }>()

const redirectUser = (): void => {
    // if (userLog.user) {
    //     userLog.user = null
    // } else {
    // }
}

</script>

<template>
    <div class="log-out">
        <VBtn :prepend-icon="userLog.user ? 'mdi-logout' : 'mdi-login'" variant="tonal" color="black" rounded="xl"
            @click="redirectUser()">
            {{ !rail ? userLog.user ?
                'Logout' : 'Login' : '' }}
        </VBtn>
    </div>
</template>

<style scoped></style>