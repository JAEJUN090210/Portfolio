import type {
  AwardItem,
  EducationItem,
  ExperienceItem,
  Skill,
  SkillGroup,
} from '../types/portfolio';

export { projects } from './projects';

export const skills: Skill[] = [
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Emotion', category: 'Frontend' },
  { name: 'Zustand', category: 'Frontend' },
  { name: 'React Query', category: 'Frontend' },
  { name: 'Vite', category: 'Frontend' },
  { name: 'Storybook', category: 'Frontend' },

  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'Swagger', category: 'Backend' },

  { name: 'Docker', category: 'Server' },
  { name: 'Kubernetes', category: 'Server' },
  { name: 'Nginx', category: 'Server' },
  { name: 'GitHub Actions', category: 'Server' },
  { name: 'Argo', category: 'Server' },
  { name: 'Proxmox VE', category: 'Server' },

  { name: 'AWS', category: 'Cloud' },
  { name: 'Azure', category: 'Cloud' },

  { name: 'TurboRepo', category: 'Tools' },
  { name: 'Git', category: 'Tools' },
  { name: 'GitHub', category: 'Tools' },

  { name: 'npm', category: 'PackageManager' },
  { name: 'pnpm', category: 'PackageManager' },
  { name: 'Yarn Berry', category: 'PackageManager' },
  { name: 'Bun', category: 'PackageManager' },
];

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: '사용자 경험을 최우선으로 생각하는 UI/UX 개발',
    categories: ['Frontend'],
  },
  {
    id: 'infra',
    title: 'Backend & Infra',
    description: '서비스를 안정적으로 배포하고 운영하는 환경 구성',
    categories: ['Backend', 'Server', 'Cloud'],
  },
  {
    id: 'tools',
    title: 'Tools',
    description: '효율적인 협업과 개발을 위한 도구 활용',
    categories: ['Tools', 'PackageManager'],
  },
];

export const experiences: ExperienceItem[] = [
  {
    id: 'geeks-hackathon-2026',
    organization: '키키랩',
    badge: '해커톤',
    title: '2026 GEEKs 해커톤 — 프론트엔드',
    period: '2026.08.04 – 2026.08.05',
    highlights: [
      '프로젝트의 프론트엔드를 담당하여 웹 화면을 구현했습니다.',
      '2026 GEEKs 해커톤 우수상을 수상했습니다.',
    ],
    stack: ['React', 'TypeScript'],
  },
  {
    id: 'dsm-hackathon-2026',
    organization: '대덕소프트웨어마이스터고등학교',
    badge: '해커톤',
    title: '2026 교내 해커톤 — 프론트엔드',
    location: '대전',
    period: '2026.07.13 – 2026.07.15',
    highlights: [
      '프론트엔드의 전반적인 구조와 UI 구현을 담당하며 팀 프로젝트를 완성했습니다.',
      '2026 교내 해커톤 최우수상을 수상했습니다.',
    ],
    stack: ['React', 'TypeScript', 'Emotion', 'Vite'],
  },
  {
    id: 'living-lab-2026',
    organization: '유성구청 리빙랩 프로젝트',
    badge: '팀장',
    title: '리빙랩 프로젝트 팀장 · 프론트엔드 개발',
    location: '대전',
    period: '2026.07 - 2026.10',
    highlights: [
      '지역 문제 해결을 목표로 한 리빙랩 프로젝트에서 팀장으로 활동하며 기획과 역할 분담을 이끌었습니다.',
      '기간제 근로자 경력 관리 서비스 Commonly의 프론트엔드를 개발하였습니다.',
    ],
    stack: ['React', 'TypeScript', 'Emotion', 'Vite'],
  },
  {
    id: 'xquare-lead-2026',
    organization: 'XQUARE',
    badge: '부장',
    title: '전공 동아리 부장 · 프론트엔드 개발',
    location: '대덕소프트웨어마이스터고등학교',
    period: '2025.03 – 현재',
    highlights: [
      '동아리 운영과 프로젝트 진행을 관리하며 팀원들과 협업해 다양한 개발 과제를 수행하고 있습니다.',
      '교내 프로젝트 배포 플랫폼 XQUARE Infra V3 프론트엔드 개발에 참여했습니다.',
    ],
    stack: ['React', 'TypeScript', 'Emotion', 'Storybook', 'TurboRepo'],
  },
  {
    id: 'feconf-2025',
    organization: 'FE Conf 2025',
    badge: '컨퍼런스',
    title: 'Frontend Developers Conference 참가',
    location: '서울',
    period: '2025.08.23',
    highlights: [
      '프론트엔드 개발 관련 세션을 듣고 실무 개발자들의 경험과 기술 흐름을 학습했습니다.',
    ],
    stack: ['Frontend', 'Conference'],
  },
  {
    id: 'dsm-hackathon-2025',
    organization: '대덕소프트웨어마이스터고등학교',
    badge: '해커톤',
    title: '2025 교내 해커톤 — 디자인 · 프론트엔드',
    location: '대전',
    period: '2025.07.14 – 2025.07.18',
    highlights: [
      '디자인과 프론트엔드 구현을 담당하며 제한된 시간 안에 팀 프로젝트를 완성했습니다.',
    ],
    stack: ['React', 'TypeScript', 'UI Design'],
  },
];

export const education: EducationItem[] = [
  {
    id: 'dsm',
    organization: '대덕소프트웨어마이스터고등학교',
    badge: '재학',
    title: '소프트웨어 전공',
    location: '대전',
    period: '2025.03 – 현재',
    highlights: [
      '전공 동아리 XQUARE 부장으로 동아리 운영과 프로젝트 진행을 이끌고 있습니다.',
      '2025, 2026 교내 해커톤에 참가하며 팀 프로젝트를 완성했습니다.',
      '유성구청 리빙랩 프로젝트 팀장으로 지역 문제 해결 프로젝트를 진행하고 있습니다.',
    ],
    stack: ['React', 'TypeScript', 'Emotion', 'Docker', 'Kubernetes', '팀 리더십'],
  },
];

export const awards: AwardItem[] = [
  {
    title: '2026 유성 데이터기반 실증 리빙랩 우수상',
    issuer: '유성구청',
    year: '2026. 10. 06',
    description: '2026년 유성 데이터기반 실증 리빙랩에서 우수상을 수상했습니다.',
  },
  {
    title: '2026 GEEKs 해커톤 우수상',
    issuer: '키키랩',
    year: '2026. 08. 05',
    description: '2026년 GEEKs 해커톤에서 우수상을 수상했습니다.',
  },
  {
    title: '2026 교내 해커톤 최우수상',
    issuer: '대덕소프트웨어마이스터고등학교',
    year: '2026. 07. 16',
    description: '2026년 교내 해커톤에서 최우수상을 수상했습니다.',
  },
];
