import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { projectsRef, usersRef } from "../../firebase-config";
import { Project } from "../../models/Project";
import { Skill } from "../../models/Skill";
import { User } from "../../models/User";

const ProjectDetailsPage: NextPage = () => {
  const [project, setProject] = useState<Project>();
  const [users, setUsers] = useState<Users>();

  const router = useRouter();
  const { projectId } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        {
          const docRef = doc(projectsRef, projectId);
          const docData = await getDoc(docRef);
          setProject(docData.data());
          console.log(project);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(usersRef, (data) => {
      const favData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(favData);
      setUsers(favData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <H1>{project?.name}</H1>
      <Image src={project?.image} alt={project?.name} />
      {users
        ?.filter((user: User) =>
          user?.projects?.mainProjects.includes(project?.name)
        )
        .map((filteredSkills: Skill) => (
          <p key={users}>{filteredSkills.name}</p>
        ))}
    </div>
  );
};

export default ProjectDetailsPage;

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
