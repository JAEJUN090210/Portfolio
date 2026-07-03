export const siteConfig = {
  name: '전재준',
  role: 'Frontend Developer',
  headline: '세상을 이롭게 만들 수 있는 개발자가 되고 싶은 전재준입니다.',
  description: '전재준의 포트폴리오 사이트입니다.',
  email: 'jaejun090210@naver.com',
  githubUser: 'jaejun090210',
  githubUrl: 'https://github.com/jaejun090210',
  linkedInUrl: 'https://www.linkedin.com/in/frontend-developer',
  velogUrl: 'https://velog.io/@frontend',
  canonicalUrl: 'https://jaejun.isdevj.kr',
};

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Skills', href: '/skills' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Awards', href: '/awards' },
  { label: 'Contact', href: '/contact' },
] as const;

export const sectionAnchors = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
] as const;
