import axiosClient from '@/axios'
const state = {
    master: {}
}

const getters = {}

const actions = {
    async getMasterMachine({ commit, state }) {
        if(Object.keys(state.master).length !== 0) return
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/machines/master`)
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
    async getIndexMachine({ commit }) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/machines`)
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
    async updateMachine({ commit }, data) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/machines/`+data.pump_cd, data.payload)
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
    async storeMachine({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.post(`/machines`, payload)
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
