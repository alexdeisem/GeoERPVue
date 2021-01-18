<template>
  <div>
    <v-app-bar id="AppBar" app dense>
      <v-btn
          elevation="0"
          id="Logo"
          class="text-h5 overline px-4 white"
          :to="{ name: 'Dashboard' }"
          active-class="no-active"
          tile
          height="48px"
      >
        <span>Geo.</span>
        <span>ERP</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-tooltip
          v-for="(item, i) in items"
          :key="i"
          bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              :to="{ name: item.to }"
              tile
              elevation="0"
              class="white"
              height="48px"
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>{{item.icon}}</v-icon>
          </v-btn>
        </template>
        <span>{{item.text}}</span>
      </v-tooltip>

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
import UserAppBarBtn from "../user/UserAppBarBtn";

export default {
  name: 'AdminAppBar',

  components: {
    UserAppBarBtn
  },

  data() {
    return  {
      selectedItem: 0,
      items: [
        { text: 'Dashboard', icon: 'mdi-monitor-dashboard', to: 'Dashboard' },
        { text: 'Заказчики', icon: 'mdi-account-group', to: 'Customers' },
        { text: 'Сотрудники', icon: 'mdi-account-hard-hat',  to: 'Employees' },
        { text: 'Документы', icon: 'mdi-file-document-multiple',  to: 'Docs' },
        { text: 'Карта объектов', icon: 'mdi-map', to: 'Map' },
        { text: 'Настройки', icon: 'mdi-cog',  to: 'Settings' },
      ]
    }
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