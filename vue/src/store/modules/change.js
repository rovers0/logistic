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
    async getMasterChangeFacility({ commit, state }) {
        if(Object.keys(state.master).length !== 0) return
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/changes/master`)
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
    async getIndexChangeFacility({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/changes`, { params: params })
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
    async storeChangeFacility({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.post(`/changes`, payload)
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
    async updateChangeFacility({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/changes/`+payload.id, payload)
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
    async updateChangeFacilityGoOut({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/changes/`+payload.id+`/update-go-out`, payload)
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
    async updateChangeFacilityGoIn({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/changes/`+payload.id+`/update-go-in`, payload)
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
    async deleteChangeFacility({ commit }, change_id) {
        commit('setLoading', true, { root: true })
        return await axiosClient.delete(`/changes/`+change_id)
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
    async completeChangeFacility({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/changes/`+payload.id+`/completed`, payload)
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
        state.index_search = {...state.search, ...initSearch}
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
