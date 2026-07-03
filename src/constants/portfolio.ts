import type { AwardItem, ContactLink, ExperienceItem, Project, Skill } from '../types/portfolio';
import { siteConfig } from './site';

export const pdfProfile = {
  summary: '세상을 이롭게 만들 수 있는 개발자가 되고 싶은 전재준입니다.',
} as const;

export const skills: Skill[] = [
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Emotion', category: 'Frontend' },
  { name: 'Zustand', category: 'Frontend' },
  { name: 'React Query', category: 'Frontend' },

  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },

  { name: 'Vite', category: 'Tools' },
  { name: 'TurboRepo', category: 'Tools' },
  { name: 'Storybook', category: 'Tools' },
  { name: 'Swagger', category: 'Tools' },

  { name: 'npm', category: 'PackageManager' },
  { name: 'Yarn Berry', category: 'PackageManager' },
  { name: 'Bun', category: 'PackageManager' },

  { name: 'GitHub Actions', category: 'DevOps' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Proxmox VE', category: 'DevOps' },

  { name: 'AWS', category: 'Cloud' },
  { name: 'Azure', category: 'Cloud' },
];

export const projects: Project[] = [
  {
    id: 'entry-dsm-frontend',
    title: 'Entry DSM 입학전형 서비스',
    summary:
      '대덕소프트웨어마이스터고등학교 입학전형 서비스의 프론트엔드 구조와 주요 화면을 개선했습니다.',
    description:
      'Entry DSM은 지원자가 입학 전형 절차를 온라인에서 진행할 수 있도록 돕는 웹 서비스입니다.',
    role: '지원자 접수, 결과 조회, 지원자 확인, 통계 등 입학 전형 흐름에 필요한 화면을 구현하고 상태 관리 구조를 정리했습니다.',
    features: ['원서 접수', '결과 조회', '지원자 확인', '통계'],
    problemSolving:
      '사용자가 전형 절차를 더 쉽게 따라갈 수 있도록 정보 구조를 분명히 하고, 반복되는 UI와 데이터 흐름을 유지보수하기 좋게 다듬었습니다.',
    githubUrl: 'https://github.com/EntryDSM/EntryDsm-Admission-2026',
    demoUrl: 'https://entrydsm.kr/',
    imageVariant: 'mono',
    tags: ['React', 'TypeScript', 'Emotion', 'TurboRepo', 'Vite'],
    featured: true,
    year: '2026',
  },
  {
    id: 'Commonly-frontend',
    title: 'Commonly',
    summary: '유성구청 리빙랩 프로젝트의 기간제 근로자 경력 관리 서비스 프론트엔드를 개발했습니다.',
    description:
      'Commonly는 기간제 근로자가 자신의 근로 이력과 경력 증명 정보를 웹에서 관리할 수 있도록 돕는 서비스입니다.',
    role: '근로 이력 등록과 경력 증명서 발급 흐름을 중심으로 화면 구조를 설계하고, 사용자가 필요한 정보를 빠르게 입력하고 확인할 수 있도록 구현했습니다.',
    features: ['근로 이력 등록', '경력 증명서 발급'],
    problemSolving:
      '종이 또는 수기 중심으로 관리되던 경력 정보를 웹에서 일관되게 관리할 수 있는 사용자 경험을 만드는 데 기여했습니다.',
    githubUrl: 'https://github.com/DSM2026-Commonly/Commonly-fe',
    demoUrl: 'https://github.com/DSM2026-Commonly/Commonly-fe',
    imageVariant: 'studio',
    tags: ['React', 'TypeScript', 'Emotion', 'Vite'],
    featured: true,
    year: '2026',
  },
  {
    id: 'xquare-infra-v3',
    title: 'XQUARE Infra V3',
    summary: '교내 프로젝트 배포 플랫폼 XQUARE 인프라 서비스의 프론트엔드 개발에 참여했습니다.',
    description:
      'XQUARE Infra V3는 학생 개발자가 교내 프로젝트를 배포하고 관리할 수 있도록 돕는 플랫폼입니다.',
    role: '서비스 배포와 관리 화면을 개선하고, 프로젝트 목록과 상세 정보 확인 등 운영에 필요한 UI를 구현했습니다.',
    features: ['프로젝트 배포', '서비스 관리', '상세 정보 확인', '운영 화면'],
    problemSolving:
      '학생 개발자가 교내 프로젝트를 더 쉽게 배포하고 관리할 수 있도록 화면 구조와 사용 흐름을 정돈했습니다.',
    githubUrl: 'https://github.com/team-xquare/xquare-infra-frontend-v3',
    demoUrl: 'https://xquare.dsmhs.kr/',
    imageVariant: 'aurora',
    tags: ['React', 'TypeScript', 'Emotion', 'Storybook', 'TurboRepo', 'Vite'],
    featured: true,
    year: '2025-2026',
  },
];

export const experiences: ExperienceItem[] = [
  {
    title: '유성구청 리빙랩 프로젝트 팀장',
    organization: '대덕소프트웨어마이스터고등학교',
    period: '2026.04 ~',
    description:
      '지역 문제 해결을 목표로 한 리빙랩 프로젝트에서 팀장으로 활동하며 기획, 역할 분담, 프론트엔드 개발을 함께 담당하고 있습니다.',
  },
  {
    title: '전공 동아리 XQUARE 부장',
    organization: '대덕소프트웨어마이스터고등학교 XQUARE',
    period: '2026.03 ~',
    description:
      '동아리 운영과 프로젝트 진행을 관리하며 팀원들과 협업해 다양한 개발 과제를 수행하고 있습니다.',
  },
  {
    title: 'FE Conf 2025 참가',
    organization: 'Frontend Developers Conference',
    period: '2025.08.23',
    description:
      '프론트엔드 개발 관련 세션을 듣고 실무 개발자들의 경험과 기술 흐름을 학습했습니다.',
  },
  {
    title: '교내 해커톤 참가',
    organization: '대덕소프트웨어마이스터고등학교',
    period: '2025.07.14 ~ 2025.07.18',
    description: '디자인과 프론트엔드 구현을 담당하며 제한된 시간 안에 팀 프로젝트를 완성했습니다.',
  },
];

export const awards: AwardItem[] = [
  {
    title: '웹 개발 입문 교과 우수상',
    issuer: '대덕소프트웨어마이스터고등학교',
    year: '2025',
    description: '교내 웹 개발 입문 교과에서 우수한 평가를 받아 수상했습니다.',
  },
];

export const contactLinks: ContactLink[] = [
  { label: 'Email', href: `mailto:${siteConfig.email}`, value: siteConfig.email },
  { label: 'GitHub', href: siteConfig.githubUrl, value: '@jaejun090210' },
];
