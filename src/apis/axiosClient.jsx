import axios from "axios";
import Cookies from "js-cookie";
import { getNewAccessToken, getRefreshTokenFromCookie } from "./user";

const baseURL = process.env.REACT_APP_ENV === "production" ? process.env.REACT_APP_PROD_SERVER_URI : process.env.REACT_APP_DEV_SERVER_URI;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['x-mn-api-version'] = 'v1';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

if (!baseURL) {
    throw new Error("BASE_URL IS MISSING");
}

const axiosClient = axios.create({
    baseURL,
    withCredentials: true,
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response: { status } } = error;
        if (status === 403 || status === 401) {
            const originalRequest = config;
            try {
                const getRefreshTokenRes = await getRefreshTokenFromCookie();
                const refreshToken = getRefreshTokenRes.data.refreshToken;
                if (!refreshToken) return Promise.reject(error);
                await getNewAccessToken(refreshToken);
                const token = Cookies.get("accessToken");
                console.log('accessToken', token);
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                console.log("refreshed token");
                return axios(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
