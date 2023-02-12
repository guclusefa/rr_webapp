const auth = {
    state: {
        token: null,
        user: null
    },
    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload
            localStorage.setItem('token', payload)
        },
        SET_USER(state, payload) {
            state.user = payload
        }
    },
    actions: {
        setToken({ commit }, payload) {
            commit('SET_TOKEN', payload)
        },
        setUser({ commit }, payload) {
            commit('SET_USER', payload)
        }
    },
    getters: {
        token(state) {
            return state.token || localStorage.getItem('token')
        },
        user(state) {
            return state.user
        }
    }
}

export default auth