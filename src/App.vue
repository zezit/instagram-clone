<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import LeftNav from "./components/Nav.vue"
import TopNav from "./components/TopNav.vue"

import { userCredentials } from "./stores/userCred"

const userLog = userCredentials()

const dialog = ref(false)
const blurBackground = ref(false)

function toggleDialog() {
  dialog.value = !dialog.value
  blurBackground.value = !blurBackground.value
}
</script>

<template>
  <VCard :class="{ 'blur-background': blurBackground }">
    <VLayout>
      <LeftNav />
      <TopNav />
      <VMain style="min-height: 300px;"></VMain>

    </VLayout>
  </VCard>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024" @click:outside="blurBackground = false">
      <v-card>
        <v-card-title>
          <span class="text-h5">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Username*"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*" type="password"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-4" variant="text" @click="toggleDialog()">
            Cancel
          </v-btn>
          <v-btn color="blue-darken-4" variant="text" @click="toggleDialog()">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<style scoped>
.blur-background {
  filter: blur(5px);
}
</style>