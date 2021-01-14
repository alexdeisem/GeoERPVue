<template>
  <v-app>
    <v-main>
        <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  computed : {
    isLoggedIn: function() {
      return this.$store.getters["auth/isLoggedIn"];
    }
  },

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
    logout: function () {
      this.$store.dispatch('auth/logout')
          .then(() => {
            this.$router.push('/login')
          })
    },

    getUser: function () {
      this.$store.dispatch("auth/getUser")
        .then(() => {
          let user = this.$store.getters["auth/user"];
          if (user.isAdmin) {
            this.$router.push('/admin');
          }
        })
    }
  },

  mounted() {
    let elHtml = document.getElementsByTagName('html')[0];
    elHtml.style.overflowY = 'auto';

    if (!this.$store.getters["auth/isLoggedIn"]) {
      this.$router.push('/login');
      return;
    }

    if (!this.$store.getters['auth/user']) {
      this.getUser();
    }
  },
};
</script>

<style>
  body {
    font: 1em "Segoe UI", sans-serif;
  }
</style>

