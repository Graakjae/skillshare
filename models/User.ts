import { Project } from "./Project";
import { Skill } from "./Skill";

export type User = {
  name: string;
  id: string;
  title: string;
  mail: string;
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
};
