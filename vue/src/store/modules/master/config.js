import axiosClient from '@/axios'
const state = {}

const getters = {}

const actions = {
    async getIndexAppConfig({ commit }) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/app-configs`)
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
    async updateAppConfig({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/app-configs`, payload)
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

const mutations = {}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
