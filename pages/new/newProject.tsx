import { addDoc } from "@firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { projectsRef } from "../../firebase-config";
import { Project } from "../../models/Project";
import typescript from "../../icons/typescript.png";
import { Button } from "../../components/button/button";

const NewProject: NextPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState("");

  async function handleSubmit(event: any) {
    event.preventDefault();

    const newProjectList = {
      label: name,
      image: image,
      id: `ucb-${Date.now()}`,
    };

    await addDoc(projectsRef, newProjectList);
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      setErrorMessage("Image input is invalid");
      return;
    }

    const file = event.target.files[0];
    if (file.size < 500000) {
      // image file size must be below 0,5MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setErrorMessage(""); // reset errorMessage state
    } else {
      // if not below 0.5MB display an error message using the errorMessage state
      setErrorMessage("Picture is too large");
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <H1>New Project</H1>
        <InputWrapper>
          <H3>Name</H3>
          <Input2 type="text" onChange={(e) => setName(e.target.value)} />
        </InputWrapper>
        <InputWrapper>
          <H3>Image</H3>
          <ImageInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            placeholder=""
          />
          <DisplayImage
            src={image}
            alt="Choose a picture"
            // onError={(e: any) => (e.target.src = typescript)}
          />
          <p>{errorMessage}</p>
        </InputWrapper>
        <div onClick={() => router.push("/projects")}>
          <Button label={"Create project"} type="submit"></Button>
        </div>
      </form>
    </section>
  );
};

export default NewProject;

const DisplayImage = styled.img({
  margin: "0 auto",
  display: "block",
  marginTop: "40px",
  marginBottom: "40px",
  width: "200px",
});

const H1 = styled.h1({
  textAlign: "center",
});

const H3 = styled.h3({
  marginBlockStart: "1em",
  marginBlockEnd: "0.1em",
});

const InputWrapper = styled.div({
  width: "80%",
  display: "block",
  margin: "auto",
  ["div"]: {
    border: "none",
    backgroundColor: "white",
    height: "50px",
  },
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
