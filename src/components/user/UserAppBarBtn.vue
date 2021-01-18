<template>
  <div v-if="!isFetching">
    <v-menu offset-y rounded="0">
      <template v-slot:activator="{ on }">
        <v-btn
            elevation="0"
            height="48px"
            tile
            class="white"
            v-on="on"
        >
          <v-icon class="mr-1">mdi-account</v-icon>
          {{user.first_name}} {{user.last_name}}
        </v-btn>
      </template>
      <v-list class="pa-0" dense>
        <v-list-item class="pa-0">
          <v-btn
              id="homeBtn"
              elevation="0"
              tile
              class="white"
          >
            <v-icon class="mr-1">mdi-home-import-outline</v-icon>
            Личный кабинет
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
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

<style>
#homeBtn {
  margin-left: -30px;
  width: calc(100% + 30px);
  height: 40px;
}
</style>