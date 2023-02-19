import { validateUsername, validatePassword } from "@/services/validators";

export default {
    data() {
        return {
            submitted: false,
        };
    },
    methods: {
        // Username validation
        validateUsername() {
            return validateUsername(this.body.username, this.submitted);
        },
        // Password validation
        validatePassword() {
            return validatePassword(this.body.password, this.submitted);
        },
        // Form validation
        validateForm() {
            return !this.validateUsername() && !this.validatePassword();
        },
    },
};