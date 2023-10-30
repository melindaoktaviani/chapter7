import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popular: [],
  detail: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setPopular: (state, action) => {
      state.popular = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const { setPopular, setDetail } = movieSlice.actions;
export default movieSlice.reducer;
