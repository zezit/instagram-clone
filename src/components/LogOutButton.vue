<script setup lang='ts'>
import { userCredentials } from "../stores/userCred"

const userLog = userCredentials()
defineProps<{ rail: boolean }>()

</script>

<template>
    <div class="log-out">
        <VBtn :prepend-icon="userLog.userLogged ? 'mdi-logout' : 'mdi-login'" variant="tonal" color="black" rounded="xl">
            {{ !rail ? userLog.userLogged ?
                'Logout' : 'Login' : '' }}</VBtn>
    </div>
</template>

<style scoped></style>