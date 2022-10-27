// import React, { FC, useRef, useState } from "react";
// import styled from "styled-components";
// import { Skill } from "../models/Skill";

// export const SearchBar: FC = ({}) => {
//   const [skills, setSkills] = useState<Skill[]>([]);
//   const [query, setQuery] = useState("");
//   function searchFilter() {
//     {
//       skills.filter((skill) => {
//         if (query === "") {
//           return skill;
//         } else if (skill.name.toLowerCase().includes(query.toLowerCase())) {
//           return skill;
//         }
//       });
//     }
//     searchFilter();
//   }
//   return (
//     <>
//       <input onChange={(event) => setQuery(event.target.value)} />
//     </>
//   );
// };
