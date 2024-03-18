import axiosClient from "../../axios";

const state = {
    stockList: {
        pump_code: 'A',
        pump_type: 1,
        sort: null,
        sort_by: null
    },
    stockWait: {
       pump_code: 'A',
       control_number: null,
       serial_no: null,
       wait_type: null
    },
    stockTransferInstruction: {
        todo_date: null
    }
};

const actions = {
    getStockList({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("stock", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    moveSetting({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("stock/move-setting", data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getOrderList({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("stock/order-list", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getWaitList({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("stock/wait", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getTransferInstruction({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get("stock/stock-trans-inst", {params: data}).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getStockDetail({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get(`stock/stock-detail/${data}`).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    getMachines({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.get(`machines`).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    addWait({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("stock/wait-store", data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    updateWait({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("stock/wait-update", data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    importReceipt({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("stock/receipt-record", data.formData, {
            headers: { "Content-Type": "multipart/form-data" },
            charset: "utf-8",
            boundary: Math.random().toString().substr(2)
        }).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    stockIn({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("stock/stock-in", data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    updateRemark({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("stock/stock-update-remark", data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    importShipmentRecord({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("stock/shipment-record", data.formData, {
            headers: { "Content-Type": "multipart/form-data" },
            charset: "utf-8",
            boundary: Math.random().toString().substr(2)
        }).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    shipmentUpdate({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("stock/shipment-update", data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    stockUpdate({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("stock/stock-detail", data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    deleteStock({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`stock/remove-stock/${data.id}`).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    deleteMoveSetting({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`stock/move-setting-remove`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    deleteOrder({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`stock/delete-order/${data.id}`).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    deleteShipment({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`stock/delete-shipment`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    importStockReport({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post("stock/stock-report", data.formData, {
            headers: { "Content-Type": "multipart/form-data" },
            charset: "utf-8",
            boundary: Math.random().toString().substr(2)
        }).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    updateStockReport({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`stock/stock-report/${data.id}/update`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    createStockReport({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`stock/stock-report/create`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    deleteStockReport({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`stock/stock-report/${data.id}/delete`).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    repairShelf({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`stock/repair-shelf`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    },
    deleteWait({ commit }, data) {
        commit('setLoading', true, { root: true });
        return axiosClient.post(`stock/wait/delete`, data).then((res) => {
            commit('setLoading', false, { root: true });
            return res;
        });
    }
};

export default {
    state,
    actions
};
