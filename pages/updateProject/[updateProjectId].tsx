import { addDoc } from "@firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { projectsRef } from "../../firebase-config";
import { Project } from "../../models/Project";
import typescript from "../../icons/typescript.png";
import { User } from "../../models/User";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const UpdateProject: NextPage = () => {
  const [project, setProject] = useState<Project>();
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const { updateProjectId } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log(updateProjectId);
      if (!updateProjectId) return;
      try {
        {
          // @ts-ignore disable-next-line
          const docRef = doc(projectsRef, updateProjectId);
          const docData = await getDoc(docRef);
          const project = docData.data() as Project;
          setProject(project);
          setName(project.label);
          setImage(project.image);
        }
      } catch (error) {
      } finally {
        // setLoading(false);
      }
    };
    fetchData();
  }, [updateProjectId]);

  // function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
  //   if (!event.target.files) {
  //     setErrorMessage("Image input is invalid");
  //     return;
  //   }
  //   const file = event.target.files[0];
  //   if (file.size < 500000) {
  //     // image file size must be below 0,5MB
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       setImage(event.target?.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //     setErrorMessage(""); // reset errorMessage state
  //   } else {
  //     // if not below 0.5MB display an error message using the errorMessage state
  //     setErrorMessage("Picture is too large");
  //   }
  // }

  async function handleSubmit(event: any) {
    event.preventDefault();

    const projectUpdate = {
      label: name,
      image: image,
    };

    // @ts-ignore disable-next-line
    const docRef = doc(projectsRef, updateProjectId);

    await setDoc(docRef, projectUpdate);
    await updateDoc(docRef, projectUpdate);
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <H1>Update project: {project?.label}</H1>
        <InputWrapper>
          <H3>Name</H3>
          <Input2
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <H3>Image</H3>
          <ImageInput
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder=""
          />
          <ProjectImg
            src={image}
            alt="Choose a picture"
            // onError={(e: any) => (e.target.src = typescript)}
          />
          <p>{errorMessage}</p>
        </InputWrapper>
        <button
          type="submit"
          onClick={() => router.push(`/project/${updateProjectId}`)}
        >
          Update Project
        </button>
      </form>
    </section>
  );
};

export default UpdateProject;

const ProjectImg = styled.img({
  width: "200px",
});

const H1 = styled.h1({
  textAlign: "center",
});

const H3 = styled.h3({
  marginBlockStart: "1em",
  marginBlockEnd: "0.1em",
});

const InputWrapper = styled.label({
  width: "80%",
  display: "block",
  margin: "auto",
  ["div"]: {
    border: "none",
    backgroundColor: "white",
    height: "50px",
  },
});

const Input2 = styled.input({
  width: "100%",
  height: "50px",
  border: "none",
  fontSize: "20px",
});

const ImageInput = styled.input({
  width: "100%",
  backgroundColor: "white",
  height: "50px",
  cursor: "pointer",
});
