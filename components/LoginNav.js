import React from "react";
import Image from "next/image";
import s from "./loginnav.module.scss";
import Menu from "./Menu";
import ExploreIcon from "@mui/icons-material/Explore";
import PeopleIcon from "@mui/icons-material/People";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { signIn } from "next-auth/react";

function LoginNav() {
  return (
    <nav className={s.nav}>
      <div className={s.image}>
        <Image
          src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg"
          layout="fill"
          objectFit="contain"
          alt=""
        />
      </div>
      <div className={s.links}>
        <div className={s.icons}>
          <Menu Icon={ExploreIcon} title="Discover" />
          <Menu Icon={PeopleIcon} title="People" />
          <Menu Icon={OndemandVideoIcon} title="Learning" />
          <Menu Icon={BusinessCenterIcon} title="Jobs" />
        </div>
        <button onClick={() => signIn("google", {callbackUrl: "/"})}>Sign in</button>
      </div>
    </nav>
  );
}

export default LoginNav;
