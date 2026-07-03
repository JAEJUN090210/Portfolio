import type { AwardItem, ContactLink, ExperienceItem, Project, Skill } from '../types/portfolio';
import { siteConfig } from './site';

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
    summary: '대덕소프트웨어마이스터고등학교의 입학전형 서비스 웹 애플리케이션입니다.',
    description:
      'Entry DSM은 대덕소프트웨어마이스터고등학교의 입학전형 서비스로, 지원자들이 쉽게 지원할 수 있는 웹 애플리케이션입니다.',
    role: '프론트엔드의 전체적인 구조를 설계하고, 개발을 전담하였습니다. 또한 부장을 맡아 프로젝트 전체를 관리하였습니다.',
    features: ['원서 접수', '결과 조회', '지원자 확인', '통계'],
    problemSolving:
      'Entry DSM은 이전 버전에서 발생한 성능 문제와 유지보수의 어려움을 해결하기 위해, 프론트엔드 구조를 개선하고, 상태 관리를 효율적으로 설계하였습니다.',
    githubUrl: `https://github.com/EntryDSM/EntryDsm-Admission-2026`,
    demoUrl: 'https://entrydsm.kr/',
    imageVariant: 'mono',
    tags: ['React', 'TypeScript', 'Emotion', 'TuroboRepo', 'Vite'],
    featured: true,
    year: '2026',
  },
  {
    id: 'Commonly-frontend',
    title: '유성구청 리빙랩 Commonly',
    summary: '유성구청 리빙랩의 기간제 근로자 경력관리 시스템 웹 애플리케이션입니다.',
    description:
      'Commonly는 유성구청 리빙랩의 기간제 근로자 경력관리 시스템으로, 근로자들의 근로 내역(경력)을 쉽게 관리할 수 있는 웹 애플리케이션입니다.',
    role: '팀장을 맡아 프로젝트를 전체적으로 관리하고, 프론트엔드 개발을 일부 담당하였습니다.',
    features: ['근로내역 등록', '경력증명서 발급'],
    problemSolving:
      '유성구청의 기간제 근로자 경력관리 시스템은 기존에 수기로 관리되던 근로 내역을 디지털화하여, 근로자들이 쉽게 자신의 경력을 관리하고 증명할 수 있도록 하였습니다.',
    githubUrl: `https://github.com/DSM2026-Commonly/Commonly-fe`,
    demoUrl: 'https://github.com/DSM2026-Commonly/Commonly-fe',
    imageVariant: 'studio',
    tags: ['React', 'TypeScript', 'Emotion', 'Vite'],
    featured: true,
    year: '2026',
  },
  {
    id: 'xquare-infra-v3',
    title: 'XQUARE 인프라 V3',
    summary: '교내 배포 플랫폼인 XQUARE 인프라의 웹 서비스입니다.',
    description:
      'XQUARE 인프라 V3는 교내 배포 플랫폼으로, 학생들이 개발한 프로젝트를 쉽게 배포하고 관리할 수 있는 웹 서비스입니다.',
    role: '프론트엔드의 전체적인 구조를 설계하고, 개발을 전담하였습니다.',
    features: ['지원자 검색', '상태 필터', '상세 모달', '통계 화면'],
    problemSolving:
      'XQUARE 인프라 V3는 이전 버전에서 발생한 성능 문제와 유지보수의 어려움을 해결하기 위해, 프론트엔드 구조를 개선하고, 상태 관리를 효율적으로 설계하였습니다.',
    githubUrl: `https://github.com/team-xquare/xquare-infra-frontend-v3`,
    demoUrl: 'https://xquare.dsmhs.kr/',
    imageVariant: 'aurora',
    tags: ['React', 'TypeScript', 'Emotion', 'Storybook', 'TuroboRepo', 'Vite'],
    featured: true,
    year: '2025-2026',
  },
];

export const experiences: ExperienceItem[] = [
  {
    title: '유성구청 리빙랩 팀장',
    organization: '대덕소프트웨어마이스터고등학교 유성구청 리빙랩',
    period: '2026.04~',
    description:
      '유성구청과 협력하여 지역 문제를 해결하는 리빙랩 프로젝트에서 팀장으로 활동하고 있습니다. 팀원들과 함께 아이디어를 구체화하고, 프로토타입을 개발하며, 지역 사회에 기여하는 경험을 쌓고 있습니다.',
  },
  {
    title: '전곧동아리 부장',
    organization: '대덕소프트웨어마이스터고등학교 XQUARE',
    period: '2026.03~',
    description:
      '전곧동아리에서 부장으로 활동하며, 동아리 운영과 프로젝트 관리를 담당하고 있습니다. 팀원들과 협력하여 다양한 개발 프로젝트를 진행하고 있습니다.',
  },
  {
    title: 'FE Conf 2025',
    organization: 'Frontend Developers Conference',
    period: '2025.08.23',
    description:
      'FE Conf 2025에 참가하였습니다. 프론트엔드 개발에 대한 세션을 듣고, 다른 개발자들과 네트워킹했습니다.',
  },
  {
    title: '교내 해커톤',
    organization: '대덕소프트웨어마이스터고등학교',
    period: '2025.07.14~2025.07.18',
    description:
      '교내 해커톤에서 참가하였습니다. 디자인을 담당하며, 팀원들과 협업하여 프로젝트를 완성했습니다.',
  },
];

export const awards: AwardItem[] = [
  {
    title: '교과 우수상(웹 개발 입문)',
    issuer: '대덕소프트웨어마이스터고등학교',
    year: '2025',
    description: '교내 웹 개발 입문 교과에서 받은 상입니다.',
  },
];

export const contactLinks: ContactLink[] = [
  { label: '이메일', href: `mailto:${siteConfig.email}`, value: siteConfig.email },
  { label: 'GitHub', href: siteConfig.githubUrl, value: '@jaejun090210' },
];
