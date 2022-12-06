import { addDoc } from "@firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { projectsRef } from "../../firebase-config";
import { Project } from "../../models/Project";
import typescript from "../../icons/typescript.png";
import Image from "next/image";
import userIcon from "../../icons/user-icon.png";
import pencilIcon from "../../icons/pencil-icon.png";
import bookIcon from "../../icons/book-icon.png";
import Link from "next/link";

const CreateNew: NextPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState("");

  return (
    <Center>
      <W>
        <H1>CREATE</H1>
        <Create>
          <Link href="/new/newUser">
            <Wrapper>
              <Image src={userIcon} alt="User icon" width={100} height={150} />
              <H3>Create user</H3>
            </Wrapper>
          </Link>
          <Link href="/new/newSkill">
            <Wrapper>
              <Image src={bookIcon} alt="book icon" width={130} height={150} />
              <H3>Create skill</H3>
            </Wrapper>
          </Link>
          <Link href="/new/newProject">
            <Wrapper>
              <Image
                src={pencilIcon}
                alt="pencil icon"
                width={150}
                height={150}
              />

              <H3>Create project</H3>
            </Wrapper>
          </Link>
        </Create>
      </W>
    </Center>
  );
};

export default CreateNew;

const H1 = styled.h1({
  textAlign: "center",
});

const H3 = styled.h3({
  marginBlockStart: "1em",
  marginBlockEnd: "0.2em",
});

const Center = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

const Create = styled.div({
  display: "flex",
  justifyContent: "center",
  gap: "50px",
  width: "100%",
});

const Wrapper = styled.div({
  boxShadow: "0 0px 10px 0 rgba(0, 0, 0, 0.25)",
  padding: "10px",
  borderRadius: "10px",
  width: "25%",
  textAlign: "center",
  fontSize: "22px",
  cursor: "pointer",

  backgroundImage: "linear-gradient(#FEFF00,#FEFF00)",
  backgroundSize: "0 8%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "50% 92%",
  transition: "all 0.5s ease",
  ["&:hover"]: {
    backgroundImage: "linear-gradient(#FEFF00,#FEFF00)",
    backgroundSize: "60% 5%",
    transform: "scale(1.1)",
  },
});

const W = styled.div({
  width: "80%",
});

const Input2 = styled.input({
  width: "100%",
  height: "50px",
  border: "none",
  fontSize: "20px",
});

const ImageInput = styled.input({
  width: "100%",
  backgroundColor: "white",
  height: "50px",
  cursor: "pointer",
});
