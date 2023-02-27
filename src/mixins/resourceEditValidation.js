import {
    validateTitle,
    validateContent,
    validateLink,
    validateRelation,
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
        validateRelation() {
            return validateRelation(this.body.relation, this.submitted);
        },
        // Form validation
        validateForm() {
            return !this.validateTitle() && !this.validateContent() && !this.validateLink() && !this.validateRelation();
        },
    },
};