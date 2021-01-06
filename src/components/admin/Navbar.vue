<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">GeoERP</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :class="{ 'active' : this.$route.name === 'Dashboard' }" href="#">Dashboard</b-nav-item>
          <b-nav-item href="#">Заказчики</b-nav-item>
          <b-nav-item href="#">Сотрудники</b-nav-item>
          <b-nav-item href="#">Вх. / Исх.</b-nav-item>
          <b-nav-item href="#">Карта</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Поиск"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Найти</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ user.username }}</em>
            </template>
            <b-dropdown-item href="#">Профиль</b-dropdown-item>
            <b-dropdown-item href="#" @click="logout">Выйти</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'Navbar',

  computed: {
    ...mapGetters('auth', ['user'])
  },

  methods: {
    ...mapActions("auth", ["getUser", "sendLogoutRequest"]),

    logout() {
      this.sendLogoutRequest();
      this.$router.push('/login');
    }
  }
}
</script>