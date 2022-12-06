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
  console.log(user);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!userId) return;
      try {
        {
          // @ts-ignore disable-next-line
          const docRef = doc(usersRef, userId);
          const docData = await getDoc(docRef);
          console.log(docData.data());

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

  // let skillOptions: any = [];

  // user?.skills.primarySkills?.map((primary: Skill) => {
  //   skillOptions.push({ id: skills?.id });
  //   console.log(skills?.map((s: Skill, key: Key) => <p key={key}>{s.id}</p>));
  // });

  return (
    <div>
      {loading && (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      )}

      {loading ? null : (
        <div>
          <UserCenter>
            <div>
              {/* <PreviousPageArrow /> */}
              <UserWrapper>
                <UserImage src={user?.image} alt={user?.name} />
                <UserInformation>
                  <UserInformation2>
                    <Flex>
                      <H2>{user?.name}</H2>
                      <div
                        style={{
                          position: "relative",
                          width: "30px",
                          marginBlockStart: "0.5em",
                          marginBlockEnd: "0.5em",
                        }}
                      >
                        <Image src={updateIcon} alt="Update icon" />
                      </div>
                    </Flex>
                    <p>{user?.title}</p>
                    <p>Experience: {user?.experience}</p>
                    <p>Location: {user?.location.label}</p>
                    <p>Slack me! {user?.slack}</p>
                  </UserInformation2>
                </UserInformation>
              </UserWrapper>
              <Center>
                <SkillsProjectsWrapper>
                  <CategorySkills>
                    <div>
                      <H3>Primary skills</H3>
                      {user?.skills?.primarySkills?.map(
                        (primarySkill: Skill, key: Key) => (
                          <P
                            key={key}
                            onClick={() =>
                              router.push(`/skill/${primarySkill?.id}`)
                            }
                          >
                            {primarySkill?.label}
                          </P>
                        )
                      )}

                      <H3>Secondary skills</H3>
                      {user?.skills?.secondarySkills?.map(
                        (secondarySkill: Skill, key: Key) => (
                          <P
                            key={key}
                            onClick={() =>
                              router.push(`/skill/${secondarySkill?.id}`)
                            }
                          >
                            {secondarySkill?.label}
                          </P>
                        )
                      )}
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
          <button onClick={deleteUser}>Delete user</button>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;

const LoadingSpinnerWrapper = styled.div({
  marginTop: "120px",
});
const UserImages = styled.img({
  width: "50px",
  borderRadius: "50px",
  marginRight: "20px",
});

const UserCenter = styled.div({
  marginTop: "50px",
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
});

const Center = styled.div({
  justifyContent: "center",
  display: "flex",
});

const UserImage = styled.img({
  width: "40%",
});

const P = styled.p({
  cursor: "pointer",
  marginBlockStart: "0.8em",
  marginBlockEnd: "0.8em",
});

const SkillsProjectsWrapper = styled.div({
  width: "82%",
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
});

const UserInformation = styled.div({
  borderLeft: "5px solid #FFEC3F",
  borderTop: "1px solid #CCCCCC",
  borderBottom: "1px solid #CCCCCC",
  width: "40%",
  boxShadow: "0 0px 2px 0 rgba(0, 0, 0, 0.25);",
});

const UserInformation2 = styled.div({
  padding: "5px 5px 5px 10px",
});

const CategoryProjects = styled.div({
  width: "100%",
  display: "flex",
  marginLeft: "30px",
});

const CategorySkills = styled.div({
  width: "100%",
  display: "flex",
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
  borderLeft: "1px solid black",
  marginBlockStart: "0.8em",
});

const Flex = styled.div({
  display: "flex",
  justifyContent: "space-between",
});

const Grid = styled.div({
  maxWidth: "1000px",
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
