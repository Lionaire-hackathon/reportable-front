import axiosClient from "./axiosClient";
import axios from "axios";

const SERVER_API_URL = process.env.REACT_APP_ENV === "production" ? process.env.REACT_APP_PROD_SERVER_URI : process.env.REACT_APP_DEV_SERVER_URI;

axios.defaults.baseURL = SERVER_API_URL;

export const fileApi = async (fileDto) => axiosClient.post("/file", fileDto);
