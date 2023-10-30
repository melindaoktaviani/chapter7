import axios from "axios";
import { setPopular, setDetail } from "../reducers/movieReducer";
import { axiosInstance } from "../../lib/axios";

export const getPopularMovie =
  (setCarauselMovieList, setIsLoading) => async (dispatch, getState) => {
    try {
      setIsLoading(true);
      const { token } = getState().auth;
      const response = await axiosInstance.get("/movie/popular", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;

      dispatch(setPopular(data));
      setCarauselMovieList(data.slice(0, 3));
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response.data.message);
        return;
      }
      alert(error.message);
    }
  };

export const getDetailMovie =
  (id, setIsLoading) => async (dispatch, getState) => {
    setIsLoading(true);
    try {
      let { token } = getState().auth;
      const response = await axiosInstance.get(`/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = await response.data;
      dispatch(setDetail(data));
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response.data.message);
        return;
      }
      alert(error.message);
    }
  };
