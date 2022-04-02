import s from "./modal.module.scss";
import Avatar from "@mui/material/Avatar";
import { useSession } from "next-auth/react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../redux/modalSlice";
import { togglePost } from "../redux/postSlice";
import { setSsr } from "../redux/ssrSlice";
import { useState } from "react";

function Modal() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [photoInput, setPhotoInput] = useState("");

  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "..." : string;

  const uploadPost = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/posts", {
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
    const responseData = await response.json();
    console.log(responseData);
    dispatch(toggleModal());
    dispatch(setSsr(true));
    setInput("");
    setPhotoInput("");
    dispatch(togglePost());
  };

  return (
    <main className={modalState ? s.modal : `${s.modal} ${s.hide}`}>
      <section>
        <div className={s.title}>
          <h1>Create a post</h1>
          <CloseIcon
            className={s.icon}
            onClick={() => dispatch(toggleModal())}
          />
        </div>

        <div className={s.profile}>
          <Avatar className={s.avatar} src={session?.user?.image} />
          <h2>{session?.user?.name}</h2>
        </div>

        <form onSubmit={uploadPost}>
          <div className={s.inputs}>
            <textarea
              placeholder="What do you want to talk about?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className={s.photo}>
            <input
              type="text"
              placeholder="Add a photo URL (optional)"
              value={truncate(photoInput, 50)}
              onChange={(e) => setPhotoInput(e.target.value)}
            />
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
