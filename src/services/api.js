import axios from "axios";
import store from "@/store";
import { constants, handleMessage } from "@/services/messages";

/* API BASE SET */
const baseURL = "http://localhost:8000/api";
const authorization = store.getters.token ? `Bearer ${store.getters.token}` : null;
const headers = {
    "Content-Type": "application/json",
    "Accept-Language": localStorage.getItem("locale") || "fr",
    "Authorization": authorization
};
const api = axios.create({
    baseURL,
    headers
});

/* API REQUESTS */
const makeRequest = async (method, url, data) => {
    store.dispatch("clearFlashMessage");
    store.dispatch("setLoading", true);
    try {
        const response = await api[method](url, data);
        return response;
    } catch (error) {
        if (error == null || error.response == null) {
            handleMessage(constants.TYPE_ERROR, constants.SERVER_ERROR);
            return;
        }
        return error.response;
    } finally {
        store.dispatch("setLoading", false);
    }
};
/* GET */
export const fetchData = (url, params) => makeRequest("get", url, { params });
/* POST */
export const postData = (url, body) => makeRequest("post", url, body);