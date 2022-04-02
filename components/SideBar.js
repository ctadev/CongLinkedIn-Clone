import React from "react";
import Avatar from "@mui/material/Avatar";
import s from "./sidebar.module.scss";
import { useSelector } from "react-redux";
import { useSession, signOut } from "next-auth/react";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

function SideBar() {
  const theme = useSelector((state) => state.theme);
  const { data: session } = useSession();

  return (
    <main className={!theme ? s.sidebar : `${s.sidebar} ${s.dark}`}>
      <div className={s.side1}>
        <section className={s.users}>
          <Avatar
            className={s.avatar}
            src={session?.user?.image}
            onClick={() => signOut()}
          />
          <div className={s.info}>
            <h1>{session?.user?.name}</h1>
            <p>{session?.user?.email}</p>
          </div>
          <div className={s.top}></div>
        </section>

        <section className={s.profile}>
          <div>
            <h2>Who viewed your profile</h2>
            <p>1738</p>
          </div>
          <div>
            <h2>Views of your post</h2>
            <p>353</p>
          </div>
        </section>

        <section className={s.prem}>
          <p>Access exclusive tools & insights</p>
          <div className={s.try}>
            <CheckBoxOutlineBlankIcon className={s.icon}/>
            <h3>Try Premium for free</h3>
          </div>
        </section>

        <section className={s.item}>
          <BookmarkOutlinedIcon />
          <h4>My items</h4>
        </section>
      </div>

      <div className={s.side2}>
        <section className={s.sec1}>
          <h1>Groups</h1>
          <div>
            <h2>Events</h2>
            <p>+</p>
          </div>
          <h1>Followed Hashtags</h1>
        </section>

        <section className={s.sec2}>Discover More</section>
      </div>
    </main>
  );
}

export default SideBar;
