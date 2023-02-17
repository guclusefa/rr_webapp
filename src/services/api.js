import axios from "axios";
import store from "@/store";
import i18n from "@/services/i18n";

// Create axios instance with base url and headers
const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        "Accept": "application/json",
        "Accept-Language": localStorage.getItem("locale") || process.env.VUE_APP_I18N_LOCALE,
        "Content-Type": "application/json",
    },
});

// set loading to true when request is made and to false when request is finished or failed
api.interceptors.request.use((config) => {
    store.dispatch("setLoading", true);
    const token = store.getters.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    store.dispatch("setLoading", false);
    return Promise.reject(error);
});
api.interceptors.response.use((response) => {
    store.dispatch("setLoading", false);
    return response;
}, (error) => {
    store.dispatch("setLoading", false);
    return Promise.reject(error);
});

const handleApiSuccessMessage = (response) => {
    let message = "";
    // Check if response is a string (custom message) or an object (response from api
    if (typeof response === "string") {
        message = message = i18n.global.t(response);
    } else {
        message = response.data.message;
    }
    store.dispatch("addToast", {
        type: "success",
        message: message,
    });
};

const handleApiErrorMessage = (error) => {
    let message = "";
    if (!error.response) {
        message = i18n.global.t("app.no_response");
    } else {
        message = error.response.data.errors.message;
    }
    store.dispatch("addToast", {
        type: "error",
        message: message,
    });
};

export { api, handleApiSuccessMessage, handleApiErrorMessage };