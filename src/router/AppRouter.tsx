import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { pageMeta } from '../constants/seo';
import { AppLayout } from '../layouts/AppLayout';
import { HomePage } from '../pages/HomePage';
import { PageShell } from './PageShell';

// 첫 화면인 홈은 초기 번들에 포함해 추가 요청 없이 바로 그립니다. 나머지 페이지는 방문할 때 불러옵니다.
const SkillsPage = lazy(() =>
  import('../pages/SkillsPage').then((module) => ({ default: module.SkillsPage })),
);
const ProjectsPage = lazy(() =>
  import('../pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage })),
);
const ProjectDetailPage = lazy(() =>
  import('../pages/ProjectDetailPage').then((module) => ({ default: module.ProjectDetailPage })),
);
const ExperiencePage = lazy(() =>
  import('../pages/ExperiencePage').then((module) => ({ default: module.ExperiencePage })),
);
const AwardsPage = lazy(() =>
  import('../pages/AwardsPage').then((module) => ({ default: module.AwardsPage })),
);
const ContactPage = lazy(() =>
  import('../pages/ContactPage').then((module) => ({ default: module.ContactPage })),
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
);

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: (
          <PageShell meta={pageMeta.home}>
            <HomePage />
          </PageShell>
        ),
      },
      {
        path: '/skills',
        element: (
          <PageShell meta={pageMeta.skills}>
            <SkillsPage />
          </PageShell>
        ),
      },
      {
        path: '/projects',
        element: (
          <PageShell meta={pageMeta.projects}>
            <ProjectsPage />
          </PageShell>
        ),
      },
      {
        path: '/projects/:projectId',
        element: (
          // 상세 페이지는 프로젝트 데이터를 읽은 뒤 자체 메타로 덮어씁니다.
          <PageShell meta={pageMeta.projects}>
            <ProjectDetailPage />
          </PageShell>
        ),
      },
      {
        path: '/experience',
        element: (
          <PageShell meta={pageMeta.experience}>
            <ExperiencePage />
          </PageShell>
        ),
      },
      {
        path: '/awards',
        element: (
          <PageShell meta={pageMeta.awards}>
            <AwardsPage />
          </PageShell>
        ),
      },
      {
        path: '/contact',
        element: (
          <PageShell meta={pageMeta.contact}>
            <ContactPage />
          </PageShell>
        ),
      },
      {
        path: '*',
        element: (
          <PageShell meta={pageMeta.notFound}>
            <NotFoundPage />
          </PageShell>
        ),
      },
    ],
  },
]);
