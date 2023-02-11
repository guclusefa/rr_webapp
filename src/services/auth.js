import { postData } from "@/services/api";

export const login = (url, body, successCallback, errorCallback, finallyCallback) => {
    postData(url, body)
        .then((response) => {
            if (response.status === 200) {
                localStorage.setItem("token", response.token);
                successCallback();
            } else {
                errorCallback(response.data.errors.message);
            }
        })
        .catch((error) => {
            errorCallback(error);
        })
        .finally(() => {
            finallyCallback();
        });
};
