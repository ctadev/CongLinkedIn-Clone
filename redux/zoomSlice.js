import { createSlice } from "@reduxjs/toolkit";

const zoomSlice = createSlice({
  name: "zoom",
  initialState: false,
  reducers: {
    toggleZoom: (state) => {
      return !state;
    },
    setZoom: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { toggleZoom, setZoom } = zoomSlice.actions;
export default zoomSlice.reducer;
