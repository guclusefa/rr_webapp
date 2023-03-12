import api from "@/services/api";

const ban = {
    state: {
        ban: {},

        bans: [],
        bansParams: {},
        bansParamsDefault: {
            order: "id",
            direction: "DESC",
            limit: 10,
            page: 1,
        },
        bansMeta: {},
    },
    mutations: {
        SET_BAN(state, payload) {
            state.ban = payload
        },

        SET_BANS(state, payload) {
            state.bans = payload
        },
        SET_BANS_PARAMS(state, payload) {
            state.bansParams = payload
        },
        SET_BANS_META(state, payload) {
            state.bansMeta = payload
        },
        ADD_BAN(state, payload) {
            state.bans.push(payload)
        },
    },
    actions: {
        async setBan({ commit }, id) {
            try {
                // Make request
                const response = await api.get(`/admin/bans/${id}`)
                // Set ban
                commit('SET_BAN', response.data.data)
                return response;
            }
            catch (error) {
                return error;
            }
        },

        async createBan({ }, payload) {
            try {
                const response = await api.post(`/admin/users/${payload.user}/ban`, payload)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async updateBan({ }, payload) {
            try {
                const response = await api.put(`/admin/bans/${payload.id}`, payload)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async deleteBan({ }, id) {
            try {
                const response = await api.delete(`/admin/bans/${id}`)
                return response;
            }
            catch (error) {
                return error;
            }
        },

        async setBans({ commit }, params) {
            try {
                // Set params
                commit('SET_BANS_PARAMS', params)
                // Make request
                const response = await api.get('/admin/bans', { params })
                // bans
                for (let i = 0; i < response.data.data.length; i++) {
                    commit('ADD_BAN', response.data.data[i])
                }
                // Meta
                commit('SET_BANS_META', response.data.meta)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async filterBans({ commit, dispatch }, params) {
            // Reset bans
            commit('SET_BANS', [])
            commit('SET_BANS_META', {})
            // Make new request
            dispatch('setBans', params)
        },
        async reloadBans({ commit, dispatch, state }) {
            // Reset bans
            commit('SET_BANS', [])
            commit('SET_BANS_META', {})
            // Update params at page 1
            const params = { ...state.bansParams, page: 1 }
            // Make new request
            dispatch('setBans', params)
        },
        async clearBans({ commit }) {
            commit('SET_BANS', [])
            commit('SET_BANS_META', {})
            commit('SET_BANS_PARAMS', {})
        },
    },
    getters: {
        ban: state => state.ban,

        bans: state => state.bans,
        bansParams: state => state.bansParams,
        bansParamsDefault: state => state.bansParamsDefault,
        bansMeta: state => state.bansMeta,
    }
}

export default ban