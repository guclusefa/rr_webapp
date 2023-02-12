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
        SET_TOKEN_EXPIRATION(state, payload) {
            state.tokenExpiration = payload
            localStorage.setItem('tokenExpiration', payload)
        },
        SET_USER(state, payload) {
            state.user = payload
            localStorage.setItem('user', JSON.stringify(payload))
        },
        CLEAR_AUTH_DATA(state) {
            state.token = null
            state.tokenExpiration = null
            state.user = null
            localStorage.removeItem('token')
            localStorage.removeItem('tokenExpiration')
            localStorage.removeItem('user')
        }
    },
    actions: {
        setToken({ commit }, payload) {
            commit('SET_TOKEN', payload)
        },
        setTokenExpiration({ commit }, payload) {
            commit('SET_TOKEN_EXPIRATION', payload)
        },
        setUser({ commit }, payload) {
            commit('SET_USER', payload)
        },
        clearAuthData({ commit }) {
            commit('CLEAR_AUTH_DATA')
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