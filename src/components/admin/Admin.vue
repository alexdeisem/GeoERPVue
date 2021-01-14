<template>
  <div>

    <v-app-bar app dense>
      <v-toolbar-title>GeoERP</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
          elevation="0"
      >
        <v-icon>mdi-account</v-icon> {{user.firstname}} {{user.lastname}}
      </v-btn>

      <v-divider class="mx-2"
          vertical
      ></v-divider>

      <v-btn
          elevation="0"
      >
        Выйти
      </v-btn>
    </v-app-bar>

    <v-main>
        <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
export default {
  name: 'Admin',

  data() {
    return  {
      user: {
        firstname: 'Александр',
        lastname: 'Семёнчик'
      }
    }
  }
}
</script>