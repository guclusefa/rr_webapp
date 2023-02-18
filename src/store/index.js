import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from '@/store/modules/auth'
import loading from '@/store/modules/loading'
import toasts from '@/store/modules/toasts'

export default createStore({
    modules: {
        auth,
        loading,
        toasts
    },
    plugins: [
        createPersistedState({
            key: 'auth',
            paths: ['auth.token', 'auth.tokenExpiration', 'auth.user', 'auth.rememberMe']
        })
    ]
})