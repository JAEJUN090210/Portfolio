import { ContactSection } from '../components/section/ContactSection';
import { ExperienceList } from '../components/section/ExperienceList';
import { HeroSection } from '../components/section/HeroSection';
import { ProjectAccordion } from '../components/section/ProjectAccordion';
import { SkillCards } from '../components/section/SkillCards';
import { Section } from '../components/ui/Section';
import { SplitSection } from '../components/ui/SplitSection';

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
        <SkillCards />
      </Section>

      <ContactSection />
    </>
  );
}
