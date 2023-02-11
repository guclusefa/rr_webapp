const flashMessage = {
    state: {
        type: "",
        message: "",
        redirect: false
    },
    mutations: {
        setFlashMessage(state, payload) {
            state.type = payload.type
            state.message = payload.message
            state.redirect = payload.redirect
        },
        clearFlashMessage(state) {
            state.type = ""
            state.message = ""
            state.redirect = false
        }
    },
    actions: {
        setFlashMessage({ commit }, payload) {
            commit('setFlashMessage', payload)
        },
        clearFlashMessage({ commit }) {
            commit('clearFlashMessage')
        }
    },
    getters: {
        flashMessage(state) {
            return state
        }
    }
}

export default flashMessage