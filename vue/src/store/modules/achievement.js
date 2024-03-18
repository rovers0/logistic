import axiosClient from '@/axios'
import { ROW_LIMITS } from "@/components/Constants.vue"

const initSearch = {
    search_smd_code: null,
    status: null,
    search_fac_name: null,
    search_inst_id: null,
    search_serial_no: null,
    dateof_start_from: null,
    dateof_start_to: null,
    dateof_into: null,
    dateof_use: null,
    from_shelf: null,
    pump_code: null,
    search_patient_cd: null,
    search_patient_name: null,
    is_finished: false,
    special_flg: false,
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
    async getIndexPatientHistories({ commit }, params) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/patients/histories`, { params: params })
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
    setSearchSubmit: (state) => {
        state.search.page = 1
        state.search.sort = null
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
