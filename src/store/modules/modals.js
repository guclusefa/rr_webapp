const modals = {
    state: {
        title: "",
        body: null,
        props: {}
    },

    mutations: {
        SET_MODAL(state, payload) {
            state.title = payload.title
            state.body = payload.body
            state.props = payload.props
        }
    },

    actions: {
        setModal({ commit }, payload) {
            commit("SET_MODAL", payload)
        }
    },

    getters: {
        modal(state) {
            return state
        }
    }
}

export default modals