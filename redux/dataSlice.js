import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: null,
  reducers: {
    setData: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
