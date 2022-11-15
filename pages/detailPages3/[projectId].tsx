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
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";

const ProjectDetailsPage: NextPage = () => {
  const [project, setProject] = useState<Project>();
  const [users, setUsers] = useState<User[]>();

  const router = useRouter();
  const { projectId } = router.query;
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
      } finally {
        setLoading(false);
      }
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
      {loading && (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      )}
      {loading ? null : (
        <div>
          <H2>{project?.name}</H2>
          <ProjectImage src={project?.image} alt={project?.name} />

          <Wrapper>
            <UsersWrapper>
              <H3>Project team</H3>
              {users
                ?.filter((user: User) =>
                  user?.projects?.mainProjects.some(
                    (p) => p.name === project?.name
                  )
                )
                .map((filteredUsers: User, key: Key) => (
                  <Flex
                    key={key}
                    onClick={() =>
                      router.push(`/detailPages2/${filteredUsers?.id}`)
                    }
                  >
                    <p>{filteredUsers.name}</p>
                    <UserImages
                      src={filteredUsers?.image}
                      alt={filteredUsers?.name}
                    />
                  </Flex>
                ))}
            </UsersWrapper>

            <UsersWrapper>
              <H3>Assisted on the project</H3>
              {users
                ?.filter((user: User) =>
                  user?.projects?.assistedProjects.some(
                    (p) => p.name === project?.name
                  )
                )
                .map((filteredUsers: User, key: Key) => (
                  <Flex
                    key={key}
                    onClick={() =>
                      router.push(`/detailPages2/${filteredUsers?.id}`)
                    }
                  >
                    <p>{filteredUsers.name}</p>
                    <UserImages
                      src={filteredUsers?.image}
                      alt={filteredUsers?.name}
                    />
                  </Flex>
                ))}
            </UsersWrapper>
          </Wrapper>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;

const ProjectImage = styled.img({
  width: "100px",
});

const UserImages = styled.img({
  width: "50px",
  borderRadius: "50px",
});

const Wrapper = styled.div({
  display: "flex",
  gap: "20px",
  justifyContent: "center",
});

const UsersWrapper = styled.div({
  border: "1px solid black",
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

const Flex = styled.div({
  display: "flex",
  padding: "10px 0px 10px 0px",
});

const LoadingSpinnerWrapper = styled.div({
  marginTop: "120px",
});
