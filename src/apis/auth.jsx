import axiosClient from "./axiosClient";
import axios from "axios";

export const sendCode = async (emailDto) => {
    return axiosClient.post("/auth/send-code", emailDto);
};

export const verifyCode = async (emailCodeDto) => {
    return axiosClient.put("/auth/verify-code", emailCodeDto);
};
