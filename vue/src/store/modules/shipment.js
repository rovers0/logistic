import axiosClient from '@/axios'



const state = {
    master: {},
}

const getters = {}

const actions = {
    async getMasterShipment({ commit, state }) {
        if(Object.keys(state.master).length !== 0) return
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/shipments/master`)
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
    async getShipmentByIds({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`shipments`, { params: params })
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
    async updateWaiting({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/shipments/`+payload.id+`/update-waiting`, payload)
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
    async updateOutput({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/shipments/update-output`, payload)
            .then((res) => {
                if(res.data && res.data.code == 200 && res.data.data.url) {
                    commit('downloadByURL', res.data.data.url, { root: true })
                }
                commit('setLoading', false, { root: true })
                return res.data
            })
            .catch((error) => {
                commit('setLoading', false, { root: true })
                console.log(error)
                return false
            })
    },
    async updateData({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/shipments/`+payload.id, payload)
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
    async updateDate({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/shipments/update-date`, payload)
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
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
