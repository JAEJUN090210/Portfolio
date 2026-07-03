export type SkillCategory =
  'Frontend' | 'Backend' | 'DevOps' | 'Cloud' | 'Tools' | 'PackageManager';

export type Skill = {
  name: string;
  category: SkillCategory;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  role: string;
  features: string[];
  problemSolving: string;
  githubUrl: string;
  demoUrl: string;
  imageVariant: 'aurora' | 'mono' | 'studio';
  tags: string[];
  featured: boolean;
  year: string;
};

export type ExperienceItem = {
  title: string;
  organization: string;
  period: string;
  description: string;
};

export type AwardItem = {
  title: string;
  issuer: string;
  year: string;
  description: string;
};

export type ContactLink = {
  label: string;
  href: string;
  value: string;
};

export type GithubRepository = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  updated_at: string;
};
