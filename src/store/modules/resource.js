import api from "@/services/api";

const profile = {
    state: {
        resource: {
            id: null,
            media: null,
            title: null,
            content: null,
            link: null,
            visible: null,
            isPublished: null,
            isVerified: null,
            isSuspeded: null,
            author: {},
            relation: {},
            categories:{},
            createdAt: null,
            updatedAt: null,
        },
        resources: [],
        resourcesParams: {
            search: "",
            verified: 0,
            visibility: 0,
            author: [],
            relation: [],
            category: [],
            order: "createdAt",
            direction: "DESC",
            limit: 10,
            page: 1,
        },
        resourcesMeta: {
            total: null,
            count: null,
            page: null,
            pages: null,
            limit: null,
            start: null,
            end: null,
            next: false,
            prev: false,
        },
        authors: [],
        relations: [],
        categories: []
    },
    mutations: {
        SET_RESOURCE(state, payload) {
            state.resource = payload
        },

        SET_RESOURCES(state, payload) {
            state.resources = payload
        },
        SET_RESOURCES_PARAMS(state, payload) {
            state.resourcesParams = payload
        },
        SET_RESOURCES_META(state, payload) {
            state.resourcesMeta = payload
        },
        ADD_RESOURCE(state, payload) {
            state.resources.push(payload)
        },

        SET_AUTHORS(state, payload) {
            state.authors = payload
        },
        SET_RELATIONS(state, payload) {
            state.relations = payload
        },
        SET_CATEGORIES(state, payload) {
            state.categories = payload
        }
    },
    actions: {
        async setResources({ commit, state }) {
            try {
                const response = await api.get('/resources', { params: state.resourcesParams })
                // resources
                for (let i = 0; i < response.data.data.length; i++) {
                    commit('ADD_RESOURCE', response.data.data[i])
                }
                // Meta
                commit('SET_RESOURCES_META', response.data.meta)
                // Next page for next request
                if (response.data.meta.next) {
                    commit('SET_RESOURCES_PARAMS', { ...state.resourcesParams, page: state.resourcesParams.page + 1 })
                }
                return response;
            }
            catch (error) {
                return error;
            }
        },

        async filterResources({ commit, dispatch }, params) {
            // Reset resources
            commit('SET_RESOURCES', [])
            commit('SET_RESOURCES_META', [])
            // Make new request
            commit('SET_RESOURCES_PARAMS', params)
            dispatch('setResources')
        },

        async setAuthors({ commit }) {
            try {
                const response = await api.get('/users')
                commit('SET_AUTHORS', response.data.data)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async setRelations({ commit }) {
            try {
                const response = await api.get('/relations')
                commit('SET_RELATIONS', response.data.data)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async setCategories({ commit }) {
            try {
                const response = await api.get('/categories')
                commit('SET_CATEGORIES', response.data.data)
                return response;
            }
            catch (error) {
                return error;
            }
        },
    },
    getters: {
        resource: state => state.resource,
        resources: state => state.resources,
        resourcesParams: state => state.resourcesParams,
        resourcesMeta: state => state.resourcesMeta,
        authors: state => state.authors,
        relations: state => state.relations,
        categories: state => state.categories,
    }
}

export default profile;