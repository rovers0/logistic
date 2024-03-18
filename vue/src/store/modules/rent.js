import axiosClient from '@/axios'

const initSearch = {
    search_patient_cd: null,
    search_dcf_code  : null,
    search_fac_name  : null,
    status           : null,
    pump_code        : null,
    search_des_doctor: null,
    inst_date        : null,
    serial_no        : null,
}

const state = {
    master: {},
    index_search: {
        ...initSearch,
        is_complete: false
    },
    order_search: {
        ...initSearch
    },
    shipping_search: {
        ...initSearch
    },
    consent_search: {
        ...initSearch
    },
    contracts: [],
    pump_code: 'A',
}

const getters = {}

const actions = {
    async getMasterRent({ commit, state }) {
        if(Object.keys(state.master).length !== 0) return
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/rents/master`)
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
    async getIndexRent({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/rents`, { params: params })
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
    async getDetailRent({ commit }, rent_id) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/rents/`+rent_id)
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
    async getContracts({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`rents/contracts`, { params: params })
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
    async storeRent({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.post(`/rents`, payload)
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
    async updateRent({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/rents/`+payload.id, payload)
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
    async checkUpdateRent({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/rents/`+payload.id+`/check`, payload)
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
    async setDateShipment({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/rents/shipment-set-date`, payload)
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
    async getShipmentByIds({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`rents/shipment-ids`, { params: params })
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
    async updateShipmentFirstTime({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/rents/`+payload.rent_id+`/update-shipment-waiting-output`, payload)
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
    async exportShipmentNext({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/rents/shipment-update-outputted`, payload)
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
    async completeRent({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/rents/`+payload.id+'/completed', payload)
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
    async deleteRent({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.delete(`/rents/`+payload.id, { data: payload })
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
    async checkStopping({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`rents/check-stopping`, { params: params })
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
    resetIndexSearch: (state) => {
        state.index_search = {...state.index_search, ...initSearch, ...{is_complete: false}}
    },
    setContracts: (state, value) => {
        state.contracts = value
    },
    resetOrderSearch: (state) => {
        state.order_search = {...state.order_search, ...initSearch}
    },
    resetShippingSearch: (state) => {
        state.shipping_search = {...state.shipping_search, ...initSearch}
    },
    resetConsentSearch: (state) => {
        state.consent_search = {...state.consent_search, ...initSearch}
    },
    setPumpCode: (state, value) => {
        if(!value) {
            state.pump_code = 'A'
        } else {
            state.pump_code = value
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
