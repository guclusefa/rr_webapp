import api from "@/services/api";

const profile = {
    state: {
        profile: {
            id: null,
            username: null,
            email: null,
            firstName: null,
            lastName: null,
            bio: null,
            photo: null,
            roles: [],
            gender: null,
            birthDate: null,
            isCertified: null,
            createdAt: null,
            updatedAt: null,
        },
    },
    mutations: {
        SET_PROFILE(state, payload) {
            state.profile = payload
        },
        CLEAR_PROFILE(state) {
            state.profile = null
        }
    },
    actions: {
        async setProfile({ commit }, id) {
            try {
                const response = await api.get(`/users/${id}`)
                commit('SET_PROFILE', response.data.data)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async updateProfile({ dispatch }, payload) {
            try {
                const response = await api.put(`/users/${payload.id}`, payload)
                dispatch('setProfile', payload.id)
                return response;
            }
            catch (error) {
                return error;
            }
        }
    },
    getters: {
        profile: state => state.profile
    }
}

export default profile;