import FlashMessage from '@/components/global/FlashMessage.vue'
import NoResponseMessage from '@/components/global/NoResponseMessage.vue'
import NoResultsMessage from '@/components/global/NoResultsMessage.vue'

export default {
    install(app) {
        app.component('FlashMessage', FlashMessage)
        app.component('NoResponseMessage', NoResponseMessage)
        app.component('NoResultsMessage', NoResultsMessage)
    }
}