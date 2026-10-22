export type SkillCategory =
  'Frontend' | 'Backend' | 'Server' | 'Cloud' | 'Tools' | 'PackageManager';

export type Skill = {
  name: string;
  category: SkillCategory;
};

export type SkillGroup = {
  id: string;
  title: string;
  description: string;
  categories: SkillCategory[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

/** 주요 기능 한 줄: `label` 은 사용자/영역, `text` 는 기능 설명 */
export type ProjectFeature = {
  label: string;
  text: string;
};

/** 트러블슈팅 한 건. 있는 항목만 순서대로 보여 줍니다. */
export type ProjectTroubleshooting = {
  title: string;
  situation?: string;
  problem?: string;
  cause?: string;
  solution: string;
  /** 여러 선택지 중 그 방법을 고른 이유 */
  decision?: string;
  result?: string;
  improvement?: string;
};

export type ProjectDetail = {
  intro: string[];
  /** 프로젝트 목록(아코디언)에 보여 줄 핵심 기여 3~4줄 */
  highlights: string[];
  features?: ProjectFeature[];
  /** 내 역할과 개발 내용 */
  sections: ProjectSection[];
  troubleshooting?: ProjectTroubleshooting[];
  retrospective?: string[];
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  /** 한 줄 역할 설명(아코디언) */
  role: string;
  imageVariant: 'aurora' | 'mono' | 'studio';
  tags: string[];
  period: string;
  status: string;
  team?: string;
  /** 맡은 포지션 요약. 예) PM · Frontend · 배포 */
  position?: string;
  /** 기여도. 예) 커밋 232 / 574 */
  contribution?: string;
  /** 운영 규모. 예) 사용자 127명 */
  scale?: string;
  /** 협업 방식. 예) GitHub Issue·PR · Notion */
  collaboration?: string;
  links: ProjectLink[];
  images?: string[];
  detail: ProjectDetail;
};

export type TimelineItem = {
  id: string;
  organization: string;
  badge: string;
  title: string;
  location?: string;
  period: string;
  highlights: string[];
  stack: string[];
};

export type ExperienceItem = TimelineItem;

export type EducationItem = TimelineItem & {
  gpa?: string;
};

export type AwardItem = {
  title: string;
  issuer: string;
  year: string;
  description: string;
};

export type IntroSegment = {
  text: string;
  strong?: boolean;
};
