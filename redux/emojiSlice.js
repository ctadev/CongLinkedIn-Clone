import { createSlice } from "@reduxjs/toolkit";

const emojiSlice = createSlice({
  name: "emoji",
  initialState: false,
  reducers: {
    setEmoji: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setEmoji } = emojiSlice.actions;
export default emojiSlice.reducer;
