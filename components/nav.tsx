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
            Users
            <div
              className={router.pathname == "/users" ? styles.underline : ""}
            ></div>
          </L>
        </Link>

        <Link href="/skills">
          <L className={router.pathname == "/skills" ? styles.active : ""}>
            Skills
            <div
              className={router.pathname == "/skills" ? styles.underline : ""}
            ></div>
          </L>
        </Link>

        <Link href="/projects">
          <L className={router.pathname == "/projects" ? styles.active : ""}>
            Projects
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
});

const NavWrapper = styled.div({
  justifyContent: "center",
});

const L = styled.a({
  cursor: "pointer",
  position: "relative",
  margin: "0 30px 0 30px",
});
