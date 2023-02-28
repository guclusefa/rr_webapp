import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from '@/store/modules/auth'
import comment from '@/store/modules/comment'
import loading from '@/store/modules/loading'
import profile from '@/store/modules/profile'
import resource from '@/store/modules/resource'
import toasts from '@/store/modules/toasts'

export default createStore({
    modules: {
        auth,
        comment,
        loading,
        profile,
        resource,
        toasts
    },
    plugins: [
        createPersistedState({
            key: 'auth',
            paths: ['auth.token', 'auth.tokenExpiration', 'auth.user', 'auth.rememberMe']
        })
    ]
})