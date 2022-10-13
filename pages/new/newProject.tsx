import { addDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { AddImage } from "../../components/addImage";
import { projectsRef } from "../../firebase-config";

export default function NewProject({}) {
  const [name, setName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const newProjectList = {
      name: name,
      id: `ucb-${Date.now()}`,
    };

    await addDoc(projectsRef, newProjectList);
  }

  // function handleImageChange(event) {
  //     const file = event.target.files[0];
  //     if (file.size < 500000) {
  //         // image file size must be below 0,5MB
  //         const reader = new FileReader();
  //         reader.onload = event => {
  //             setImage(event.target.result);
  //         };
  //         reader.readAsDataURL(file);
  //         setErrorMessage(""); // reset errorMessage state
  //     } else {
  //         // if not below 0.5MB display an error message using the errorMessage state
  //         setErrorMessage("Billedet er for stort");
  //     }
  // }

  //   function handleActivitiesChange(selectedOptions) {
  //     console.log(`Option selected:`, selectedOptions);
  //     setSelectedAktiviteter(selectedOptions);
  //   }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>
          ProjectS WOWO
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </label>
        <AddImage />
        <button type="submit">Opret Project</button>
      </form>
    </section>
  );
}
