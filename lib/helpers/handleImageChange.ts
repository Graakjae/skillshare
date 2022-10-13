import { addDoc } from "firebase/firestore";
import { useState } from "react";
import { usersRef } from "../../firebase-config";

export function handleImageChange(event: any) {
  const [setErrorMessage] = useState("");
  const [setImage] = useState("");
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
