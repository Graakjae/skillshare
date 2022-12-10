import { addDoc } from "@firebase/firestore";
import { useState } from "react";
import { skillsRef } from "../../firebase-config";
import styled from "styled-components";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Button } from "../../components/button/button";

const NewSkill: NextPage = () => {
  const [label, setLabel] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  async function handleSubmit(event: any) {
    event.preventDefault();

    const newSkillList = {
      label: label,
      image: image,
      id: `ucb-${Date.now()}`,
    };

    await addDoc(skillsRef, newSkillList);
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <H1>New skill</H1>
        <InputWrapper>
          <H3>Name</H3>
          <Input2 type="text" onChange={(e) => setLabel(e.target.value)} />
        </InputWrapper>
        <InputWrapper>
          <H3>Image (Link)</H3>
          <ImageInput
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder=""
          />
          <DisplayImage src={image} alt="Choose a picture" />
        </InputWrapper>
        <div onClick={() => router.push("/skills")}>
          <Button label={"Create skill"} type="submit"></Button>
        </div>
      </form>
    </section>
  );
};

export default NewSkill;

const SkillImg = styled.img({
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
  border: "none",
});

const DisplayImage = styled.img({
  margin: "0 auto",
  display: "block",
  marginTop: "40px",
  marginBottom: "40px",
  width: "200px",
});
