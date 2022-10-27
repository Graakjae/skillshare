import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { usersRef } from "../firebase-config";
import { User } from "../models/User";
import { Filter } from "../components/filter";
import React from "react";
import { render } from "react-dom";
import { locations } from "../lib/helpers/locations";
import { Input } from "../components/input/input";
import searchIcon from "../icons/search-icon.svg";

const Users: NextPage = () => {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  let categoriesFilter: any[] = [];

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

          <h3>Locations</h3>
          {locations.map((location) => (
            <div key={location}>
              <p>{location}</p>
              <input
                type={"checkbox"}
                value={location}
                onChange={handleCategoryChange}
              />
            </div>
          ))}
        </div>
        <Link href="/new/newUser">Add new user here ++</Link>
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
                <Image
                  src={user?.image}
                  alt={user?.name}
                  placeholder={searchIcon}
                />
                <PWrapper>{user.name}</PWrapper>
                <PWrapper>{user.title}</PWrapper>
              </Column>
            ))}
        </Grid>
      </main>
      <footer></footer>
    </div>
  );
};

export default Users;

const Image = styled.img({
  height: "200px",
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
  // "&:hover": {
  //   backgroundColor: "#f28e1c",
  // },
});

const SearchBar = styled.input({});
