import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: false,
  reducers: {
    toggleComment: (state) => {
      return !state;
    },
    setComment: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { toggleComment, setComment } = commentSlice.actions;
export default commentSlice.reducer;
