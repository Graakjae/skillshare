import { doc, getDoc } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { usersRef } from "../../firebase-config";
import { User } from "../../models/User";

const UserDetailsPage: NextPage = () => {
  const [user, setUser] = useState<User>();

  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        {
          const docRef = doc(usersRef, userId);
          const docData = await getDoc(docRef);
          setUser(docData.data());
          console.log(user);
        }
      } catch (error) {}
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <p>{user?.name}</p>
      <p>{user?.title}</p>
      <p>{user?.experience}</p>
      <p>{user?.slack}</p>
      <p>{user?.projects?.mainProjects}</p>
      <p>{user?.projects?.assistedProjects}</p>
      <p>{user?.skills?.primarySkills}</p>
      <p>{user?.skills?.secondarySkills}</p>
      <p>{user?.location}</p>
      <p>{user?.slack}</p>
      <Image src={user?.image} alt={user?.name} />
    </div>
  );
};

export default UserDetailsPage;

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
