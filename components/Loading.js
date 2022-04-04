import React from "react";
import s from "./loading.module.scss";
import { useSelector } from "react-redux";
import RotateRightIcon from "@mui/icons-material/RotateRight";

function Loading() {
  const loading = useSelector((state) => state.loading);

  return (
    <div className={loading ? s.overlay : `${s.overlay} ${s.hide}`}>
          <RotateRightIcon className={s.icon}/>
    </div>
  );
}

export default Loading;
