import axiosClient from '@/axios'

const initSearch = {
    is_show_all: false,
}

const state = {
    master: {},
    search: {
        ...initSearch,
    },
}

const getters = {}

const actions = {
    async getMasterChangeFault({ commit, state }) {
        if(Object.keys(state.master).length !== 0) return
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/faults/master`)
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
    async getIndexChangeFault({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/faults`, { params: params })
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
    async storeChangeFault({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.post(`/faults`, payload)
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
    async updateChangeFault({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/faults/`+payload.id, payload)
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
    async checkUpdateChangeFault({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/faults/`+payload.id+`/check`, payload)
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
    async getFaultDetail({ commit }, id) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/faults/`+id)
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
    async completeChangeFault({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/faults/`+payload.id+'/complete', payload)
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
    async deleteFault({ commit }, id) {
        commit('setLoading', true, { root: true })
        return await axiosClient.delete(`/faults/`+id)
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
        state.search = {...state.search, ...initSearch}
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
