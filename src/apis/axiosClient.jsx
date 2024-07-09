import axios, { AxiosInstance } from 'axios';
import { getCookie } from 'cookies-next';
import {
  getNewAccessToken,
  getRefreshTokenFromCookie,
} from './apis/user';

const SERVER_API_URL = import.meta.env.VITE_ENVIRONMENT === 'production' ? import.meta.env.VITE_SERVER_API_URL : import.meta.env.VITE_SERVER_API_URL_DEV;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['x-mn-api-version'] = 'v1';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

if (!SERVER_API_URL) {
  console.log('API URL:', SERVER_API_URL);
  throw new Error('API URL MISSING');
}

const baseURL = SERVER_API_URL;

if (!baseURL) {
  throw new Error('BASE_URL IS MISSING');
}

const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    // if (status === 403) {
    if (status === 403 || status === 401) {
      const originalRequest = config;
      const getRefreshTokenRes = await getRefreshTokenFromCookie();
      const refreshToken = getRefreshTokenRes.data.refreshToken;
      if (!refreshToken) return Promise.reject(error);
      await getNewAccessToken({ refreshToken });
      const token = getCookie('accessToken');
      originalRequest.headers.authorization = `Bearer ${token}`;
      console.log("refreshed token");
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
