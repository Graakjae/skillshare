import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import styled from "styled-components";
import { projectsRef, usersRef } from "../../firebase-config";
import { Project } from "../../models/Project";
import { Skill } from "../../models/Skill";
import { User } from "../../models/User";
import Image from "next/image";
import PreviousPageArrow from "../../components/PreviousPageArrow";

const ProjectDetailsPage: NextPage = () => {
  const [project, setProject] = useState<Project>();
  const [users, setUsers] = useState<User[]>();

  const router = useRouter();
  const { projectId } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (!projectId) return;
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
  }, [projectId]);

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
      <PreviousPageArrow />

      <H2>{project?.name}</H2>
      <ProjectImage src={project?.image} alt={project?.name} />
      <H3>Project team</H3>
      {users
        ?.filter((user: User) =>
          user?.projects?.mainProjects.some((p) => p.name === project?.name)
        )
        .map((filteredUsers: User, key: Key) => (
          <UsersWrapper
            key={key}
            onClick={() => router.push(`/detailPages2/${filteredUsers?.id}`)}
          >
            <p>{filteredUsers.name}</p>
            <Image
              src={filteredUsers?.image}
              alt={filteredUsers?.name}
              width={"20px"}
              height={"20px"}
            />
          </UsersWrapper>
        ))}
      <H3>Assisted on the project</H3>
      {users
        ?.filter((user: User) =>
          user?.projects?.assistedProjects.some((p) => p.name === project?.name)
        )
        .map((filteredUsers: User, key: Key) => (
          <UsersWrapper
            key={key}
            onClick={() => router.push(`/detailPages2/${filteredUsers?.id}`)}
          >
            <p>{filteredUsers.name}</p>
            <Image
              src={filteredUsers?.image}
              alt={filteredUsers?.name}
              width={"20px"}
              height={"20px"}
            />
          </UsersWrapper>
        ))}
    </div>
  );
};

export default ProjectDetailsPage;

const ProjectImage = styled.img({
  height: "100px",
});

const Detail = styled.div({
  display: "flex",
  width: "70%",
  margin: "auto",
  columnGap: "40px",
});

const UsersWrapper = styled.div({
  display: "flex",
  fontSize: "17px",
});

const H2 = styled.h2({
  textAlign: "left",
});
const H3 = styled.h2({
  textAlign: "left",
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
