import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from '@/store/modules/auth'
import comment from '@/store/modules/comment'
import loading from '@/store/modules/loading'
import modals from '@/store/modules/modals'
import offcanvas from '@/store/modules/offcanvas'
import profile from '@/store/modules/profile'
import resource from '@/store/modules/resource'
import toasts from '@/store/modules/toasts'

export default createStore({
    modules: {
        auth,
        comment,
        loading,
        modals,
        offcanvas,
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