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

export type GithubEvent = {
  id: string;
  type: string;
  repo: {
    id: number;
    name: string;
  };
  payload: {
    action?: string;
    ref_type?: string;
  };
  public: boolean;
  created_at: string;
};

export type GithubContributionLevel = 0 | 1 | 2 | 3 | 4;

export type GithubContributionDay = {
  date: string;
  count: number;
  level: GithubContributionLevel;
};

export type GithubRecentWork = {
  repositoryId: number;
  repositoryName: string;
  repositoryUrl: string;
  latestActivityAt: string;
  activityCount: number;
  activityLabels: string[];
};

export type GithubActivitySummary = {
  contributionDays: GithubContributionDay[];
  recentWork: GithubRecentWork[];
  totalActivityCount: number;
};
