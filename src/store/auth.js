import axios from "axios";

export default {
    namespaced: true,

    state: {
        status: '',
        token: localStorage.getItem('Authorization') || '',
        user: JSON.parse(localStorage.getItem('AuthUser')) || ''
    },

    getters: {
        isLoggedIn: state => {
            return !!state.token
        },
        authStatus: state => state.status,
        user: state => state.user
    },

    mutations: {
        auth_request(state) {
            state.status = 'loading';
        },

        auth_success(state, data) {
            state.status = 'success';
            state.token = data.token;
            state.user = data.user;
        },

        auth_error(state) {
            state.status = 'error'
        },

        logout(state) {
            state.status = '';
            state.token = '';
            state.user = {}
        },

        set_user(state, user) {
            state.user = user;
        }
    },

    actions: {
        getUser({ commit }) {
            return new Promise((resolve, reject) => {
                axios
                    .get('user')
                    .then(response => {
                        commit('set_user', response.data);
                        localStorage.setItem('AuthUser', JSON.stringify(response.data))
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
                   .post('login', user)
                   .then(response => {
                       if (response.data.user.deleted) {
                           return;
                       }

                       localStorage.setItem('Authorization', response.data.token);
                       axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
                       localStorage.setItem('AuthUser', JSON.stringify(response.data.user))

                       commit('auth_success', response.data);
                       resolve();
                   })
                   .catch(error => {
                       commit('auth_error');
                       localStorage.removeItem('Authorization');
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
    }
};