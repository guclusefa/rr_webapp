import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
});

export const fetchData = async (url, params) => {
    try {
        const response = await api.get(url, {
            params,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
