const CONTRACT_DATE_START = '2007-01-01';
const CONTRACT_DATE_END = new Date().toISOString().slice(0, 10);
const PAGE = 1;
const PAGE_SIZE = 10;
const SEARCH_QUERY = '';
const STATUSES =  [
    {
      status: "новый",
      checked: true,
      icon: "mdi-calendar-plus",
      color: "blue darker-4",
    },
    {
      status: "в работе",
      checked: true,
      icon: "mdi-pickaxe",
      color: "yellow darken-1",
    },
    {
      status: "выполнен",
      checked: true,
      icon: "mdi-check",
      color: "green accent-4",
    },
    {
      status: "отменен",
      checked: false,
      icon: "mdi-close",
      color: "red darkern-4",
    },
];

export default {
    namespaced: true,

    state: {
        activeWorkTypes:   JSON.parse(localStorage.getItem('cTblActiveWorkTypes')) || [],
        checkedStatuses:   JSON.parse(localStorage.getItem('cTblCheckedStatuses')) || STATUSES,
        contractDateEnd:   localStorage.getItem('cTblContractDateEnd')             || CONTRACT_DATE_END,
        contractDateStart: localStorage.getItem('cTblContractDateStart')           || CONTRACT_DATE_START,
        searchQuery:       localStorage.getItem('cTblSearchQuery')                 || SEARCH_QUERY,
        page:             +localStorage.getItem('cTblPage')                        || PAGE,
        pageSize:         +localStorage.getItem('cTblPageSize')                    || PAGE_SIZE,
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