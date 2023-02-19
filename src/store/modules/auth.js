import api from "@/services/api";

const auth = {
    state: {
        token: null,
        tokenExpiration: null,
        user: null,
        rememberMe: null
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
        SET_REMEMBER_ME(state, payload) {
            state.rememberMe = payload
        },
        CLEAR_TOKEN(state) {
            state.token = null
        },
        CLEAR_TOKEN_EXPIRATION(state) {
            state.tokenExpiration = null
        },
        CLEAR_USER(state) {
            state.user = null
        },
        CLEAR_REMEMBER_ME(state) {
            state.rememberMe = null
        }
    },
    actions: {
        async login({ commit }, payload) {
            try {
                const response = await api.post('/login', payload)
                commit('SET_TOKEN', response.data.token)
                commit('SET_TOKEN_EXPIRATION', response.data.expirationDate)
                commit('SET_USER', response.data.data)
                commit('SET_REMEMBER_ME', payload.rememberMe)
                return response;
            } catch (error) {
                return error;
            }
        },
        logout({ commit }) {
            commit('CLEAR_TOKEN')
            commit('CLEAR_TOKEN_EXPIRATION')
            commit('CLEAR_USER')
            commit('CLEAR_REMEMBER_ME')
        },
        updateToken({ commit }, payload) {
            commit('SET_TOKEN', payload.token)
            commit('SET_TOKEN_EXPIRATION', payload.expirationDate)
        },
        updateUser({ commit }, payload) {
            commit('SET_USER', payload.data)
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
            return new Date(state.tokenExpiration)
        },
        user(state) {
            return state.user
        },
        rememberMe(state) {
            return state.rememberMe
        }
    },
}

export default auth