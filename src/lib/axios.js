import axios from "axios";
import { VITE_API_URL } from "../constants/config";

export const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
});

//login
export const axiosLogin = axios.create({
  baseURL: VITE_API_URL,
});
