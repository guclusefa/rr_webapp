import {
    validatePassword,
    validatePasswordConfirmation,
} from "@/services/validators";

export default {
    data() {
        return {
            submitted: false,
        };
    },
    methods: {
        // Password validation
        validatePassword() {
            return validatePassword(this.body.password, this.submitted);
        },
        // Password confirmation validation
        validatePasswordConfirmation() {
            return validatePasswordConfirmation(
                this.body.password,
                this.body.password_confirmation,
                this.submitted
            );
        },
        // Form validation
        validateForm() {
            return !this.validatePassword() && !this.validatePasswordConfirmation();
        },
    },
};