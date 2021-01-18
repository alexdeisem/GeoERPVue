<template>
  <v-app>
      <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  created: function() {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("auth/logout")
        }
        throw err;
      })
    });
  },

  methods: {
    getUser: function () {
      this.$store.dispatch("auth/getUser")
        .then(() => {
          let user = this.$store.getters["auth/user"];
          if (user.isAdmin) {
            this.$router.push({ name: 'Dashboard' });
          }
        })
    }
  },

  mounted() {
    let elHtml = document.getElementsByTagName('html')[0];
    elHtml.style.overflowY = 'auto';

    if (!this.$store.getters["auth/isLoggedIn"]) {
      this.$router.push('/login');
    }

    if (!this.$store.getters['auth/user']) {
      this.getUser();
    }
  },
};
</script>