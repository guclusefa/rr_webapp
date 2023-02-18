const auth = {
    state: {
        token: null,
        tokenExpiration: null,
        user: null
    },
    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload
        },
        SET_TOKEN_EXPIRATION(state, payload) {
            state.tokenExpiration = payload
        },
        SET_USER(state, payload) {
            state.user = payload
        },
    },
    actions: {
        login({ commit }, payload) {
            commit('SET_TOKEN', payload.token)
            commit('SET_TOKEN_EXPIRATION', payload.expirationDate)
            commit('SET_USER', payload.data)
        },
        logout({ commit }) {
            commit('SET_TOKEN', null)
            commit('SET_TOKEN_EXPIRATION', null)
            commit('SET_USER', null)
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.token !== null
        },
        token(state) {
            return state.token
        },
        tokenExpiration(state) {
            return state.tokenExpiration
        },
        user(state) {
            return state.user
        }
    },
}

export default auth