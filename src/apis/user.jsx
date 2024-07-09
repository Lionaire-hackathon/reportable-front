/*
import axiosClient from "./axiosClient";
import axios from "axios";

const SERVER_API_URL = process.env.REACT_APP_SERVER_URL;

axios.defaults.baseURL = SERVER_API_URL;

export const getNewAccessToken = async (refreshToken) => 
    axiosClient.post('/auth/refresh', { refreshToken });

    export const getRefreshTokenFromCookie = async () =>
    axiosClient.get("/auth/refreshToken");

export const signup = async(signupDto) =>
    axiosClient.post('/auth/signup', signupDto);

export const login = async(loginDto) =>
    axiosClient.post('/auth/login', loginDto);

export const logout = async() =>
    axiosClient.post('/auth/logout');


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

*/
