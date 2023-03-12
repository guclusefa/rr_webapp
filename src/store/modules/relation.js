import api from "@/services/api";

const relation = {
    state: {
        relation: {},

        relations: [],
        relationsParams: {},
        relationsParamsDefault: {
            order: "id",
            direction: "DESC",
            limit: 10,
            page: 1,
        },
        relationsMeta: {},
    },
    mutations: {
        SET_RELATION(state, payload) {
            state.relation = payload
        },

        SET_RELATIONS(state, payload) {
            state.relations = payload
        },
        SET_RELATIONS_PARAMS(state, payload) {
            state.relationsParams = payload
        },
        SET_RELATIONS_META(state, payload) {
            state.relationsMeta = payload
        },
        ADD_RELATION(state, payload) {
            state.relations.push(payload)
        },
    },
    actions: {
        async setRelation({ commit }, id) {
            try {
                // Make request
                const response = await api.get(`/relations/${id}`)
                // Set relation
                commit('SET_RELATION', response.data.data)
                return response;
            }
            catch (error) {
                return error;
            }
        },

        async createRelation({ }, payload) {
            try {
                const response = await api.post('/admin/relations', payload)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async updateRelation({ }, payload) {
            try {
                const response = await api.put(`/admin/relations/${payload.id}`, payload)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async deleteRelation({ }, id) {
            try {
                const response = await api.delete(`/admin/relations/${id}`)
                return response;
            }
            catch (error) {
                return error;
            }
        },

        async setRelations({ commit }, params) {
            try {
                // Set params
                commit('SET_RELATIONS_PARAMS', params)
                // Make request
                const response = await api.get('/relations', { params })
                // relations
                for (let i = 0; i < response.data.data.length; i++) {
                    commit('ADD_RELATION', response.data.data[i])
                }
                // Meta
                commit('SET_RELATIONS_META', response.data.meta)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async filterRelations({ commit, dispatch }, params) {
            // Reset relations
            commit('SET_RELATIONS', [])
            commit('SET_RELATIONS_META', {})
            // Make new request
            dispatch('setRelations', params)
        },
        async reloadRelations({ commit, dispatch, state }) {
            // Reset relations
            commit('SET_RELATIONS', [])
            commit('SET_RELATIONS_META', {})
            // Update params at page 1
            const params = { ...state.relationsParams, page: 1 }
            // Make new request
            dispatch('setRelations', params)
        },
        async clearRelations({ commit }) {
            commit('SET_RELATIONS', [])
            commit('SET_RELATIONS_META', {})
            commit('SET_RELATIONS_PARAMS', {})
        },
    },
    getters: {
        relation: state => state.relation,

        relations: state => state.relations,
        relationsParams: state => state.relationsParams,
        relationsParamsDefault: state => state.relationsParamsDefault,
        relationsMeta: state => state.relationsMeta,
    }
}

export default relation