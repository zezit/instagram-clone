<script setup lang='ts'>
import { ref, computed } from 'vue'

import { userCredentials } from "../stores/userCred"

import LeftNav from "../components/Nav.vue"
import TopNav from "../components/TopNav.vue"

import { storeToRefs } from 'pinia'

const userLog = userCredentials()
const { blurBackground } = storeToRefs(userLog)

</script>

<template>
    <main :class="{
        'blur-background': blurBackground
    }">
        <VCard>
            <VLayout>
                <LeftNav />
                <TopNav />
                <VMain style="min-height: 100vh;">
                </VMain>
            </VLayout>
        </VCard>
    </main>
</template>

<style>
.blur-background {
    filter: blur(5px);
    transition: filter 0.3s ease-out;
}
</style>