import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { usersRef } from "../firebase-config";
import { User } from "../models/User";

const Users: NextPage = () => {
  const router = useRouter();

  const [users, setUsers] = useState<Users[]>([]);

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
      <main>
        <Link href="/new/newUser">Add new user here ++</Link>
        {users.map((user) => (
          <div key={user}>
            <PWrapper onClick={() => router.push(`/detailPages2/${user.id}`)}>
              {user.name}
            </PWrapper>
            <PWrapper onClick={() => router.push(`/detailPages2/${user.id}`)}>
              {user.title}
            </PWrapper>
            <Image src={user?.image} alt={user?.name} />
          </div>
        ))}
      </main>
      <footer></footer>
    </div>
  );
};

export default Users;

const Image = styled.img({
  width: "50px",
});

const PWrapper = styled.p({
  textAlign: "center",
  fontSize: "15px",
  cursor: "pointer",
});

const Header = styled.h1({
  textAlign: "center",
  fontSize: "30px",
  width: "100%",
});

const H2 = styled.h2({
  textAlign: "center",
  fontSize: "30px",
  width: "100%",
});

const Grid = styled.div({
  width: "80%",
  justifyItems: "center",
  margin: "auto",
  display: "grid",
  columnGap: "0px",
  rowGap: "30px",
  marginBottom: "50px",
  gridTemplateColumns: "repeat(1, 1fr)",
});

const Img = styled.img({
  height: "120px",
  justifyContent: "center",
});

const Column = styled.div({
  width: "75%",
  maxWidth: "300px",
  height: "230px",
  borderRadius: "20px",
  boxShadow: "0 0px 10px 0 rgba(0, 0, 0, 0.25);",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f28e1c",
  },
});
