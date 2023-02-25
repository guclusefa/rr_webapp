import {
    validatePhoto
} from "@/services/validators";

export default {
    data() {
        return {
            submitted: false,
        };
    },
    methods: {
        // Username validation
        validatePhoto() {
            return validatePhoto(this.body.photo, this.submitted);
        },
        // Form validation
        validateForm() {
            return !this.validatePhoto();
        },
    },
};