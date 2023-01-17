import React from "react";
import { deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import styled from "styled-components";
import { skillsRef, usersRef, usersRef2 } from "../../firebase-config";
import { User } from "../../models/User";
import PreviousPageArrow from "../../components/PreviousPageArrow";
import { Skill } from "../../models/Skill";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";
import Image from "next/image";
import updateIcon from "../../icons/updateIcon.png";
import { getAuth } from "firebase/auth";

const SkillDetailsPage: NextPage = () => {
  const [skill, setSkill] = useState<Skill>();
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [admin, setAdmin] = useState();

  const router = useRouter();
  const { skillId } = router.query;
  const [email, setEmail] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!skillId) return;
      try {
        {
          // @ts-ignore disable-next-line
          const docRef = doc(skillsRef, skillId);
          const docData = await getDoc(docRef);
          setSkill(docData.data() as Skill);
        }
      } catch (error) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [skillId]);

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

  useEffect(() => {
    async function getUser() {
      if (auth.currentUser) {
        // @ts-ignore disable-next-line
        setEmail(auth?.currentUser?.email);

        const docRef = doc(usersRef2, auth?.currentUser?.uid);
        const userData = (await getDoc(docRef)).data();
        if (userData) {
          setAdmin(userData.admin);
        }
        setLoading(false);
      }
    }

    getUser();
  }, [auth.currentUser]);

  const deleteSkill = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want delete ${skill?.label}?`
    );
    if (confirmDelete) {
      // @ts-ignore disable-next-line
      const docRef = doc(skillsRef, skillId);
      deleteDoc(docRef);
      router.push("/skills");
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      ) : (
        <div>
          <PreviousPageArrowWrapper>
            <PreviousPageArrow />
          </PreviousPageArrowWrapper>
          <Center>
            <Card>
              <NameWrapper>
                <H2>{skill?.label}</H2>
                <div
                  style={{
                    position: "relative",
                    width: "30px",
                    marginBlockStart: "0.5em",
                    marginBlockEnd: "0.5em",
                    cursor: "pointer",
                  }}
                >
                  {admin ? (
                    <Image
                      src={updateIcon}
                      alt="Update icon"
                      onClick={() => router.push(`/updateSkill/${skillId}`)}
                    />
                  ) : null}
                </div>
              </NameWrapper>
              <ProjectImage src={skill?.image} alt={skill?.label} />
            </Card>
          </Center>
          <Center>
            <Wrapper>
              <PrimaryUsers>
                <div>
                  <H3>Users with {skill?.label} as a primary skill</H3>
                  <Grid>
                    {users
                      ?.filter((user: User) =>
                        user?.skills?.primarySkills.some(
                          (primarySkill) => primarySkill.label === skill?.label
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
              </PrimaryUsers>
              <Line></Line>
              <SecondaryUsers>
                <div>
                  <H3>Users with {skill?.label} as a secondary skill</H3>
                  <Grid>
                    {users
                      ?.filter((user: User) =>
                        user?.skills?.secondarySkills.some(
                          (p) => p.label === skill?.label
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
              </SecondaryUsers>
            </Wrapper>
          </Center>
          {admin ? (
            <DeleteButton onClick={deleteSkill}>Delete skill</DeleteButton>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SkillDetailsPage;

const ProjectImage = styled.img({
  width: "100px",
});

const UserImages = styled.img({
  width: "50px",
  height: "50px",
  borderRadius: "50px",
  marginRight: "20px",
});

const Wrapper = styled.div({
  display: "flex",
  borderTop: "1px solid black",
  width: "80%",
  justifyContent: "center",
});

const PrimaryUsers = styled.div({
  width: "100%",
  display: "grid",
  columnGap: "0px",
  justifyItems: "space-between",
  marginTop: "0px",
  rowGap: "0px",
  gridTemplateColumns: "repeat(1, 1fr)",
});

const SecondaryUsers = styled.div({
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

const NameWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
});

const LoadingSpinnerWrapper = styled.div({
  marginTop: "120px",
});

const Card = styled.div({
  borderLeft: "5px solid #FFEC3F",
  borderTop: "1px solid #CCCCCC",
  borderBottom: "1px solid #CCCCCC",
  width: "80%",
  boxShadow: "0 0px 2px 0 rgba(0, 0, 0, 0.25)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
});

const Line = styled.div({
  borderLeft: "1px solid black",
  marginTop: "0.8em",
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

const Name = styled.p({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  fontSize: "18px",
});

const PreviousPageArrowWrapper = styled.div({
  marginLeft: "10%",
});
