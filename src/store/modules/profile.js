import api from "@/services/api";

const profile = {
    state: {
        profile: {
            id: null,
            photo: null,
            username: null,
            email: null,
            firstName: null,
            lastName: null,
            state: null,
            bio: null,
            gender: null,
            birthDate: null,
            roles: [],
            isCertified: null,
            createdAt: null,
            updatedAt: null,
        },
        profiles: [],
        profilesParams: {
            search: "",
            certified: 0,
            role: [],
            state: [],
            gender: [],
            order: "createdAt",
            direction: "DESC",
            limit: 10,
            page: 1,
        },
        profilesMeta: {
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
        states: []
    },
    mutations: {
        SET_PROFILE(state, payload) {
            state.profile = payload
        },

        SET_PROFILES(state, payload) {
            state.profiles = payload
        },
        SET_PROFILES_PARAMS(state, payload) {
            state.profilesParams = payload
        },
        SET_PROFILES_META(state, payload) {
            state.profilesMeta = payload
        },
        ADD_PROFILE(state, payload) {
            state.profiles.push(payload)
        },

        SET_STATES(state, payload) {
            state.states = payload
        },
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
        },
        async updateProfilePhoto({ }, payload) {
            try {
                // new FormData() is required to send files
                const formData = new FormData();
                formData.append('photo', payload.photo);
                // set headers to multipart/form-data
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                const response = await api.post(`/users/${payload.id}/photo`, formData, config)
                // Updating the profile is useless for now because the photo url is the same, needs to be fixed : TODO
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async updateProfilePassword({ }, payload) {
            try {
                const response = await api.put(`/users/${payload.id}/password`, payload)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async updateProfileEmail({ }, payload) {
            try {
                const response = await api.put(`/users/${payload.id}/email`, payload)
                return response;
            }
            catch (error) {
                console.log(error)
                return error;
            }
        },
        async confirmEmail({ }, id) {
            try {
                const response = await api.put(`/users/${id}/confirm-email`)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async verifyEmail({ }, token) {
            try {
                const response = await api.put(`/users/verify-email/${token}`)
                return response;
            }
            catch (error) {
                return error;
            }
        },
        async deleteProfile({ }, id) {
            try {
                const response = await api.delete(`/users/${id}`)
                return response;
            }
            catch (error) {
                return error;
            }
        },

        async setProfiles({ commit, state }) {
            try {
                const response = await api.get('/users', { params: state.profilesParams })
                // Profiles
                for (let i = 0; i < response.data.data.length; i++) {
                    commit('ADD_PROFILE', response.data.data[i])
                }
                // Meta
                commit('SET_PROFILES_META', response.data.meta)
                // Next page for next request
                if (response.data.meta.next) {
                    commit('SET_PROFILES_PARAMS', { ...state.profilesParams, page: state.profilesParams.page + 1 })
                }
                return response;
            }
            catch (error) {
                return error;
            }
        },

        async filterProfiles({ commit, dispatch }, params) {
            // Reset profiles
            commit('SET_PROFILES', [])
            commit('SET_PROFILES_META', [])
            // Make new request
            commit('SET_PROFILES_PARAMS', params)
            dispatch('setProfiles')
        },

        async setStates({ commit }) {
            try {
                const response = await api.get('/states')
                commit('SET_STATES', response.data.data)
                return response;
            }
            catch (error) {
                return error;
            }
        },
    },
    getters: {
        profile: state => state.profile,
        profiles: state => state.profiles,
        profilesParams: state => state.profilesParams,
        profilesMeta: state => state.profilesMeta,
        states: state => state.states
    }
}

export default profile;