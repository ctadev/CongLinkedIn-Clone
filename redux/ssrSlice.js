import { createSlice } from "@reduxjs/toolkit";

const ssrSlice = createSlice({
  name: "ssr",
  initialState: false,
  reducers: {
    setSsr: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setSsr } = ssrSlice.actions;
export default ssrSlice.reducer;
