import s from "./middle.module.scss";
import Avatar from "@mui/material/Avatar";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArticleIcon from "@mui/icons-material/Article";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../redux/modalSlice";
import { useEffect, useState } from "react";
import Posts from "./Posts";

function Middle({ posts }) {
  const theme = useSelector((state) => state.theme);
  const post = useSelector((state) => state.post);
  const ssr = useSelector((state) => state.ssr);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [realTimeData, setRealTimeData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const responseData = await response.json();
      setRealTimeData(responseData);
    };
    fetchPosts();
  }, [post]);

  return (
    <main className={!theme ? s.middle : `${s.middle} ${s.dark}`}>
      <div className={s.post}>
        <section className={s.sec1}>
          <Avatar className={s.avatar} src={session?.user?.image} />
          <button onClick={() => dispatch(toggleModal())}>Start a post</button>
        </section>
        <section className={s.sec2}>
          <div>
            <InsertPhotoIcon style={{ color: "lightblue" }} />
            <h1>Photo</h1>
          </div>
          <div>
            <VideoCameraBackIcon style={{ color: "lightgreen" }} />
            <h1>Video</h1>
          </div>
          <div>
            <BusinessCenterIcon style={{ color: "lightblue" }} />
            <h1>Job</h1>
          </div>
          <div>
            <ArticleIcon style={{ color: "salmon" }} />
            <h1>Write Article</h1>
          </div>
        </section>
      </div>

      {ssr
        ? realTimeData.map((data) => <Posts data={data} key={data._id} />)
        : posts.map((data) => <Posts data={data} key={data._id} />)}
      
    </main>
  );
}

export default Middle;
