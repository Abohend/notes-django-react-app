import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// define the api
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// set the jwt token (from localStorage) in the header of each request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        console.log(`Token is ${token}`);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;