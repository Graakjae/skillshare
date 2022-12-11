import { deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import styled from "styled-components";
import { projectsRef, skillsRef, usersRef } from "../../firebase-config";
import { Project } from "../../models/Project";
import { Skill } from "../../models/Skill";
import { User } from "../../models/User";
import PreviousPageArrow from "../../components/PreviousPageArrow";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";
import { mq } from "../../media-query";
import Image from "next/image";
import updateIcon from "../../icons/updateIcon.png";

const UserDetailsPage: NextPage = () => {
  const [user, setUser] = useState<User | undefined>();
  const [skills, setSkills] = useState<Skill[]>();
  const [projects, setProjects] = useState<Project[]>();
  const router = useRouter();
  const { userId } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!userId) return;
      try {
        {
          // @ts-ignore disable-next-line
          const docRef = doc(usersRef, userId);
          const docData = await getDoc(docRef);
          console.log(docData.data());
          console.log(user?.date);

          setUser(docData.data() as User);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [userId]);

  useEffect(() => {
    const unsubscribe = onSnapshot(skillsRef, (data) => {
      const favData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as Skill;
      });
      console.log(favData);
      setSkills(favData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(projectsRef, (data) => {
      const favData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as Project;
      });
      console.log(favData);
      setProjects(favData);
    });
    return () => unsubscribe();
  }, []);

  async function deleteUser() {
    const confirmDelete = window.confirm(
      `Are you sure you want delete ${user?.name}?`
    );
    if (confirmDelete) {
      // @ts-ignore disable-next-line
      const docRef = doc(usersRef, userId);
      deleteDoc(docRef);
      router.push("/users");
    }
  }

  function getDate(startDate: any) {
    if (startDate) {
      const date = startDate.toDate();
      console.log(date);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  }
  return (
    <PageWrapper>
      {loading && (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      )}
      {loading ? null : (
        <div>
          <UserCenter>
            <div>
              <PreviousPageArrow />
              <UserWrapper>
                <UserImage src={user?.image} alt={user?.name} />
                <UserInformation>
                  <UserInformationWrapper>
                    <Flex>
                      <H2>{user?.name}</H2>
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
                          onClick={() => router.push(`/updateUser/${userId}`)}
                        />
                      </div>
                    </Flex>
                    <Title>{user?.title}</Title>
                    <Information>Mail: {user?.mail}</Information>
                    <Information>
                      Joined Impact: {getDate(user?.date)}
                    </Information>
                    <Information>Location: {user?.location.label}</Information>
                    <Information>Slack me! {user?.slack}</Information>
                  </UserInformationWrapper>
                </UserInformation>
              </UserWrapper>
              <Center>
                <SkillsProjectsWrapper>
                  <CategorySkills>
                    <div>
                      <H3>Primary skills</H3>
                      <Grid>
                        {user?.skills.primarySkills?.map(
                          (primarySkill: Skill, key: Key) => (
                            <Flex
                              key={key}
                              onClick={() =>
                                router.push(`/skill/${primarySkill?.id}`)
                              }
                            >
                              <P>{primarySkill.label}</P>
                            </Flex>
                          )
                        )}
                      </Grid>

                      <H3>Secondary skills</H3>
                      <Grid>
                        {user?.skills.secondarySkills?.map(
                          (secondarySkill: Skill, key: Key) => (
                            <Flex
                              key={key}
                              onClick={() =>
                                router.push(`/skill/${secondarySkill?.id}`)
                              }
                            >
                              <P>{secondarySkill.label}</P>
                            </Flex>
                          )
                        )}
                      </Grid>
                    </div>
                  </CategorySkills>
                  <Line></Line>
                  <CategoryProjects>
                    <div>
                      <H3>Main Projects</H3>
                      <Grid>
                        {user?.projects.mainProjects?.map(
                          (mainProject: Project, key: Key) => (
                            <Flex
                              key={key}
                              onClick={() =>
                                router.push(`/project/${mainProject?.id}`)
                              }
                            >
                              <P>{mainProject.label}</P>
                            </Flex>
                          )
                        )}
                      </Grid>
                      <H3>Assisted projects</H3>
                      <Grid>
                        {user?.projects.assistedProjects?.map(
                          (assistedProject: Project, key: Key) => (
                            <Flex
                              key={key}
                              onClick={() =>
                                router.push(`/project/${assistedProject?.id}`)
                              }
                            >
                              <P>{assistedProject.label}</P>
                            </Flex>
                          )
                        )}
                      </Grid>
                    </div>
                  </CategoryProjects>
                </SkillsProjectsWrapper>
              </Center>
            </div>
          </UserCenter>
          <DeleteButton onClick={deleteUser}>Delete user</DeleteButton>
        </div>
      )}
    </PageWrapper>
  );
};

export default UserDetailsPage;

const PageWrapper = styled.div({
  justifyContent: "center",
  display: "flex",
});

const LoadingSpinnerWrapper = styled.div({
  marginTop: "120px",
});

const UserCenter = styled.div({
  marginTop: "10px",
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
  maxWidth: "1100px",
});

const Center = styled.div({
  justifyContent: "center",
  display: "flex",
});

const UserImage = styled.img({
  width: "450px",
  height: "363px",
  objectFit: "cover",
  borderRadius: "5px",
});
const Title = styled.p({
  fontSize: "25px",
});

const Information = styled.p({
  padding: "3px 0px 3px 0px",
  fontSize: "16px",
});

const P = styled.p({
  cursor: "pointer",
  marginBlockStart: "0.8em",
  marginBlockEnd: "0.8em",
  fontSize: "18px",
});

const SkillsProjectsWrapper = styled.div({
  width: "900px",
  marginTop: "30px",
  display: "flex",
  borderTop: "1px solid black",
  justifyContent: "center",
});

const UserWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  width: "100%",
  marginTop: "20px",
});

const UserInformation = styled.div({
  borderLeft: "5px solid #FFEC3F",
  borderTop: "1px solid #CCCCCC",
  borderBottom: "1px solid #CCCCCC",
  width: "450px",
  height: "363px",
  boxShadow: "0 0px 2px 0 rgba(0, 0, 0, 0.25);",
});

const UserInformationWrapper = styled.div({
  padding: "5px 5px 5px 10px",
});

const CategoryProjects = styled.div({
  width: "100%",
  display: "grid",
  columnGap: "0px",
  justifyItems: "space-between",
  marginTop: "0px",
  rowGap: "0px",
  gridTemplateColumns: "repeat(1, 1fr)",
  marginLeft: "30px",
});

const CategorySkills = styled.div({
  width: "100%",
  display: "grid",
  columnGap: "0px",
  justifyItems: "space-between",
  marginTop: "0px",
  rowGap: "0px",
  gridTemplateColumns: "repeat(1, 1fr)",
});

const H3 = styled.h3({
  fontSize: "22px",
  marginBlockStart: "0.5em",
  marginBlockEnd: "0.5em",
});

const H2 = styled.h2({
  fontSize: "40px",
  marginBlockStart: "0em",
  marginBlockEnd: "0em",
});

const Line = styled.div({
  padding: "12px",
  borderRight: "1px solid black",
  marginBlockStart: "0.8em",
});

const Flex = styled.div({
  display: "flex",
  justifyContent: "space-between",
});

const Grid = styled.div({
  width: "100%",
  display: "grid",
  columnGap: "0px",
  justifyItems: "space-between",
  marginTop: "0px",
  rowGap: "0px",
  gridTemplateColumns: "repeat(1, 1fr)",
  [mq("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [mq("lg")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
});

const DeleteButton = styled.button({
  width: "100px",
  height: "30px",
  color: "red",
  margin: "0 auto",
  display: "block",
  marginTop: "150px",
});
