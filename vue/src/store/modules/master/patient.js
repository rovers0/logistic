import axiosClient from '@/axios'
import { ROW_LIMITS } from "@/components/Constants.vue"

const initSearch = {
    search_patient_code     : null,
    search_patient_name     : null,
    search_serial_number    : null,
    status                  : null,
    pump_code               : null,
    search_fac_name         : null,
    search_des_clinic_doctor: null,
    invoice_from            : null,
    invoice_to              : null,
    is_invoice_finish       : false,
}

const state = {
    master: {},
    search: {
        limit: ROW_LIMITS[0].id,
        page: 1,
        sort: 'patient_cd',
        sort_by: 'asc',
        ...initSearch
    },
    patients: []
}

const getters = {}

const actions = {
    async getMasterPatient({ commit, state }) {
        if(Object.keys(state.master).length !== 0) return
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/patients/master`)
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
    async getIndexPatientHistory({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/patients`, { params: params })
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
    async getPatient({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/patients/patient`, { params: params })
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
    async showPatientHistory({ commit }, patient_id) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/patients/`+patient_id)
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
    async getPatientCode({ commit }) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/patients/patient-code`)
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
    async storePatient({ commit }, payload) {
        commit('setLoading', true, { root: true })
        return await axiosClient.post(`/patients`, payload)
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
    async updatePatient({ commit }, data) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/patients/`+data.patient_id, data.payload)
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
    async deletePatient({ commit }, data) {
        commit('setLoading', true, { root: true })
        return await axiosClient.delete(`/patients/`+data.patient_id)
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
    async updatePatientHistory({ commit }, data) {
        commit('setLoading', true, { root: true })
        return await axiosClient.put(`/patients/`+data.patient_id+`/update-history/`+data.hist_no, data.payload)
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
    async showHistory({ commit }, data) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/patients/`+data.patient_id+`/history/`+data.hist_no)
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
    async deletePatientHistory({ commit }, data) {
        commit('setLoading', true, { root: true })
        return await axiosClient.delete(`/patients/`+data.patient_id+`/delete-history/`+data.hist_no)
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
    async exportPatient({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/patients/export`, { params: params })
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
        // state.search.sort = 'patient_cd'
        // state.search.sort_by = 'asc'
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
    setPatients: (state, data) => {
        state.patients = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
