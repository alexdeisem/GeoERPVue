<template>
  <v-app>
      <router-view></router-view>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',

  created: function() {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.logout();
        }
        throw err;
      })
    });
  },

  computed: {
    ...mapState("workTypes", ["workTypes"]),

    user() {
      return this.$store.getters["auth/user"];
    }
  },

  methods: {
    ...mapActions('auth', ['getUser', "logout"]),
    ...mapActions('workTypes', ['getWorkTypes']),
  },

  mounted() {
    let elHtml = document.getElementsByTagName('html')[0];
    elHtml.style.overflowY = 'auto';

    if (!this.$store.getters["auth/isLoggedIn"]) {
      this.$router.push('/login');
      return;
    }

    if (!this.user) {
      this.getUser().then(() => {
        let user = this.$store.getters["auth/user"];
        if (user.isAdmin) {
          this.$router.push({ name: 'Dashboard' });
        }
      });
      return;
    }

    if (this.user.isAdmin) {
      if (this.$route.name !== 'Dashboard') {
        this.$router.push({name: 'Dashboard'});
      }
    } else {
      this.$router.push({name: 'Employees'})
    }

    let localUser = this.user;

    this.getUser().then(() => {
      let serverUserVersion = this.$store.getters["auth/user"];

      if (serverUserVersion.deleted) {
        this.logout();
      }

      if (serverUserVersion.isAdmin !== localUser.isAdmin) {
        this.logout();
      }
    });
  }
};
</script>