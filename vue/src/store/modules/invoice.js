import axiosClient from '@/axios'

const initSearch = {
    pump_code: null,
    dataset: null,
    comp_code: null,
    fac_name: null,
    hist_status: [],
    invoice_type: null,
    hasStatus: 0,
    // limit: 100,
    page: 1
}

const state = {
    master: {},
    search: {
        ...initSearch,
    },
}

const getters = {}

const actions = {
    async getMasterInvoice({ commit, state }) {
        if (Object.keys(state.master).length !== 0) return
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/invoices/master`)
            .then((res) => {
                commit('setLoading', false, { root: true })
                commit('setMaster', res.data.data ?? {})
                return res.data
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                console.log(error)
                return false
            })
    },
    async getIndexInvoice({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/invoices`, { params: params })
            .then((res) => {
                commit('setLoading', false, { root: true })
                return res.data
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                console.log(error)
                return false
            })
    },
    async storeInvoice({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.post(`/invoices`, payload)
            .then((res) => {
                commit('setLoading', false, { root: true })
                return res.data
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                console.log(error)
                return false
            })
    },
    async getCompReport({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/invoices/company-report`, { params: params })
            .then((res) => {
                commit('setLoading', false, { root: true })
                return res.data
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                console.log(error)
                return false
            })
    },
    async invoiceMinus({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/invoices/minus`, payload)
            .then((res) => {
                commit('setLoading', false, { root: true })
                return res.data
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                console.log(error)
                return false
            })
    },
    async invoicePlus({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/invoices/plus`, payload)
            .then((res) => {
                commit('setLoading', false, { root: true })
                return res.data
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                console.log(error)
                return false
            })
    },
    async getInvoicePlusHistories({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/patients/invoice-plus`, { params: params })
            .then((res) => {
                commit('setLoading', false, { root: true })
                return res.data
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                console.log(error)
                return false
            })
    },
}

const mutations = {
    setMaster: (state, value) => {
        state.master = value
    },
    resetSearch: (state) => {
        state.search = {...state.search, ...initSearch }
        let today = new Date()
        state.search.dataset = {year: today.getFullYear(), month: today.getMonth()}
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}