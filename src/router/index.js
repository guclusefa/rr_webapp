import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/services/i18n.js'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'

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
  }
]
// Router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// Set document title
router.beforeEach((to, from, next) => {
  document.title = i18n.global.t(to.name+".page") + ' - ' + process.env.VUE_APP_TITLE;
  next()
})

export default router
