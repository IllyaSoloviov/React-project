import axios from "axios";

const API_KEY = '8bdb769fcd354b7fb93a3b68c74c9318'

export const instance = axios.create({
    baseURL: 'https://api.rawg.io/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

//Перехоплювач для підстановки api-key у query params
instance.interceptors.request.use((config) => {
    config.params = {
        key: API_KEY,
        ...config.params,
    }
    return config
});

export default instance;
