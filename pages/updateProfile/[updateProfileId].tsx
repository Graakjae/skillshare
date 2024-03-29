import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { projectsRef, skillsRef, usersRef2 } from "../../firebase-config";
import { Project } from "../../models/Project";
import { User } from "../../models/User";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { Skill } from "../../models/Skill";
import { locations } from "../../lib/helpers/locations";
import Select from "react-select";
import { Button } from "../../components/button/button";
import { getAuth } from "firebase/auth";

const UpdateProfile: NextPage = () => {
  const [user, setUser] = useState<User>();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState<Skill[]>();
  const [primarySkills, setPrimarySkills] = useState<any>([]);
  const [secondarySkills, setSecondarySkills] = useState<any>([]);
  const [projects, setProjects] = useState<Project[]>();
  const [mainProjects, setMainProjects] = useState<any>([]);
  const [assistedProjects, setAssistedProjects] = useState<any>([]);
  const [slack, setSlack] = useState("");
  const [date, setDate] = useState({});
  const [location, setLocation] = useState<any>({});
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    async function getUser() {
      if (auth.currentUser) {
        // @ts-ignore disable-next-line
        setEmail(auth?.currentUser?.email);

        const docRef = doc(usersRef2, auth?.currentUser?.uid);
        const userData = (await getDoc(docRef)).data();
        if (userData) {
          setName(userData.name);
          setImage(userData.image);
          setTitle(userData.title);
          setPrimarySkills(userData.skills.primarySkills);
          setSecondarySkills(userData.skills.secondarySkills);
          setMainProjects(userData.projects.mainProjects);
          setAssistedProjects(userData.projects.assistedProjects);
          setDate(userData.date);
          setLocation(userData.location);
        }
        setLoading(false);
      }
    }

    getUser();
  }, [auth.currentUser, name]);

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

  async function handleSubmit(event: any) {
    event.preventDefault();

    const profileUpdate = {
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
      id: `ucb-${Date.now()}`,
    };

    // @ts-ignore disable-next-line
    const docRef = doc(usersRef2, auth.currentUser.uid);
    await updateDoc(docRef, profileUpdate);
  }

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
    <section>
      <form onSubmit={handleSubmit}>
        <H1>Update your profile</H1>
        <InputWrapper>
          <H3>Name</H3>
          <Input2
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <H3>Mail</H3>
          <Input2
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <H3>Title</H3>
          <Input2
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <H3>Primary skills</H3>
          <Select
            value={primarySkills}
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
            value={secondarySkills}
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
            value={mainProjects}
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
            value={assistedProjects}
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
            value={locations}
            isSearchable={true}
            isMulti={false}
            defaultValue={null}
            onChange={setLocation}
            options={locations}
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

        <div onClick={() => router.push(`/profile/profilePage`)}>
          <Button label={"Update profile"} type="submit"></Button>
        </div>
      </form>
    </section>
  );
};

export default UpdateProfile;

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

const ImageInput = styled.input({
  width: "100%",
  backgroundColor: "white",
  height: "50px",
  cursor: "pointer",
  border: "none",
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
