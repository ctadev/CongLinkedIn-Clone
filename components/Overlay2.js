import React from "react";
import s from "./overlay2.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { toggleZoom } from "../redux/zoomSlice";
import { setComment} from "../redux/commentSlice";

function Overlay2() {
  const dispatch = useDispatch();
  const zoomState = useSelector((state) => state.zoom);
  const commentState = useSelector((state) => state.comment);

  const closeZooms = () => {
    dispatch(toggleZoom());
    dispatch(setComment(false));
  }

  return (
    <div
      className={zoomState ? s.overlay : `${s.overlay} ${s.hide}`}
      onClick={() => closeZooms()}
    ></div>
  );
}

export default Overlay2;
