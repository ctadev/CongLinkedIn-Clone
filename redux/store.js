import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import modalSlice from "./modalSlice";
import ssrSlice from "./ssrSlice";
import postSlice from "./postSlice";
import zoomSlice from "./zoomSlice";
import dataSlice from './dataSlice';
import commentSlice from "./commentSlice";
import commentHandlerSlice from "./commentHandlerSlice";
import loadingSlice from "./loadingSlice";
import emojiSlice from "./emojiSlice";

const store = configureStore({
  reducer: {
    theme: themeSlice,
    modal: modalSlice,
    ssr: ssrSlice,
    post: postSlice,
    zoom: zoomSlice,
    data: dataSlice,
    comment: commentSlice,
    commentHandler: commentHandlerSlice,
    loading: loadingSlice,
    emoji: emojiSlice,
  },
});

export default store;