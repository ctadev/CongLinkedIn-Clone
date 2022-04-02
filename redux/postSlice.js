import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: false,
  reducers: {
    togglePost: (state) => {
          return !state;
    },
  },
});

export const { togglePost } = postSlice.actions;
export default postSlice.reducer;
