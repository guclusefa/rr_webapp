const loading = {
    state: {
        loading: false
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        }
    },
    actions: {
        setLoading({ commit }, payload) {
            commit('setLoading', payload)
        }
    },
    getters: {
        loading(state) {
            return state.loading
        }
    }
}

export default loading