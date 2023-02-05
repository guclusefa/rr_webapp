import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json"
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

export const postData = async (url, data) => {
    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        console.log(error.response);
        return null;
    }
}
