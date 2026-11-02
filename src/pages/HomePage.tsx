import { lazy, Suspense } from 'react';
import { ContactSection } from '../components/section/ContactSection';
import { ExperienceList } from '../components/section/ExperienceList';
import { HeroSection } from '../components/section/HeroSection';
import { ProjectAccordion } from '../components/section/ProjectAccordion';
import { Section } from '../components/ui/Section';
import { SplitSection } from '../components/ui/SplitSection';

// 기술 로고(react-icons)는 첫 화면 아래에 있고 용량이 커서 따로 불러옵니다.
const SkillCards = lazy(() =>
  import('../components/section/SkillCards').then((module) => ({ default: module.SkillCards })),
);

export function HomePage() {
  return (
    <>
      <HeroSection />

      <SplitSection id="experience" title="EXPERIENCE">
        <ExperienceList />
      </SplitSection>

      <SplitSection id="projects" title="PROJECTS">
        <ProjectAccordion />
      </SplitSection>

      <Section id="skills" title="Technical Skills">
        <Suspense fallback={<div style={{ minHeight: '24rem' }} aria-busy="true" />}>
          <SkillCards />
        </Suspense>
      </Section>

      <ContactSection />
    </>
  );
}
