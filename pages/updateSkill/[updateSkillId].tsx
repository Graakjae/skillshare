import { addDoc } from "@firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { skillsRef } from "../../firebase-config";
import typescript from "../../icons/typescript.png";
import { Skill } from "../../models/Skill";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Button } from "../../components/button/button";

const UpdateSkill: NextPage = () => {
  const [skill, setSkill] = useState<Skill>();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const { updateSkillId } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log(updateSkillId);
      if (!updateSkillId) return;
      try {
        {
          // @ts-ignore disable-next-line
          const docRef = doc(skillsRef, updateSkillId);
          const docData = await getDoc(docRef);
          const skill = docData.data() as Skill;
          setSkill(skill);
          setName(skill.label);
          setImage(skill.image);
        }
      } catch (error) {
      } finally {
        // setLoading(false);
      }
    };
    fetchData();
  }, [updateSkillId]);

  async function handleSubmit(event: any) {
    event.preventDefault();

    const SkillUpdate = {
      label: name,
      image: image,
    };

    // @ts-ignore disable-next-line
    const docRef = doc(skillsRef, updateSkillId);

    await updateDoc(docRef, SkillUpdate);
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <H1>Update Skill: {skill?.label}</H1>
        <InputWrapper>
          <H3>Name</H3>
          <Input2
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <H3>Image</H3>
          <ImageInput
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder=""
          />
          <DisplayImage
            src={image}
            alt="Choose a picture"
            // onError={(e: any) => (e.target.src = typescript)}
          />
        </InputWrapper>
        <div onClick={() => router.push(`/skill/${updateSkillId}`)}>
          <Button label={"Update skill"} type="submit"></Button>
        </div>
      </form>
    </section>
  );
};

export default UpdateSkill;

const DisplayImage = styled.img({
  margin: "0 auto",
  display: "block",
  marginTop: "40px",
  marginBottom: "40px",
  width: "200px",
  borderRadius: "10px",
});

const H1 = styled.h1({
  textAlign: "center",
});

const H3 = styled.h3({
  marginBlockStart: "1em",
  marginBlockEnd: "0.1em",
});

const InputWrapper = styled.label({
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
