import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import axios from "axios";
import { token } from "../constants/config";
import { useEffect } from "react";

const Protected = ({ children }) => {
  const navigate = useNavigate();

  const protecMe = async () => {
    try {
      if (!token) {
        return navigate("/login");
      }
      await axiosInstance.get("/auth/me");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 401) {
          localStorage.removeItem("token");
          return navigate("/login");
        }
        alert(error?.response?.data?.message);
        return;
      }
      alert(error?.message);
    }
  };

  useEffect(() => {
    protecMe();
  }, []);

  return children;
};

export default Protected;
