const flashMessage = {
    state: {
        flashMessage: {
            type: "",
            message: "",
            redirect: false
        }
    },
    mutations: {
        setFlashMessage(state, payload) {
            state.flashMessage.type = payload.type
            state.flashMessage.message = payload.message
            state.flashMessage.redirect = payload.redirect
        },
        clearFlashMessage(state) {
            state.flashMessage.type = ""
            state.flashMessage.message = ""
            state.flashMessage.redirect = false
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
            return state.flashMessage
        }
    }
}

export default flashMessage