import {
    validateUser,
    validateReason
} from "@/services/validators";

export default {
    data() {
        return {
            submitted: false,
        };
    },
    methods: {
        validateUser() {
            return validateUser(this.body.user, this.submitted);
        },
        validateReason() {
            return validateReason(this.body.reason, this.submitted);
        },
        validateForm() {
            return !this.validateUser() && !this.validateReason();
        },
    },
};