import { deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import styled from "styled-components";
import { projectsRef, usersRef } from "../../firebase-config";
import { Project } from "../../models/Project";
import { User } from "../../models/User";
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

  async function deleteProject() {
    const confirmDelete = window.confirm(
      `Are you sure you want delete ${project?.label}?`
    );
    if (confirmDelete) {
      const docRef = doc(projectsRef, projectId);
      deleteDoc(docRef);
      router.push("/projects");
    }
  }

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
          <Center>
            <Card>
              <H2>{project?.label}</H2>
              <ProjectImage src={project?.image} alt={project?.label} />
            </Card>
          </Center>
          <Center>
            <Wrapper>
              <UsersWrapper>
                <H3>Project team</H3>
                {users
                  ?.filter((user: User) =>
                    user?.projects?.mainProjects.some(
                      (p) => p.label === project?.label
                    )
                  )
                  .map((filteredUsers: User, key: Key) => (
                    <Flex
                      key={key}
                      onClick={() => router.push(`/user/${filteredUsers?.id}`)}
                    >
                      <UserImages
                        src={filteredUsers?.image}
                        alt={filteredUsers?.name}
                      />
                      <p>{filteredUsers.name}</p>
                    </Flex>
                  ))}
              </UsersWrapper>
              <Line></Line>
              <UsersWrapper>
                <H3>Assisted on the project</H3>
                {users
                  ?.filter((user: User) =>
                    user?.projects?.assistedProjects.some(
                      (p) => p.label === project?.label
                    )
                  )
                  .map((filteredUsers: User, key: Key) => (
                    <Flex
                      key={key}
                      onClick={() => router.push(`/user/${filteredUsers?.id}`)}
                    >
                      <UserImages
                        src={filteredUsers?.image}
                        alt={filteredUsers?.name}
                      />
                      <p>{filteredUsers.name}</p>
                    </Flex>
                  ))}
              </UsersWrapper>
            </Wrapper>
          </Center>
          <button onClick={deleteProject}>Delete project</button>
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
  marginRight: "20px",
});

const Wrapper = styled.div({
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  borderTop: "1px solid black",
  width: "80%",
  marginTop: "30px",
});

const UsersWrapper = styled.div({});

const H2 = styled.h2({
  textAlign: "left",
  alignItems: "center",
});
const H3 = styled.h2({
  textAlign: "left",
  marginBlockStart: "0.8em",
  marginBlockEnd: "0.5em",
});

const Highlighted = styled.p({
  fontSize: "20px",
  fontWeight: "700",
});

const Width = styled.div({
  width: "80%",
  margin: "auto",
});

const Center = styled.div({
  justifyContent: "center",
  display: "flex",
});

const Flex = styled.div({
  display: "flex",
  padding: "10px 0px 10px 0px",
});

const LoadingSpinnerWrapper = styled.div({
  marginTop: "120px",
});

const Card = styled.div({
  borderLeft: "5px solid #FFEC3F",
  borderTop: "1px solid #CCCCCC",
  borderBottom: "1px solid #CCCCCC",
  width: "80%",
  boxShadow: "0 0px 2px 0 rgba(0, 0, 0, 0.25);",
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
});

const Line = styled.div({
  borderLeft: "1px solid black",
  marginBlockStart: "0.8em",
});
