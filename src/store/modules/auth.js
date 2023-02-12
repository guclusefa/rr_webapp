const auth = {
    state: {
        token: null,
        tokenExpiration: null,
        user: null
    },
    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload
            localStorage.setItem('token', payload)
        },
        CLEAR_TOKEN(state) {
            state.token = null
            localStorage.removeItem('token')
        },
        SET_TOKEN_EXPIRATION(state, payload) {
            state.tokenExpiration = payload
            localStorage.setItem('tokenExpiration', payload)
        },
        CLEAR_TOKEN_EXPIRATION(state) {
            state.tokenExpiration = null
            localStorage.removeItem('tokenExpiration')
        },
        SET_USER(state, payload) {
            state.user = payload
            localStorage.setItem('user', JSON.stringify(payload))
        },
        CLEAR_USER(state) {
            state.user = null
            localStorage.removeItem('user')
        },
    },
    actions: {
        setToken({ commit }, payload) {
            commit('CLEAR_TOKEN')
            commit('SET_TOKEN', payload)
        },
        clearToken({ commit }) {
            commit('CLEAR_TOKEN')
        },
        setTokenExpiration({ commit }, payload) {
            commit('CLEAR_TOKEN_EXPIRATION')
            commit('SET_TOKEN_EXPIRATION', payload)
        },
        clearTokenExpiration({ commit }) {
            commit('CLEAR_TOKEN_EXPIRATION')
        },
        setUser({ commit }, payload) {
            commit('CLEAR_USER')
            commit('SET_USER', payload)
        },
        clearUser({ commit }) {
            commit('CLEAR_USER')
        },
        clearAuthData({ commit }) {
            commit('CLEAR_TOKEN')
            commit('CLEAR_TOKEN_EXPIRATION')
            commit('CLEAR_USER')
        }
    },
    getters: {
        token(state) {
            return state.token || localStorage.getItem('token')
        },
        tokenExpiration(state) {
            return state.tokenExpiration || localStorage.getItem('tokenExpiration')
        },
        user(state) {
            return state.user || JSON.parse(localStorage.getItem('user'))
        }
    }
}

export default auth