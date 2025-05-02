// api/axios.js
import config from "@/config";
import getToken from "@/utils/getToken";
import axios from "axios";

const api = axios.create({
    baseURL: config.api.baseUrl,
    timeout: config.api.timeout,
});

api.interceptors.request.use(
    async (config) => {
        try {
            const token = await getToken();
            if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Erro ao obter token de autenticação:", error);
        }
        return config;
        },
    (error) => Promise.reject(error)
);

export default api;
