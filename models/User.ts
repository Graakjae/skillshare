export type User = {
  name: string;
  id: string;
  title: string;
  skills: {
    primarySkills: string;
    secondarySkills: string;
  };
  projects: {
    mainProjects: string;
    assistedProjects: string;
  };
  experience: string;
  location: string;
  image: string;
  slack: string;
};
