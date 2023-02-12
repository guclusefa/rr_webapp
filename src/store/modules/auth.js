const auth = {
    state: {
        token: null,
        user: null
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload
        },
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        setToken({ commit }, payload) {
            commit('setToken', payload)
        },
        setUser({ commit }, payload) {
            commit('setUser', payload)
        }
    },
    getters: {
        token(state) {
            return localStorage.getItem('token') || state.token
        },
        user(state) {
            return state.user
        }
    }
}

export default auth