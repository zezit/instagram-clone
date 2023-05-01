<script setup lang='ts'>
import { reactive, computed } from 'vue'
import gsap from "gsap"
import { storeToRefs } from 'pinia'

import { userCredentials, User } from "../stores/userCred"

const userLog = userCredentials()
const { user } = userLog

const { newUser, errorMessage } = storeToRefs(userLog)

defineProps<{
    userCredent: User
}>()

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
                    <v-col cols="12" sm="6" md="4" v-if="newUser" :key="0" :data-index="0">
                        <v-text-field v-model.trim="userCredent.fName" label="First name*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="newUser" :key="1" :data-index="1">
                        <v-text-field v-model.trim="userCredent.lName" label="Last name*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" v-if="newUser" :key="3" :data-index="3">
                        <v-text-field v-model.trim="userCredent.username" label="Username*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" :key="4" :data-index="4">
                        <v-text-field v-model.trim="userCredent.email" label="Email*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" :key="5" :data-index="5">
                        <v-text-field v-model.trim="userCredent.password" label="Password*" type="password"
                            required></v-text-field>
                    </v-col>
                </TransitionGroup>
            </v-row>
        </v-container>

        <Transition name="error">
            <p v-if="errorMessage.length > 0" class="errorc">
                {{ errorMessage }}
            </p>
        </Transition>

        <small>*indicates required field</small>
        <p class="userlog" @click="newUser = !newUser"><small>
                {{ newUser ? 'Existent account' : 'Create new user' }}
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
    margin: 10px 0;
}
</style>