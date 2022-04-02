import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import modalSlice from "./modalSlice";
import ssrSlice from "./ssrSlice";
import postSlice from "./postSlice";

const store = configureStore({
  reducer: {
    theme: themeSlice,
    modal: modalSlice,
    ssr: ssrSlice,
    post: postSlice,
  },
});

export default store;