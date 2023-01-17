import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import React from "react";
import logo from "../assets/img/logo.png";
import { doc, setDoc } from "@firebase/firestore";
import imgPlaceholder from "../assets/img/img-placeholder.jpg";
import { projectsRef, skillsRef, usersRef2 } from "../../firebase-config";
import { useRouter } from "next/router";
import { Skill } from "../../models/Skill";
import { Project } from "../../models/Project";
import { NextPage } from "next";
import styled from "styled-components";
import { Button } from "../../components/button/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import da from "date-fns/locale/da";
import Select from "react-select";
import { locations } from "../../lib/helpers/locations";
import { onSnapshot } from "firebase/firestore";

const SignUp: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState<Skill[]>();
  const [primarySkills, setPrimarySkills] = useState<any>([]);
  const [secondarySkills, setSecondarySkills] = useState<any>([]);
  const [projects, setProjects] = useState<Project[]>();
  const [mainProjects, setMainProjects] = useState<any>([]);
  const [assistedProjects, setAssistedProjects] = useState<any>([]);
  const [date, setDate] = useState<any>(new Date());
  const [location, setLocation] = useState<any>("");
  const [image, setImage] = useState("");
  const [slack, setSlack] = useState("");
  const [mail, setMail] = useState("");
  const [admin, setAdmin] = useState();
  const auth = getAuth();
  const router = useRouter();

  function handleSignUp(event: any) {
    event.preventDefault();
    const mail = event.target.mail.value;
    const password = event.target.password.value;

    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        saveUserInfo();
        router.push("/users");
      })
      .catch((error) => {
        let code = error.code;
        console.log(code);
        code = code.replaceAll("-", " ");
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }

  async function saveUserInfo() {
    const newUser = {
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
      date: date,
      location: location,
      image: image,
      slack: slack,
      mail: mail,
      admin: false,
      id: `ucb-${Date.now()}`,
    };
    const docRef = doc(usersRef2, auth?.currentUser?.uid);
    await setDoc(docRef, newUser);
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
  let skillOptions: any = [];

  skills?.map((skill: Skill) => {
    skillOptions.push({
      value: skill.label,
      label: skill.label,
      id: skill.id,
    });
  });

  let projectOptions: any = [];

  projects?.map((project: Project) => {
    projectOptions.push({
      value: project.label,
      label: project.label,
      id: project.id,
    });
  });

  return (
    <Form onSubmit={handleSignUp}>
      <div>
        <H1>Sign up</H1>

        <InputWrapper>
          <H3>Mail</H3>
          <Input2 type="email" name="mail" />
        </InputWrapper>
        <InputWrapper>
          <H3>Password</H3>
          <Input2 type="password" name="password" />
        </InputWrapper>
        <InputWrapper>
          <H3>Name</H3>
          <Input2 type="text" onChange={(e) => setName(e.target.value)} />
        </InputWrapper>
        <InputWrapper>
          <H3>Title</H3>
          <Input2 type="text" onChange={(e) => setTitle(e.target.value)} />
        </InputWrapper>
        <DateWrapper>
          <H3>Date of joining impact</H3>
          <DatePicker
            locale={da}
            dateFormat="dd/MM/yyyy"
            className="dates"
            selected={date}
            onChange={setDate}
          />
        </DateWrapper>
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
          <H3>Choose a profilepicture (Link)</H3>
          <ImageInput
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder=""
          />
          <DisplayImage src={image} alt="Placeholder image" />
        </InputWrapper>
        <Button label={"Sign up"} type="submit"></Button>
        <P>Already have a user?</P>
        <Link href="/signIn">Sign in here</Link>
      </div>
    </Form>
  );
};

export default SignUp;

const P = styled.p({
  textAlign: "center",
});

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
});

const H3 = styled.h3({
  marginBlockStart: "1em",
  marginBlockEnd: "0.1em",
  textAlign: "left",
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

const DateWrapper = styled.div({
  width: "80%",
  display: "block",
  margin: "auto",
  ["input"]: {
    border: "none",
    width: "100%",
    height: "50px",
  },
});

const LocationSelect = styled.select({
  width: "100%",
  border: "none",
  backgroundColor: "white",
});

const Form = styled.form({});

const ImageInput = styled.input({
  width: "100%",
  backgroundColor: "white",
  height: "50px",
  cursor: "pointer",
  border: "none",
});
