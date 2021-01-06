import axios from 'axios';

export default {
    namespaced: true,

    state: {
        user: null
    },

    getters: {
        user: state => state.user,
    },

    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },

    actions: {
        getUser({ commit }) {
            axios
                .get(process.env.VUE_APP_API_URL + 'user')
                .then(response => {
                    commit('setUser', response.data);
                })
                .catch(() => {
                    localStorage.removeItem('authToken');
                });
        },
        sendLoginRequest({ commit }, data) {
            commit('setErrors', {}, { root: true });
            return axios
                .post(process.env.VUE_APP_API_URL + 'login', data)
                .then(response => {
                    commit('setUser', response.data.user);
                    localStorage.setItem('authToken', response.data.token);
                    return response.data.user.isAdmin;
                });
        },
        sendLogoutRequest({ commit }) {
            axios
                .post(process.env.VUE_APP_API_URL + 'logout')
                .then(() => {
                    commit('setUser', null);
                    localStorage.removeItem('authToken');
                });
        }
    }
};