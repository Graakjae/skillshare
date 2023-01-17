import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/nav";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import styles from "../components/styles/Nav.module.css";
import App from "next/app";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState("");

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuth("isAuth");
      // @ts-ignore disable-next-line
      localStorage.setItem("isAuth", true);
    } else {
      setIsAuth("");
      localStorage.removeItem("isAuth");
    }
  });

  const privateRoutes = (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  );

  const publicRoutes = (
    <NavWrapper>
      <Link href="/authentication/signIn">
        <L
          className={
            router.pathname == "/authentication/signIn" ? styles.active : ""
          }
        >
          Sign in
          <div
            className={
              router.pathname == "/authentication/signIn"
                ? styles.underline
                : ""
            }
          ></div>
        </L>
      </Link>
      <Link href="/authentication/signUp">
        <L
          className={
            router.pathname == "/authentication/signUp" ? styles.active : ""
          }
        >
          Sign up
          <div
            className={
              router.pathname == "/pages/authentication/signUp.tsx"
                ? styles.underline
                : ""
            }
          ></div>
        </L>
      </Link>
      <Component {...pageProps} />
    </NavWrapper>
  );
  return <main>{isAuth ? privateRoutes : publicRoutes}</main>;
}

export default MyApp;

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

const NavWrapper = styled.div({
  textAlign: "center",
});
