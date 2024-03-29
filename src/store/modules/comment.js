import api from "@/services/api";

const comment = {
    state: {
        comment: {},

        comments: [],
        commentsParams: {},
        commentsParamsDefault: {
            search: "",
            author: [],
            resource: [],
            replyto: [],
            order: "createdAt",
            direction: "DESC",
            limit: 10,
            page: 1,
        },
        commentsMeta: {},
    },
    mutations: {
        SET_COMMENT(state, payload) {
            state.comment = payload
        },

        SET_COMMENTS(state, payload) {
            state.comments = payload
        },
        SET_COMMENTS_PARAMS(state, payload) {
            state.commentsParams = payload
        },
        SET_COMMENTS_META(state, payload) {
            state.commentsMeta = payload
        },
        ADD_COMMENT(state, payload) {
            state.comments.push(payload)
        },
    },
    actions: {
        async setComment({ commit }, id) {
            try {
                // Make request
                const response = await api.get(`/comments/${id}`)
                // Set comment
                commit('SET_COMMENT', response.data.data)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async createComment({ }, payload) {
            try {
                const response = await api.post('/comments', payload)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async updateComment({ dispatch }, payload) {
            try {
                const response = await api.put(`/moderator/comments/${payload.id}`, payload)
                dispatch('setComment', payload.id)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async deleteComment({ }, id) {
            try {
                const response = await api.delete(`/comments/${id}`)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async replyToComment({ }, payload) {
            try {
                const response = await api.post(`/comments/${payload.id}/reply`, payload)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async reloadComment({ commit, dispatch }, id) {
            // Reset comment
            commit('SET_COMMENT', {})
            // Make new request
            dispatch('setComment', id)
        },

        async setComments({ commit }, params) {
            try {
                // Set params
                commit('SET_COMMENTS_PARAMS', params)
                // Make request
                const response = await api.get('/comments', { params })
                // comments
                for (let i = 0; i < response.data.data.length; i++) {
                    commit('ADD_COMMENT', response.data.data[i])
                }
                // Meta
                commit('SET_COMMENTS_META', response.data.meta)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async filterComments({ commit, dispatch }, params) {
            // Reset comments
            commit('SET_COMMENTS', [])
            commit('SET_COMMENTS_META', {})
            // Make new request
            dispatch('setComments', params)
        },
        async reloadComments({ commit, dispatch, state }) {
            // Reset comments
            commit('SET_COMMENTS', [])
            commit('SET_COMMENTS_META', {})
            // Update params at page 1
            const params = { ...state.commentsParams, page: 1 }
            // Make new request
            dispatch('setComments', params)
        },
        async clearComments({ commit }) {
            commit('SET_COMMENTS', [])
            commit('SET_COMMENTS_META', {})
            commit('SET_COMMENTS_PARAMS', {})
        },
    },
    getters: {
        comment: state => state.comment,

        comments: state => state.comments,
        commentsParams: state => state.commentsParams,
        commentsParamsDefault: state => state.commentsParamsDefault,
        commentsMeta: state => state.commentsMeta,
    }
}

export default comment

