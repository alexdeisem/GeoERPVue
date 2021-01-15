<template>
  <div>
    <admin-app-bar></admin-app-bar>
    <div id="fullHeight" class="d-flex flex-row justify-start pt-12">
      <admin-side-nav></admin-side-nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AdminAppBar from "./AdminAppBar";
import AdminSideNav from "./AdminSideNav";

export default {
  name: 'Admin',

  components: {
    AdminAppBar,
    AdminSideNav
  },
}
</script>

<style>
  #fullHeight {
    height: 100vh;
  }
</style>