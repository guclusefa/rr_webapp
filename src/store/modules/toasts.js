const toasts = {
    state: {
        toasts: [],
    },
    mutations: {
        ADD_TOAST(state, payload) {
            state.toasts.push(payload)
        },
    },
    actions: {
        addToast({ commit }, payload) {
            commit("ADD_TOAST", payload)
        },
    },
    getters: {
        toasts(state) {
            return state.toasts
        }
    }
}

export default toasts