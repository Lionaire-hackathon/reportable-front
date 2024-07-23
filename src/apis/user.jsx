import axiosClient from "./axiosClient";
import axios from "axios";

const SERVER_API_URL = "http://localhost:8080";

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
    async update(id, updateUserDto) {
        return axiosClient.put(`/users/${id}`, updateUserDto);
    },
    async findOne(id) {
        return axiosClient.get(`/users/${id}`);
    },
    async remove(id) {
        return axiosClient.delete(`/users/${id}`);
    },
};
