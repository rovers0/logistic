import { createStore } from 'vuex'

import actions from './actions/index'
import mutations from './mutations/index'
import state from './state/index'

import contract from './modules/contract'
import rent from './modules/rent'
import facility from './modules/master/facility'
import patient from './modules/master/patient'
import machine from './modules/master/machine'
import config from './modules/master/config'
import achievement from './modules/achievement'
import change from './modules/change'
import fault from './modules/fault'
import exchange from './modules/exchange'
import invoice from './modules/invoice'
import cancel from './modules/cancel'
import stock from './modules/stock'
import shipment from './modules/shipment'

const store = createStore({
    state: state,
    getters: {
        user: function(state) {
            return !state.user.data || Object.keys(state.user.data).length === 0 ? null : JSON.parse(state.user.data)
        },
    },
    actions: actions,
    mutations: mutations,
    modules: {
        contract,
        rent,
        achievement,
        change,
        fault,
        exchange,
        cancel,
        facility,
        patient,
        machine,
        config,
        stock,
        shipment,
        invoice
    },
})

export default store