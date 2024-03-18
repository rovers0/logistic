import axiosClient from '@/axios'
import { ROW_LIMITS } from "@/components/Constants.vue"

const initSearch = {
    search_smd_code      : null,
    search_dcf_code      : null,
    search_facility_phone: null,
    comp_code            : null,
    search_department    : null,
    search_facility_name : null,
    search_customer_code : null,
    search_branch_name   : null,
    search_ms            : null,
}

const state = {
    master: {},
    search: {
        limit: ROW_LIMITS[0].id,
        page: 1,
        sort: null,
        sort_by: 'asc',
        ...initSearch
    },
    destinations: []
}

const getters = {}

const actions = {
    async getMasterFacility({ commit, state }) {
        if(Object.keys(state.master).length !== 0) return
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/facilities/master`)
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
    async getIndexFacilityDelivery({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/facilities`, { params: params })
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
    async getIndexFacilityStaff({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/facilities/staffs`, { params: params })
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
    async getSmdCode({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/facilities/smd-code`, { params: params })
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
    async getDesCode({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/facilities/des-code`, { params: params })
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
    async storePumpFacility({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.post(`/facilities`, payload)
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
    async showPumpFacility({ commit }, smd_code) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/facilities/`+smd_code)
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
    async deletePumpFacility({ commit }, smd_code) {
        commit('setLoading', true, { root: true })
        return await axiosClient.delete(`/facilities/`+smd_code)
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
    async storePumpDestination({ commit }, data) {
        commit('setLoading', true, { root: true })
        return await axiosClient.post(`/facilities/`+data.smd_code+`/destination`, data.payload)
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
    async updatePumpDestination({ commit }, data) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/facilities/`+data.smd_code+`/destination/`+data.des_code, data.payload)
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
    async deletePumpDestination({ commit }, data) {
        commit('setLoading', true, { root: true })
        return await axiosClient.delete(`/facilities/`+data.smd_code+`/destination/`+data.des_code)
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
    async getSession({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/facilities/sessions`, { params: params })
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
    async getDepartment({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/facilities/departments`, { params: params })
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
    async getGroup({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/facilities/groups`, { params: params })
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
    async getBillingStaffs({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/facilities/billing-staffs`, { params: params })
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
    async updatePumpFacility({ commit }, data) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/facilities/`+data.smd_code, data.payload)
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
    async exportFacility({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/facilities/export`, { params: params })
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
    setSearchSubmit: (state) => {
        state.search.page = 1
        state.search.sort = 'smd_code'
        state.search.sort_by = 'asc'
    },
    resetSearch: (state) => {
        state.search = {...state.search, ...initSearch}
    },
    setSearchProperty: (state, data) => {
        for (const key in {...data}) {
            if(Object.hasOwn(state.search, key)) {
                state.search[key] = data[key]
            }
        }
    },
    setDestination: (state, data) => {
        state.destinations = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
