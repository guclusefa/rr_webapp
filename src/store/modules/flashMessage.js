const flashMessage = {
    state: {
        flashMessage: {
            type: "",
            message: "",
            redirect: false
        }
    },
    mutations: {
        SET_FLASH_MESSAGE(state, payload) {
            state.flashMessage.type = payload.type
            state.flashMessage.message = payload.message
            state.flashMessage.redirect = payload.redirect
        },
        CLEAR_FLASH_MESSAGE(state) {
            state.flashMessage.type = ""
            state.flashMessage.message = ""
            state.flashMessage.redirect = false
        }
    },
    actions: {
        setFlashMessage({ commit }, payload) {
            commit('SET_FLASH_MESSAGE', payload)
        },
        clearFlashMessage({ commit }) {
            commit('CLEAR_FLASH_MESSAGE')
        }
    },
    getters: {
        flashMessage(state) {
            return state.flashMessage
        }
    }
}

export default flashMessage