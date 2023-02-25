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
        states: []
    },
    mutations: {
        SET_PROFILE(state, payload) {
            state.profile = payload
        },
        CLEAR_PROFILE(state) {
            state.profile = null
        },
        SET_STATES(state, payload) {
            state.states = payload
        },
        CLEAR_STATE(state) {
            state.states = null
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
        async updateProfilePhoto({}, payload) {
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
    },
    getters: {
        profile: state => state.profile,
        states: state => state.states
    }
}

export default profile;