<script setup lang='ts'>
import { ref } from 'vue'
import gsap from "gsap"

import { userCredentials } from "../stores/userCred"

const userLog = userCredentials()

const enterAnimation = (element) => {
    gsap.fromTo(element,
        { opacity: 0, x: "100px" },
        { opacity: 1, x: 0, duration: 0.2, delay: Number(element.dataset.index) * 0.1 })
}
</script>

<template>
    <div class="container">
        <v-container>
            <v-row>
                <TransitionGroup appear @before-enter="enterAnimation">
                    <v-col cols="12" sm="6" md="4" v-if="userLog.newUser" :key="0" :data-index="0">
                        <v-text-field label="First name*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="userLog.newUser" :key="1" :data-index="1">
                        <v-text-field label="Last name*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" v-if="!userLog.newUser" :key="2" :data-index="2">
                        <v-text-field label="Email or username*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" v-if="userLog.newUser" :key="3" :data-index="3">
                        <v-text-field label="Username*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" v-if="userLog.newUser" :key="4" :data-index="4">
                        <v-text-field label="Email*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" :key="5" :data-index="5">
                        <v-text-field label="Password*" type="password" required></v-text-field>
                    </v-col>
                </TransitionGroup>
            </v-row>
        </v-container>

        <small>*indicates required field</small>
        <p class="userlog" @click="userLog.newUser = !userLog.newUser"><small>
                {{ userLog.newUser ? 'Existent account' : 'Create new user' }}
            </small></p>
    </div>
</template>

<style scoped>
.userlog {
    cursor: pointer;
    margin-top: 7px;
    color: rgb(68, 95, 145);
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s;
}

.slide-enter,
.slide-leave-to {
    transform: translateX(100%);
}
</style>