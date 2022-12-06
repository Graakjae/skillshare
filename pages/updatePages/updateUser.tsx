import { addDoc } from "@firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";
import { projectsRef, skillsRef, usersRef } from "../../firebase-config";
import styled from "styled-components";
import { onSnapshot } from "firebase/firestore";
import { Skill } from "../../models/Skill";
import { Project } from "../../models/Project";
import { NextPage } from "next";
import { locations } from "../../lib/helpers/locations";
import { useRouter } from "next/router";
import Select from "react-select";

const NewUser: NextPage = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState<Skill[]>();
  const [primarySkills, setPrimarySkills] = useState([]);
  const [secondarySkills, setSecondarySkills] = useState([]);
  const [projects, setProjects] = useState<Project[]>();
  const [mainProjects, setMainProjects] = useState([]);
  const [assistedProjects, setAssistedProjects] = useState([]);
  const [experience, setExperience] = useState(0);
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [slack, setSlack] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  async function handleSubmit(event: any) {
    event.preventDefault();

    const newUserList = {
      name: name,
      title: title,
      skills: {
        primarySkills: primarySkills,
        secondarySkills: secondarySkills,
      },
      projects: {
        mainProjects: mainProjects,
        assistedProjects: assistedProjects,
      },
      experience: experience,
      location: location,
      image: image,
      slack: slack,
      id: `ucb-${Date.now()}`,
    };

    await addDoc(usersRef, newUserList);
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(skillsRef, (data) => {
      const favData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as Skill;
      });
      console.log(favData);
      setSkills(favData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(projectsRef, (data) => {
      const favData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as Project;
      });
      console.log(favData);
      setProjects(favData);
    });
    return () => unsubscribe();
  }, []);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      setErrorMessage("Image input is invalid");
      return;
    }

    const file = event.target.files[0];
    if (file.size < 500000) {
      // image file size must be below 0,5MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setErrorMessage(""); // reset errorMessage state
    } else {
      // if not below 0.5MB display an error message using the errorMessage state
      setErrorMessage("Picture is too large");
    }
  }

  let skillOptions: any = [];

  skills?.map((skill: Skill) => {
    skillOptions.push({ value: skill.label, label: skill.label });
  });

  let projectOptions: any = [];

  projects?.map((project: Project) => {
    projectOptions.push({ value: project.label, label: project.label });
  });

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <H1>New user</H1>
        <InputWrapper>
          <H3>Name</H3>
          <Input2 type="text" onChange={(e) => setName(e.target.value)} />
        </InputWrapper>
        <InputWrapper>
          <H3>Title</H3>
          <Input2 type="text" onChange={(e) => setTitle(e.target.value)} />
        </InputWrapper>
        <InputWrapper>
          <H3>Experience</H3>
          <Input2
            type="text"
            onChange={(e) => setExperience(e.target.valueAsNumber)}
          />
        </InputWrapper>
        <InputWrapper>
          <H3>Primary skills</H3>
          <Select
            isSearchable={true}
            isMulti={true}
            defaultValue={null}
            onChange={setPrimarySkills}
            options={skillOptions}
          />
        </InputWrapper>
        <InputWrapper>
          <H3>Secondary skills</H3>
          <Select
            isSearchable={true}
            isMulti={true}
            defaultValue={null}
            onChange={setSecondarySkills}
            options={skillOptions}
          />
        </InputWrapper>
        <InputWrapper>
          <H3>Main projects</H3>
          <Select
            isSearchable={true}
            isMulti={true}
            defaultValue={null}
            onChange={setMainProjects}
            options={projectOptions}
          />
        </InputWrapper>
        <InputWrapper>
          <H3>Assisting projects</H3>
          <Select
            isSearchable={true}
            isMulti={true}
            defaultValue={null}
            onChange={setAssistedProjects}
            options={projectOptions}
          />
        </InputWrapper>
        <InputWrapper>
          <H3>Location</H3>
          <Select
            isSearchable={true}
            isMulti={false}
            defaultValue={null}
            onChange={setLocation}
            options={locations}
          />
        </InputWrapper>

        <InputWrapper>
          <H3>Choose a profilepicture</H3>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <UserImg
            src={image}
            alt="Placeholder image"
            // onError={(e: any) => (e.target.src = "placeholderImage.jpg")}
          />
          <p>{errorMessage}</p>
        </InputWrapper>
        <Button type="submit" onClick={() => router.push("/users")}>
          Create user
        </Button>
      </div>
    </Form>
  );
};

export default NewUser;

const UserImg = styled.img({
  width: "100px",
});
const H1 = styled.h1({
  textAlign: "center",
});

const H3 = styled.h3({
  marginBlockStart: "1em",
  marginBlockEnd: "0.1em",
});

const Input2 = styled.input({
  width: "100%",
  height: "50px",
  border: "none",
  fontSize: "20px",
});

const InputWrapper = styled.div({
  width: "80%",
  display: "block",
  margin: "auto",
  ["div"]: {
    border: "none",
  },
});

const LocationSelect = styled.select({
  width: "100%",
  border: "none",
  backgroundColor: "white",
});

const Form = styled.form({});

const Button = styled.button({
  width: "260px",
  height: "60px",
  backgroundColor: "black",
  color: "white",
  fontSize: "25px",
  border: "none",
  transition: "1s all ease",
  display: "block",
  margin: "auto",
  ["&:hover"]: {
    backgroundColor: "#FFEC3F",
    color: "black",
  },
});
