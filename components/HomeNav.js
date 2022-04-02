import s from "./homenav.module.scss";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import AppsIcon from "@mui/icons-material/Apps";
import Menu from "./Menu";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import Avatar from "@mui/material/Avatar";
import { signOut } from "next-auth/react";

function HomeNav() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <nav className={theme ? `${s.nav} ${s.light}` : s.nav}>
      <section className={s.leftSide}>
        <Image
          alt=""
          src={
            theme
              ? "https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
              : "https://www.iconsdb.com/icons/preview/white/linkedin-3-xl.png"
          }
          width={45}
          height={45}
        />
        <div
          className={
            theme ? `${s.searchContainer} ${s.light}` : s.searchContainer
          }
        >
          <SearchIcon />
          <input
            className={theme ? `${s.searchInput} ${s.light}` : s.searchInput}
            type="text"
            placeholder="Search"
          />
        </div>
      </section>

      <section className={theme ? `${s.rightSide} ${s.light}` : s.rightSide}>
        <Menu Icon={HomeIcon} title="Home" />
        <Menu Icon={PeopleIcon} title="My Network" />
        <Menu Icon={BusinessCenterIcon} title="Jobs" />
        <Menu Icon={MessageIcon} title="Messaging" />
        <Menu Icon={NotificationsIcon} title="Notifications" />
        <Menu
          Icon={Avatar}
          title="Me"
          onClick={signOut}
        />
        <Menu Icon={AppsIcon} title="Work" />
        <div onClick={() => dispatch(toggleTheme())} className={s.theme}>
          <span>🌜</span>
          <span>🌞</span>
          <div
            className={
              theme ? `${s.circle} ${s.right}` : `${s.circle} ${s.left}`
            }
          ></div>
        </div>
      </section>
    </nav>
  );
}

export default HomeNav;
