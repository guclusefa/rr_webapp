import axios from "axios";
import store from "@/store";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept-Language": localStorage.getItem("locale") || "fr",
    },
});

// TODO : translate no server response message
const SERVER_ERROR = "The server is not responding. Please try again later.";
const TYPE_ERROR = "error";
const TYPE_SUCCESS = "success";

export const constants = {
    SERVER_ERROR,
    TYPE_ERROR,
    TYPE_SUCCESS,
};

export const handleMessage = (type, errorMessage) => {
    store.dispatch("setFlashMessage", {
        type: type,
        message: errorMessage,
    });
}

export const fetchData = async (url, params) => {
    store.dispatch("setLoading", true);
    try {
        const response = await api.get(url, { params });
        return response;
    } catch (error) {
        if (axios.isCancel()) {
            store.dispatch("setLoading", false);
        }
        if (error == null || error.response == null) {
            return Promise.reject(new Error(
                SERVER_ERROR
            ));
        }
        return error.response;
    } finally {
        store.dispatch("setLoading", false);
    }
};

export const postData = async (url, body) => {
    store.dispatch("setLoading", true);
    try {
        const response = await api.post(url, body);
        return response;
    } catch (error) {
        if (axios.isCancel()) {
            store.dispatch("setLoading", false);
        }
        if (error == null || error.response == null) {
            return Promise.reject(new Error(
                SERVER_ERROR
            ));
        }
        return error.response;
    } finally {
        store.dispatch("setLoading", false);
    }
};