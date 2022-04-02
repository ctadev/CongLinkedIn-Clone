import React from "react";
import s from "./overlay.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../redux/modalSlice";

function Overlay() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);

  return (
    <div
      className={modalState ? s.overlay : `${s.overlay} ${s.hide}`}
      onClick={() => dispatch(toggleModal())}
    ></div>
  );
}

export default Overlay;
