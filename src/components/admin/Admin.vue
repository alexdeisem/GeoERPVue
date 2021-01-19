<template>
  <div>
    <admin-app-bar></admin-app-bar>
    <div id="content" class="d-flex flex-row justify-start pt-12">
      <router-view></router-view>
    </div>
    <admin-footer></admin-footer>
  </div>
</template>

<script>
import AdminAppBar from "./AdminAppBar";
import AdminFooter from "@/components/Footer";

export default {
  name: 'Admin',

  components: {
    AdminAppBar,
    AdminFooter
  },
}
</script>

<style>
#content {
  min-height: calc(100vh - 184px);
  /*padding: 24px 24px 0 24px;*/
}
</style>