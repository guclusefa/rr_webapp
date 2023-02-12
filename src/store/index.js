import { createStore } from 'vuex'
import auth from '@/store/modules/auth'
import loading from '@/store/modules/loading'

export default createStore({
    modules: {
        auth,
        loading
    }
})