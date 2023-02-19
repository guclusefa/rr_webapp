import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from '@/store/modules/auth'
import loading from '@/store/modules/loading'
import profile from '@/store/modules/profile'
import toasts from '@/store/modules/toasts'

export default createStore({
    modules: {
        auth,
        loading,
        profile,
        toasts
    },
    plugins: [
        createPersistedState({
            key: 'auth',
            paths: ['auth.token', 'auth.tokenExpiration', 'auth.user', 'auth.rememberMe']
        })
    ]
})