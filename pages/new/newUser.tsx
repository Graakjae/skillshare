import { addDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { projectsRef, skillsRef, usersRef } from "../../firebase-config";
import styled from "styled-components";
import { onSnapshot } from "firebase/firestore";
import { Skill } from "../../models/Skill";
import { Project } from "../../models/Project";
import { NextPage } from "next";
import { locations } from "../../lib/helpers/locations";
import Multiselect from "multiselect-react-dropdown";

const NewUser: NextPage = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState<Skill>();
  const [primarySkills, setPrimarySkills] = useState([]);
  const [secondarySkills, setSecondarySkills] = useState([]);
  const [projects, setProjects] = useState<Project>();
  const [mainProjects, setMainProjects] = useState([]);
  const [assistedProjects, setAssistedProjects] = useState([]);
  const [experience, setExperience] = useState(0);
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
          <Multiselect
            options={skills} // Options to display in the dropdown
            onSelect={setPrimarySkills} // Function will trigger on select event
            displayValue="name" // Property name to display in the dropdown options
            showCheckbox
          />
        </label>
        <label>
          Secondary skills
          <Multiselect
            options={skills} // Options to display in the dropdown
            onSelect={setSecondarySkills} // Function will trigger on select event
            displayValue="name" // Property name to display in the dropdown options
            showCheckbox
          />
        </label>
        <label>
          Main projects
          <Multiselect
            options={projects} // Options to display in the dropdown
            onSelect={setMainProjects} // Function will trigger on select event
            displayValue="name" // Property name to display in the dropdown options
            showCheckbox
          />
        </label>
        <label>
          Assisted projects
          <Multiselect
            options={projects} // Options to display in the dropdown
            onSelect={setAssistedProjects} // Function will trigger on select event
            displayValue="name" // Property name to display in the dropdown options
            showCheckbox
          />
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
