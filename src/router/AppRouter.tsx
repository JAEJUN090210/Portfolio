import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { PageShell } from './PageShell';

const HomePage = lazy(() =>
  import('../pages/HomePage').then((module) => ({ default: module.HomePage })),
);
const SkillsPage = lazy(() =>
  import('../pages/SkillsPage').then((module) => ({ default: module.SkillsPage })),
);
const ProjectsPage = lazy(() =>
  import('../pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage })),
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
          <PageShell title="Home" path="/">
            <HomePage />
          </PageShell>
        ),
      },
      {
        path: '/skills',
        element: (
          <PageShell title="Skills" path="/skills">
            <SkillsPage />
          </PageShell>
        ),
      },
      {
        path: '/projects',
        element: (
          <PageShell title="Projects" path="/projects">
            <ProjectsPage />
          </PageShell>
        ),
      },
      {
        path: '/experience',
        element: (
          <PageShell title="Experience" path="/experience">
            <ExperiencePage />
          </PageShell>
        ),
      },
      {
        path: '/awards',
        element: (
          <PageShell title="Awards" path="/awards">
            <AwardsPage />
          </PageShell>
        ),
      },
      {
        path: '/contact',
        element: (
          <PageShell title="Contact" path="/contact">
            <ContactPage />
          </PageShell>
        ),
      },
      {
        path: '*',
        element: (
          <PageShell title="Page Not Found" path="/404">
            <NotFoundPage />
          </PageShell>
        ),
      },
    ],
  },
]);
