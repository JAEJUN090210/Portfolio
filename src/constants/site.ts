import type { IntroSegment } from '../types/portfolio';

export const siteConfig = {
  name: '전재준',
  englishName: 'Jaejun Jeon',
  role: 'Frontend Developer',
  description: '전재준의 포트폴리오 사이트입니다.',
  email: 'jaejun090210@naver.com',
  githubUrl: 'https://github.com/jaejun090210',
  canonicalUrl: 'https://jaejun.isdevj.kr',
  resumeUrl: '/전재준_포트폴리오.pdf',
};

export const hero = {
  intro: [
    { text: '경험', strong: true },
    { text: ', ' },
    { text: '도전', strong: true },
    { text: ', 그리고 ' },
    { text: '협업', strong: true },
    { text: '을 통해 성장하며\n세상을 이롭게 만들고 싶은 ' },
    { text: '프론트엔드 개발자', strong: true },
    { text: '입니다.' },
  ] satisfies IntroSegment[],
  meta: ['Daejeon', '대덕소프트웨어마이스터고등학교'],
  currently: {
    role: 'Frontend Developer',
    organization: '@ 대덕소프트웨어마이스터고등학교 · XQUARE',
    period: '2025.03 — 현재',
  },
  focus: ['React', 'TypeScript', 'Emotion', 'Vite'],
};

export const footerBio = {
  lead: '배우고, 만들고, 나누는 과정 속에서 성장하며,',
  highlight: '"세상을 이롭게 만드는 개발자"',
  tail: '가 되기 위해 노력하는 학생입니다.',
};

export const headerNav = [
  { label: '경험', href: '/#experience' },
  { label: '프로젝트', href: '/#projects' },
  { label: '기술', href: '/#skills' },
  { label: '연락', href: '/#contact' },
] as const;

export const sectionAnchors = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'awards', label: 'Awards' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;
