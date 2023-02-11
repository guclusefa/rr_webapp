const loading = {
    state: {
        isLoading: false
    },
    mutations: {
        setLoading(state, payload) {
            state.isLoading = payload
        }
    },
    actions: {
        setLoading({ commit }, payload) {
            commit('setLoading', payload)
        }
    },
    getters: {
        isLoading(state) {
            return state.isLoading
        }
    }
}

export default loading