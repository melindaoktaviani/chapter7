import axios from "axios";
import { setToken, setUser } from "../reducers/authReducer";
import { axiosInstance, axiosLogin } from "../../lib/axios";
import { toastify } from "../../lib/toastify";

export const getMe =
  (navigate, navigatePathSuccess, navigatePathError) =>
  async (dispatch, getState) => {
    try {
      let { token } = getState().auth;
      const response = await axiosInstance.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
      dispatch(setUser(data));
      // if navigatePath params is false/null/undefined, it will not executed
      if (navigatePathSuccess) navigate(navigatePathSuccess);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response.status === 401) {
          dispatch(logout());
          if (navigatePathError) navigate(navigatePathError);
          return;
        }
        alert(error?.response?.data?.message);
        return;
      }
      alert(error?.message);
    }
  };

// export const registerLoginWithGoogleAction =
//   (accessToken, navigate) => (dispatch) => {};

export const logout = () => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
};

export const login =
  (email, password, setIsLoading, navigate) => async (dispatch) => {
    try {
      setIsLoading(true);
      const response = await axiosLogin.post("/auth/login", {
        email,
        password,
      });
      const { data } = response.data;
      const { token } = data;

      //menyimpan token ke localstorage
      localStorage.setItem("token", token);

      //direct ke homepage
      dispatch(setToken(token));
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastify({
          message: error.response.data.message,
          type: "error",
        });
        setIsLoading(false);
      }
    } finally {
      setIsLoading(false);
    }
  };
