import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: false,
  reducers: {
    toggleModal: (state) => {
      return !state;
    },
    setModal: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { toggleModal, setModal } = modalSlice.actions;
export default modalSlice.reducer;
