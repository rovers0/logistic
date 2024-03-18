import axiosClient from "../../axios";

const state = {
    contractListNew: {
        search_facility: null,
        signed_date: null,
        comp_cd: null,
        month_renew: null,
        status: null,
        format: null,
        target: null,
        year_renew: null,
        sort: null,
        sort_by: null
    },
    contractList: {
        search_facility: null,
        signed_date: null,
        comp_cd: null,
        is_auto_renew: null,
        month_renew: null,
        status: null,
        format: null,
        target: null,
        sort: null,
        sort_by: null,
        limit: 100,
        page: 1
    }
};

const actions = {
    getContractListNew({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("contracts/new", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getContractList({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("contracts", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getContractMaster() {
        return axiosClient.get("contracts/master").then((res) => {
            return res;
        });
    },
    getFacilityList({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("contracts/facilities", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getContractDetail({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get(`contracts/${data.id}`).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    deleteContract({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.delete(`contracts/${data.id}`, {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    addContract({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`contracts`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    conclusionContract({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`contracts/${data.id}/conclusion-setting`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    addToReNewContract({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`contracts/renewal`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    updateContract({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.put(`contracts/${data.id}`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getStaffList({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get(`get-staff`, {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getCompList({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get(`get-company`).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getSessionList({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get(`get-session/${data.comp_code}`).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getDepList({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get(`get-department/${data.comp_code}`, {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    async export({ commit }, data) {
        commit('setLoading', true, { root: true })
        return await axiosClient.get(`/contracts/export`, {params: data})
            .then((res) => {
                if(res.data && res.data.code == 200 && res.data.data.url) {
                    const link = document.createElement('a')
                    link.href = res.data.data.url
                    link.click()
                    link.remove()
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
};

export default {
    state,
    actions
};
