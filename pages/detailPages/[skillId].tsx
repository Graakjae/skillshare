import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { skillsRef, usersRef } from "../../firebase-config";
import { Skill } from "../../models/Skill";
import { User } from "../../models/User";

const SkillDetailsPage: NextPage = () => {
  const [skill, setSkill] = useState<Skill>();
  const [users, setUsers] = useState<Users>();

  const router = useRouter();
  const { skillId } = router.query;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        {
          const docRef = doc(skillsRef, skillId);
          const docData = await getDoc(docRef);
          setSkill(docData.data());
          console.log(skill);
        }
      } catch (error) {}
    };
    fetchSkills();
  }, []);

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
      <H1>{skill?.name}</H1>
      <Image src={skill?.image} alt={skill?.name} />

      <H2>Users with this skill</H2>
      {users
        ?.filter((user: User) =>
          user?.skills?.primarySkills.includes(skill?.name)
        )
        .map((filteredSkills: Skill) => (
          <p key={users}>{filteredSkills.name}</p>
        ))}
    </div>
  );
};

export default SkillDetailsPage;

const Image = styled.img({
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

const H1 = styled.h1({
  fontSize: "40px",
  marginBottom: "60px",
});

const H2 = styled.h2({
  textAlign: "center",
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
