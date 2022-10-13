import { addDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { skillsRef } from "../../firebase-config";
import Image from "next/image";
import styled from "styled-components";

export default function NewSkill({}) {
  const [name, setName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState("");

  async function handleSubmit(event: any) {
    event.preventDefault();

    const newSkillList = {
      name: name,
      image: image,
      id: `ucb-${Date.now()}`,
    };

    await addDoc(skillsRef, newSkillList);
  }

  function handleImageChange(event: any) {
    const file = event?.target?.files[0];
    if (file.size < 500000) {
      // image file size must be below 0,5MB
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setImage(event?.target?.result);
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
          New skill
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
}

const SkillImg = styled.img({});
