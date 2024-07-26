import axiosClient from "./axiosClient";
import axios from "axios";

const SERVER_API_URL =
    process.env.REACT_APP_ENV === "production"
        ? process.env.REACT_APP_PROD_SERVER_URI
        : process.env.REACT_APP_DEV_SERVER_URI;

axios.defaults.baseURL = SERVER_API_URL;

export const fileApi = {
    upload(file, createFileDto) {
        const formData = new FormData();
        formData.append("file", file);

        // Append DTO fields to formData
        Object.keys(createFileDto).forEach((key) => {
            formData.append(key, createFileDto[key]);
        });

        return axiosClient.post("/file/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};
