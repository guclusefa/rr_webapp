import {
    validateMedia
} from "@/services/validators";

export default {
    data() {
        return {
            submitted: false,
        };
    },
    methods: {
        // Username validation
        validateMedia() {
            return validateMedia(this.body.media, this.submitted);
        },
        // Form validation
        validateForm() {
            return !this.validateMedia();
        },
    },
};