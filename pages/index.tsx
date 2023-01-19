import type { NextPage } from "next";
import Head from "next/head";
import Users from "./users";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignIn from "./authentication/signIn";

const Home: NextPage = () => {
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

  return (
    <div>
      <Head>
        <title>Impact Skillshare</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex"></meta>
      </Head>
     
      <main>
        {isAuth ? <Users /> : <SignIn/>}
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
