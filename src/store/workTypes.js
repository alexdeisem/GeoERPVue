import axios from "axios";

export default {
    namespaced: true,

    state: {
        workTypes: []
    },

    mutations: {
        setWorkTypes(state, workTypes) {
            state.workTypes = workTypes
        }
    },

    actions: {
        getWorkTypes({ commit }, params={}) {
            return new Promise((resolve, reject) => {
                axios
                    .get('work-types', {params: params})
                    .then(response => {
                        commit('setWorkTypes', response.data);
                        resolve(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            })
        }
    }
}