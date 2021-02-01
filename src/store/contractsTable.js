export default {
    namespaced: true,

    state: {
        activeWorkTypes:   JSON.parse(localStorage.getItem('cTblActiveWorkTypes')) ||  JSON.parse(process.env.VUE_APP_CTBL_WORK_TYPES),
        checkedStatuses:   JSON.parse(localStorage.getItem('cTblCheckedStatuses')) ||  JSON.parse(process.env.VUE_APP_CTBL_STATUSES),
        contractDateEnd:   localStorage.getItem('cTblContractDateEnd')             ||  new Date().toISOString().slice(0, 10),
        contractDateStart: localStorage.getItem('cTblContractDateStart')           ||  process.env.VUE_APP_CTBL_DATE_START,
        searchQuery:       localStorage.getItem('cTblSearchQuery')                 ||  process.env.VUE_APP_CTBL_SEARCH_QUERY,
        page:             +localStorage.getItem('cTblPage')                        || +process.env.VUE_APP_CTBL_PAGE,
        pageSize:         +localStorage.getItem('cTblPageSize')                    || +process.env.VUE_APP_CTBL_PAGE_SIZE,
    },

    mutations: {
        set_active_work_types(state, workTypes) {
          state.activeWorkTypes = workTypes;
        },

        set_checked_statuses(state, statuses) {
            state.checkedStatuses = statuses;
        },

        set_contract_date_start(state, date) {
          state.contractDateStart = date;
        },

        set_contract_date_end(state, date) {
          state.contractDateEnd = date
        },

        set_page(state, page) {
          state.page = page;
        },

        set_page_size(state, pageSize) {
            state.pageSize = pageSize;
        },

        set_search_query(state, searchQuery) {
          state.searchQuery = searchQuery;
        },
    },

    actions: {
        setActiveWorkTypes({ commit }, workTypes) {
          commit('set_active_work_types', workTypes);
          localStorage.setItem('cTblActiveWorkTypes', JSON.stringify(workTypes));
        },

        setCheckedStatuses({ commit }, statuses) {
          commit('set_checked_statuses', statuses);
          localStorage.setItem('cTblCheckedStatuses', JSON.stringify(statuses));
        },

        setContractDateStart({ commit }, date) {
          commit('set_contract_date_start', date);
          localStorage.setItem('cTblContractDateStart', date);
        },

        setContractDateEnd({ commit }, date) {
          commit('set_contract_date_end', date);
          localStorage.setItem('cTblContractDateEnd', date);
        },

        setPage({ commit }, page) {
          commit('set_page', page);
          localStorage.setItem('cTblPage', page);
        },

        setPageSize({ commit }, pageSize) {
          commit('set_page_size', pageSize);
          localStorage.setItem('cTblPageSize', pageSize);
        },

        setSearchQuery({ commit }, searchQuery) {
          commit('set_search_query', searchQuery);
          localStorage.setItem('cTblSearchQuery', searchQuery);
        },
    }
}