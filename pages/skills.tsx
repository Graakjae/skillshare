import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { skillsRef } from "../firebase-config";
import { Skill } from "../models/Skill";
import { Input } from "../components/input/input";
import LoadingSpinner from "../components/loadingSpinner/loadingSpinner";
import { mq } from "../media-query";

const Skills: NextPage = () => {
  const router = useRouter();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(skillsRef, (data) => {
      try {
        const favData = data.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Skill;
        });
        console.log("favData", favData);
        setSkills(favData);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <main>
        <Input onChange={(event) => setQuery(event.target.value)} />
        <Grid>
          {skills
            .filter((skill) => {
              if (query === "") {
                return skill;
              } else if (
                skill.label.toLowerCase().includes(query.toLowerCase())
              ) {
                return skill;
              }
            })
            .map((skill, key) => (
              <Column
                key={key}
                onClick={() => router.push(`/skill/${skill.id}`)}
              >
                <Image src={skill?.image} alt={skill?.label} />
                <H3>{skill.label}</H3>
              </Column>
            ))}
        </Grid>
        {loading && <LoadingSpinner />}
      </main>
    </div>
  );
};

export default Skills;

const H3 = styled.h3({
  textAlign: "center",
  fontSize: "20px",
  cursor: "pointer",
  position: "absolute",
  bottom: "0%",
  marginBlockEnd: "0.5em",
});

const Image = styled.img({
  width: "100px",
  marginBottom: "30px",
  maxHeight: "100px",
});

const Grid = styled.div({
  maxWidth: "1000px",
  width: "60%",
  justifyItems: "center",
  margin: "auto",
  display: "grid",
  columnGap: "0px",
  rowGap: "30px",
  marginBottom: "50px",
  marginTop: "30px",
  gridTemplateColumns: "repeat(3, 1fr)",
  [mq("md")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
  [mq("lg")]: {
    gridTemplateColumns: "repeat(5, 1fr)",
  },
});

const Column = styled.div({
  width: "130px",
  height: "158px",
  maxWidth: "300px",
  borderRadius: "5px",
  boxShadow: "0 0px 10px 0 rgba(0, 0, 0, 0.25);",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  position: "relative",
  transition: "0.5s all ease-in-out",

  ["&:hover"]: {
    backgroundImage: "linear-gradient(#FEFF00,#FEFF00)",
    backgroundSize: "0%",
    transform: "scale(1.1)",

    ["h3"]: {
      backgroundImage: "linear-gradient(#FEFF00,#FEFF00)",
      backgroundSize: "100% 40%",
      transition: "all 0.5s ease",
      backgroundPosition: "0 95%",
      backgroundRepeat: "no-repeat",
    },
  },
});

const SearchBar = styled.input({});
