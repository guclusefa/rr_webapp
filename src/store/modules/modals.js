const modals = {
    state: {
        title: "",
        body: null,
        props: {},
        large: false
    },

    mutations: {
        SET_MODAL(state, payload) {
            state.title = payload.title
            state.body = payload.body
            state.props = payload.props
            state.large = payload.large
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