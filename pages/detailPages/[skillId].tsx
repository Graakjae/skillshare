import { deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import styled from "styled-components";
import { skillsRef, usersRef } from "../../firebase-config";
import { Skill } from "../../models/Skill";
import { User } from "../../models/User";
import PreviousPageArrow from "../../components/PreviousPageArrow";

const SkillDetailsPage: NextPage = () => {
  const [skill, setSkill] = useState<Skill>();
  const [users, setUsers] = useState<User[]>();

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
      <PreviousPageArrow />
      <H2>{skill?.name}</H2>
      <SkillImage src={skill?.image} alt={skill?.name} />

      <H3>Users with this skill</H3>
      {users
        ?.filter((user: User) =>
          user?.skills?.primarySkills?.some((s) => s.name === skill?.name)
        )
        .map((filteredUsers: User, key: Key) => (
          <p
            key={key}
            onClick={() => router.push(`/detailPages2/${filteredUsers?.id}`)}
          >
            {filteredUsers.name}
          </p>
        ))}
      <button onClick={deleteSkill}>Remove skill</button>
    </div>
  );
};

export default SkillDetailsPage;

const SkillImage = styled.img({
  height: "100px",
});

const Detail = styled.div({
  display: "flex",
  width: "70%",
  margin: "auto",
  columnGap: "40px",
});

const Description = styled.div({
  fontSize: "17px",
  width: "70%",
  borderRadius: "20px",
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
