import { Project } from "./Project";
import { Skill } from "./Skill";

export type User = {
  name: string;
  email: string;
  id: string;
  title: string;
  mail: string;
  admin: boolean;
  skills: {
    primarySkills: Skill[];
    secondarySkills: Skill[];
  };
  projects: {
    mainProjects: Project[];
    assistedProjects: Project[];
  };
  date: string;
  location: {
    label: string;
    value: number;
  };
  image: string;
  slack: string;
  experience: {
    label: number;
    value: number;
  };
};
