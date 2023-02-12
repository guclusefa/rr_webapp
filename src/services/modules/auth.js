import { postData } from "@/services/api";
import { constants, handleMessage } from "@/services/messages";
import router from "@/router";

export const login = (body) => {
    postData("/login", body).then((response) => {
        // No response or error
        if (response == null) return;
        if (response.status !== 200) {
            handleMessage(constants.TYPE_ERROR, response.data.errors.message);
            return;
        }
        // Set token
        localStorage.setItem("token", response.data.token);
        // If all good, redirect to home with success message
        handleMessage(constants.TYPE_SUCCESS, "login.success", true);
        router.push({ name: "home" });
    })
};