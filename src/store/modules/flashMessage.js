const flashMessage = {
    state: {
        type: "",
        message: ""
    },
    mutations: {
        setFlashMessage(state, payload) {
            state.type = payload.type
            state.message = payload.message
        },
        clearFlashMessage(state) {
            state.type = ""
            state.message = ""
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