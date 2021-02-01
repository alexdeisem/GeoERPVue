import axios from "axios";

export default {
    namespaced: true,

    state: {
        contracts: {}
    },

    mutations: {
        set_contracts(state, contracts) {
            let contractsMap = {};

            for (let contarct of contracts.reverse()) {
                contractsMap[contarct.id] = contarct;
            }

            state.contracts = contractsMap;
        }
    },

    actions: {
        getContracts({ commit }, params={}) {
            return new Promise((resolve, reject) => {
                axios
                    .get('contracts', {params: params})
                    .then(response => {
                        commit('set_contracts', response.data.contracts);
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