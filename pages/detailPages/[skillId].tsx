import { doc, getDoc } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { skillsRef } from "../../firebase-config";
import { Skill } from "../../models/Skill";

const SkillDetailsPage: NextPage = () => {
  const [skill, setSkill] = useState<Skill>();

  const router = useRouter();
  const { skillId } = router.query;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        {
          const docRef = doc(skillsRef, skillId);
          const docData = await getDoc(docRef);
          setSkill(docData.data());
          console.log(skill);
        }
      } catch (error) {}
    };
    fetchSkills();
  }, []);

  return (
    <div>
      <H1>{skill?.name}</H1>
      <Image src={skill?.image} alt={skill?.name} />
    </div>
  );
};

export default SkillDetailsPage;

const Image = styled.img({
  height: "100px",
});

const Detail = styled.div({
  display: "flex",
  width: "70%",
  margin: "auto",
  columnGap: "40px",
});

const Description = styled.div({
  fontSize: "17px",
  width: "70%",
  borderRadius: "20px",
  border: "1px solid black",
});

const H1 = styled.h1({
  fontSize: "40px",
  textAlign: "center",
  marginBottom: "60px",
});

const H2 = styled.h2({
  fontSize: "30px",
  textAlign: "center",
});

const Highlighted = styled.p({
  fontSize: "20px",
  fontWeight: "700",
});

const Width = styled.div({
  width: "80%",
  margin: "auto",
});

const Center = styled.button({
  margin: "auto",
  display: "block",
});
