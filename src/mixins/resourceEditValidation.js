import {
    validateTitle,
    validateContent,
    validateLink,
} from "@/services/validators";

export default {
    data() {
        return {
            submitted: false,
        };
    },
    methods: {
        validateTitle() {
            return validateTitle(this.body.title, this.submitted);
        },
        validateContent() {
            return validateContent(this.body.content, this.submitted);
        },
        validateLink() {
            return validateLink(this.body.link, this.submitted);
        },
        // Form validation
        validateForm() {
            return !this.validateTitle() && !this.validateContent() && !this.validateLink();
        },
    },
};