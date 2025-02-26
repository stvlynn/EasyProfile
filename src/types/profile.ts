import { IconName } from '../config/icons';

export interface SocialMedia {
  platform: string;
  url: string;
}

export interface Project {
  name: string;
  description: string;
  url: string;
  image?: string;
  tech: string[];
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  image?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
  image?: string;
}

export interface TechnologyStack {
  name: string;
  proficiency: 0 | 1 | 2 | 3;
  icon: IconName;
}

export interface Profile {
  name: string;
  avatar: string;
  tagline: string;
  email: string;
  links: SocialMedia[];
}

export interface ProfileData {
  profile: Profile;
  intro: {
    content: string;
  };
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  techStacks: TechnologyStack[];
}