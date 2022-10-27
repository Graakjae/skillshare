import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { skillsRef } from "../firebase-config";
import { Skill } from "../models/Skill";
import { Input } from "../components/input/input";

const Skills: NextPage = () => {
  const router = useRouter();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [query, setQuery] = useState("");

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
        <Input onChange={(event) => setQuery(event.target.value)} />
        <Link href="/new/newSkill">Add new skill here ++</Link>
        <Grid>
          {skills
            .filter((skill) => {
              if (query === "") {
                return skill;
              } else if (
                skill.name.toLowerCase().includes(query.toLowerCase())
              ) {
                return skill;
              }
            })
            .map((skill, key) => (
              <Column
                key={key}
                onClick={() => router.push(`/detailPages/${skill.id}`)}
              >
                <PWrapper>{skill.name}</PWrapper>
                <Image src={skill?.image} alt={skill?.name} />
              </Column>
            ))}
        </Grid>
      </main>
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
  width: "60%",
  justifyItems: "center",
  margin: "auto",
  display: "grid",
  columnGap: "0px",
  rowGap: "30px",
  marginBottom: "50px",
  gridTemplateColumns: "repeat(5, 1fr)",
});

const Column = styled.div({
  width: "75%",
  maxWidth: "300px",

  borderRadius: "5px",
  // boxShadow: "0 0px 10px 0 rgba(0, 0, 0, 0.25);",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  // "&:hover": {
  //   backgroundColor: "#f28e1c",
  // },
});

const SearchBar = styled.input({});
