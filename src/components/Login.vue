<template>
  <div>
    <div class="container">
      <b-jumbotron
          header="GeoERP"
          bg-variant="light"
          border-variant="dark"
      >
        <b-button id="loginButton" to="/login" variant="primary">Войти</b-button>
      </b-jumbotron>
    </div>
    <div class="login mt-5">
      <div class="card">
        <div class="card-helper">
          Login
        </div>
        <div class="card-body">
          <form>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.username }"
                  id="username"
                  v-model="details.username"
                  pattern="Enter username"
              >
              <div class="invalid-feedback" v-if="errors.username">
                {{ errors.username[0] }}
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': errors.password }"
                  id="password"
                  v-model="details.password"
                  placeholder="Password"
              />
              <div class="invalid-feedback" v-if="errors.password">
                {{ errors.password[0] }}
              </div>
            </div>
            <button type="button" @click="login" class="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Login',

  data() {
    return {
      details: {
        username: null,
        password: null
      }
    };
  },

  computed: {
    ...mapGetters(['errors'])
  },

  mounted() {
    this.$store.commit('setErrors', {});
  },

  methods: {
    ...mapActions('auth', ['sendLoginRequest']),

    login() {
      this.sendLoginRequest(this.details).then(() => {
        this.$router.push({ name: 'Home' })
      });
    }
  }
};
</script>