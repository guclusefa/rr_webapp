import { createStore } from 'vuex'
import auth from '@/store/modules/auth'
import loading from '@/store/modules/loading'
import toasts from '@/store/modules/toasts'

export default createStore({
    modules: {
        auth,
        loading,
        toasts
    }
})