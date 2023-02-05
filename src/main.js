import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import i18n from '@/services/i18n'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import "@/assets/scss/main.scss"

const app = createApp(App)
app.use(router)

app.use(i18n)
i18n.locale = localStorage.getItem('locale') || i18n.fallbackLocale;

app.mount('#app')