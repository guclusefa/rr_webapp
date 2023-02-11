import { postData } from "@/services/api";
import { constants, handleMessage } from "@/services/messages";
import router from "@/router";

export const login = (body) => {
    const url = "/login";
    postData(url, body).then((response) => {
        // Error
        if (response == null) return;
        // Success
        if (response.status === 200) {
            handleMessage(constants.TYPE_SUCCESS, "login.success", true);
            router.push({ name: "home" });
        } else {
            handleMessage(constants.TYPE_ERROR, response.data.errors.message);
        }
    })
};