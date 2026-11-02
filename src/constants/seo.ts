import type { Project } from '../types/portfolio';
import { projects } from './projects';
import { siteConfig } from './site';

/** 한 페이지의 문서 제목·설명·대표 이미지. 런타임(SEO 컴포넌트)과 빌드(라우트별 정적 HTML)에서 함께 씁니다. */
export type PageMeta = {
  path: string;
  /** `<title>` 에 그대로 들어가는 완성된 문자열 */
  title: string;
  description: string;
  /** 사이트 기준 절대 경로. 비우면 사이트 공통 OG 이미지를 씁니다. */
  image?: string;
  noindex?: boolean;
};

const withName = (title: string) => `${title} | ${siteConfig.name}`;

export const pageMeta = {
  home: {
    path: '/',
    title: `${siteConfig.name} | 프론트엔드 개발자 포트폴리오`,
    description: siteConfig.description,
  },
  experience: {
    path: '/experience',
    title: withName('경험'),
    description: `${siteConfig.name}의 프로젝트·해커톤·동아리 활동과 학력, 수상 내역을 정리했습니다.`,
  },
  projects: {
    path: '/projects',
    title: withName('프로젝트'),
    description: `${siteConfig.name}이 개발한 프로젝트 ${projects.map((p) => p.title).join(', ')}의 역할과 기여, 트러블슈팅을 소개합니다.`,
  },
  skills: {
    path: '/skills',
    title: withName('기술 스택'),
    description: `${siteConfig.name}이 사용하는 프론트엔드·인프라·협업 도구 기술 스택입니다.`,
  },
  awards: {
    path: '/awards',
    title: withName('수상'),
    description: `${siteConfig.name}의 해커톤·대회 수상 내역입니다.`,
  },
  contact: {
    path: '/contact',
    title: withName('연락하기'),
    description: `${siteConfig.name}에게 이메일로 연락하거나 GitHub, 포트폴리오 PDF를 확인할 수 있습니다.`,
  },
  notFound: {
    path: '/404',
    title: withName('페이지를 찾을 수 없습니다'),
    description: siteConfig.description,
    noindex: true,
  },
} satisfies Record<string, PageMeta>;

/** 프로젝트 대표 이미지(webp)와 같은 이름의 1200×630 JPG 를 공유 미리보기로 씁니다. */
export const projectOgImage = (project: Project) =>
  project.cover ? project.cover.replace(/\.webp$/, '-og.jpg') : undefined;

export const projectMeta = (project: Project): PageMeta => ({
  path: `/projects/${project.id}`,
  title: withName(`${project.title} - ${project.summary}`),
  description: project.description,
  image: projectOgImage(project),
});

/** 빌드 시 라우트별 정적 HTML 을 만들 모든 페이지 */
export const staticRoutes: PageMeta[] = [
  pageMeta.home,
  pageMeta.projects,
  pageMeta.experience,
  pageMeta.skills,
  pageMeta.awards,
  pageMeta.contact,
  ...projects.map(projectMeta),
];

/** sitemap 에 올릴 페이지. 홈 섹션과 내용이 같은 /experience·/skills·/awards 는 중복이라 뺍니다. */
export const sitemapRoutes: PageMeta[] = [
  pageMeta.home,
  pageMeta.projects,
  pageMeta.contact,
  ...projects.map(projectMeta),
];

export const absoluteUrl = (path: string) =>
  `${siteConfig.canonicalUrl}${path === '/' ? '/' : path}`;
