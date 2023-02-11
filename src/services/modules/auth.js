import { fetchData, postData } from "@/services/api";
import { constants, handleMessage } from "@/services/messages";
import router from "@/router";

export const checkToken = () => {
    // Check token and set expiration date
    fetchData("/check-token").then((response) => {
        // No response
        if (response == null) return;
        // Success
        if (response.status === 200) {
            localStorage.setItem("expirationDate", response.data.expirationDate);
        } else {
            // Error
            handleMessage(constants.TYPE_ERROR, response.data.errors.message);
        }
    });
};

export const login = (body) => {
    postData("/login", body).then((response) => {
        // No response
        if (response == null) return;
        // Success
        if (response.status === 200) {
            // Set token
            localStorage.setItem("token", response.data.token);
            // If all good, redirect to home with success message
            handleMessage(constants.TYPE_SUCCESS, "login.success", true);
            router.push({ name: "home" });
        } else {
            // Error
            handleMessage(constants.TYPE_ERROR, response.data.errors.message);
        }
    })
};