import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import styles from "./styles/Nav.module.css";
import logo from "../public/images/impactLogo.png";
import Image from "next/image";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { usersRef2 } from "../firebase-config";
import { User } from "../models/User";
import { getAuth, signOut } from "firebase/auth";

const Nav: FC = ({}) => {
  const [user, setUser] = useState<User | undefined>();
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    async function getUser() {
      if (auth.currentUser) {
        setEmail(auth.currentUser.email);

        const docRef = doc(usersRef2, auth.currentUser.uid);
        const userData = (await getDoc(docRef)).data();
        if (userData) {
          setAdmin(userData.admin);

          console.log(id);
        }
      }
    }

    getUser();
  }, [auth.currentUser]);

  const [admin, setAdmin] = useState();

  function handleSignOut() {
    const confirmSignOut = window.confirm(`Are you sure you want to sign out?`);
    if (confirmSignOut) {
      signOut(auth);
      router.push("/authentication/signIn");
    }
  }

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
          <Left>
            <H3 onClick={handleSignOut}>Sign Out</H3>

            {admin ? (
              <Link href="/new/createNew">
                <H33>Create</H33>
              </Link>
            ) : (
              <Link href={`/profile/profilePage`}>
                <H33>Profile</H33>
              </Link>
            )}
          </Left>
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

const Left = styled.div({
  display: "flex",
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

const H33 = styled.h3({
  cursor: "pointer",
  fontSize: "20px",
  textAlign: "end",
  marginLeft: "30px",
});

const H3 = styled.h3({
  cursor: "pointer",
  fontSize: "20px",
  textAlign: "end",
  marginLeft: "200px",
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
