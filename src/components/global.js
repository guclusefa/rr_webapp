import FlashMessage from '@/components/fragments/FlashMessage.vue'
import NoResponseMessage from '@/components/fragments/NoResponseMessage.vue'
import NoResultsMessage from '@/components/fragments/NoResultsMessage.vue'

export default {
    install(app) {
        app.component('FlashMessage', FlashMessage)
        app.component('NoResponseMessage', NoResponseMessage)
        app.component('NoResultsMessage', NoResultsMessage)
    }
}