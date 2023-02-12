import { createStore } from 'vuex'
import auth from './modules/auth'
import flashMessage from './modules/flashMessage'
import loading from './modules/loading'

export default createStore({
    modules: {
        auth,
        flashMessage,
        loading
    }
})