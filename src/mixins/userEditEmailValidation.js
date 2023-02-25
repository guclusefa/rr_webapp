import {
    validatePassword,
    validateEmail,
    validateEmailConfirmation,
} from "@/services/validators";

export default {
    data() {
        return {
            submitted: false,
        };
    },
    methods: {
        // old password validation
        validateOldPassword() {
            return validatePassword(this.body.old, this.submitted);
        },
        // Email validation
        validateEmail() {
            return validateEmail(this.body.email, this.submitted);
        },
        // Email confirmation validation
        validateEmailConfirmation() {
            return validateEmailConfirmation(
                this.body.email,
                this.body.email_confirmation,
                this.submitted
            );
        },
        // Form validation
        validateForm() {
            return !this.validateOldPassword() && !this.validateEmail() && !this.validateEmailConfirmation();
        },
    },
};