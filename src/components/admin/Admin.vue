<template>
  <div>
    <admin-app-bar></admin-app-bar>
    <div id="fullHeight" class="d-flex flex-row justify-start pt-12">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AdminAppBar from "./AdminAppBar";

export default {
  name: 'Admin',

  components: {
    AdminAppBar,
  },
}
</script>

<style>
  #fullHeight {
    height: 100vh;
  }
</style>