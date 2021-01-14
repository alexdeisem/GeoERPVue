import axios from "axios";

export default {
    namespaced: true,

    state: {
        status: '',
        token: localStorage.getItem('Authorization') || '',
        user: null
    },

    mutations: {
        auth_request(state) {
            state.status = 'loading';
        },

        auth_success(state, token, user) {
            state.status = 'success';
            state.token = token;
            state.user = user;
        },

        auth_error(state) {
            state.status = 'error'
        },

        logout(state) {
            state.status = '';
            state.token = '';
        },

        set_user(state, user) {
            state.user = user;
        }
    },

    actions: {
        getUser({ commit }) {
            return new Promise((resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_API_URL + 'user')
                    .then(response => {
                        commit('set_user', response.data);
                        resolve(response);
                    })
                    .catch((error) => {
                        localStorage.removeItem('Authorization');
                        reject(error);
                    });
            })
        },

        login({ commit }, user) {
            return new Promise((resolve, reject) => {
               commit('auth_request');
               axios
                   .post(process.env.VUE_APP_API_URL + 'login', user)
                   .then(response => {
                       const token = response.data.token;
                       const user = response.data.user;
                       localStorage.setItem('Authorization', token);
                       commit('auth_success', token, user);
                       resolve(response);
                   })
                   .catch(error => {
                       commit('auth_error');
                       localStorage.removeItem('token');
                       reject(error);
                   });
            });
        },

        logout({ commit }) {
            return new Promise((resolve) => {
                commit('logout');
                localStorage.removeItem('Authorization');
                delete axios.defaults.headers.common['Authorization']
                resolve();
            })
        }
    },

    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        user: state => state.user
    }
};