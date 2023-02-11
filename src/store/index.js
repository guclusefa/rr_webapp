import { createStore } from 'vuex'

// flashMessage object
const flashMessage = {
    state: {
        type: '',
        messages: []
    },
    mutations: {
        setFlashMessage(state, payload) {
            state.type = payload.type
            state.messages.push(payload.message)
        },
        clearFlashMessage(state) {
            state.type = ''
            state.messages = []
        }
    },
    actions: {
        setFlashMessage({ commit }, payload) {
            commit('setFlashMessage', payload)
        },
        clearFlashMessage({ commit }) {
            console.log('clearFlashMessage')
            commit('clearFlashMessage')
        }
    },
    getters: {
        flashMessage(state) {
            return state
        }
    }
}

export default createStore({
    modules: {
        flashMessage
    }
})