// mandatory imports
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/services/i18n'
// bootstrap
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "@/assets/scss/main.scss"

// Create app
const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
// mount on #app
app.mount('#app')