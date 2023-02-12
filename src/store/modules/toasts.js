const toasts = {
    state: {
        toasts: [],
    },
    mutations: {
        ADD_TOAST(state, payload) {
            state.toasts.push(payload)
        },
        CLEAR_TOASTS(state) {
            state.toasts = []
        }
    },
    actions: {
        addToast({ commit }, payload) {
            commit("ADD_TOAST", payload)
        },
        clearToasts({ commit }) {
            commit("CLEAR_TOASTS")
        }
    },
    getters: {
        toasts(state) {
            return state.toasts
        }
    }
}

export default toasts