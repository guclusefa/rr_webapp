import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from '@/store/modules/auth'
import ban from '@/store/modules/ban'
import category from '@/store/modules/category'
import comment from '@/store/modules/comment'
import loading from '@/store/modules/loading'
import modals from '@/store/modules/modals'
import offcanvas from '@/store/modules/offcanvas'
import profile from '@/store/modules/profile'
import relation from '@/store/modules/relation'
import resource from '@/store/modules/resource'
import toasts from '@/store/modules/toasts'

export default createStore({
    modules: {
        auth,
        ban,
        category,
        comment,
        loading,
        modals,
        offcanvas,
        profile,
        relation,
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