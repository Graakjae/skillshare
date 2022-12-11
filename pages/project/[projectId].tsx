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
import Image from "next/image";
import updateIcon from "../../icons/updateIcon.png";

const ProjectDetailsPage: NextPage = () => {
  const [project, setProject] = useState<Project>();
  const [users, setUsers] = useState<User[]>();
  const router = useRouter();
  const { projectId } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(projectId);

    const fetchData = async () => {
      if (!projectId) return;
      console.log(projectId);

      try {
        {
          // @ts-ignore disable-next-line
          const docRef = doc(projectsRef, projectId);
          const docData = await getDoc(docRef);
          setProject(docData.data() as Project);
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
        return { ...doc.data(), id: doc.id } as User;
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
      // @ts-ignore disable-next-line
      const docRef = doc(projectsRef, projectId);
      deleteDoc(docRef);
      router.push("/projects");
    }
  }

  return (
    <div>
      {loading && (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      )}
      {loading ? null : (
        <div>
          <PreviousPageArrowWrapper>
            <PreviousPageArrow />
          </PreviousPageArrowWrapper>
          <Center>
            <Card>
              <NameWrapper>
                <H2>{project?.label}</H2>
                <div
                  style={{
                    position: "relative",
                    width: "30px",
                    marginBlockStart: "0.5em",
                    marginBlockEnd: "0.5em",
                    cursor: "pointer",
                  }}
                >
                  <Image
                    src={updateIcon}
                    alt="Update icon"
                    onClick={() => router.push(`/updateProject/${projectId}`)}
                  />
                </div>
              </NameWrapper>
              <ProjectImage src={project?.image} alt={project?.label} />
            </Card>
          </Center>
          <Center>
            <Wrapper>
              <MainTeamWrapper>
                <div>
                  <H3>The {project?.label} team</H3>
                  <Grid>
                    {users
                      ?.filter((user: User) =>
                        user?.projects?.mainProjects.some(
                          (p) => p.label === project?.label
                        )
                      )
                      .map((filteredUsers: User, key: Key) => (
                        <Flex
                          key={key}
                          onClick={() =>
                            router.push(`/user/${filteredUsers?.id}`)
                          }
                        >
                          <UserImages
                            src={filteredUsers?.image}
                            alt={filteredUsers?.name}
                          />
                          <Name>{filteredUsers.name}</Name>
                        </Flex>
                      ))}
                  </Grid>
                </div>
              </MainTeamWrapper>
              <Line></Line>
              <AssistingTeamWrapper>
                <div>
                  <H3>Assisted on {project?.label}</H3>
                  <Grid>
                    {users
                      ?.filter((user: User) =>
                        user?.projects?.assistedProjects.some(
                          (p) => p.label === project?.label
                        )
                      )
                      .map((filteredUsers: User, key: Key) => (
                        <Flex
                          key={key}
                          onClick={() =>
                            router.push(`/user/${filteredUsers?.id}`)
                          }
                        >
                          <UserImages
                            src={filteredUsers?.image}
                            alt={filteredUsers?.name}
                          />
                          <Name>{filteredUsers.name}</Name>
                        </Flex>
                      ))}
                  </Grid>
                </div>
              </AssistingTeamWrapper>
            </Wrapper>
          </Center>
          <DeleteButton onClick={deleteProject}>Delete project</DeleteButton>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;

const ProjectImage = styled.img({
  maxHeight: "100px",
  maxWidth: "200px",
});

const UserImages = styled.img({
  width: "50px",
  height: "50px",
  borderRadius: "50px",
  marginRight: "20px",
});

const Wrapper = styled.div({
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  borderTop: "1px solid black",
  width: "80%",
});

const MainTeamWrapper = styled.div({
  width: "100%",
  display: "grid",
  columnGap: "0px",
  justifyItems: "space-between",
  marginTop: "0px",
  rowGap: "0px",
  gridTemplateColumns: "repeat(1, 1fr)",
});
const AssistingTeamWrapper = styled.div({
  width: "100%",
  display: "grid",
  columnGap: "0px",
  justifyItems: "space-between",
  marginTop: "0px",
  rowGap: "0px",
  gridTemplateColumns: "repeat(1, 1fr)",
  marginLeft: "30px",
});

const H2 = styled.h2({
  textAlign: "left",
  alignItems: "center",
  fontSize: "30px",
});
const H3 = styled.h2({
  textAlign: "left",
  marginBlockStart: "0.8em",
  marginBlockEnd: "0.5em",
});

const Center = styled.div({
  justifyContent: "center",
  display: "flex",
  marginTop: "30px",
});

const Flex = styled.div({
  display: "flex",
  padding: "10px 0px 10px 0px",
  cursor: "pointer",
});

const Name = styled.p({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  fontSize: "18px",
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
  alignItems: "center",
  padding: "20px",
});

const Line = styled.div({
  borderLeft: "1px solid black",
  marginBlockStart: "0.8em",
});

const NameWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
});

const DeleteButton = styled.button({
  width: "100px",
  height: "30px",
  color: "red",
  margin: "0 auto",
  display: "block",
  marginTop: "150px",
});

const Grid = styled.div({
  width: "100%",
  display: "grid",
  justifyItems: "space-between",
  gridTemplateColumns: "repeat(1, 1fr)",
});

const PreviousPageArrowWrapper = styled.div({
  marginLeft: "10%",
});
