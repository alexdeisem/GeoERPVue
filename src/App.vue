<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('auth', ['user'])
  },

  mounted() {
    if (localStorage.getItem('authToken')) {
      this.getUserData().then(() => this.$router.push('/home'));
    }

    this.$router.push('/login');
  },

  methods: {
    ...mapActions("auth", ["sendLogoutRequest", "getUserData"]),

    logout() {
      this.sendLogoutRequest();
      this.$router.push('/');
    }
  }
};
</script>

<style>
body > div > .container {
  padding: 200px 15px 0;
}

#loginButton {
  margin: 20px 0;
  width: 200px;
}
</style>