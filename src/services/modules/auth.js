import { postData } from "@/services/api";
import { constants, handleMessage } from "@/services/messages";
import store from "@/store";
import router from "@/router";

export const login = (body) => {
    try {
        const url = "/login";
        postData(url, body)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("token", response.token);
                    handleMessage(constants.TYPE_SUCCESS, "login.success", true);
                    router.push({ name: "home" });
                } else {
                    handleMessage(constants.TYPE_ERROR, response.data.errors.message);
                }
            })
            .catch((error) => {
                handleMessage(constants.TYPE_ERROR, error.message);
            });
    } catch (error) {
        handleMessage(constants.TYPE_ERROR, error);
    } finally {
        store.dispatch("clearFlashMessage");
    }
};