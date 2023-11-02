import axios from "axios";
import { setPopular, setDetail, setSearch } from "../reducers/movieReducer";
import { VITE_API_URL } from "../../constants/config";

export const getPopularMovie =
  (setCarauselMovieList, setIsLoading) => async (dispatch, getState) => {
    setIsLoading(true);
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${VITE_API_URL}/movie/popular`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
      const popular = data.slice(0, 3);
      dispatch(setPopular(data));
      setCarauselMovieList(popular);
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
      const response = await axios.get(`${VITE_API_URL}/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
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

export const getSearchMovie =
  (query, page, setIsLoading) => async (dispatch, getState) => {
    setIsLoading(true);
    try {
      let { token } = getState().auth;
      const response = await axios.get(
        `${VITE_API_URL}/search/movie?page=${page}&query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const { data } = response.data;
      dispatch(setSearch(data));
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data?.status_message);
        return;
      }
      alert(error?.status_message);
    }
  };
