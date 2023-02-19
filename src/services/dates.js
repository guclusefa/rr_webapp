// console log the current locale (so for example, 'en' or 'fr')
const locale = localStorage.getItem("locale") || process.env.VUE_APP_I18N_LOCALE;

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(locale, options);
}

const getAge = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const getDays = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    const diffTime = Math.abs(today - birthDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export default {
    formatDate,
    getAge,
    getDays
}
