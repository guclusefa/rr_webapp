import {
    validateEmail,
    validateEmailConfirmation,
    validateUsername,
    validatePassword,
    validatePasswordConfirmation,
    validateAcceptTerms,
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
        // Email confirmation validation
        validateEmailConfirmation() {
            return validateEmailConfirmation(
                this.body.email,
                this.body.email_confirmation,
                this.submitted
            );
        },
        // Username validation
        validateUsername() {
            return validateUsername(this.body.username, this.submitted);
        },
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
        // Accept terms validation
        validateAcceptTerms() {
            return validateAcceptTerms(this.body.accept_terms, this.submitted);
        },
        // Form validation
        validateForm() {
            return !this.validateEmail() &&
                !this.validateEmailConfirmation() &&
                !this.validateUsername() &&
                !this.validatePassword() &&
                !this.validatePasswordConfirmation() &&
                !this.validateAcceptTerms();
        },
    },
};