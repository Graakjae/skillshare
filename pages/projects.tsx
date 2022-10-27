import type { NextPage } from "next";
import Head from "next/head";
import { FC, Key, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { onSnapshot } from "firebase/firestore";
import { projectsRef } from "../firebase-config";
import Link from "next/link";
import { Input } from "../components/input/input";
import { Project } from "../models/Project";

const Projects: NextPage = () => {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(projectsRef, (data) => {
      const favData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(favData);
      setProjects(favData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <main>
        <Input onChange={(event) => setQuery(event.target.value)} />

        <Link href="/new/newProject">Add new project here ++</Link>
        <Grid>
          {projects
            .filter((project) => {
              if (query === "") {
                return project;
              } else if (
                project.name.toLowerCase().includes(query.toLowerCase())
              ) {
                return project;
              }
            })
            .map((project, key: Key) => (
              <Column
                key={key}
                onClick={() => router.push(`/detailPages3/${project.id}`)}
              >
                <PWrapper>{project.name}</PWrapper>
              </Column>
            ))}
        </Grid>
      </main>
      <footer></footer>
    </div>
  );
};

export default Projects;

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

const H2 = styled.h2({
  textAlign: "center",
  fontSize: "30px",
  width: "100%",
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
