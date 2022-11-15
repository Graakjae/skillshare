import { deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import styled from "styled-components";
import { skillsRef, usersRef } from "../../firebase-config";
import { Skill } from "../../models/Skill";
import { User } from "../../models/User";
import PreviousPageArrow from "../../components/PreviousPageArrow";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";

const SkillDetailsPage: NextPage = () => {
  const [skill, setSkill] = useState<Skill>();
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { skillId } = router.query;

  useEffect(() => {
    const fetchSkills = async () => {
      if (!skillId) return;
      try {
        {
          const docRef = doc(skillsRef, skillId);
          const docData = await getDoc(docRef);
          setSkill(docData.data());
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, [skillId]);

  useEffect(() => {
    const unsubscribe = onSnapshot(usersRef, (data) => {
      const favData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setUsers(favData);
    });
    return () => unsubscribe();
  }, []);

  async function deleteSkill() {
    const confirmDelete = window.confirm(
      `Are you sure you want delete ${skill?.name}?`
    );
    if (confirmDelete) {
      const docRef = doc(skillsRef, skillId);
      deleteDoc(docRef);
      router.push("/skills");
    }
  }

  console.log("brugere", users);

  return (
    <div>
      {loading && (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      )}
      {loading ? null : (
        <div>
          <PreviousPageArrow />
          <H2>{skill?.name}</H2>
          <SkillImage src={skill?.image} alt={skill?.name} />
          <UserWrapper>
            <H3>Users with this skill</H3>
            {users
              ?.filter((user: User) =>
                user?.skills?.primarySkills?.some((s) => s.name === skill?.name)
              )
              .map((filteredUsers: User, key: Key) => (
                <UserName
                  key={key}
                  onClick={() =>
                    router.push(`/detailPages2/${filteredUsers?.id}`)
                  }
                >
                  {filteredUsers.name}
                </UserName>
              ))}
          </UserWrapper>
          <button onClick={deleteSkill}>Remove skill</button>
        </div>
      )}
    </div>
  );
};

export default SkillDetailsPage;

const SkillImage = styled.img({
  height: "100px",
});

const UserName = styled.p({
  width: "100%",
  position: "relative",
  cursor: "pointer",
  fontSize: "20px",
  zIndex: "2",
  ["&:hover"]: {
    ["&:after"]: {
      content: "''",
      width: "100%",
      position: "absolute",
      top: "12px",
      left: "0",
      height: "6px",
      background: "#FFEC3F",
      zIndex: "-1",
    },
  },
});

const UserWrapper = styled.div({
  display: "block",
});

const H2 = styled.h2({
  textAlign: "left",
});
const H3 = styled.h2({
  textAlign: "left",
});

const LoadingSpinnerWrapper = styled.div({
  marginTop: "120px",
});
