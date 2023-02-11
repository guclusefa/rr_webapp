import { createStore } from 'vuex'
import flashMessage from './modules/flashMessage'
import loading from './modules/loading'

export default createStore({
    modules: {
        flashMessage,
        loading
    }
})