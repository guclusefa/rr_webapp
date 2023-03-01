import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/services/i18n.js'

// Base views
import HomeView from '@/views/HomeView.vue'
// Components
import UserVerify from '@/components/user/actions/UserVerify.vue'
import LogoutForm from '@/components/auth/LogoutForm.vue'
// Auth views
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue'
import ForgotPasswordResetView from '@/views/auth/ForgotPasswordResetView.vue'
// Profile views
import ProfilesView from '@/views/profile/ProfilesView.vue'
import ProfileView from '@/views/profile/ProfileView.vue'
// Resource views
import ResourcesView from '@/views/resource/ResourcesView.vue'
import ResourceView from '@/views/resource/ResourceView.vue'
// Comment views
import CommentsView from '@/views/comment/CommentsView.vue'
import CommentView from '@/views/comment/CommentView.vue'

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
    path: '/profiles',
    name: 'profiles',
    component: ProfilesView
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/profile/verify/:token',
    name: 'profile-verify',
    component: UserVerify
  },
  {
    path: '/resources',
    name: 'resources',
    component: ResourcesView
  },
  {
    path: '/resource/:id',
    name: 'resource',
    component: ResourceView
  },
  {
    path: '/comments',
    name: 'comments',
    component: CommentsView
  },
  {
    path: '/comment/:id',
    name: 'comment',
    component: CommentView
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
