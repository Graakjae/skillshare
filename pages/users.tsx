import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { usersRef } from "../firebase-config";
import { User } from "../models/User";
import React from "react";
import { render } from "react-dom";
import { locations } from "../lib/helpers/locations";
import { Input } from "../components/input/input";
import filter from "../icons/Union.svg";
import { colors } from "../util/colorPalette";
import LoadingSpinner from "../components/loadingSpinner/loadingSpinner";
import Image from "next/image";

const Users: NextPage = () => {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  let categoriesFilter: any[] = [];

  useEffect(() => {
    const unsubscribe = onSnapshot(usersRef, (data) => {
      try {
        const favData = data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        console.log(favData);
        setUsers(favData);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  function getFilteredList() {
    if (!selectedCategory) {
      return users;
    }
    return users.filter((user) => user.location === selectedCategory);
  }

  var filteredList = useMemo(getFilteredList, [selectedCategory, users]);
  console.log(filteredList);

  function handleCategoryChange(event) {
    if (event.target.checked) {
      setSelectedCategory(event.target.value);
      console.log("event", event.target.value);
      categoriesFilter.push(event.target.value);
      console.log("filter", categoriesFilter);
    } else {
      setSelectedCategory("");
      for (let index = 0; index < categoriesFilter.length; index++) {
        const element = categoriesFilter[index];
        if (element?.name === event.target.value) {
          categoriesFilter.splice(index, 1);
        }
      }
    }
  }

  return (
    <div>
      <main>
        <div>
          <Input onChange={(event) => setQuery(event.target.value)} />
          <Link href="/new/newUser">Add new user here ++</Link>

          <Filter>
            <Center>
              <FilterText>
                <h3>Filter </h3>
                <Image src={filter} alt="Filter" width={30} height={30} />
              </FilterText>
              <h3>Locations</h3>
              {locations.map((location) => (
                <Checkbox key={location}>
                  <p>{location}</p>
                  <input
                    type={"checkbox"}
                    value={location}
                    onChange={handleCategoryChange}
                  />
                </Checkbox>
              ))}
            </Center>
          </Filter>
        </div>

        <Grid>
          {filteredList
            .filter((user) => {
              if (query === "") {
                return user;
              } else if (
                user.name.toLowerCase().includes(query.toLowerCase())
              ) {
                return user;
              }
            })
            .map((user, key) => (
              <Column
                key={key}
                onClick={() => router.push(`/detailPages2/${user.id}`)}
              >
                <ImageDiv>
                  <UserImage
                    src={user?.image}
                    alt={user?.name}
                    placeholder={user?.name}
                  />
                </ImageDiv>
                <Name>{user.name}</Name>
                <Title>{user.title}</Title>
              </Column>
            ))}
        </Grid>
        {loading && <LoadingSpinner />}
      </main>
    </div>
  );
};

export default Users;

const UserImage = styled.img({
  height: "200px",
  borderRadius: "5px",
  transition: "0.5s all ease-in-out",
  ["&:hover"]: {
    transform: "scale(1.2)",
  },
});

const ImageDiv = styled.div({
  overflow: "hidden",
});

const Name = styled.h3({
  textAlign: "center",
  fontSize: "20px",
  cursor: "pointer",
  marginBlockStart: "0em",
  marginBlockEnd: "0em",
});

const Title = styled.p({
  textAlign: "center",
  fontSize: "15px",
  cursor: "pointer",
  marginBlockStart: "0em",
  marginBlockEnd: "1em",
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
  width: "60%",
  justifyItems: "center",
  margin: "auto",
  display: "grid",
  columnGap: "0px",
  rowGap: "30px",
  marginBottom: "50px",
  gridTemplateColumns: "repeat(3, 1fr)",
});

const Img = styled.img({
  height: "120px",
  justifyContent: "center",
});

const Column = styled.div({
  width: "75%",
  maxWidth: "300px",
  height: "230px",
  borderRadius: "5px",
  // boxShadow: "0 0px 10px 0 rgba(0, 0, 0, 0.25);",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",

  ["&:hover"]: {
    backgroundImage: "linear-gradient(#FEFF00,#FEFF00)",
    backgroundSize: "0%",

    ["h3"]: {
      backgroundImage: "linear-gradient(#FEFF00,#FEFF00)",
      backgroundSize: "100% 40%",
      transition: "all 0.5s ease",
      backgroundPosition: "0 95%",
      backgroundRepeat: "no-repeat",
    },
  },

  // "&:hover": {
  //   backgroundColor: "#f28e1c",
  // },
});

const SearchBar = styled.input({});

const Filter = styled.div({
  position: "absolute",
  border: "1px solid black",
  borderRadius: "5px",
  width: "200px",
  justifyContent: "center",
  display: "flex",
});

const Center = styled.div({
  width: "80%",
});

const FilterText = styled.div({
  display: "flex",
  justifyContent: "space-between",
});

const Checkbox = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
