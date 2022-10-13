import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { skillsRef } from "../firebase-config";

const Skills: NextPage = () => {
  const router = useRouter();

  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(skillsRef, (data) => {
      const favData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(favData);
      setSkills(favData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <main>
        <Link href="/new/newSkill">Add new skill here ++</Link>
        {skills.map((skill) => (
          <div key={skill}>
            <PWrapper onClick={() => router.push(`/detailPages/${skill.id}`)}>
              {skill.name}
              <Image src={skill?.image} alt={skill?.name} />
            </PWrapper>
          </div>
        ))}
      </main>
      <footer></footer>
    </div>
  );
};

export default Skills;

const PWrapper = styled.p({
  textAlign: "center",
  fontSize: "15px",
  cursor: "pointer",
});

const Header = styled.h1({
  textAlign: "center",
  fontSize: "30px",
  width: "100%",
});

const Image = styled.img({
  width: "60px",
});

const Grid = styled.div({
  width: "80%",
  justifyItems: "center",
  margin: "auto",
  display: "grid",
  columnGap: "0px",
  rowGap: "30px",
  marginBottom: "50px",
  gridTemplateColumns: "repeat(1, 1fr)",
});

const Img = styled.img({
  height: "120px",
  justifyContent: "center",
});

const Column = styled.div({
  width: "75%",
  maxWidth: "300px",
  height: "230px",
  borderRadius: "20px",
  boxShadow: "0 0px 10px 0 rgba(0, 0, 0, 0.25);",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f28e1c",
  },
});
