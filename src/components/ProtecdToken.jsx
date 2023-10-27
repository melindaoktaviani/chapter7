import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import axios from "axios";
import { token } from "../constants/config";
import { useEffect } from "react";

const ProtecdToken = ({ children }) => {
  const navigate = useNavigate();

  const protecTokenMe = async () => {
    try {
      if (!token) {
        return;
      }
      await axiosInstance.get("/auth/me");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 401) {
          localStorage.removeItem("token");
          return;
        }
        alert(error?.response?.data?.message);
        return;
      }
      alert(error?.message);
    }
  };

  useEffect(() => {
    protecTokenMe();
  }, []);

  return children;
};

export default ProtecdToken;
