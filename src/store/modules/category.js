import api from "@/services/api";

const category = {
    state: {
        category: {},

        categories: [],
        categoriesParams: {},
        categoriesParamsDefault: {
            order: "createdAt",
            direction: "DESC",
            limit: 10,
            page: 1,
        },
        categoriesMeta: {},
    },
    mutations: {
        SET_CATEGORY(state, payload) {
            state.category = payload
        },

        SET_CATEGORIES(state, payload) {
            state.categories = payload
        },
        SET_CATEGORIES_PARAMS(state, payload) {
            state.categoriesParams = payload
        },
        SET_CATEGORIES_META(state, payload) {
            state.categoriesMeta = payload
        },
        ADD_CATEGORY(state, payload) {
            state.categories.push(payload)
        },
    },
    actions: {
        async setCategory({ commit }, id) {
            try {
                // Make request
                const response = await api.get(`/categories/${id}`)
                // Set category
                commit('SET_CATEGORY', response.data.data)
                return response;
            }
            catch (error) {
                return error;
            }
        },

        async createCategory({ }, payload) {
            try {
                const response = await api.post('/categories', payload)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async updateCategory({ }, payload) {
            try {
                const response = await api.put(`/categories/${payload.id}`, payload)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async deleteCategory({ }, id) {
            try {
                const response = await api.delete(`/categories/${id}`)
                return response;
            }
            catch (error) {
                return error;
            }
        },

        async setCategories({ commit }, params) {
            try {
                // Set params
                commit('SET_CATEGORIES_PARAMS', params)
                // Make request
                const response = await api.get('/categories', { params })
                // categories
                for (let i = 0; i < response.data.data.length; i++) {
                    commit('ADD_CATEGORY', response.data.data[i])
                }
                // Meta
                commit('SET_CATEGORIES_META', response.data.meta)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async filterCategories({ commit, dispatch }, params) {
            // Reset categories
            commit('SET_CATEGORIES', [])
            commit('SET_CATEGORIES_META', {})
            // Make new request
            dispatch('setCategories', params)
        },
        async reloadCategories({ commit, dispatch, state }) {
            // Reset categories
            commit('SET_CATEGORIES', [])
            commit('SET_CATEGORIES_META', {})
            // Update params at page 1
            const params = { ...state.categoriesParams, page: 1 }
            // Make new request
            dispatch('setCategories', params)
        },
        async clearCategories({ commit }) {
            commit('SET_CATEGORIES', [])
            commit('SET_CATEGORIES_META', {})
            commit('SET_CATEGORIES_PARAMS', {})
        },
    },
    getters: {
        category: state => state.category,

        categories: state => state.categories,
        categoriesParams: state => state.categoriesParams,
        categoriesParamsDefault: state => state.categoriesParamsDefault,
        categoriesMeta: state => state.categoriesMeta,
    }
}

export default category