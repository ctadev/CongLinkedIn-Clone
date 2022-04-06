import React from "react";
import s from "./overlay.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../redux/modalSlice";
import { setEmoji } from "../redux/emojiSlice";

function Overlay() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);
  const closeModal = () => {
    dispatch(toggleModal());
    dispatch(setEmoji(false));
  };

  return (
    <div
      className={modalState ? s.overlay : `${s.overlay} ${s.hide}`}
      onClick={() => closeModal()}
    ></div>
  );
}

export default Overlay;
