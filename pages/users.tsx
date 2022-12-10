import type { NextPage } from "next";
import { Key, useEffect, useMemo, useState } from "react";
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
import { mq } from "../media-query";
import { Slider } from "@mui/material";

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
          return { ...doc.data(), id: doc.id } as User;
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
    return users.filter((user) => user.location.label === selectedCategory);
  }

  var filteredList = useMemo(getFilteredList, [selectedCategory, users]);
  console.log(filteredList);

  function handleCategoryChange(event: any) {
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
    <main>
      <div>
        <Input onChange={(event) => setQuery(event.target.value)} />
        <Filter>
          <Center>
            <FilterText>
              <h3>Filter </h3>
              <Image src={filter} alt="Filter" width={30} height={30} />
            </FilterText>
            <h3>Locations</h3>
            {locations.map((location, key: Key) => (
              <Checkbox key={key}>
                <p>{location.label}</p>
                <input
                  type={"checkbox"}
                  value={location.label}
                  onChange={handleCategoryChange}
                />
              </Checkbox>
            ))}
            <h3>Experience</h3>
            <Slider
              size="medium"
              defaultValue={70}
              aria-label="Small"
              valueLabelDisplay="auto"
              sx={{
                color: "black",
              }}
            />
          </Center>
        </Filter>
      </div>

      <Grid>
        {filteredList
          .filter((user) => {
            if (query === "") {
              return user;
            } else if (user.name.toLowerCase().includes(query.toLowerCase())) {
              return user;
            }
          })
          .map((user, key) => (
            <Column key={key} onClick={() => router.push(`/user/${user.id}`)}>
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
  );
};

export default Users;

const UserImage = styled.img({
  width: "250px",
  height: "250px",
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

const H2 = styled.h2({
  textAlign: "center",
  fontSize: "30px",
  width: "100%",
});

const Grid = styled.div({
  maxWidth: "1000px",
  width: "60%",
  justifyItems: "center",
  margin: "auto",
  display: "grid",
  columnGap: "10px",
  marginTop: "30px",
  rowGap: "30px",
  gridTemplateColumns: "repeat(1, 1fr)",
  [mq("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [mq("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
});

const Column = styled.div({
  width: "100%",
  borderRadius: "5px",
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
});

const Filter = styled.div({
  position: "absolute",
  border: "1px solid black",
  borderRadius: "5px",
  width: "200px",
  justifyContent: "center",
  display: "flex",
  marginTop: "30px",
});

const Center = styled.div({
  width: "80%",
  ["h3"]: {
    marginBlockStart: "1em",
    marginBlockEnd: "0.1em",
  },
});

const FilterText = styled.div({
  display: "flex",
  justifyContent: "space-between",
});

const Checkbox = styled.label({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  ["p"]: {
    marginBlockStart: "0.2em",
    marginBlockEnd: "0.2em",
  },
});
