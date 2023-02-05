import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import i18n from '@/services/i18n'
// bootstrap
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "@/assets/scss/main.scss"
// Create app
const app = createApp(App)
// router
app.use(router)
// i18n
app.use(i18n)
i18n.locale = localStorage.getItem('locale') || i18n.fallbackLocale;
// mount
app.mount('#app')