import axiosClient from "./axiosClient";
import axios from "axios";

const SERVER_API_URL = process.env.REACT_APP_ENV === "production" ? process.env.REACT_APP_PROD_SERVER_URI : process.env.REACT_APP_DEV_SERVER_URI;

axios.defaults.baseURL = SERVER_API_URL;

export const documentApi = async (documentDto) =>
    axiosClient.post("/document", documentDto);

export const askAdditionalQuestion = async (documentId) =>
    axiosClient.post(`/document/first-prompt/${documentId}`);

export const answerAdditionalQuestion = async (documentIdAndAddingPrompt) =>
    axiosClient.put("/document/edit-prompt", documentIdAndAddingPrompt);

export const createReport = async (documentId) =>
    axiosClient.put(`/document/content/${documentId}`);

export const getCreatedReport = async (documentId) =>
    axiosClient.get(`/document/text/${documentId}`);

export const getDocFile = async (documentId) =>
    axiosClient.get(`document/doc/${documentId}`);