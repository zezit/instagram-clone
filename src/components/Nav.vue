<script setup lang="ts">
import ContData from './ContData.vue'
</script>

<template>
  <VNavigationDrawer>
    <VList>
      <VListItem>
        <div class="app-logo center-container">
          <img src="https://srasolutions.com.au/wp-content/uploads/2017/02/Logos-fake-mock-up-illust-ss143531671-2.png"
            alt="">
        </div>
      </VListItem>

      <VListItem>
        <div class="prof-container center-container">
          <img src="https://static-00.iconduck.com/assets.00/person-icon-473x512-6lsjfavs.png" alt="">
        </div>

        <div class="user-data center-container ">
          <p class="name">User</p>
          <p class="username">@username</p>
        </div>

        <div class="account-activity center-container">
          <ContData :num="140" name="Pubs" />
          <!-- <div class="cont-data">
            <p class="num-pubs">140</p>
            <p class="name-acc-activity">Pubs</p>
          </div>
          <div class="cont-data">
            <p class="num-pubs">16K</p>
            <p class="name-acc-activity">Followers</p>
          </div>
          <div class="cont-data">
            <p class="num-pubs">2500</p>
            <p class="name-acc-activity">Following</p>
          </div> -->
        </div>
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<style scoped>
.center-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-logo {
  flex-direction: column;
}

.app-logo img {
  max-width: 150px;
}

.prof-container img {
  cursor: pointer;
  border-radius: 100%;
  border: 0.7px solid black;
  /* TODO - Remove later*/
  width: 55px;
  height: 55px;
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
  padding: 0 15px;
  justify-content: space-between;
}
</style>