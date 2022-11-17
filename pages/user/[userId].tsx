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
          const docRef = doc(usersRef, userId);
          const docData = await getDoc(docRef);
          console.log(docData.data());

          setUser(docData.data());
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
        return { ...doc.data(), id: doc.id };
      });
      console.log(favData);
      setSkills(favData);
    });
    return () => unsubscribe();
  }, []);

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

  async function deleteUser() {
    const confirmDelete = window.confirm(
      `Are you sure you want delete ${user?.name}?`
    );
    if (confirmDelete) {
      const docRef = doc(usersRef, userId);
      deleteDoc(docRef);
      router.push("/users");
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
          <UserCenter>
            <div>
              {/* <PreviousPageArrow /> */}
              <UserWrapper>
                <UserImage src={user?.image} alt={user?.name} />
                <UserInformation>
                  <UserInformation2>
                    <H2>{user?.name}</H2>
                    <p>{user?.title}</p>
                    <p>Experience: {user?.experience}</p>
                    <p>Location: {user?.location.label}</p>
                    <p>Slack me! {user?.slack}</p>
                  </UserInformation2>
                </UserInformation>
              </UserWrapper>
              <Center>
                <SkillsProjectsWrapper>
                  <Category>
                    <H3>Primary skills</H3>
                    {user?.skills?.primarySkills?.map(
                      (primarySkill: Skill, key: Key) => (
                        <P
                          key={key}
                          onClick={() =>
                            router.push(`/detailPages/${primarySkill?.id}`)
                          }
                        >
                          {primarySkill.label}
                        </P>
                      )
                    )}
                  </Category>
                  <Category>
                    <H3>Secondary skills</H3>
                    {user?.skills?.secondarySkills?.map(
                      (secondarySkill: Skill, key: Key) => (
                        <P
                          key={key}
                          onClick={() =>
                            router.push(`/detailPages/${secondarySkill?.id}`)
                          }
                        >
                          {secondarySkill?.label}
                        </P>
                      )
                    )}
                  </Category>
                  <Line></Line>
                  <Category>
                    <H3>Main Projects</H3>
                    {user?.projects?.mainProjects?.map(
                      (mainProject: Project, key: Key) => (
                        <P
                          key={key}
                          onClick={() =>
                            router.push(`/project/${mainProject?.id}`)
                          }
                        >
                          {mainProject.label}
                        </P>
                      )
                    )}
                  </Category>
                  <Category>
                    <H3>Assisted projects</H3>
                    {user?.projects?.assistedProjects?.map(
                      (assistedProject: Project, key: Key) => (
                        <P
                          key={key}
                          onClick={() =>
                            router.push(`/project/${assistedProject?.id}`)
                          }
                        >
                          {assistedProject.label}
                        </P>
                      )
                    )}
                  </Category>
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

const H1 = styled.h1({
  fontSize: "40px",
  textAlign: "center",
  marginBottom: "60px",
});

const Highlighted = styled.p({
  fontSize: "20px",
  fontWeight: "700",
});

const P = styled.p({
  cursor: "pointer",
});

const SkillsProjectsWrapper = styled.div({
  width: "80%",
  marginTop: "30px",
  display: "flex",
  justifyContent: "space-between",
  borderTop: "1px solid black",
});

const UserWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  width: "100%",
});

const LocationDiv = styled.div({
  display: "flex",
  gap: "10px",
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

const Category = styled.div({});

const H3 = styled.h3({
  fontSize: "22px",
  marginBlockStart: "0.8em",
  marginBlockEnd: "0.5em",
});

const H2 = styled.h2({
  fontSize: "40px",
  marginBlockStart: "0.2em",
  marginBlockEnd: "0.5em",
});

const Line = styled.div({
  borderLeft: "1px solid black",
  marginBlockStart: "0.8em",
});
