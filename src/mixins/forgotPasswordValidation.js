import {
    validateEmail,
} from "@/services/validators";

export default {
    data() {
        return {
            submitted: false,
        };
    },
    methods: {
        // Email validation
        validateEmail() {
            return validateEmail(this.body.email, this.submitted);
        },
        // Form validation
        validateForm() {
            return !this.validateEmail();
        },
    },
};