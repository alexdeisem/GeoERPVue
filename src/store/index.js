import Vue from 'vue';
import Vuex from 'vuex';
import auth from "@/store/auth";
import contracts from "@/store/contracts";
import workTypes from "@/store/workTypes";


Vue.use(Vuex);

export default new Vuex.Store({
    state: {

    },

    modules: {
        auth,
        contracts,
        workTypes,
    }
});