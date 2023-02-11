import FlashMessage from '@/components/global/FlashMessage.vue'
import NoResultsMessage from '@/components/global/NoResultsMessage.vue'

export default {
    install(app) {
        app.component('FlashMessage', FlashMessage)
        app.component('NoResultsMessage', NoResultsMessage)
    }
}