import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import styled from "styled-components";
import styles from "./styles/Nav.module.css";
import logo from "../public/images/impactLogo.png";
import Image from "next/image";

const Nav: FC = ({}) => {
  const router = useRouter();

  return (
    <NavWrapper>
      <FlexWrapper>
        <ImageWrapper
          style={{
            position: "relative",
            width: "150px",
            maxWidth: "200px",
          }}
        >
          <Image src={logo} alt="logo" />
        </ImageWrapper>
        <H1Wrapper>
          <Link href="/users">
            <H1>IMPACT SKILLSHARE</H1>
          </Link>
        </H1Wrapper>
        <CreateWrapper>
          <Link href="/new/createNew">
            <H3>Create</H3>
          </Link>
        </CreateWrapper>
      </FlexWrapper>
      <HeaderStyle className={styles.topnav}>
        <Link href="/">
          <L className={router.pathname == "/" ? styles.active : ""}>
            USERS
            <div
              className={router.pathname == "/" ? styles.underline : ""}
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

const Image2 = styled.img({
  height: "20px",
});

const H1 = styled.h1({
  textAlign: "center",
  cursor: "pointer",
  marginBlockStart: "0.3em",
  marginBlockEnd: "0.3em",
});

const H1Wrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const H3 = styled.h3({
  cursor: "pointer",
  fontSize: "20px",
  textAlign: "end",
});

const ImageWrapper = styled.div({
  marginBlockStart: "0.67em",
  marginBlockEnd: "0.67em",
});

const HeaderStyle = styled.div({
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  position: "relative",
  padding: "5px",
});

const NavWrapper = styled.div({});

const CreateWrapper = styled.div({
  marginRight: "30px",
});

const FlexWrapper = styled.div({
  width: "100%",
  justifyContent: "space-between",
  margin: "auto",
  display: "grid",
  columnGap: "10px",
  rowGap: "30px",
  gridTemplateColumns: "repeat(3, 1fr)",
});

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
