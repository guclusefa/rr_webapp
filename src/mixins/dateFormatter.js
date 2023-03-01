import dateFormatter from "@/services/dates";

export default {
    methods: {
        formatDate(date) {
            return dateFormatter.formatDate(date);
        },
        formatDateTime(date) {
            return dateFormatter.formatDateTime(date);
        },
        getAge(date) {
            return dateFormatter.getAge(date);
        },
        getDays(date) {
            return dateFormatter.getDays(date);
        },
    },
};
