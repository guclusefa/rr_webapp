import { validateContent } from "@/services/validators";

export default {
    data() {
        return {
            submitted: false,
        };
    },
    methods: {
        // Content validation
        validateContent() {
            return validateContent(this.body.content, this.submitted);
        },
        // Form validation
        validateForm() {
            return !this.validateContent();
        },
    },
};