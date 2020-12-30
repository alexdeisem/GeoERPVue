import axios from 'axios';

export default {
    namespaced: true,

    state: {
        userData: null
    },

    getters: {
        user: state => state.userData
    },

    mutations: {
        setUserData(state, user) {
            state.userData = user;
        }
    },

    actions: {
        getUserData({ commit }) {
            axios
                .get(process.env.VUE_APP_API_URL + 'user')
                .then(response => {
                    commit('setUserData', response.data);
                })
                .catch(() => {
                    localStorage.removeItem('authToken');
                });
        },
        sendLoginRequest({ commit }, data) {
            commit('setErrors', {}, { root: true });
            console.log(process.env.VUE_APP_API_URL + 'login');
            return axios
                .post(process.env.VUE_APP_API_URL + 'login', data)
                .then(response => {
                    commit('setUserData', response.data.user);
                    localStorage.setItem('authToken', response.data.token);
                });
        },
        sendLogoutRequest({ commit }) {
            axios
                .post(process.env.VUE_APP_API_URL + 'logout')
                .then(() => {
                    commit('setUserData', null);
                    localStorage.removeItem('authToken');
                });
        }
    }
};