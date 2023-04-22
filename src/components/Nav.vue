<script setup lang="ts">
import { ref } from 'vue';
import ContData from './ContData.vue'

const rail = ref(true)

</script>

<template>
  <VNavigationDrawer :rail="rail" permanent rail-width="110">
    <VList>
      <VListItem>
        <div class="app-logo center-container">
          <v-icon icon="mdi-instagram" size="x-large" />
          <img v-if="!rail" src="https://logodownload.org/wp-content/uploads/2017/04/instagram-logo-1.png" alt="">
        </div>

        <template v-slot:append>
          <v-btn variant="text" :icon="!rail ? 'mdi-chevron-left' : 'mdi-chevron-right'"
            @click.stop="rail = !rail"></v-btn>
        </template>
      </VListItem>
    </VList>

    <VList>
      <VListItem class="data-cointainer">
        <div class="prof-container center-container">
          <img src="https://static-00.iconduck.com/assets.00/person-icon-473x512-6lsjfavs.png">
        </div>

        <div v-if="!rail" class="user-data center-container ">
          <p class="name">User</p>
          <p class="username">@username</p>
        </div>

        <v-divider></v-divider>

        <div v-if="!rail" class="account-activity center-container">
          <ContData :num="140" name="Pubs" />
          <ContData :num="16000" name="Followers" />
          <ContData :num="2500" name="Following" />
        </div>
      </VListItem>
    </VList>

    <template v-slot:append>
      <div class="log-out">
        <VBtn prepend-icon="mdi-logout" variant="tonal" color="black" rounded="xl">{{ !rail ? 'Logout' : '' }}</VBtn>
      </div>
    </template>
  </VNavigationDrawer>
</template>

<style scoped>
.center-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-logo {
  justify-content: space-evenly;
  align-items: center;
}

.app-logo img {
  margin-top: 4px;
  display: flex;
  align-items: center;
  max-width: 120px;
}

.prof-container img {
  cursor: pointer;
  border-radius: 100%;
  border: 0.7px solid black;
  /* TODO - Remove later*/
  width: 80%;
  height: 80%;
  max-width: 55px;
  max-height: 55px;
}

.user-data {
  margin-top: 15px;
  flex-direction: column;
}

.name {
  font-size: 1.3rem;
}

.name,
.username {
  font-weight: 1.1rem;
}

.account-activity {
  width: 100%;
  margin-top: 20px;
  padding: 0 15px;
  justify-content: space-evenly;
  gap: 20px;
}

.vlist-container {
  width: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100% !important;
}

.bottom-container {
  /* width: 100% !important; */
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  /* background-color: royalblue; */
  position: relative;
}

.data-cointainer {
  /* width: 100%; */
  /* background-color: antiquewhite; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.log-out {
  text-align: center;
  margin-bottom: 15px;
}
</style>