import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/services/i18n.js'

import HomeView from '@/views/HomeView.vue'
// Auth views
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue'
import ForgotPasswordResetView from '@/views/auth/ForgotPasswordResetView.vue'
import LogoutForm from '@/components/auth/LogoutForm.vue'
// Profile views
import ProfileView from '@/views/profile/ProfileView.vue'

// Routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView
  },
  {
    path: '/forgot-password/:token',
    name: 'forgot-password-reset',
    component: ForgotPasswordResetView
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutForm
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: ProfileView
  },
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
