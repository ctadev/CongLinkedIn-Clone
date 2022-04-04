import { useState } from "react";
import s from "./posts.module.scss";
import Avatar from "@mui/material/Avatar";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReplyIcon from "@mui/icons-material/Reply";
import { useSession } from "next-auth/react";
import { togglePost } from "../redux/postSlice";
import { setData } from "../redux/dataSlice";
import { toggleZoom } from "../redux/zoomSlice";
import { toggleCommentHandler } from "../redux/commentHandlerSlice";
import { setLoading } from "../redux/loadingSlice";
import { setSsr } from "../redux/ssrSlice";
import TimeAgo from "timeago-react";

function Posts({ data }) {
  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "...see more" : string;

  const [showInput, setShowInput] = useState(false);
  const [likes, setLikes] = useState(false);
  const theme = useSelector((state) => state.theme);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const deletePost = async () => {
    dispatch(setLoading(true));
    await fetch(`/api/posts/${data._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    dispatch(togglePost());
    dispatch(setSsr(true));
    dispatch(setLoading(false));
  };

  const toggleZooms = () => {
    dispatch(setData(data));
    dispatch(toggleZoom());
    dispatch(toggleCommentHandler());
  };

  return (
    <div className={!theme ? s.posts : `${s.posts} ${s.dark}`} key={data._id}>
      <section className={s.sec1} onClick={() => toggleZooms()}>
        <div className={s.avInfo}>
          <Avatar src={data.userImg} />
          <div>
            <h2>{data.username}</h2>
            <p className={s.email}>
              @{data.email.substr(0, data.email.lastIndexOf("@"))}
            </p>
            <p>
              <TimeAgo datetime={data.createdAt} />
            </p>
          </div>
        </div>
        <div>
          <MoreHorizIcon />
        </div>
      </section>

      <section className={s.sec2}>
        {showInput ? (
          <h4 onClick={() => setShowInput(false)}>{data.input}</h4>
        ) : (
          <h4 onClick={() => setShowInput(true)}>
            {truncate(data.input, 150)}
          </h4>
        )}

        {data.photoUrl ? (
          <div className={s.imageContainer} onClick={() => toggleZooms()}>
            <img src={data.photoUrl} alt="" />
          </div>
        ) : (
          ""
        )}

        <div className={s.likes}>
          <div onClick={() => setLikes(!likes)}>
            {likes ? (
              <ThumbUpIcon style={{ color: "palevioletred" }} />
            ) : (
              <ThumbUpOutlinedIcon />
            )}
            <p>Like</p>
          </div>
          {session?.user?.email === data.email ? (
            <div onClick={deletePost}>
              <DeleteIcon />
              <p>Delete</p>
            </div>
          ) : (
            <div>
              <ReplyIcon className={s.share} />
              <p>Share</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Posts;
