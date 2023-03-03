const offcanvas = {
    state: {
        title: "",
        body: null,
        props: {}
    },

    mutations: {
        SET_OFFCANVAS(state, payload) {
            state.title = payload.title
            state.body = payload.body
            state.props = payload.props
        }
    },

    actions: {
        setOffCanvas({ commit }, payload) {
            commit("SET_OFFCANVAS", payload)
        }
    },

    getters: {
        offCanvas(state) {
            return state
        }
    }
}

export default offcanvas