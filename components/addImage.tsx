import { addDoc } from "firebase/firestore";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { usersRef } from "../firebase-config";

export const AddImage: FC = ({}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState("");

  function handleImageChange(event: any) {
    const file = event?.target?.files[0];
    if (file.size < 500000) {
      // image file size must be below 0,5MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
      setErrorMessage(""); // reset errorMessage state
    } else {
      // if not below 0.5MB display an error message using the errorMessage state
      setErrorMessage("Picture is too large");
    }
  }
  return (
    <label>
      Choose a image for your skill
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <SkillImg
        src={image}
        alt="Placeholder image"
        // onError={(e: any) => (e.target.src = "placeholderImage.jpg")}
      />
      <p>{errorMessage}</p>
    </label>
  );
};

const SkillImg = styled.img({
  width: "100px",
});
