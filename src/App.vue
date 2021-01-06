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
      this.getUser().then(() => {
        console.log(this.user);
        // if (this.$store.state.user.isAdmin) {
        //   this.$router.push({ name: 'Admin' });
        //   return;
        // }
        //
        // this.$router.push({ name: 'Home' });
      });
    }

    this.$router.push('/login');
  },

  methods: {
    ...mapActions("auth", ["getUser"])
  }
};
</script>