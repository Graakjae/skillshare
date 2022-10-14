import { addDoc } from "@firebase/firestore";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { AddImage } from "../../components/addImage";
import { projectsRef } from "../../firebase-config";

const NewProject: NextPage = () => {
  const [name, setName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const newProjectList = {
      name: name,
      id: `ucb-${Date.now()}`,
    };

    await addDoc(projectsRef, newProjectList);
  }

  // function handleImageChange(e: any) {
  //   const file = e?.target?.files[0];
  //   if (file.size < 500000) {
  //     // image file size must be below 0,5MB
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       setImage(e?.target?.result);
  //     };
  //     reader.readAsDataURL(file);
  //     setErrorMessage(""); // reset errorMessage state
  //   } else {
  //     // if not below 0.5MB display an error message using the errorMessage state
  //     setErrorMessage("Picture is too large");
  //   }
  // }

  //   function handleActivitiesChange(selectedOptions) {
  //     console.log(`Option selected:`, selectedOptions);
  //     setSelectedAktiviteter(selectedOptions);
  //   }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>
          <H1>New Project</H1>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </label>
        <AddImage />
        <button type="submit">Opret Project</button>
      </form>
    </section>
  );
};

export default NewProject;

const H1 = styled.h1({});
