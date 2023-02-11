import store from "@/store";
import i18n from "@/services/i18n";

export const constants = {
    SERVER_ERROR: "app.no_response",
    TYPE_ERROR: "error",
    TYPE_SUCCESS: "success"
};

export const handleMessage = (type, errorMessage, redirect = false) => {
    store.dispatch("setFlashMessage", {
        type: type,
        message: i18n.global.t(errorMessage),
        redirect: redirect
    });
}