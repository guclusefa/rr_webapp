import axios from "axios";
import store from "@/store";

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

const handleApiError = (error) => {
    let message = "";
    if (!error.response) {
        message = "Network error";
    } else {
        message = error.response.data.errors.message;
    }
    store.dispatch("addToast", {
        type: "error",
        message: message,
    });
};

export { api, handleApiError };