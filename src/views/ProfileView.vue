<script setup lang="ts">
import { userCredentials } from '../stores/userCred'
import { storeToRefs } from "pinia"

const userLog = userCredentials()
const { user } = storeToRefs(userLog)

</script>

<template>
    <div class="container">
        <div class="center-container">
            <h1>Profile</h1>
        </div>
        <div class="center-container">
            <p>Username: {{ user.username }}</p>
            <p>First Name: {{ user.fName }}</p>
            <p>Last Name: {{ user.lName }}</p>
            <p>Email: {{ user.email }}</p>
        </div>

    </div>
</template>

<style scoped></style>