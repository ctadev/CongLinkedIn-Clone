import React from "react";
import s from "./menu.module.scss";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

function Menu({ Icon, title, active }) {
  const theme = useSelector((state) => state.theme);
  const { data: session } = useSession();

  const logOut = () => {
    if (title === "Me") {
      signOut();
    }
  };

  return (
    <div
      className={
        !theme
          ? `${s.menu} ${s[`${title}`]}`
          : `${s.menu} ${s[`${title}`]} ${s.dark}`
      }
      onClick={() => logOut()}
    >
      <Icon className={s.svg} src={session?.user?.image} />
      <p>{title}</p>
      <span className={active ? s.active : s.hide}></span>
    </div>
  );
}

export default Menu;
