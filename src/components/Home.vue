<template>
  <div>
    <div class="home mt-5">
      <div class="alert alert-success" role="alert" v-if="success">
        {{ success }}
      </div>
      <div class="alert alert-danger" role="alert" v-if="error">
        {{ error }}
      </div>
      <h2 v-if="!user">Welcome, please log in or register</h2>
      <div v-else>
        <h2>Hello, {{ user.first_name }} {{user.last_name}}! You're in.</h2>
        <a class="nav-link" href="#" @click="logout">Logout</a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

  export default {
    name: 'Home',

    data() {
      return {
        success: null,
        error: null
      };
    },

    computed: {
      ...mapGetters('auth', ['user'])
    },

    methods: {
      ...mapActions("auth", ["sendLogoutRequest"]),

      logout() {
        this.sendLogoutRequest();
        this.$router.push('/');
      }
    }
  }
</script>