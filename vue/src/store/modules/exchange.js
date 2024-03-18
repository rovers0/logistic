import axiosClient from '@/axios'

const initSearch = {
    pump_code: 'A',
    status: null,
    plan: null,
    plan_date: null,
    is_complete: false,
}

const initGuideSearch = {
    pump_code: 'A',
    status: null,
    smd_code: null,
    dcf_code: null,
    patient_cd: null,
    patient_name: null,
    fac_name: null,
}

const initShippingSearch = {
    pump_code: 'A',
    status: null,
    dcf_code: null,
    patient_cd: null,
    patient_name: null,
    fac_name: null,
    inst_date: null,
}

const initApprovalSearch = {
    pump_code: 'A',
    status: null,
    serial_no: null,
    patient_cd: null,
    patient_name: null,
    fac_name_code: null,
}

const state = {
    master: {},
    search: {
        ...initSearch,
    },
    guide_search: {
        ...initGuideSearch
    },
    shipping_search: {
        ...initShippingSearch
    },
    approval_search: {
        ...initApprovalSearch
    }
}

const getters = {}

const actions = {
    async getMasterExchange({ commit, state }) {
        if (Object.keys(state.master).length !== 0) return
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/exchanges/master`)
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
    async getIndexExchange({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/exchanges`, { params: params })
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
    async getExchange({ commit }, id) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/exchanges/`+id)
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
    async getPlanReportExchange({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/exchanges/plan-report`, { params: params })
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
    async storeExchange({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.post(`/exchanges`, payload)
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
    async updatePlan({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/exchanges/update-plan`, payload)
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
    async updateReal({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/exchanges/` + payload.id + '/update-real', payload)
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
    async updateText({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/exchanges/` + payload.id + '/update-text', payload)
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
    async updateFacility({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/exchanges/` + payload.id + '/update-facility', payload)
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
    async updateExchange({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/exchanges/` + payload.id, payload)
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
    async checkUpdateExchange({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/exchanges/` + payload.id+`/check`, payload)
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
    async completeExchange({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/exchanges/` + payload.id + '/complete', payload)
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
    async deleteExchange({ commit }, id) {
        commit('setLoading', true, { root: true })
        return await axiosClient.delete(`/exchanges/`+id)
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
    async exportPDF({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/exchanges/export-pdf`, payload)
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
    async exportExcel({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/exchanges/export-excel`, { params: params })
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
    }
}

const mutations = {
    setMaster: (state, value) => {
        state.master = value
    },
    resetSearch: (state) => {
        state.search = {...state.search, ...initSearch }
    },
    resetGuideSearch: (state) => {
        state.guide_search = {...state.guide_search, ...initGuideSearch}
    },
    resetShippingSearch: (state) => {
        state.shipping_search = {...state.shipping_search, ...initShippingSearch}
    },
    resetApprovalSearch: (state) => {
        state.approval_search = {...state.approval_search, ...initApprovalSearch}
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}