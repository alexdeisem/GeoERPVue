<template>
  <div>
    <div id="loginContainer">
      <b-jumbotron
          id="loginJumborton"
          header="GeoERP"
          bg-variant="white"
      >
        <div class="login">
          <div class="card">
            <div class="card-body">
              <form v-on:keyup.enter="login">
                <div class="form-group">
                  <label for="username">Логин:</label>
                  <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors.username }"
                      id="username"
                      autocomplete="off"
                      v-model="details.username"
                  >
                  <div class="invalid-feedback" v-if="errors.username">
                    {{ errors.username[0] }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="password">Пароль:</label>
                  <input
                      type="password"
                      class="form-control"
                      :class="{ 'is-invalid': errors.password }"
                      id="password"
                      v-model="details.password"
                  />
                  <div class="invalid-feedback" v-if="errors.password">
                    {{ errors.password[0] }}
                  </div>
                </div>
                <b-button
                    id="loginButton"
                    @click="login"
                    variant="primary"
                >Войти
                </b-button>
              </form>
            </div>
          </div>
        </div>
      </b-jumbotron>
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
      this.sendLoginRequest(this.details).then((isAdmin) => {
        if (isAdmin) {
          this.$router.push({ name: 'Dashboard' });
          return;
        }

        this.$router.push({ name: 'Home' });
      });
    }
  }
};
</script>

<style>
#loginContainer {
  width: 100%;
  height: 100vh;
  padding: 10% 20%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 20px,
    #f6f6f6 20px,
    #f6f6f6 40px
  )
}

#loginJumborton {
  box-shadow: 5px 5px 10px 5px #d0d0d0;
  border-radius: 0;
}

#loginJumborton .card {
  margin-top: 3%;
  width: 50%;
  min-width: 300px;
  border: 0;
}

#loginButton {
  margin-top: 20px;
  box-shadow: -1px 1px 2px 0 #002fff;
  width: 170px;
}
</style>