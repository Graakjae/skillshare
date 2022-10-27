import { Project } from "./Project";
import { Skill } from "./Skill";

export type User = {
  name: string;
  id: string;
  title: string;
  skills: {
    primarySkills: Skill[];
    secondarySkills: Skill[];
  };
  projects: {
    mainProjects: Project[];
    assistedProjects: Project[];
  };
  experience: number;
  location: string;
  image: string;
  slack: string;
};
