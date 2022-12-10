import { addDoc } from "@firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { projectsRef } from "../../firebase-config";
import { Project } from "../../models/Project";
import typescript from "../../icons/typescript.png";
import { User } from "../../models/User";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Button } from "../../components/button/button";
import Link from "next/link";

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

  async function handleSubmit(event: any) {
    event.preventDefault();

    const projectUpdate = {
      label: name,
      image: image,
    };

    // @ts-ignore disable-next-line
    const docRef = doc(projectsRef, updateProjectId);

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
          <DisplayImage src={image} alt="Choose a picture" />
        </InputWrapper>
        <div onClick={() => router.push(`/project/${updateProjectId}`)}>
          <Button label={"Update project"} type="submit"></Button>
        </div>
      </form>
    </section>
  );
};

export default UpdateProject;

const DisplayImage = styled.img({
  margin: "0 auto",
  display: "block",
  marginTop: "40px",
  marginBottom: "40px",
  width: "200px",
  borderRadius: "10px",
});

const H1 = styled.h1({
  textAlign: "center",
  color: "blue",
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
  border: "none",
});
