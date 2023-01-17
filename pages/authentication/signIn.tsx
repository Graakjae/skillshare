import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import styled from "styled-components";
import { Button } from "../../components/button/button";

const SignIn: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();
  const router = useRouter();

  function signIn(event: any) {
    event.preventDefault();
    const mail = event.target.mail.value;
    const password = event.target.password.value;

    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push("/users");
      })
      .catch((error) => {
        let code = error.code;
        console.log(code);
        code = code.replaceAll("-", " ");
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }
  return (
    <Form onSubmit={signIn}>
      <InputWrapper>
        <H3>Email</H3>
        <Input2 type="email" name="mail" />
      </InputWrapper>
      <InputWrapper>
        <H3>Kodeord</H3>
        <Input2 type="password" name="password" />
      </InputWrapper>

      <P>{errorMessage}</P>
      <Button label={"Sign in"} type="submit"></Button>
      <P>Not a user yet?</P>
      <Link href="/signUp">Sign up here</Link>
    </Form>
  );
};

export default SignIn;

const H3 = styled.h3({
  marginBlockStart: "1em",
  marginBlockEnd: "0.1em",
  textAlign: "left",
});

const Input2 = styled.input({
  width: "100%",
  height: "50px",
  border: "none",
  fontSize: "20px",
});

const InputWrapper = styled.div({
  width: "80%",
  display: "block",
  margin: "auto",
  ["div"]: {
    border: "none",
  },
});

const Form = styled.form({});

const P = styled.p({
  textAlign: "center",
});
