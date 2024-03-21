import { createStore } from 'vuex'

import actions from './actions/index'
import mutations from './mutations/index'
import state from './state/index'

const store = createStore({
    state: state,
    getters: {
        user: function(state) {
            return !state.user.data || Object.keys(state.user.data).length === 0 ? null : JSON.parse(state.user.data)
        },
    },
    actions: actions,
    mutations: mutations,
})

export default store