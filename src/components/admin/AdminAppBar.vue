<template>
  <div>
    <v-app-bar id="AppBar" app dense>
      <v-btn
          elevation="0"
          id="Logo"
          class="text-h5 px-4 white"
          :to="{ name: 'Dashboard' }"
          active-class="no-active"
          tile
          height="48px"
      >
        <span>Geo.</span>
        <span>ERP</span>
      </v-btn>

      <v-spacer></v-spacer>

      <user-app-bar-btn></user-app-bar-btn>

      <v-divider vertical></v-divider>

      <v-btn
          elevation="0"
          @click="logout"
          height="100%"
          tile
          class="white"
      >
        <v-icon
          class="mr-1"
        >
          mdi-exit-to-app
        </v-icon>
        Выйти
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import UserAppBarBtn from "@/components/user/UserAppBarBtn";

export default {
  name: 'AdminAppBar',

  components: {
    UserAppBarBtn
  },

  methods: {
    logout: function () {
      this.$store.dispatch('auth/logout')
          .then(() => {
            this.$router.push('/login')
          })
    }
  },
}
</script>

<style>
  #AppBar {
    background: #FFFFFF;
  }

  #AppBar>div {
    padding: 0;
  }
</style>