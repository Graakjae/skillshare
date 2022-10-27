import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import styled from "styled-components";
import { projectsRef, skillsRef, usersRef } from "../../firebase-config";
import { Project } from "../../models/Project";
import { Skill } from "../../models/Skill";
import { User } from "../../models/User";
import PreviousPageArrow from "../../components/PreviousPageArrow";

const UserDetailsPage: NextPage = () => {
  const [user, setUser] = useState<User>();
  const [skills, setSkills] = useState<Skill[]>();
  const [projects, setProjects] = useState<Project[]>();
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    const fetchUsers = async () => {
      if (!userId) return;
      try {
        {
          const docRef = doc(usersRef, userId);
          const docData = await getDoc(docRef);
          console.log(docData.data());

          setUser(docData.data());
          console.log(user);
        }
      } catch (error) {}
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

  return (
    <div>
      <PreviousPageArrow />
      <p>{user?.name}</p>
      <p>{user?.title}</p>
      <p>{user?.experience}</p>
      <p>{user?.slack}</p>

      <h3>Main Projects</h3>
      {user?.projects?.mainProjects?.map((mainProject: Project, key: Key) => (
        <p
          key={key}
          onClick={() => router.push(`/detailPages/${mainProject?.id}`)}
        >
          {mainProject.name}
        </p>
      ))}
      <h3>Assisted projects</h3>
      {user?.projects?.assistedProjects?.map(
        (assistedProject: Project, key: Key) => (
          <p
            key={key}
            onClick={() => router.push(`/detailPages/${assistedProject?.id}`)}
          >
            {assistedProject.name}
          </p>
        )
      )}

      <h3>Primary skills</h3>
      {user?.skills?.primarySkills?.map((primarySkill: Skill, key: Key) => (
        <p
          key={key}
          onClick={() => router.push(`/detailPages/${primarySkill?.id}`)}
        >
          {primarySkill.name}
        </p>
      ))}

      <h3>Secondary skills</h3>
      {user?.skills?.secondarySkills?.map((secondarySkill: Skill, key: Key) => (
        <p
          key={key}
          onClick={() => router.push(`/detailPages/${secondarySkill?.id}`)}
        >
          {secondarySkill?.name}
        </p>
      ))}
      <h3>Location</h3>
      <p>{user?.location}</p>
      <h3>Slack me!</h3>
      <p>{user?.slack}</p>
      <h3>Thats me</h3>
      <UserImage src={user?.image} alt={user?.name} />
    </div>
  );
};

export default UserDetailsPage;

const UserImage = styled.img({
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
  textAlign: "center",
  marginBottom: "60px",
});

const H2 = styled.h2({
  fontSize: "30px",
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
