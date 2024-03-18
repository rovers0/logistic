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
    async getMasterCancel({ commit, state }) {
        if(Object.keys(state.master).length !== 0) return
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/cancels/master`)
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
    async getIndexCancel({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/cancels`, { params: params })
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
    async storeCancel({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.post(`/cancels`, payload)
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
    async updateCancel({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/cancels/`+payload.id+``, payload)
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
    async updatePause({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/cancels/`+payload.id+`/pause`, payload)
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
    async updatePauseComplete({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/cancels/`+payload.id+`/pause-complete`, payload)
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
    async updateStopComplete({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/cancels/`+payload.id+`/stop-complete`, payload)
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
    async deleteCancel({ commit }, cancel_id) {
        commit('setLoading', true, { root: true })
        return await axiosClient.delete(`/cancels/`+cancel_id)
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
    async updateTransfer({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/cancels/`+payload.id+`/transfer`, payload)
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
    async stopRent({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/cancels/stop-rent`, payload)
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
