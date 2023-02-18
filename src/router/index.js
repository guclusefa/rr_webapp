import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/services/i18n.js'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue'
import LogoutForm from '@/components/auth/LogoutForm.vue'

// Routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView
  },
  {
    path: '/forgot-password/:token',
    name: 'forgot-password-reset',
    component: ForgotPasswordView
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutForm
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]
// Router
const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})
// Set document title
router.beforeEach((to, from, next) => {
  document.title = i18n.global.t(to.name+".page") + ' - ' + process.env.VUE_APP_TITLE;
  next()
})

export default router
