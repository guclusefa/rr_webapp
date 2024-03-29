import store from "@/store";
import i18n from "@/services/i18n";

const addSuccessToast = (response) => {
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

const addErrorToast = (error) => {
    let message = "";
    // Check if error is a string (custom message) or an object (response from api)
    if (typeof error === "string") {
        message = i18n.global.t(error);
    } else if (!error.response || error.response.status === 500) {
        message = i18n.global.t("app.no_response");
    } else {
        // TODO This works for now, but will need to change
        if (Array.isArray(error.response.data.errors)) {
            message = error.response.data.errors[0].message;
            for (let i = 1; i < error.response.data.errors.length; i++) {
                let newMessage = error.response.data.errors[i].message;
                addErrorToast(newMessage);
            }
        } else {
            message = error.response.data.errors.message;
        }
    }
    store.dispatch("addToast", {
        type: "error",
        message: message,
    });
};

export { addSuccessToast, addErrorToast };