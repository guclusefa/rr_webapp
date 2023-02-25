import dateFormatter from "@/services/dates";

export default {
    methods: {
        formatDate(date) {
            return dateFormatter.formatDate(date);
        },
        getAge(date) {
            return dateFormatter.getAge(date);
        },
        getDays(date) {
            return dateFormatter.getDays(date);
        },
    },
};
