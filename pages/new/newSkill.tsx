import { addDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { skillsRef } from "../../firebase-config";
import Image from "next/image";
import styled from "styled-components";
import { NextPage } from "next";

const NewSkill: NextPage = () => {
  const [name, setName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState("");

  async function handleSubmit(event: any) {
    event.preventDefault();

    const newSkillList = {
      name: name,
      image: image,
    };

    await addDoc(skillsRef, newSkillList);
  }

  function handleImageChange(e: any) {
    const file = e?.target?.files[0];
    if (file.size < 500000) {
      // image file size must be below 0,5MB
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImage(e?.target?.result);
      };
      reader.readAsDataURL(file);
      setErrorMessage(""); // reset errorMessage state
    } else {
      // if not below 0.5MB display an error message using the errorMessage state
      setErrorMessage("Picture is too large");
    }
  }

  //   function handleActivitiesChange(selectedOptions) {
  //     console.log(`Option selected:`, selectedOptions);
  //     setSelectedAktiviteter(selectedOptions);
  //   }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>
          <H1>New skill</H1>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Choose a image for your skill
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <SkillImg
            src={image}
            alt="Placeholder image"
            // onError={(e: any) =>
            //   (e.target.src = "/public/images/placeholderImage.jpg")}
          />
          <p>{errorMessage}</p>
        </label>

        <button type="submit">Create skill</button>
      </form>
    </section>
  );
};

export default NewSkill;

const SkillImg = styled.img({});

const H1 = styled.h1({});
