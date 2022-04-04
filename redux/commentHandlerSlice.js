import { createSlice } from "@reduxjs/toolkit";

const commentHandlerSlice = createSlice({
  name: "commentHandler",
  initialState: false,
  reducers: {
    toggleCommentHandler: (state) => {
      return !state;
    },
  },
});

export const { toggleCommentHandler } = commentHandlerSlice.actions;
export default commentHandlerSlice.reducer;
