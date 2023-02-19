import {
    validateUsername
} from "@/services/validators";

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
        // Form validation
        validateForm() {
            return !this.validateUsername();
        },
    },
};