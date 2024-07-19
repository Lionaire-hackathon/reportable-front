import axiosClient from "./axiosClient";
import axios from "axios";

const SERVER_API_URL = "http://localhost:8080";

axios.defaults.baseURL = SERVER_API_URL;

export const fileApi = async (fileDto) => axiosClient.post("/file", fileDto);
