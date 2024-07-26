import axiosClient from "./axiosClient";
import axios from "axios";

const SERVER_API_URL = process.env.REACT_APP_ENV === "production" ? process.env.REACT_APP_PROD_SERVER_URI : process.env.REACT_APP_DEV_SERVER_URI;

axios.defaults.baseURL = SERVER_API_URL;

export const getNewAccessToken = async (refreshToken) =>
    axiosClient.post("/auth/refresh", { refreshToken });

export const getRefreshTokenFromCookie = async () =>
    axiosClient.get("/auth/refreshToken");

export const signup = async (signupDto) =>
    axiosClient.post("/auth/signup", signupDto);

export const login = async (loginDto) =>
    axiosClient.post("/auth/login", loginDto);

export const logout = async () => axiosClient.post("/auth/logout");

export const verify = async () => axiosClient.post("/auth/verify");

export const userApi = {
    update(id, updateUserDto) {
        return axiosClient.put(`/user/${id}`, updateUserDto);
    },
    findOne(id) {
        return axiosClient.get(`/user/${id}`);
    },
    remove(id) {
        return axiosClient.delete(`/user/${id}`);
    },
};
