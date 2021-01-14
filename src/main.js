import Axios from 'axios';
import Vue from 'vue';
import Vuelidate from "vuelidate";

import App from './App';
import router from './router';
import store from './store';

import vuetify from './plugins/vuetify';

Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

const token = 'Bearer ' + localStorage.getItem('Authorization');

if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');