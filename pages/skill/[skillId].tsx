import React from "react";
import { deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import styled from "styled-components";
import { skillsRef, usersRef } from "../../firebase-config";
import { User } from "../../models/User";
import PreviousPageArrow from "../../components/PreviousPageArrow";
import { Skill } from "../../models/Skill";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";
import Image from "next/image";
import updateIcon from "../../icons/updateIcon.png";

const SkillDetailsPage: NextPage = () => {
  const [skill, setSkill] = useState<Skill>();
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const { skillId } = router.query;

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
      <PreviousPageArrow />
      {loading ? (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      ) : (
        <div>
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
                  }}
                >
                  <Image src={updateIcon} alt="Update icon" />
                </div>
              </NameWrapper>
              <ProjectImage src={skill?.image} alt={skill?.label} />
            </Card>
          </Center>
          <Center>
            <Wrapper>
              <UsersWrapper>
                <H3>Users with {skill?.label} as a primary skill</H3>
                {users
                  ?.filter((user: User) =>
                    user?.skills?.primarySkills.some(
                      (primarySkill) => primarySkill.label === skill?.label
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
                <H3>Users with {skill?.label} as a secondary skill</H3>
                {users
                  ?.filter((user: User) =>
                    user?.skills?.secondarySkills.some(
                      (p) => p.label === skill?.label
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
          <button onClick={deleteSkill}>Delete skill</button>
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
  borderRadius: "50px",
  marginRight: "20px",
});

const Wrapper = styled.div({
  display: "flex",
  justifyContent: "space-around",
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

const Center = styled.div({
  justifyContent: "center",
  display: "flex",
});

const Flex = styled.div({
  display: "flex",
  padding: "10px 0px 10px 0px",
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
