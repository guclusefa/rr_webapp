import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept-Language": localStorage.getItem("locale") || "fr",
    },
});

export const fetchData = async (url, params) => {
    try {
        const response = await api.get(url, { params });
        return response.data;
    } catch (error) {
        console.log(error.response);
        return null;
    }
}

export const postData = async (url, body) => {
    try {
        const response = await api.post(url, body);
        return response.data;
    } catch (error) {
        console.log(error.response.status, error.response.data);
        return null;
    }
}