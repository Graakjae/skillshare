import { NextComponentType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { relative } from "path";
import { FC, ReactEventHandler } from "react";
import styled from "styled-components";
import { colors } from "../util/colorPalette";
import styles from "./styles/Nav.module.css";

const Nav: NextComponentType = ({}) => {
  const router = useRouter();

  return (
    <NavWrapper>
      <Link href="/">
        <H1>IMPACT SKILLSHARE</H1>
      </Link>
      <HeaderStyle className={styles.topnav}>
        <Link href="/users">
          <L className={router.pathname == "/users" ? styles.active : ""}>
            USERS
            <div
              className={router.pathname == "/users" ? styles.underline : ""}
            ></div>
          </L>
        </Link>

        <Link href="/skills">
          <L className={router.pathname == "/skills" ? styles.active : ""}>
            SKILLS
            <div
              className={router.pathname == "/skills" ? styles.underline : ""}
            ></div>
          </L>
        </Link>

        <Link href="/projects">
          <L className={router.pathname == "/projects" ? styles.active : ""}>
            PROJECTS
            <div
              className={router.pathname == "/projects" ? styles.underline : ""}
            ></div>
          </L>
        </Link>
      </HeaderStyle>
    </NavWrapper>
  );
};

export default Nav;

const H1 = styled.h1({
  textAlign: "center",
  cursor: "pointer",
});
const HeaderStyle = styled.div({
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  position: "relative",
  padding: "5px",
});

const NavWrapper = styled.div({});

const L = styled.a({
  cursor: "pointer",
  position: "relative",
  margin: "0 30px 0 30px",
  backgroundImage: "linear-gradient(#FEFF00,#FEFF00)",
  backgroundSize: "0 40%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "0 95%",
  transition: "all 0.5s ease",
  ["&:hover"]: {
    backgroundImage: "linear-gradient(#FEFF00,#FEFF00)",
    backgroundSize: "100% 40%",
  },
});
