import s from "./modal.module.scss";
import Avatar from "@mui/material/Avatar";
import { useSession } from "next-auth/react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../redux/modalSlice";
import { togglePost } from "../redux/postSlice";
import { setLoading } from "../redux/loadingSlice";
import { setSsr } from "../redux/ssrSlice";
import { setEmoji } from "../redux/emojiSlice";
import { useState, useRef } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";

function Modal() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);
  const emoji = useSelector((state) => state.emoji);
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [photoInput, setPhotoInput] = useState("");

  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "..." : string;

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const closeModal = () => {
    dispatch(setEmoji(false));
    dispatch(toggleModal());
  };

  const uploadPost = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        input: input,
        photoUrl: photoInput,
        username: session?.user?.name,
        email: session?.user?.email,
        userImg: session?.user?.image,
        createdAt: new Date().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(toggleModal());
    dispatch(setSsr(true));
    setInput("");
    setPhotoInput("");
    dispatch(togglePost());
    dispatch(setLoading(false));
    dispatch(setEmoji(false));
  };

  return (
    <main className={modalState ? s.modal : `${s.modal} ${s.hide}`}>
      {emoji && (
        <Picker
          onSelect={addEmoji}
          style={{
            position: "absolute",
            marginTop: "20px",
            marginLeft: -10,
            maxWidth: "320px",
            borderRadius: "20px",
            zIndex: "2",
          }}
          theme="dark"
        />
      )}

      <section className={s.sec}>
        <div className={s.title}>
          <h1>Create a post</h1>
          <CloseIcon className={s.icon} onClick={() => closeModal()} />
        </div>

        <div className={s.profile}>
          <Avatar className={s.avatar} src={session?.user?.image} />
          <h2>{session?.user?.name}</h2>
        </div>

        <form onSubmit={uploadPost} encType="multipart/form-data">
          <div className={s.inputs}>
            <textarea
              placeholder="What do you want to talk about?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className={s.photo}>
            <div className={s.icons}>
              <SentimentSatisfiedOutlinedIcon
                onClick={() => dispatch(setEmoji(!emoji))}
                className={s.icon}
              />
              <div className={s.text}>
                <input
                  type="text"
                  onChange={(e) => setPhotoInput(e.target.value)}
                  value={truncate(photoInput, 50)}
                  placeholder="Enter Image URL..."
                />
              </div>
            </div>
            <button
              onClick={uploadPost}
              disabled={!input.trim() && !photoInput.trim()}
            >
              Post
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Modal;
