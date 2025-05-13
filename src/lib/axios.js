import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:7000/api",
    withCredentials: true
})