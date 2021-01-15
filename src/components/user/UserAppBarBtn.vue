<template>
  <div v-if="!isFetching">
    <v-btn
        elevation="0"
        height="48px"
        tile
        class="white"
    >
      <v-icon class="mr-1">mdi-account</v-icon>
      {{user.first_name}} {{user.last_name}}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'UserAppBarBtn',

  data() {
    return {
      user: {},
      isFetching: true
    }
  },

  mounted() {
    this.getUser();
  },

  methods: {
    getUser: function () {
      if(this.$store.getters["auth/user"]) {
        this.isFetching = false;
        this.user = this.$store.getters["auth/user"];
        return;
      }

      this.$store.dispatch("auth/getUser")
          .then(() => {
            this.user = this.$store.getters["auth/user"];
            this.isFetching = false;
          });
    }
  }
}
</script>