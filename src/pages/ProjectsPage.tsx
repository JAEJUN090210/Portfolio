import { ProjectAccordion } from '../components/section/ProjectAccordion';
import { SplitSection } from '../components/ui/SplitSection';

export function ProjectsPage() {
  return (
    <SplitSection id="projects" title="PROJECTS">
      <ProjectAccordion />
    </SplitSection>
  );
}
