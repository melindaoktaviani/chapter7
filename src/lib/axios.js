import axios from "axios";
import { VITE_API_URL, token } from "../constants/config";

export const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

//login
export const axiosLogin = axios.create({
  baseURL: VITE_API_URL,
});
