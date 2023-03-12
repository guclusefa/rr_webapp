import {
    validateName,
} from "@/services/validators";

export default {
    data() {
        return {
            submitted: false,
        };
    },
    methods: {
        validateName() {
            return validateName(this.body.name, this.submitted);
        },
        validateForm() {
            return !this.validateName();
        },
    },
};