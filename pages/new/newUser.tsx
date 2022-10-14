import { addDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { projectsRef, skillsRef, usersRef } from "../../firebase-config";
import styled from "styled-components";
import { onSnapshot } from "firebase/firestore";
import { Skill } from "../../models/Skill";
import { Project } from "../../models/Project";
import { NextPage } from "next";

const NewUser: NextPage = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState([]);
  const [primarySkills, setPrimarySkills] = useState("");
  const [secondarySkills, setSecondarySkills] = useState("");
  const [projects, setProjects] = useState([]);
  const [mainProjects, setMainProjects] = useState("");
  const [assistedProjects, setAssistedProjects] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [slack, setSlack] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        return { ...doc.data(), id: doc.id };
      });
      console.log(favData);
      setSkills(favData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(projectsRef, (data) => {
      const favData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(favData);
      setProjects(favData);
    });
    return () => unsubscribe();
  }, []);

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
  const locations = ["Aarhus", "Copenhagen"];

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <H1>New user</H1>
        <label>
          Name
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Title
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Experience
          <input type="text" onChange={(e) => setExperience(e.target.value)} />
        </label>
        <label>
          Primary skills
          <select onChange={(e) => setPrimarySkills(e.target.value)}>
            <option>Primary skills</option>
            {skills.map((skill: Skill) => (
              <option value={skill.name} key={skill.name}>
                {skill.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Secondary skills
          <select onChange={(e) => setSecondarySkills(e.target.value)}>
            <option>Secondary skills</option>
            {skills.map((skill: Skill) => (
              <option value={skill.name} key={skill.name}>
                {skill.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Main projects
          <select onChange={(e) => setMainProjects(e.target.value)}>
            <option>Main projects</option>
            {projects.map((project: Project) => (
              <option value={project.name} key={project.name}>
                {project.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Assisted projects
          <select onChange={(e) => setAssistedProjects(e.target.value)}>
            <option>Assisted projects</option>
            {projects.map((project: Project) => (
              <option value={project.name} key={project.name}>
                {project.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Location
          <select onChange={(e) => setLocation(e.target.value)}>
            <option>Location</option>
            {locations.map((location) => (
              <option value={location} key={location}>
                {location}
              </option>
            ))}
          </select>
        </label>
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
        <button type="submit">Create user</button>
      </form>
    </section>
  );
};

export default NewUser;

const SkillImg = styled.img({});
const H1 = styled.h1({});
