import axios from "axios";
import store from "@/store";
import { constants, handleMessage } from "@/services/messages";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept-Language": localStorage.getItem("locale") || "fr",
    },
});

export const fetchData = async (url, params) => {
    store.dispatch("setLoading", true);
    try {
        const response = await api.get(url, { params });
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

export const postData = async (url, body) => {
    store.dispatch("setLoading", true);
    try {
        const response = await api.post(url, body);
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