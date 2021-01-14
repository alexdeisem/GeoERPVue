<template>
  <div id="loginFormContainer">
    <v-form
        id="loginForm"
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submit"
    >
      <div class="text-h2 pb-4">GeoERP</div>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Имя пользователя"
              autocomplete="off"
              requried
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
              v-model="password"
              :rules="passwordRules"
              type="password"
              label="Пароль"
              requried
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
          class="mt-4"
          id="loginBtn"
          :disabled="!valid"
          depressed
          color="primary"
          type="submit"
          @click="submit"
      >
        Войти
      </v-btn>
    </v-form>
  </div>
</template>

<script>

export default {
  name: 'Login',

  data: () => ({
    valid: true,
    username: '',
    password: '',
    usernameRules: [
        v => !!v || 'Укажите имя пользователя',
        v => (v && v.length >= 2) || 'Имя пользователя должно быть длиннее 1 символа'
    ],
    passwordRules: [
        v => !!v || 'Введите пароль',
        v => (v && v.length >= 8) || 'Пароль должен быть не меньше 8 символов'
    ]
  }),

  methods: {
    submit() {
      if (!this.$refs.form.validate()) {
        return;
      }

      let username = this.username
      let password = this.password
      this.$store.dispatch('auth/login', { username, password })
          .then(() => {
            this.$router.push('/');
          })
          .catch(err => console.log(err))
    },
  }
};
</script>

<style>
  #loginFormContainer {
    padding: 10% 30%;
    background: #F2F2F2;
    height: 100vh;
  }

  #loginForm {
    background: #FFFFFF;
    padding: 32px;
    border: 1px solid #E5E5E5;
    box-shadow: 0 0 1px #E5E5E5;
  }
</style>