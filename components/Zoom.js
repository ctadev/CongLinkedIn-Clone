import React, { useEffect, useState } from "react";
import s from "./zoom.module.scss";
import TimeAgo from "timeago-react";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import CommentIcon from "@mui/icons-material/Comment";
import ReplyIcon from "@mui/icons-material/Reply";
import { useSession } from "next-auth/react";
import { togglePost } from "../redux/postSlice";
import { toggleZoom } from "../redux/zoomSlice";
import { toggleCommentHandler } from "../redux/commentHandlerSlice";
import { setComment } from "../redux/commentSlice";
import { setSsr } from "../redux/ssrSlice";
import { setLoading } from "../redux/loadingSlice";

function Zoom() {
  const data = useSelector((state) => state.data);
  const zoom = useSelector((state) => state.zoom);
  const theme = useSelector((state) => state.theme);
  const comment = useSelector((state) => state.comment);
  const commentHandler = useSelector((state) => state.commentHandler);
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const [displayComments, setDisplayComments] = useState([]);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch("/api/comments", {
        method: "GET",
        headers: {
          "Cotent-Type": "application/json",
        },
      });
      const responseData = await response.json();
      setDisplayComments(responseData);
    };
    fetchComments();
  }, [commentHandler]);

  const uploadComment = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id: data._id,
        input: input,
        username: session?.user?.name,
        email: session?.user?.email,
        userImg: session?.user?.image,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(setComment(false));
    dispatch(toggleCommentHandler());
    setInput("");
    dispatch(setLoading(false));
  };

  const deletePost = async () => {
    dispatch(setLoading(true));
    await fetch(`/api/posts/${data._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    dispatch(togglePost());
    dispatch(setSsr(true));
    dispatch(toggleZoom());
    dispatch(setLoading(false));
  };

  const closeZooms = () => {
    dispatch(toggleZoom());
    dispatch(setComment(false));
  };

  const deleteComment = async (id) => {
    dispatch(setLoading(true));
    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    dispatch(toggleCommentHandler());
    dispatch(setLoading(false));
  };

  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "...see more" : string;

  if (data) {
    return (
      <main className={zoom ? s.zoom : `${s.zoom} ${s.hide}`}>
        {data.photoUrl ? (
          <section
            onClick={() => closeZooms()}
            className={s.image}
            style={{ backgroundImage: `url(${data.photoUrl})` }}
          ></section>
        ) : (
          <section className={s.noImage}></section>
        )}

        {data.photoUrl ? (
          <section
            className={!theme ? s.userInfos1 : `${s.userInfos1} ${s.dark}`}
          >
            <main className={s.sec1}>
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
              <div className={s.close}>
                <CloseIcon onClick={() => closeZooms()} />
              </div>
            </main>

            <main className={s.sec2}>
              {showInput ? (
                <h4 onClick={() => setShowInput(false)}>{data.input}</h4>
              ) : (
                <h4 onClick={() => setShowInput(true)}>
                  {truncate(data.input, 60)}
                </h4>
              )}
            </main>

            <main className={s.likes}>
              <div onClick={() => dispatch(setComment(true))}>
                <CommentIcon />
                <p>Comment</p>
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
            </main>

            {!comment ? <main className={s.borderIcon}></main> : ""}

            {comment ? (
              <form onSubmit={uploadComment}>
                <textarea
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                />
                <button>Submit</button>
              </form>
            ) : (
              ""
            )}

            <div className={s.commentContainer}>
              {displayComments
                .filter((filter) => filter.post_id === data._id.toString())
                .map((datas) => (
                  <section key={datas._id}>
                    <main className={s.comments}>
                      <Avatar
                        sx={{ width: 30, height: 30 }}
                        src={datas.userImg}
                      />
                      <div className={s.commentInfo}>
                        <h2>{datas.username}</h2>
                        <p>{datas.input}</p>
                      </div>
                    </main>
                    <main className={s.commentIcon}>
                      <p>Like</p>
                      <p>|</p>
                      {session?.user?.email === datas.email ? (
                        <p onClick={() => deleteComment(datas._id)}>Delete</p>
                      ) : (
                        <p>Reply</p>
                      )}
                    </main>
                  </section>
                ))}
            </div>
          </section>
        ) : (
          <section
            className={!theme ? s.userInfos2 : `${s.userInfos2} ${s.dark}`}
          >
            <main className={s.sec1}>
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
              <div className={s.close}>
                <CloseIcon onClick={() => closeZooms()} />
              </div>
            </main>

            <main className={s.sec2}>
              {showInput ? (
                <h4 onClick={() => setShowInput(false)}>{data.input}</h4>
              ) : (
                <h4 onClick={() => setShowInput(true)}>
                  {truncate(data.input, 60)}
                </h4>
              )}
            </main>

            <main className={s.likes}>
              <div onClick={() => dispatch(setComment(true))}>
                <CommentIcon />
                <p>Comment</p>
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
            </main>

            {!comment ? <main className={s.borderIcon}></main> : ""}

            {comment ? (
              <form onSubmit={uploadComment}>
                <textarea
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                />
                <button>Submit</button>
              </form>
            ) : (
              ""
            )}

            <div className={s.commentContainer}>
              {displayComments
                .filter((filter) => filter.post_id === data._id.toString())
                .map((datas) => (
                  <section key={datas._id}>
                    <main className={s.comments}>
                      <Avatar
                        sx={{ width: 30, height: 30 }}
                        src={datas.userImg}
                      />
                      <div className={s.commentInfo}>
                        <h2>{datas.username}</h2>
                        <p>{datas.input}</p>
                      </div>
                    </main>
                    <main className={s.commentIcon}>
                      <p>Like</p>
                      <p>|</p>
                      {session?.user?.email === datas.email ? (
                        <p onClick={() => deleteComment(datas._id)}>Delete</p>
                      ) : (
                        <p>Reply</p>
                      )}
                    </main>
                  </section>
                ))}
            </div>
          </section>
        )}
      </main>
    );
  }

  if (!data) {
    return <main style={{ height: "0", width: "0" }}></main>;
  }
}

export default Zoom;
