import type { NextPage } from "next";
import { Key, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { onSnapshot } from "firebase/firestore";
import { projectsRef } from "../firebase-config";
import Link from "next/link";
import { Input } from "../components/input/input";
import { Project } from "../models/Project";
import LoadingSpinner from "../components/loadingSpinner/loadingSpinner";

const Projects: NextPage = () => {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(projectsRef, (data) => {
      try {
        const favData = data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        console.log(favData);
        setProjects(favData);
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

        <Link href="/new/newProject">Add new project here ++</Link>
        <Grid>
          {projects
            .filter((project) => {
              if (query === "") {
                return project;
              } else if (
                project.label.toLowerCase().includes(query.toLowerCase())
              ) {
                return project;
              }
            })
            .map((project, key: Key) => (
              <Column
                key={key}
                onClick={() => router.push(`/project/${project.id}`)}
              >
                <Image src={project?.image} alt={project?.label} />
                <Name>{project.label}</Name>
              </Column>
            ))}
        </Grid>
        {loading && <LoadingSpinner />}
      </main>
      <footer></footer>
    </div>
  );
};

export default Projects;

const Name = styled.h3({
  textAlign: "center",
  fontSize: "20px",
  cursor: "pointer",
  marginBlockStart: "0em",
  marginBlockEnd: "0em",
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
