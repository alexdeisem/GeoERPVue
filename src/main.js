import axios from 'axios';
import Vue from 'vue';

import App from './App';
import store from './store';
import router from './router';

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Vue.prototype.$http = axios;

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